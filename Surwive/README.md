## Signup popup → Google Sheets

The "Sign up" / "I'm a Candidate" / "I'm an Employer" buttons open a popup form. Submissions are posted to a Google Apps Script web app, which appends a row to a Google Sheet.

1. Create (or open) a Google Sheet.
2. Extensions > Apps Script, delete the placeholder code, and paste in [google-apps-script.js](google-apps-script.js).
3. Deploy > New deployment > type **Web app** > execute as **Me** > who has access **Anyone**. Deploy and copy the resulting URL.
4. Copy `.env.example` to `.env` and set `VITE_GOOGLE_SCRIPT_URL` to that URL.
5. Restart `npm run dev` (Vite only reads `.env` on startup).

Without this configured, the popup still works but shows an inline message telling you the endpoint isn't set up yet.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
