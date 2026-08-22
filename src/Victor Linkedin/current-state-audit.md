# Current Product & Technical Audit

## A. What Already Works (Preserve)
- **Single-page vanilla JS architecture**: Extremely fast, no bundle size bloat.
- **Progressive Disclosure**: Showing one question at a time reduces cognitive load compared to a massive scrolling form.
- **Conditionals**: The engine natively supports `showIf` conditional branching (e.g., asking about debt repayment only if they have debt).
- **Backend-less Email Delivery**: The Google Apps Script integration is an elegant, zero-cost way to save leads to a sheet and fire off a styled email report.
- **Client-Side Scoring**: Immediate generation of the report structure without waiting for a server round-trip.

## B. What is Broken or Flawed
- **Technical/Architecture**:
  - The business logic (scoring formulas, LLM prompts, email HTML) is entirely hardcoded into the presentation file (`scorecard.html`). This makes it a monolith that is difficult to scale, test, or modify safely.
  - The email template relies on hardcoded inline strings, making it brittle to edit.
- **UX/UI**:
  - The lead capture requires them to input their details *before* taking the quiz. This introduces massive friction and abandonment risk (users want to see the questions first).
  - The results page shows all the data simultaneously on screen. It does not gate the detailed report behind the email capture in an optimized way (it gates the *entire* quiz).

## C. What is Weak Commercially (The Positioning Gaps)
- **Positioning**: The current scorecard is heavily optimized for a general "Small Business Consultant" assessing generic financial health (cash runway, inventory stockouts, debt burden). It does not position the user as a "Systems Engineer" solving workflow bottlenecks.
- **Question Relevance**: Questions about "How do you handle expired stock?" or "How much cash do you have?" are irrelevant to discovering if a business needs *software automation* or *systems integration*.
- **Scoring Outputs**: The current output is a generic Letter Grade (A, B, C) and a 0-100 score. It doesn't diagnose *systems* (e.g., "Manual Data Entry Friction").
- **Next Steps**: The current recommendations link out to generic YouTube videos ("how to manage debt"). It does not naturally route the user to book a consultation for Custom Software or Automation.

## D. What Should NOT Be Changed
- The Google Apps Script deployment model (Option A) for lead capture, as it is zero-cost, highly reliable, and automatically handles email dispatch without needing SendGrid/Mailchimp.
- The step-by-step UX pattern (progress bar, single question view).
- The use of semantic vanilla JS/HTML/CSS for performance, though it should be componentized or separated for maintainability.
