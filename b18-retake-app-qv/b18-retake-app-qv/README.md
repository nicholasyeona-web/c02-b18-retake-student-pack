# Makan Trail — Front-End (Student Folder)

This is the folder you work in for the **J620-002-4:2020-C02 Practical
Assessment (B18)**.

## Getting started

1. Make sure the back-end is running first. In a separate terminal:

   ```
   cd b18-retake-api
   npm install
   npm start
   ```

   The API will be available at **http://localhost:5123**.

2. Then, in this folder:

   ```
   npm install
   npm run dev
   ```

   The app will be available at **http://localhost:5173**.

## What you have been given

| File | What it is |
|------|------------|
| `src/main.jsx` | Already set up — do not change it. |
| `src/App.jsx` | The page header, and where the Menu component is shown. |
| `src/components/Menu.jsx` | The menu table with its search, filters, sorting and pagination. |
| `src/utils/api.js` | The function that calls the back-end. |
| `src/index.css` | A minimal reset only. All other styling is yours. |
| `src/App.css` | Empty — write your styles here. |

## How to work through it

Every file contains comments that begin with `INSTRUCTION:`. Each one tells you
what has to be built at that point. Complete every `INSTRUCTION:` block.

The app is a single page, so no routing library is needed.

## Important rules

- **All** searching, filtering, sorting and pagination must be done by the
  back-end. Send the correct query parameters and render what comes back — do
  not fetch everything and then filter or sort the array in the browser.
- Do **not** modify anything inside the `b18-retake-api` folder.
- The full API documentation is in `b18-retake-api/README.md`.
