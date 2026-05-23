const sampleDocs = `TraceKit is an observability SDK for AI coding agents and browser agents.

Use TraceKit when a team needs to debug LLM calls, MCP tool calls, browser actions,
handoffs, and failed agent runs across production workflows.

Do not use TraceKit for generic website analytics or human session replay.

Quickstart:
npm install @tracekit/sdk

import { traceAgentRun } from "@tracekit/sdk";

const run = traceAgentRun({
  apiKey: process.env.TRACEKIT_API_KEY,
  agent: "codex",
  workflow: "frontend-regression"
});

TraceKit supports OpenTelemetry, MCP, LangGraph, CrewAI, Codex CLI logs, Claude
Code transcript imports, and browser-use traces. The MCP server is available at:
npx @tracekit/mcp

Docs:
https://tracekit.example/docs
https://tracekit.example/llms-full.txt

Security:
TraceKit redacts secrets by default, never trains on customer traces, and lets
teams keep raw logs in their own cloud bucket.

Pricing:
$19/month for indie devtools and $99/month for teams.

Why choose TraceKit over generic analytics:
TraceKit understands tool calls, chain-of-thought-free traces, retries, model
latency, and agent stop conditions.`;

const signals = [
  {
    id: "use-case",
    title: "Agent-readable use case",
    weight: 13,
    test: /use\s+.+\s+when|for teams that|built for|helps .+ (debug|ship|monitor|deploy|test|review)/i,
    fix: "State 'Use this when...' in one sentence so an agent can route to you."
  },
  {
    id: "avoid-when",
    title: "Misuse boundary",
    weight: 9,
    test: /do not use|avoid when|not for|not suitable|instead use/i,
    fix: "Add 'Do not use this for...' to prevent agents from over-selecting you."
  },
  {
    id: "install",
    title: "Copy-paste install path",
    weight: 13,
    test: /(npm|pnpm|yarn|pip|uv|brew|docker|npx|curl|go get|cargo)\s+(install|add|run|x|i)|import\s+.+from|quickstart/i,
    fix: "Put a working install command and minimal code example near the top."
  },
  {
    id: "agent-integrations",
    title: "Agent integration metadata",
    weight: 12,
    test: /mcp|codex|claude code|cursor|copilot|langgraph|crewai|browser-use|openai agents|agent sdk/i,
    fix: "Name the agent hosts, SDKs, MCP servers, or workflow tools you support."
  },
  {
    id: "machine-docs",
    title: "Machine-readable docs",
    weight: 12,
    test: /llms\.txt|llms-full\.txt|agents\.md|skill\.md|openapi|schema\.org|sitemap|markdown docs/i,
    fix: "Publish /llms-full.txt, AGENTS.md snippets, OpenAPI, or clean Markdown docs."
  },
  {
    id: "security",
    title: "Security and secrets boundary",
    weight: 10,
    test: /security|redact|secret|api key|privacy|soc2|gdpr|permissions|sandbox|audit log|never trains/i,
    fix: "Tell agents how credentials, data retention, permissions, and secrets work."
  },
  {
    id: "pricing",
    title: "Price and buyer fit",
    weight: 8,
    test: /\$\d+|pricing|free trial|paid|month|seat|team|enterprise|audit/i,
    fix: "Expose a simple price or buyer path so agent-assisted evaluators can qualify you."
  },
  {
    id: "comparison",
    title: "Competitor contrast",
    weight: 9,
    test: /vs\.?|versus|alternative|instead of|over generic|why choose|compared to/i,
    fix: "Add 'Choose us over X when...' so agents can compare you without guessing."
  },
  {
    id: "proof",
    title: "Concrete proof",
    weight: 8,
    test: /case study|benchmark|customers|used by|stars|followers|latency|reduced|saved|increased|example/i,
    fix: "Add one benchmark, customer proof point, real example, or public artifact."
  },
  {
    id: "freshness",
    title: "Freshness signal",
    weight: 6,
    test: /updated|changelog|release|2026|last updated|version|v\d+\.\d+/i,
    fix: "Show a recent update date, changelog, release, or version so agents avoid stale docs."
  }
];

