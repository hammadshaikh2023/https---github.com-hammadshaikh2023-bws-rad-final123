<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1k0OShEz5THk0XRu7jLSxPYhqk0PL3xrZ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Vercel + MongoDB setup

1. In Vercel → Project → Settings → Environment Variables add:
   - `MONGODB_URI` = your Atlas connection string
   - `MONGODB_DB` = your database name (e.g., `appdb`)
   Then redeploy.

2. Atlas → Security → Network Access: allow 0.0.0.0/0 (or configure Vercel egress).

3. Test endpoints:
   - POST /api/collection/items  { "name": "hello" }
   - GET  /api/collection/items

## PWA

- Manifest served at `/manifest.json` with icons in `/icons/`.
- Service worker auto-registers on page load and caches app shell for offline.
