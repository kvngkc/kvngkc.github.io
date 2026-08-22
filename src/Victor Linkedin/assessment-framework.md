# Assessment Framework & Question Inventory

## Objective
Transition the diagnostic tool from evaluating generic "business health" (revenue, cash, stockouts) to evaluating **Business Systems Health** (manual processes, data silos, automation opportunities).

## Existing Question Audit
| ID | Existing Question | Action | Reason |
|----|-------------------|--------|--------|
| `rev1, rev2, rev3` | Revenue bands | **REMOVE** | Irrelevant to systems engineering. Replace with a single qualification question about business stage/size. |
| `fixedExp, varExp, cash` | Expenses & Cash | **REMOVE** | Purely financial. |
| `hasDebt, debtAmount` | Debt tracking | **REMOVE** | Unrelated to operational workflows. |
| `tracking` | How do you track income? | **MODIFY** | Keep, but expand into "How is your core data (sales, inventory, customers) managed?" to diagnose data fragmentation. |
| `invTrack`, `stockouts`, `overstock`, `fulfillTime`, `repeatPct` | Ops (Inventory, Fulfillment) | **MERGE/MODIFY** | Shift focus from *whether* they stock out to *how* they manage the workflow (e.g., "When an order comes in, how many manual steps does it take to fulfill it?"). |
| `staffCount` | Team size | **KEEP** | Excellent for qualifying the complexity of the business and mapping to automation ROI. |
| `rolesDefined`, `turnover`, `trainingDoc`, `ownerDep` | Org Health | **MODIFY** | Focus on *knowledge silos* and *people dependency* ("If your best employee leaves, is their workflow documented in a system or lost?"). |
| `payWritten`, `supplierFails`, `wasteHandling`, `yearsOperating` | Trust/Sustainability | **REMOVE** | Irrelevant for systems engineering. |
| `acqChannel`, `socialActive`, `trackSource`, `marketingSpend`, `followUp` | Marketing | **MODIFY** | Shift to *lead flow automation*. ("When a new lead arrives, how does it get into your system and who follows up?"). |

## Proposed Assessment Pillars

1. **Operations & Workflow (The "Manual Work" Pillar)**
   - *Goal*: Identify repetitive administrative tasks, manual data entry, and broken handoffs.
   - *Sample Questions*: 
     - "How much time does your team spend copying data from one app to another?"
     - "How are approvals handled?" (Email/WhatsApp vs System)
   
2. **Data & Visibility (The "Blindspot" Pillar)**
   - *Goal*: Identify fragmented reporting and lack of a single source of truth.
   - *Sample Questions*:
     - "If you needed a report on your most profitable customer cohort today, how long would it take to generate?" (Instant vs Hours of Excel work).
     
3. **People Dependency (The "Bus Factor" Pillar)**
   - *Goal*: Identify if the business scales through systems or simply by throwing more human effort at the problem.
   - *Sample Questions*:
     - "If your operations manager is sick for a week, what breaks?"

4. **Technology Stack (The "Silo" Pillar)**
   - *Goal*: Diagnose app bloat and lack of integration.
   - *Sample Questions*:
     - "How many different software tools does a customer's data touch from first contact to final delivery?"

## Proposed Question Format
Every question will map specifically to:
- **Scoring Effect**: -N to Systems Health Score.
- **Diagnostic Effect**: Tags the lead with `high_manual_entry`, `data_silo`, or `key_person_risk`.
- **Opportunity Mapping**: Drives the "Smallest Next Step" generation (e.g., if they score high on `data_silo`, the next step is "Consolidate pipeline into a single CRM").
