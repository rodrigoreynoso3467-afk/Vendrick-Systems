# Vendrick Systems

Official company website for **vendricksystems.com**, prepared from the latest approved Vendrick Systems review source (commit `2818f89e13d60a3732a67723c33557fbb9b431cc`). The design, original V logo, Earth hero, landing-page structure, responsive styles, pages, and fictional-data demonstrations are retained. Agua Blue is unrelated and is not included.

## Local development

Use Node.js 22 LTS (22.13 or newer), Git, and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production checks:

```sh
npm test
npm run lint
npm run build
npm run typecheck
npm start
```

On Windows, stop existing Next/Node processes before `npm ci`: the Next native compiler cannot be replaced while it is loaded. If installation was interrupted, close the development server, remove `node_modules`, then run `npm ci` again. Keeping the checkout outside OneDrive avoids sync-related file locks. Do not remove `package-lock.json`.

## Netlify deployment

1. Import **only** `rodrigoreynoso3467-afk/Vendrick-Systems` into a NEW Netlify project. Do not select or edit Agua Blue.
2. Build command: `npm run build`. Publish directory: `.next`. Node: `22`. Netlify automatically applies its OpenNext adapter. Do not deploy `.next` as a plain drag-and-drop static site.
3. First deploy with `SITE_INDEXABLE=false` and `NEXT_PUBLIC_CONTACT_ENABLED=false` (both default off). Use the assigned HTTPS `*.netlify.app` URL for QA before changing DNS.
4. Go to the new project's **Forms** section and enable form detection, then redeploy. Confirm that **vendrick-inquiry** is registered with every field from `public/__forms.html`.
5. Under Forms / submission notifications, add an EMAIL notification to **vendricksystems@gmail.com**, for `vendrick-inquiry`. Netlify currently requires this recipient address to belong to an active team member on non-enterprise plans. Prefer using the existing Netlify account associated with this Gmail address. If membership would require a paid seat, stop and choose a no-cost option with the owner; do not purchase one. Complete any requested email verification. This notification is an account setting; source code cannot configure it by itself.
6. Set `NEXT_PUBLIC_CONTACT_ENABLED=true` for this project's builds and redeploy. This is a public boolean, not a secret. Test the form on its temporary Netlify URL. Confirm BOTH a stored verified submission in Netlify and the notification in Gmail, including Spam. No claim of inbox delivery is made in the UI.
7. Add `vendricksystems.com` and `www.vendricksystems.com` to this project's domain settings. Select the apex as primary. Complete domain ownership verification if Netlify requests a TXT record.
8. Configure DNS as below. Wait for Netlify's DNS verification, provision its free HTTPS certificate covering both names, and check the 301 redirect and certificate on each hostname.
9. Only after those tests pass, set `SITE_INDEXABLE=true` for production builds and redeploy. Preview and branch deploys remain noindex via `netlify.toml`.

`netlify.toml` contains a permanent www-to-apex redirect preserving paths. Do not add a catch-all SPA rewrite: Next.js needs its own page/API routing.

## Namecheap DNS

Keep Namecheap BasicDNS. In Advanced DNS, after the temporary site passes testing:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | @ | 75.2.60.5 | Automatic |
| CNAME | www | The exact Netlify project hostname, e.g. the assigned `something.netlify.app` | Automatic |

**The Netlify hostname is not known until the project is created. Do not enter the example.** Replace conflicting parking / URL Redirect / A / AAAA / CNAME records ONLY for `@` and `www`. Preserve all MX, mail-related TXT, and unrelated subdomain records. The domain currently uses Namecheap's `dns1.registrar-servers.com` and `dns2.registrar-servers.com`. Do not transfer the domain or purchase hosting or SSL.

Reference: https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/

## Inquiry handling and security

- Netlify Forms handles the actual POST at `/__forms.html`; this dedicated static definition is required for modern Next.js SSR deployments. Never change the AJAX target to `/` or rely only on a React `data-netlify` form.
- `name`, `email`, and `description` (the message) are required. Phone is optional on every inquiry form. Existing optional company, tool, service and budget fields are retained where applicable.
- Shared validation checks lengths, email, service, topic, budget and honeypot before submission. HTML constraints provide immediate feedback. Netlify accepts only registered field names and applies server-side spam filtering plus the `website` honeypot. This is native hosted form processing, not an authenticated API; do not collect sensitive records or attachments.
- A network error, redirect, non-2xx status or missing Netlify request identifier cannot trigger success. On error, entered text is preserved. Success means Netlify accepted the request, not a guarantee it reached an email inbox; dashboard and mailbox tests are required before launch.
- Forms are disabled until explicitly enabled after account configuration. Local development cannot send mail or simulate successful delivery; use Netlify to test the full workflow.
- No Resend or Turnstile keys are needed. The previous unconfigured email API route and Cloudflare runtime/auth dependencies have been removed from this Netlify export. No secrets are committed.
- `SITE_URL=https://vendricksystems.com` sets canonical metadata and sitemap URLs. It is not a secret. `SITE_INDEXABLE` and `NEXT_PUBLIC_CONTACT_ENABLED` are the only feature flags.

Forms documentation: https://docs.netlify.com/manage/forms/setup/ and https://opennext.js.org/netlify/forms

## Editing content

- Homepage: `app/page.tsx`
- Services and process copy: `lib/content.ts`
- Other pages: corresponding `app/<page>/page.tsx`
- Colors and responsive styles: `app/globals.css`
- Shared header/footer: `components/header.tsx` and `app/layout.tsx`
- Contact fields: `components/contact-form.tsx` (update `public/__forms.html` and tests whenever a field changes)
- Supplied logo: `public/images/vendrick-logo.png` (preserve the established V design)

Commit changes to GitHub to trigger the connected Netlify build. Demonstrations use fictional data; do not describe them as completed client projects. No fixed prices, delivery dates or extra team availability are promised.

## Costs

No additional purchase is required by this project. Netlify's current Free credit plan is $0/month with a hard credit limit; Forms are free on credit plans, while deploys, requests, bandwidth and compute consume the allowance. A site may pause if the allowance is exhausted. Existing/legacy plans may have different form limits: verify the account's plan before launch. Do not enable auto-recharge, paid add-ons, analytics upgrades or a subscription. Domain renewals remain payable to Namecheap under your existing registration.

Reference: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/

## Launch status

See `LAUNCH-STATUS.md` for actual verification and remaining account actions. A successful local build is not proof of a successful Netlify deployment, DNS configuration, HTTPS certificate, or inbox delivery.
