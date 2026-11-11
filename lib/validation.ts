import { z } from 'zod';

const text = (max: number) => z.string().trim().max(max);

export const enquirySchema = z.object({
  fullName: text(120).min(2, 'Please enter your full name'),
  company: text(160).optional().default(''),
  email: z.string().trim().toLowerCase().email('Please enter a valid email address').max(200),
  phone: text(40)
    .regex(/^[+()\d\s-]{6,}$/, 'Please enter a valid contact number')
    .or(z.literal(''))
    .optional()
    .default(''),
  country: text(80).min(2, 'Please enter your country'),
  projectLocation: text(160).optional().default(''),
  serviceCategory: text(120).min(2, 'Please choose a service category'),
  projectCapacity: text(80).optional().default(''),
  buildingType: text(120).optional().default(''),
  description: text(4000).min(10, 'Please describe your project in a sentence or two'),
  timeline: text(60).optional().default(''),
  consent: z.boolean().refine((v) => v === true, { message: 'Please confirm consent so we can respond to you' }),
  // Spam traps: "website" must stay empty; startedAt is when the form was rendered.
  website: z.string().max(0).optional().default(''),
  startedAt: z.number().optional(),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;

export const chatRequestSchema = z.object({
  sessionId: z.string().min(8).max(80),
  leadId: z.string().uuid().nullable().optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().trim().min(1).max(2000),
      })
    )
    .min(1)
    .max(40),
});

export const chatLeadSchema = z.object({
  consent_confirmed: z.literal(true),
  full_name: text(120).min(2),
  email: z.string().trim().toLowerCase().email().max(200).optional(),
  phone: text(40).optional(),
  company: text(160).optional(),
  visitor_type: text(80).optional(),
  project_location: text(160).optional(),
  project_type: text(160).optional(),
  project_capacity: text(80).optional(),
  service_category: text(160).optional(),
  project_stage: text(120).optional(),
  timeline: text(80).optional(),
  summary: text(2000).optional(),
  handover_requested: z.boolean().optional(),
});
export type ChatLeadInput = z.infer<typeof chatLeadSchema>;
