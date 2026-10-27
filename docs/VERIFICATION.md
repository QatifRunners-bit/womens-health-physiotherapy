# Current release verification — 27 October 2026

Patient experience redesigned with self-hosted IBM Plex Sans Arabic, single-question navigation and two-stage presence/bother responses. Questionnaire content and scoring retained.

- 13 automated tests passed, including public build allowlist verification: dashboard scripts, synthetic data and admin-preview.html absent from dist.
- Desktop: new Arabic survey rendered; incomplete response blocked; Yes required a bother response; Previous preserved selected response.
- Mobile 390 × 844: document width 390; one fieldset at a time, no horizontal overflow. Completed all 20 questions with No and observed 0.0 / 300 and 0.0 for each domain.
- No captured browser warnings or errors in those flows.
- Staff preview remains local and synthetic. Public admin.html is a locked informational page; no actual auth or backend exists.
- Answers do not transmit or populate the dashboard. Secure cross-device collection awaits an approved backend.

Public deployment verification is completed after pushing this release. Earlier verification below applies to the previous multi-question UI only.

---

# Verification — 27 October 2026

## Automated

Node built-in test runner: **10 passed, 0 failed**. Covers question/domain integrity, minimum and maximum score, independent domain denominators, unrounded total, partial/missing data, invalid values, incomplete section blocking, final navigation, preview route gate, weighted aggregates/date filtering, questionnaire/dashboard isolation, and aggregate CSV contents.

GitHub Actions runs the same tests on pushes and pull requests. Consult the repository Actions tab for the current remote result; local results are not evidence of remote CI success.

## Browser checks performed

- Desktop Arabic home rendered with the retained redesign.
- English questionnaire: next blocked until all section questions answered; completed all three sections with response 4 and observed 300.0 / 300.
- After completing questionnaire, dashboard still showed 124 fixed synthetic screenings.
- Viewer preview had zero export buttons.
- Analyst preview exposed CSV export; October filter showed 46 screenings, 67.4% symptoms, 47.4 mean total, 23.0% participation and matching October QI figures.
- Mobile viewport 390 × 844: dashboard document width 390; no horizontal overflow.
- Live GitHub Pages deployment loaded in Chrome. Arabic survey rendered six first-domain fields, viewport/document width both 390; switching to English preserved the selected first response. Desktop viewport restored after testing.
- No captured browser warnings/errors during the tested flows.

## Limits

CSV generation and contents are automated-tested. The browser download-event check stalled in the browser automation layer; a completed user-facing CSV file download was **not verified**. No claim of a successful browser download is made. Printing was implemented but print/PDF output was not visually tested. These checks are not a formal accessibility or cross-browser certification. Mobile testing used a browser viewport, not a physical phone.

## Deployment

Repository: https://github.com/QatifRunners-bit/womens-health-physiotherapy

Live: https://qatifrunners-bit.github.io/womens-health-physiotherapy/

GitHub Pages reported `built` for the initial application commit `4757571`. The actual live page was visited and interacted with. Netlify was not connected (login page); user approved GitHub Pages fallback. `netlify.toml` remains ready for later Netlify deployment but its server headers do not apply on GitHub Pages. Meta CSP restricts outbound connections and forms on both hosts.

Real authentication, server RBAC, storage and clinical workflow were neither enabled nor tested. They are future architecture only. The original repository and its branches were not changed.
