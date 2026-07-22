export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXl3P8SeRYzVGO4mSF9pU3_7n6gI_5PrkpSdfN7VfR6MYZaPG28G_xsIcl_gN2cV3F/exec";

export async function submitToGoogleSheet(data: Record<string, string>) {
  if (!GOOGLE_SCRIPT_URL) throw new Error('missing-endpoint')
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: new URLSearchParams(data),
  })
}