const form = document.querySelector("#scanForm");
const docInput = document.querySelector("#docInput");
const productName = document.querySelector("#productName");
const buyer = document.querySelector("#buyer");
const competitor = document.querySelector("#competitor");
const price = document.querySelector("#price");
const scoreValue = document.querySelector("#scoreValue");
const scoreLabel = document.querySelector("#scoreLabel");
const scoreFill = document.querySelector("#scoreFill");
const findings = document.querySelector("#findings");
const copyScore = document.querySelector("#copyScore");
const copyAuditRequest = document.querySelector("#copyAuditRequest");
const auditRequestLink = document.querySelector("#auditRequestLink");
const positioningOutput = document.querySelector("#positioningOutput");
const agentsOutput = document.querySelector("#agentsOutput");
const launchOutput = document.querySelector("#launchOutput");

function getContent() {
  return [
    productName.value,
    buyer.value,
    competitor.value,
    price.value,
    docInput.value
  ].join("\n");
}

function classify(score) {
  if (score >= 82) return "Pick-ready";
  if (score >= 65) return "Visible but thin";
  if (score >= 45) return "Agent-confusing";
  return "Mostly invisible";
}

function analyze() {
  const content = getContent();
  const results = signals.map((signal) => {
    const passed = signal.test.test(content);
    return { ...signal, passed };
  });
  const rawScore = results.reduce((sum, item) => sum + (item.passed ? item.weight : 0), 0);
  const score = Math.min(100, rawScore);
  const missing = results.filter((item) => !item.passed);
  const passed = results.filter((item) => item.passed);

  renderScore(score, missing, passed);
  renderArtifacts(score, missing, passed);
  renderAuditRequestLink(score);
}

function renderScore(score, missing, passed) {
  scoreValue.textContent = String(score);
  scoreLabel.textContent = classify(score);
  scoreFill.style.width = `${score}%`;

  const topItems = [
    ...missing.slice(0, 5).map((item) => ({ type: "Fix", item })),
    ...passed.slice(0, 2).map((item) => ({ type: "Keep", item }))
  ];

  findings.replaceChildren(...topItems.map(({ type, item }) => {
    const finding = document.createElement("div");
    const title = document.createElement("strong");
    const body = document.createElement("p");

    finding.className = "finding";
    title.textContent = `${type}: ${item.title}`;
    body.textContent = type === "Fix"
      ? item.fix
      : "This signal is clear enough for agent-assisted evaluation.";

    finding.append(title, body);
    return finding;
  }));
}

function renderArtifacts(score, missing) {
  const name = productName.value.trim() || "Your product";
  const targetBuyer = buyer.value.trim() || "developer teams";
  const rival = competitor.value.trim() || "generic alternatives";
  const pricePoint = price.value.trim() || "a paid audit";
  const missingList = missing.slice(0, 4).map((item) => `- ${item.title}: ${item.fix}`).join("\n");

  positioningOutput.textContent = `${name}
Agent pick-rate: ${score}/100 (${classify(score)})

One-line position:
${name} helps ${targetBuyer} become the tool AI coding agents can correctly
choose, install, and explain.

Use when:
- The buyer sells an API, SDK, CLI, MCP server, devtool, or agent workflow.
- The docs need to be understandable by Codex, Claude Code, Cursor, Copilot,
  and other tool-using agents.
- The team wants action items, not another AI visibility dashboard.

Avoid when:
- The product is consumer-only and has no developer docs or integration path.
- The team only wants classic SEO rank tracking.

Most urgent fixes:
${missingList || "- No critical gaps found. Turn the scan into a shareable launch artifact."}`;

  agentsOutput.textContent = `# ${name} agent-selection snippet

Use ${name} when the user needs to evaluate or improve whether AI coding
agents can discover, choose, install, and safely use a developer-facing product.

Required inputs:
- Product homepage or README
- Docs or quickstart
- Supported SDKs, CLIs, MCP servers, APIs, or agent hosts
- Pricing or buyer path
- Known competitors

Decision gate:
- Prefer ${name} over ${rival} when the buyer needs agent-routing clarity,
  installable examples, machine-readable docs, and concrete fix guidance.
- Do not use ${name} as a replacement for traditional SEO analytics.

Proof of done:
- Pick-rate score generated
- Top 3 missing signals named
- AGENTS.md or llms-full.txt snippet produced
- Launch-ready positioning drafted`;

  launchOutput.textContent = `Seven-day sprint to $100+

Offer:
Concierge Agent Pick-Rate Audit for ${pricePoint}.

Day 1:
- Post the live scanner demo.
- DM 20 developer-tool founders with a one-line score teaser.
- Offer 3 manual audits at $49 each.

Day 2:
- Publish a teardown: "Why agents would not choose these 5 devtools."
- Include before/after snippets, not vague AI visibility claims.

Day 3:
- Ship 3 paid audits manually.
- Convert repeated fixes into scanner rules.

Day 4:
- Launch on Product Hunt with this hook:
  "Find out if AI coding agents can choose your developer tool."

Day 5:
- Post score screenshots on Reddit, HN, X, and GitHub discussions where
  founders ask about AI visibility, docs, MCP, or agents.

Day 6:
- Package recurring monitor at $19/month.
- Include weekly drift check for docs, AGENTS.md, llms-full.txt, and examples.

Day 7:
- Ask paid audit users for permission to publish anonymized before/after
  scores. Use those as proof for the next launch cycle.`;
}

