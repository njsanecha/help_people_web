import Papa from "papaparse";
import { insertUser } from "../api/Server";
import { useState } from "react";
import { BsFiletypeCsv } from "react-icons/bs";

export default function UploadUsers() {
  const [csvFile, setCsvFile] = useState(null);

  const handleCsvUpload = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleBulkUpload = () => {
    if (!csvFile) {
      alert("Please select a CSV file first.");
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const users = results.data;

        let successCount = 0;
        let failCount = 0;

        for (const [index, user] of users.entries()) {
          try {
            // Basic validation
            if (!user.username || !user.email || !user.password) {
              console.warn(`Skipped row ${index + 2}: Missing fields.`);
              failCount++;
              continue;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(user.email)) {
              console.warn(`Skipped row ${index + 2}: Invalid email.`);
              failCount++;
              continue;
            }

            await insertUser(user);
            successCount++;
          } catch (err) {
            console.error(`Error inserting user at row ${index + 2}:`, err.response?.data || err.message);
            failCount++;
          }
        }

        alert(`Upload complete: ${successCount} users added, ${failCount} failed.`);
      },
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <BsFiletypeCsv className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Upload massive users
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-2">
          <label htmlFor="csv-upload" className="block text-sm font-medium text-gray-900">
            Upload CSV (username, email, password)
          </label>
          <div className="mt-5">
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvUpload}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleBulkUpload}
            className="mt-5 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Upload users from CSV
          </button>
        </div>
      </div>
    </div>
  );
}