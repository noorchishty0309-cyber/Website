# Administrator guide

## Signing in

Go to `https://yourdomain.com/admin`. You are redirected to the sign-in page. Enter the email and password of a user that has been created in Supabase and added to the `admins` table (see below). The dashboard is not linked from the public site and is excluded from search engines.

## The dashboard

**Summary tiles:** total enquiries, new leads, chatbot-generated leads and contact form submissions.

**Charts:** leads by service, by location and by status.

**Recent enquiries:** newest first. Use the search box and the Status and Source filters to narrow the list. Click a row to open it.

Each lead shows the contact details, project information, the visitor's message (or the chatbot's summary of the conversation), and where it came from:

- **Contact form:** submitted through the contact page
- **Chatbot:** collected by the Engineering Assistant after the visitor agreed to share details
- **Follow-up requested:** the visitor asked to speak to a person, or the assistant judged the enquiry serious. Treat these first.

## Managing a lead

Open the lead, choose a status, add internal notes if useful, and press **Save**.

| Status | Meaning |
| --- | --- |
| New | Not yet actioned |
| Contacted | First reply sent |
| Discussion in Progress | Scope or inputs being discussed |
| Proposal Submitted | Proposal issued, awaiting decision |
| Won | Converted to a project |
| Lost | Not proceeding |

Notes are visible only to administrators.

## Adding another administrator

1. In Supabase, open **Authentication > Users > Add user**. Enter their email and a strong temporary password.
2. In **SQL Editor**, run:

   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'colleague@yourdomain.com';
   ```

A user who exists in Authentication but is not in `admins` can sign in but sees a "Not authorised" message and no lead data.

## Removing an administrator

```sql
delete from public.admins
where user_id = (select id from auth.users where email = 'colleague@yourdomain.com');
```

Then delete the user under **Authentication > Users**.

## Changing a password

In Supabase, open **Authentication > Users**, select the user and send a password recovery or set a new password.

## Deleting or exporting leads

The dashboard does not delete records. To delete a lead (for example on a privacy request), open **Table Editor > leads** in Supabase, select the row and delete it. To export, use **Export** in the same view.

## Updating the chatbot's knowledge

Edit `content/knowledge-base.md`, commit and push. The assistant uses the new text after the site redeploys. Add facts only when they are true and you are happy for them to be stated publicly: the assistant treats this file as approved.

When you have published contact details, registrations or project references, move them from the "Not yet published" section into the relevant section.

## Security practices

- Use a unique, strong password and do not share accounts. Create one user per person.
- Keep "Allow new users to sign up" turned off in Supabase.
- Never paste the `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY` or `RESEND_API_KEY` into chats, emails or client-side code. If one leaks, rotate it in the provider's dashboard and update Vercel.
- Sign out on shared computers.
