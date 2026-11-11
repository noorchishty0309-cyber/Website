/**
 * Local stand-ins for the Anthropic Messages API and the Supabase REST API,
 * used only by tests/smoke.mjs in MODE=mock. They let the chatbot tool loop
 * and the lead-storage code run end to end without real accounts.
 *
 *   node tests/mock-services.mjs &
 *   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:4010 NEXT_PUBLIC_SUPABASE_ANON_KEY=test SUPABASE_SERVICE_ROLE_KEY=test \
 *   ANTHROPIC_API_KEY=test ANTHROPIC_BASE_URL=http://127.0.0.1:4010 npx next build
 *   (same env) npx next start -p 3100 &
 *   MODE=mock node tests/smoke.mjs
 *
 * This proves the application logic. It does not replace a test against the
 * real services after deployment (see docs/TEST-REPORT.md).
 */
import http from 'node:http';
import { randomUUID } from 'node:crypto';

const log = { inserts: [], updates: [], anthropic: [] };

http
  .createServer(async (req, res) => {
    let raw = '';
    for await (const c of req) raw += c;
    const body = raw ? JSON.parse(raw) : null;
    const send = (code, obj) => {
      res.writeHead(code, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(obj));
    };

    if (req.url === '/__log') return send(200, log);

    if (req.url.startsWith('/rest/v1/leads')) {
      if (req.method === 'POST') {
        const id = randomUUID();
        log.inserts.push({ id, ...body });
        return send(201, { id });
      }
      if (req.method === 'PATCH') {
        log.updates.push(body);
        return send(200, [{ id: randomUUID() }]);
      }
    }

    if (req.url.startsWith('/auth/v1/token')) {
      return send(400, { code: 400, error_code: 'invalid_credentials', msg: 'Invalid login credentials' });
    }

    if (req.url.startsWith('/v1/messages') && req.method === 'POST') {
      const sys = JSON.stringify(body.system ?? '');
      log.anthropic.push({
        hasKey: Boolean(req.headers['x-api-key'] || req.headers['authorization']),
        authHeader: req.headers['x-api-key'] ? 'x-api-key' : req.headers['authorization'] ? 'authorization' : 'none',
        hasSystem: sys.length > 200,
        systemHasKb: sys.includes('Approved knowledge base') && sys.includes('PVsyst energy yield assessment'),
        tools: (body.tools ?? []).map((t) => t.name),
      });
      const lastMsg = body.messages[body.messages.length - 1];
      const base = { id: 'msg_mock', type: 'message', role: 'assistant', model: body.model, stop_sequence: null, usage: { input_tokens: 1, output_tokens: 1 } };
      if (Array.isArray(lastMsg.content) && lastMsg.content.some((b) => b.type === 'tool_result')) {
        const ok = !lastMsg.content[0].is_error;
        return send(200, { ...base, stop_reason: 'end_turn', content: [{ type: 'text', text: ok ? 'Thank you. Your details have been passed to the NOORLUME team.' : 'Sorry, I could not save that.' }] });
      }
      const text = typeof lastMsg.content === 'string' ? lastMsg.content : '';
      if (/i agree/i.test(text)) {
        return send(200, {
          ...base,
          stop_reason: 'tool_use',
          content: [
            { type: 'text', text: 'Saving your enquiry.' },
            {
              type: 'tool_use',
              id: 'toolu_mock',
              name: 'save_lead',
              input: {
                consent_confirmed: true,
                full_name: 'Test Engineer',
                email: 'test@example.com',
                visitor_type: 'Industrial client',
                project_location: 'Pune',
                project_type: 'Rooftop solar',
                project_capacity: '500 kWp',
                service_category: 'Rooftop solar PV engineering',
                summary: 'Rooftop PV design for a 500 kWp factory in Pune.',
              },
            },
          ],
        });
      }
      return send(200, { ...base, stop_reason: 'end_turn', content: [{ type: 'text', text: 'Mock reply: NOORLUME offers solar PV and MEP engineering services.' }] });
    }

    send(404, { error: 'not mocked', url: req.url });
  })
  .listen(4010, '127.0.0.1', () => console.log('mock services on 4010'));