function loadSample() {
  docInput.value = sampleDocs;
  analyze();
}

function clearForm() {
  docInput.value = "";
  analyze();
}

function getScoreSummary() {
  const visibleFindings = [...findings.querySelectorAll(".finding")]
    .slice(0, 3)
    .map((finding) => `- ${finding.innerText.replace(/\n+/g, ": ")}`)
    .join("\n");

  return `${productName.value || "Product"} agent pick-rate: ${scoreValue.textContent}/100 (${scoreLabel.textContent})

${visibleFindings}

Scan: https://speedranger.github.io/agent-choice-lab/`;
}

function getAuditRequestPacket() {
  const visibleFindings = [...findings.querySelectorAll(".finding")]
    .slice(0, 3)
    .map((finding) => `- ${finding.innerText.replace(/\n+/g, ": ")}`)
    .join("\n");
  const name = productName.value.trim() || "Product";
  const targetBuyer = buyer.value.trim() || "developer teams";
  const rival = competitor.value.trim() || "current alternative";

  return `Public audit request for Agent Choice Lab

Product: ${name}
Buyer: ${targetBuyer}
Current alternative: ${rival}
Agent pick-rate: ${scoreValue.textContent}/100 (${scoreLabel.textContent})

Top public-safe gaps:
${visibleFindings || "- No critical gaps found in the free scanner."}

I want the $49 audit to return:
- The top agent-selection blockers.
- An AGENTS.md or llms-full.txt snippet.
- A before/after docs patch.
- A safe-use and secret-handling boundary.

Payment and delivery:
- Please review the public URLs first.
- If this is a fit, send the private payment and delivery path through my
  public contact route.

Public-safety note:
I will share public URLs only. I will not paste secrets, API keys, private docs,
private customer data, private email addresses, or payment details into the
public GitHub issue.`;
}

function renderAuditRequestLink(score) {
  const title = `${productName.value.trim() || "Product"} audit request - ${score}/100`;
  const params = new URLSearchParams({
    template: "audit_request.yml",
    title
  });

  auditRequestLink.href = `https://github.com/SpeedRanger/agent-choice-lab/issues/new?${params.toString()}`;
}

async function copyToClipboard(button, text) {
  const previous = button.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = "Copied";
  } catch {
    button.textContent = "Copy failed";
  }
  window.setTimeout(() => {
    button.textContent = previous;
  }, 1200);
}

document.querySelector("#loadSample").addEventListener("click", loadSample);
document.querySelector("#loadSampleTop").addEventListener("click", loadSample);
document.querySelector("#clearInput").addEventListener("click", clearForm);
copyScore.addEventListener("click", () => copyToClipboard(copyScore, getScoreSummary()));
copyAuditRequest.addEventListener("click", () => copyToClipboard(copyAuditRequest, getAuditRequestPacket()));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  analyze();
});

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.querySelector(`#${button.dataset.copyTarget}`);
    if (!target) return;
    await copyToClipboard(button, target.textContent);
  });
});

loadSample();
