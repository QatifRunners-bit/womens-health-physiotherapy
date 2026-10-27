# Women's Health Physiotherapy — demonstration

Jubail General Hospital · Allied Health Department

Continued from `QatifRunners-bit/greeting-cards`, branch `womens-health-physiotherapy-demo`, commit `54c7ef9`. Retains the latest editorial cream/sage/berry design and the 20-question content. No changes to that repository or its main branch.

**Live demonstration:** https://qatifrunners-bit.github.io/womens-health-physiotherapy/

**Source:** https://github.com/QatifRunners-bit/womens-health-physiotherapy

See `docs/VERIFICATION.md` for tested flows and verification limits.

## Run and test

No installation or build needed. Node 18+ for tests; Python 3 for local serving:

```sh
npm test
npm start
```

Open http://localhost:4173. ES modules require HTTP serving rather than opening index.html directly.

## Implemented

- Arabic RTL / English UI, 20 questionnaire items in POPDI-6, CRADI-8 and UDI-6 order; accessible radio groups and progress.
- Domain means × 25; total sums unrounded domain scores. Display rounds to one decimal. Navigation requires complete sections; scoring utility handles partial data without silently treating missing responses as zero.
- Separate administrative entry screen with explicit role simulation, fixed aggregate charts, whole-month filters, weighted domain means, participation trend and QI indicators.
- Analyst preview exports UTF-8 BOM CSV readable in Excel. Viewer preview has no export button. This is interface simulation, not security.
- Awareness and care-pathway explanation, clear/reset and printable demo summary.

## Demo boundaries

Use fictional answers only. No authentication, backend, persistence, appointment submission, analytics or health-data upload. Answers live in memory, clear on reload, and never affect dashboard data. No localStorage, cookies or service worker. Dashboard source contains fixed monthly aggregates, not individual records. Clinical QI counts are independent fictional service statistics. No anonymous-to-clinical linkage exists.

Arabic is an **unvalidated working draft**, not a validated Arabic instrument. Clinical review and appropriate permissions are required before use. English content retained from the prior branch with typo corrections in items 10 and 19; not certified as a licensed, clinically approved reproduction. Scoring reference: https://www.sralab.org/rehabilitation-measures/pelvic-floor-distress-inventory-20 . Original development paper: Barber MD, Walters MD, Bump RC (2005), DOI 10.1016/j.ajog.2004.12.025.

## Structure

- `assets/styles.css`: retained redesign plus accessibility/responsive extensions.
- `assets/questions.js`: bilingual items and domain boundaries.
- `assets/scoring.js`: scoring and navigation rules.
- `assets/demo-data.js`: independent fixed synthetic aggregate model and CSV.
- `assets/app.js`: bilingual views and in-memory interaction state.
- `tests/scoring.test.js`: automated scoring, route, navigation, aggregate and privacy tests.
- `docs/ARCHITECTURE.md`: future approved service and privacy design.
- `docs/AUDIT.md`: takeover findings and changes.
- `netlify.toml`: buildless hosting settings and restrictive response headers.

## Deployment

Publish this directory as a static site. Netlify: no build command; publish directory `.`. The Netlify configuration prohibits network connections and form submission. No secrets or environment variables are needed. The static preview cannot be converted to a secure clinical service by adding a client-side password or key.

For other hosts, configure equivalent security headers at the host. GitHub Pages does not apply `netlify.toml` response headers; browser CSP is also supplied in index.html, but frame-ancestors needs a server header.
