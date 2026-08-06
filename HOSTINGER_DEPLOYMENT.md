# Hostinger deployment

Connect Hostinger to the `main` branch of this GitHub repository and use:

- Framework: Vite / React
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: 20

The production API is configured through `VITE_API_URL`. In Hostinger, set it
to `https://api.paradiseems.co.in/api` before running the build.

The generated `dist/.htaccess` sets the correct JavaScript and CSS MIME types
and provides an Apache fallback for client-side routes. The app uses hash-based
routing as an additional safeguard on static hosting.
