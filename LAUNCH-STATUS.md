# Vendrick Systems launch status — November 8, 2026

## Verified

- Latest approved landing page and all existing company/services/demo pages preserved from review source `2818f89e13d60a3732a67723c33557fbb9b431cc`.
- Standard Next.js 16.4.5 project prepared for Netlify; Cloudflare-only hosting and unused starter dependencies excluded.
- Production build and TypeScript checks passed. ESLint passed without warnings after replacing an unoptimized image in an unused motion component.
- Five form tests passed: validation, optional phone, matching Netlify static fields/honeypot, encoded submission, and failure handling. These are local tests; they are not live inbox delivery tests.
- Local browser inspection covered 13 page/example URLs at 1363 CSS px and 454 CSS px (narrow layout via browser zoom). One cleanup-table overflow was corrected and retested. Mobile menu exposed the expected links. No broken loaded images or application console errors observed. This is responsive desktop-browser QA, not a physical-device test.
- Pages expose one H1, skip link, labeled navigation and input fields. Full accessibility certification is not claimed.
- Production HTTP smoke check passed: 13 page/example URLs, 37 distinct internal links/anchors, 12 linked assets, social image, sitemap, robots and the dedicated form definition; missing-page route returned 404.
- Production dependencies audit reported zero known vulnerabilities.
- No API keys or authentication secrets are required by the selected Netlify Forms approach. Forms remain gated off until configured and tested. No purchases or paid add-ons made. Agua Blue was not changed.

## Not completed / account access required

| Item | Actual status |
| --- | --- |
| Netlify project and temporary URL | Netlify account sign-in succeeded; project import is waiting for GitHub / Google device approval |
| Public deployment | Not deployed or verified |
| Contact storage and Gmail delivery | Prepared in code; form detection and notification not configured, live workflow not tested |
| Custom domain binding | Not configured |
| WWW redirect | Rule prepared; not verified on a deployment |
| HTTPS certificate | Not provisioned or verified |
| Production search indexing | Disabled until launch verification |

## DNS observation

A public DNS-over-HTTPS lookup returned these records during this audit:

- NS: `dns1.registrar-servers.com`, `dns2.registrar-servers.com` (Namecheap).
- Apex A: `162.255.119.160` (not Netlify's documented external-DNS target).
- No apex AAAA or CNAME answer.

The execution environment's system DNS resolver could not resolve the domain; the above observation uses public DNS-over-HTTPS, not a verified HTTP response from the domain. No DNS settings were changed.

After a Netlify project is created and tested, use Namecheap Advanced DNS:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | @ | 75.2.60.5 | Automatic |
| CNAME | www | Exact assigned Netlify project hostname; not yet available | Automatic |

Do not enter a guessed Netlify hostname. Remove only conflicting apex/www forwarding or address records, preserving email DNS and unrelated subdomains. Bind both hostnames in Netlify, set apex primary, verify any requested ownership TXT record, and wait for the SSL certificate before claiming HTTPS is ready.

## Next action

Netlify authentication succeeded. Complete Google’s device approval for the GitHub repository import in the pending secure browser sign-in flow. The account must be able to deploy the Vendrick GitHub repository. Netlify's current notification rules require `vendricksystems@gmail.com` to be an active team member address on non-enterprise plans. Do not purchase a team seat; resolve that requirement with a free account configuration if needed.

Once access is available: create a separate project, deploy, enable form detection, configure Gmail notifications, enable the form flag and test actual stored submission plus inbox receipt, then connect DNS and verify HTTPS/redirects. Only then enable production indexing.
