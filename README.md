# Women's Health Physiotherapy — demonstration

Jubail General Hospital · Allied Health Department

**Patient survey:** https://qatifrunners-bit.github.io/womens-health-physiotherapy/

**Source:** https://github.com/QatifRunners-bit/womens-health-physiotherapy

Continued from `QatifRunners-bit/greeting-cards`, branch `womens-health-physiotherapy-demo`, commit `54c7ef9`. Preserves its question content, scoring and calm healthcare identity. That repository and its main branch remain unchanged.

## Current patient experience

Arabic RTL and English, self-hosted IBM Plex Sans Arabic (OFL license included), generous spacing, one question at a time. Participants first select whether the symptom is present. Only a Yes reveals the four bother options. No = 0; present = 1–4. Previous answers survive navigation and language switching. Scoring remains domain mean × 25 and sum of the three unrounded domain scores.

The share link opens the questionnaire directly. There is no home/dashboard/awareness/booking navigation. Awareness and booking are deferred per the latest user direction. Results remain in page memory only and clear on reload. The completion screen explicitly states that answers have not been saved, sent or added to the dashboard.

## Run, build and test

No dependencies or installation. Node 18+ and Python 3:

```sh
npm test
npm run build
npm start
```

- Patient preview: http://localhost:4173/
- Local synthetic administrative preview: http://localhost:4173/admin-preview.html
- Exact public build preview: http://localhost:4173/dist/

13 automated tests cover scoring, navigation, presence/bother behavior and public-build separation. Browser tests and limitations are recorded in `docs/VERIFICATION.md`.

## Administrative separation

`assets/admin-app.js`, `assets/demo-data.js` and `admin-preview.html` remain available locally for the team's synthetic dashboard demonstration. They are **excluded from the published artifact** by an explicit allowlist in `scripts/build-public.js`. The public `admin.html` is a locked information page only: no dashboard code, data, password form or authentication claim.

This is deployment separation, not implemented hospital SSO. The repository itself is public and contains only fictional sample data. There is no confidential information in it. A future real administrative service needs server-side authentication, roles and approved data storage, as specified in `docs/ARCHITECTURE.md`. Do not expose real data by adding a client-side password or a hidden URL.

## Privacy and clinical limits

DEMO ONLY. Use fictional answers. No collection, cookies, analytics, localStorage, appointment submission, API connection or persistent health-data storage. Patient responses never enter the fixed synthetic administrative aggregates. A secure approved backend is required before cross-device results can appear in a protected dashboard; that integration is not active.

Arabic is an **unvalidated working draft**, not a validated Arabic instrument. Specialist review and appropriate instrument permissions remain required before clinical use. English content retained from the prior branch with typo corrections in items 10 and 19; no claim of certified clinical approval. Scoring reference: https://www.sralab.org/rehabilitation-measures/pelvic-floor-distress-inventory-20 . Original development paper: Barber MD, Walters MD, Bump RC (2005), DOI 10.1016/j.ajog.2004.12.025.

## Structure

- `assets/patient.js`, `patient.css`, `patient-state.js`: patient UI, typography and state transitions.
- `assets/questions.js`, `scoring.js`: shared questionnaire and scoring logic.
- `assets/fonts/`: self-hosted Arabic fonts and OFL license; no external font requests.
- `assets/admin-app.js`, `demo-data.js`, `styles.css`: local-only synthetic admin prototype.
- `scripts/build-public.js`: explicit public artifact allowlist.
- `.github/workflows/pages.yml`: test, build and publish only `dist` to GitHub Pages.
- `netlify.toml`: optional future Netlify deployment, build `npm run build`, publish `dist`.
- `docs/`: architecture, source audit and verification record.

## Hosting

GitHub Pages uses Actions deployment of `dist`, never repository-root publication. Keep that setting: publishing the repository root would expose the administrative prototype again. Netlify likewise publishes `dist` only. The meta CSP prohibits outbound connections and form submission. GitHub Pages does not apply the additional response headers in `netlify.toml`.
