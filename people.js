const peoples = require("./peoples.json");
const xlsx = require("xlsx");

const NAME_COLUMN_INDEX = 0;
const EMAIL_COLUMN_INDEX = 2;
const EXCEL_FIRST_ROW = 1;
// Load your Excel file
const workbook = xlsx.readFile("./referrals.xlsx"); // Path for the sheet in your local folder
const sheetName = "references"; // Change to the name of your sheet
const worksheet = workbook.Sheets[sheetName];
// Convert the sheet to JSON to manipulate rows easily
const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 }); // header: 1 for array of arrays

// Update specific column for multiple rows
const columnToUpdate = NAME_COLUMN_INDEX; // Column index (e.g., 2 for the third column, as it's 0-based)
// Update rows
let index = EXCEL_FIRST_ROW;
peoples.forEach((user) => {
  if (user && user.name) {
    if (jsonData[index]) {
      jsonData[index][columnToUpdate] = user.name;
      jsonData[index][EMAIL_COLUMN_INDEX] = user.email;
    }
    else {
      jsonData[index] = [null,null,null,null,null,null];
      jsonData[index][columnToUpdate] = user.name;
      jsonData[index][EMAIL_COLUMN_INDEX] = user.email;
    }
    index++;
  }
});

// Convert JSON back to sheet
const updatedWorksheet = xlsx.utils.aoa_to_sheet(jsonData);

// Replace the sheet in the workbook
workbook.Sheets[sheetName] = updatedWorksheet;

// Save the updated file
xlsx.writeFile(workbook, 'referrals.xlsx'); // Replace with desired output path
