import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { handleGetAllTransaction } from '../apis/transactionApi';

const generateExcelFile = (data) => {
    // Create a new Excel workbook
    const wb = XLSX.utils.book_new();
    const combinedData = [];

    // Merge data from all sections into a single array
    Object.values(data).forEach((dataArray) => {
        combinedData.push(...dataArray);
    });

    // Create a single sheet with combined data
    const ws = XLSX.utils.json_to_sheet(combinedData);

    // Append the sheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'employee_data');

    // Write the workbook to an array
    const excelData = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Convert the array to a Blob object
    const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link and trigger a download
    saveAs(blob, 'employee_data.xlsx');
};


const ExcelGenerator = () => {
    const [section80C, setSection80C] = useState([])
    const [section80D, setSection80D] = useState([])
    const [section10, setSection10] = useState([])
    const [section24, setSection24] = useState([])
    const [section80CCD, setSection80CCD] = useState([])

    useEffect(() => {
        handleGetAllTransaction(setSection80C, setSection80D, setSection10, setSection24, setSection80CCD)
    }, [])
    // Replace this with the data you receive from the backend
    const data = {
        section80C: section80C,
        section80D: section80D,
        section10: section10,
        section24: section24,
        section80CCD: section80CCD
    };

    return (
        <div>
            <button onClick={() => generateExcelFile(data)}>Generate Excel</button>
        </div>
    );
};

export default ExcelGenerator;
