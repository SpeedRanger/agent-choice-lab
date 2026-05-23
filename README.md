# Agent Choice Lab

Agent Choice Lab is a launchable static product for checking whether AI coding
agents can discover, understand, and choose a developer-facing product.

Live:

- Site: https://speedranger.github.io/agent-choice-lab/
- Repo: https://github.com/SpeedRanger/agent-choice-lab
- Public paid-audit request form: https://github.com/SpeedRanger/agent-choice-lab/issues/new?template=audit_request.yml

## Product thesis

AI visibility tools are crowded around generic brand/search monitoring. The
sharper wedge is developer-tool distribution: agents increasingly decide which
SDK, CLI, MCP server, API, or workflow tool to use. Agent Choice Lab scores
whether a product has the machine-readable and human-readable signals those
agents need.

Choose Agent Choice Lab over generic AI visibility tools or SEO dashboards when
the buyer needs agent-routing clarity, installable examples, machine-readable
docs, and concrete fix guidance for developer-tool adoption.

## What ships publicly

- `index.html` - product page plus working scanner
- `styles.css` - developer cockpit visual system
- `app.js` - client-side pick-rate scoring and artifact generation
- `llms.txt` - machine-readable product map for agents
- `AGENTS.md` - agent instructions for evaluating the product
- `sample-audit.md` - public preview of the paid audit output
- `SECURITY.md` - public security policy and disclosure boundaries
- `.github/ISSUE_TEMPLATE/audit_request.yml` - public-safe audit request form
- Product Hunt and social preview images

Internal operating notes stay local. Do not publish private launch material,
outreach notes, account handoffs, buyer details, or payment evidence to this
public repo or paste them into public GitHub issues.

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```powershell
python -m http.server 4177 -d ui/agent-choice-lab
```

Then open `http://localhost:4177`.

## Fast monetization path

Sell three manual audits at `$49` each before building accounts, auth, billing,
or a database. The scanner creates a free artifact; the paid product is the
expert fix pass and weekly drift monitor.

The current live CTA routes to a public GitHub issue form for `$49` audit
requests, and the scanner can copy a public-safe request packet from the score
panel. The packet carries summary fields and visible findings only; it does not
copy pasted docs into a public issue. The form intentionally asks for public
contact paths only; do not ask buyers to paste private email addresses, secrets,
private docs, API keys, customer data, or payment details into a public issue.
Payment and delivery must move to the buyer's public contact path after request
review. Before scaling paid acquisition, replace this with Gumroad, Lemon
Squeezy, Stripe Payment Link, Tally, Typeform, or a proper lead form when
account access is available.

The deployed GitHub Pages copy is staged from a public allowlist so private
operating material stays out of the public repo.

## Hard limits

This product does not guarantee Product Hunt ranking or revenue. It creates the
artifact, launch angle, demo, and pricing path that make those outcomes more
plausible and measurable.
