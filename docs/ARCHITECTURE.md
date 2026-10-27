# Future hospital-approved architecture — specification, not deployed infrastructure

## Identity and authorization

Hospital SSO via OIDC with PKCE, MFA under hospital identity policy, server session with Secure/HttpOnly/SameSite cookies, short session lifetime, revocation and audit logs. The browser never receives privileged database credentials. Every aggregate endpoint validates identity, expiry, tenant, role and requested reporting period server-side. Deny by default.

| Role | Permitted server operation |
| --- | --- |
| Viewer | Approved aggregate dashboard only |
| QI analyst | Same aggregates and approved aggregate export |
| Clinical practitioner | Separate confidential clinical application; no anonymous screening lookup |
| Identity administrator | Role provisioning and review; no default clinical-data access |

Prototype role selection is public simulation and enforces no actual access control. No authentication connector is configured or tested.

## Anonymous screening service

Approved collection endpoint with explicit information/consent flow, rate limits and schema validation. Do not collect names, employee IDs, phone numbers or email. Minimize access logs, device/network identifiers and timestamps. Agree retention, deletion and duplicate-counting policy with hospital privacy leads before collecting anything. Avoid fingerprinting or covert identifiers. In a real anonymous survey, unique employee participation cannot be asserted without an approved counting methodology.

Store screening answers in a restricted encrypted database inaccessible to dashboard clients. Compute aggregates in trusted server jobs/views. Aggregates use completed eligible responses as denominators. Enforce minimum cohort sizes and complementary suppression, including differencing attacks across filters, repeated queries and exports. Threshold must be approved; a simple client-side `n < 5` rule is insufficient. Export authorization, suppression and audit happen on the server. No raw-response export endpoint for dashboard roles.

Suggested contract: `GET /api/aggregates?from=YYYY-MM&to=YYYY-MM` returns counts, denominators, means, suppression flags and reporting metadata only. `GET /api/exports/aggregates` requires analyst role and the same privacy policy. Never return row-level answers, identifiers or session IDs.

## Separate clinical follow-up

Assessment requests belong in the approved EHR/clinical referral system with separate consent, identity, roles, storage, retention and audit. No shared screening identifier, foreign key or request payload containing survey answers. Clinicians may administer a separately consented outcome instrument inside the clinical record. Only approved de-identified clinical aggregates flow to QI reporting. Pre/post comparisons use matched clinical cohorts and record paired denominator, timing, loss to follow-up and missingness.

## QI definitions in demo

- Participation: completed screenings / 200 fictional eligible employees; months assumed unique within one fixed cohort. Not deployable as a real anonymous unique-person metric without governance.
- Any symptom: at least one present symptom, including present but not bothersome; count / completed responses. Not disease prevalence.
- Domain mean: monthly mean weighted by completed screenings.
- Awareness: completed event count, not unique attendee reach.
- Assessment requests and treatment completions: independent period counts, not a shared-cohort conversion rate.
- Outcomes: weighted matched-case pre/post PFDI-20 means; reduction = pre minus post, in points. Not a causal treatment-effect estimate.

## Production gates

Hospital clinical approval; licensed instrument/validated Arabic version; scoring and accessibility review; approved hosting, residency and privacy assessment; threat model and penetration testing; SSO and server authorization tests; suppression/differencing tests; recovery, monitoring, retention and incident response; consent and operational ownership. None of these are claimed complete by this static demo.
