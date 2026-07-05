// Paste this into a Google Sheet's Extensions > Apps Script editor, then
// Deploy > New deployment > type "Web app", execute as "Me", access "Anyone".
// Copy the deployment URL into Surwive/.env as VITE_GOOGLE_SCRIPT_URL.

const SHEET_NAME = 'Signups'

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME)

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Submitted at', 'Role', 'Name', 'Email', 'Phone',
      'Job title', 'Experience level', 'Years of experience',
      'Company name', 'Job position', 'Open positions',
    ])
  }

  const {
    name, email, phone, role, submittedAt,
    jobTitle, experienceLevel, yearsOfExperience,
    companyName, jobPosition, openPositions,
  } = e.parameter
  sheet.appendRow([
    submittedAt || new Date(), role, name, email, phone,
    jobTitle, experienceLevel, yearsOfExperience,
    companyName, jobPosition, openPositions,
  ])

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON)
}
