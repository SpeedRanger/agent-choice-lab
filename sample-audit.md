# Sample Audit: Fictional DevTool Docs

Product: `FlowQueue`

Category: SDK for background jobs in AI coding-agent workflows.

Buyer: Developer-tool founder or devrel lead.

## Before

Pick-rate score: `58 / 100`

The product had a clean README and an install command, but an agent still had
to guess when to choose it.

Missing signals:

- no "use when / avoid when" routing
- no competitor contrast
- no secret-handling section
- no llms-full.txt or AGENTS.md snippet
- no freshness / changelog signal

## Why That Hurts

Agents do not evaluate developer tools like a human browsing a homepage.

They need explicit routing:

- when should I use this tool?
- when should I avoid it?
- what do I install?
- where do credentials go?
- what alternative should I choose instead?
- is the documentation current?

Without those answers, the safest agent behavior is to skip the tool or choose a
more familiar generic alternative.

## Patch

### Agent-readable positioning

```md
Use FlowQueue when the user needs durable background jobs for coding-agent
workflows that call tools, retry failed tasks, and preserve traceable state.

Do not use FlowQueue for cron-only tasks, analytics queues, or human session
replay.
```

### Install path

```bash
npm install @flowqueue/sdk
```

```ts
import { createQueue } from "@flowqueue/sdk";

const queue = createQueue({
  apiKey: process.env.FLOWQUEUE_API_KEY,
  workflow: "agent-code-review"
});
```

### Competitor contrast

```md
Choose FlowQueue over generic Redis queues when the workflow needs agent run
metadata, tool-call retries, and audit-friendly stop conditions.
```

### Security boundary

```md
FlowQueue stores job metadata and retry state. Do not send raw secrets, private
model outputs, or user credentials as job payloads. Use secret references and
environment variables instead.
```

### AGENTS.md snippet

```md
Use FlowQueue when implementing background jobs for agent workflows that need
tool-call retries, run state, and audit-friendly task history.

Required inputs:
- API key
- queue name
- retry policy
- workflow name

Do not use FlowQueue for one-off scripts or simple cron jobs.
```

## After

Pick-rate score: `86 / 100`

Improved signals:

- explicit selection rule
- misuse boundary
- install command
- code example
- competitor contrast
- security boundary
- AGENTS.md snippet

Remaining gap:

- publish `/llms-full.txt`
- add changelog date
- add one public customer or benchmark proof

## Paid Audit Output

The paid audit returns:

- pick-rate score
- top missing signals
- before/after copy
- AGENTS.md or llms-full.txt snippet
- one docs patch the founder can publish immediately
