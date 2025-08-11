Editable Website — VoltCut (Video Editing Agency)
====================================================

Structure
---------
- index.html — Single-page site using Tailwind CDN. Edit text colors in the <script> tailwind.config.
- scripts/app.js — ALL editable content (work, services, process, testimonials, pricing) is in the JSON
  inside index.html (script#site-data). Update video URLs, posters, copy, and prices there.

How to Edit
-----------
1) Open index.html and find:
   <script id="site-data" type="application/json"> ... </script>
   Update fields. Save. Refresh.
2) Replace demo video URLs with your own (MP4/WebM recommended). Posters use Unsplash placeholders.
3) Wire the contact form to your backend (Netlify Forms, Formspree, or custom).

Hosting
-------
- Drag/drop the folder into Netlify, Vercel (as static), or host on any static server.
- No build step required.

Notes
-----
- Videos are muted autoplay on hover (desktop) and tap-to-preview. Full preview opens in a modal.
- This is an original implementation inspired by modern "Agero" style but not a copy.
- License: MIT. Use commercially and modify freely.

© 2025 VoltCut
