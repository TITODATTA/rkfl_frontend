import React from 'react';
import * as XLSX from 'xlsx';

const TransactionDownloadButton = () => {
    const data = {
        section80C: [
            {
                "uniqueId": "301062-1696008705077",
                "employeeName": "Supriya Roy Kanungoe",
                "mainSection": "Section 80C",
                "financialyear": "2023",
                "subSectionCode": "2",
                "nameOfAssured": "Supriya Roy Kanungoe",
                "relation": "Self",
                "policyNo": "",
                "investment": "18237",
                "file": [],
                "subSection": "Payment towards Life Insurance Policy",
                "investmentCode": "1",
                "division": "",
                "investmentSchedule": "provisional",
                "employeeCode": 301062,
                "createTimestamp": "29/09/23, 11:01 pm"
            },
            {
                "uniqueId": "301062-1696008740849",
                "employeeName": "Supriya Roy Kanungoe",
                "mainSection": "Section 80C",
                "financialyear": "2023",
                "subSectionCode": "1",
                "nameOfAssured": "Supriya Roy Kanungoe",
                "relation": "Self",
                "policyNo": "",
                "investment": "150000",
                "file": [],
                "subSection": "Contribution to Public Provident Fund",
                "investmentCode": "7",
                "division": "",
                "investmentSchedule": "provisional",
                "employeeCode": 301062,
                "createTimestamp": "29/09/23, 11:02 pm"
            }
        ],
        section80D: [{
            "uniqueId": "301062-1696008740849",
            "employeeName": "Supriya Roy Kanungoe",
            "mainSection": "Section 80C",
            "financialyear": "2023",
            "subSectionCode": "1",
            "nameOfAssured": "Supriya Roy Kanungoe",
            "relation": "Self",
            "policyNo": "",
            "investment": "150000",
            "file": [],
            "subSection": "Contribution to Public Provident Fund",
            "investmentCode": "7",
            "division": "",
            "investmentSchedule": "provisional",
            "employeeCode": 301062,
            "createTimestamp": "29/09/23, 11:02 pm"
        }],
        section10: [],
        section24: [],
        section80CCD: []
    }
    const generateExcel = () => {
        const workbook = XLSX.utils.book_new();

        for (const sectionName in data) {
            const sectionData = data[sectionName];
            if (sectionData.length > 0) {
                const sheetData = sectionData.map((item) => {
                    const { _id, employeeCode, employeeName, financialyear, investment } = item;

                    return { _id, employeeCode, employeeName, financialyear, investment };
                });

                const worksheet = XLSX.utils.json_to_sheet(sheetData);

                XLSX.utils.book_append_sheet(workbook, worksheet, sectionName);
            }
        }

        const filename = 'transaction_data.xlsx';

        XLSX.writeFile(workbook, filename);
    };

    return (
        <div>
            <button onClick={generateExcel}>Download Excel</button>
        </div>
    );
};

export default TransactionDownloadButton;
