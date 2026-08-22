# Scoring & Diagnosis Architecture

## 1. Output Metrics
The engine will calculate:
- **Overall Business Systems Score (0-100)**: A composite indicator of operational maturity.
- **Pillar Scores (0-100)**:
  - Operations & Workflow
  - Data & Decision-Making
  - People & Process Dependency
  - Technology & Systems
- **Operational Friction Index (High/Med/Low)**: Based on specific triggers (e.g., "We manually copy/paste data every day" triggers High Friction).

## 2. Diagnosis Engine
Instead of mapping raw scores to a simple letter grade (A, B, C), the score will map to a **Systems Archetype** (e.g., *Operationally Functional, Systemically Fragile*).

The diagnostic paragraph will be built deterministically:
1. Base state based on overall score.
2. Injection of the lowest pillar ("The biggest risk is how information moves between your apps").
3. Identification of the primary symptom ("Your business appears to rely on people to act as the integration layer...").

## 3. Service Routing Engine
Each answer will carry weight towards a specific intervention.

**Automation Routing (Threshold > X):**
- Triggers: High volume of manual data entry, repetitive follow-ups, predictable rules.
- Service Pitch: "You don't need a massive new app. You need an automated workflow that connects what you already have."

**Custom Software Routing (Threshold > Y):**
- Triggers: Spreadsheets breaking under load, multiple overlapping SaaS tools, unique workflows that don't fit off-the-shelf software.
- Service Pitch: "SaaS tools are creating workarounds. It's time for a unified internal system designed exactly for how you operate."

**Business Analysis Routing:**
- Triggers: Process is undocumented, owner doesn't know where the bottleneck is.
- Service Pitch: "Before writing any code, we need to map your actual workflows and find the hidden leaks."

## 4. Smallest Next Step Generation
Calculated based on the absolute lowest-scoring question in the assessment.
Example: If the lowest score was on "Lead Capture Data", the generated next step is:
**"Consolidate your sales pipeline into one source of truth before attempting to automate follow-ups."**
