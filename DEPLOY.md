# Deploy — Storefront (Vercel)

Free-tier deploy of the TAAJ Handloom storefront to [Vercel](https://vercel.com) using the
`vercel.json` in this repo. `VITE_*` vars are inlined **at build time**, so set them before
deploying (changing them later requires a redeploy).

## Prerequisite
The **backend must be deployed first** — you need its URL for `VITE_API_URL`.

## 1. Create the project
Vercel → **New Project** → import `NadeemBeg/taaj_handloom-frontend`.
Vercel auto-detects Vite and reads `vercel.json`:
- Build: `npm install && npm run build`
- Output: `dist`
- Rewrite: all routes → `/index.html` (required for client-side routing)

## 2. Environment variables
Project → **Settings → Environment Variables**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://<your-render-url>/api/v1` |
| `VITE_BRAND_NAME` | `TAAJ Handloom` |
| `VITE_WHATSAPP_NUMBER` | `917509724030` |
| `VITE_BEHOLD_FEED_ID` | `<behold feed id>` (optional; blank shows a "Follow us" CTA) |

## 3. Deploy, then wire CORS
Deploy → note the site URL (e.g. `https://taaj-handloom.vercel.app`).
In the **backend** (Render), add this URL to `FRONTEND_URL` and redeploy, or the browser will
block requests (the API only allows listed origins).

> Because `VITE_API_URL` is baked in at build time, changing the API URL means triggering a
> new Vercel build, not just editing the env var.
