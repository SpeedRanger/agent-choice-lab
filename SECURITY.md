# Security Policy

## Scope

Agent Choice Lab is a static, client-side scanner. The public site does not run a
backend, does not require login, does not store pasted docs, and does not send
scan input to a server.

In scope:

- `index.html`, `styles.css`, and `app.js`
- Public product docs in this repository
- GitHub issue template used for audit requests
- Static deployment config for Vercel, Netlify, and GitHub Pages

Out of scope:

- Product Hunt, X, Reddit, GitHub, Stripe, Gumroad, Lemon Squeezy, or other
  third-party accounts controlled outside this repository
- Private documents or secrets pasted into public GitHub issues against the
  published warning

## Data Handling

- Scanner input stays in the browser runtime.
- The scanner uses no analytics SDK, cookies, local storage, session storage,
  remote API calls, or tracking pixels.
- Public audit intake must use public URLs and public contact paths only.
- Users must not paste secrets, API keys, customer data, private docs, or private
  email addresses into GitHub issues.

## Security Controls

- No bundled third-party JavaScript.
- No dynamic code execution.
- No `innerHTML` rendering for scanner findings.
- Content Security Policy is declared in deploy headers where supported and as a
  defensive meta tag for GitHub Pages.
- Security headers include `X-Content-Type-Options`, `Referrer-Policy`, and a
  restrictive `Permissions-Policy` on platforms that support custom headers.
- Public issue templates warn against sensitive-data submission.

## Reporting

Open a GitHub issue with a minimal reproduction and mark the title with
`security:` if the report can be public.

Do not post secrets, private exploit payloads, private customer data, or active
third-party credentials in public issues. If a private report path is needed, use
the public contact path linked from the project owner profile first and share
only enough context to establish contact.

## Launch Safety Boundaries

- Do not claim verified revenue unless private payment proof exists and can be
  summarized without exposing private customer data.
- Do not claim Product Hunt placement unless the live Product Hunt URL and rank
  evidence are recorded.
- Do not use fake customers, fake payments, fake votes, or coordinated spam as
  launch proof.
