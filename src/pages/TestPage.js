import React, { useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const PDFGenerator = () => {
    const pdfRef = useRef(null);

    const data = {
        message: "Transaction found",
        data: {
            "_id": "651907f7cb545751c3ef80a7",
            "employeeCode": 1929180,
            "section80C": [
                {
                    "uniqueId": "1929180-1696138380412",
                    "employeeName": "SANDEEP C DESAI",
                    "mainSection": "Section 80C",
                    "financialyear": "2023",
                    "subSectionCode": "13",
                    "nameOfAssured": "SANDEEP C DESAI",
                    "relation": "Self",
                    "policyNo": "1231",
                    "investment": "100000",
                    "file": [
                        {
                            "file": "65195678ff974051328c8d83"
                        }
                    ],
                    "subSection": "Repayment of Housing loan",
                    "investmentCode": "14",
                    "division": "",
                    "investmentSchedule": "provisional",
                    "employeeCode": 1929180,
                    "createTimestamp": "01/10/23, 11:03 am",
                    "editTimestamp": "01/10/23, 04:53 pm",
                    "isConverted": true,
                    "conversionTimestamp": "01/10/23, 04:55 pm"
                },
                {
                    "uniqueId": "1929180-1696138648156",
                    "employeeName": "SANDEEP C DESAI",
                    "mainSection": "Section 80C",
                    "financialyear": "2023",
                    "subSectionCode": "2",
                    "nameOfAssured": "SANDEEP C DESAI",
                    "relation": "Self",
                    "policyNo": "1231",
                    "investment": "70000",
                    "file": [
                        {
                            "file": "651956beff974051328c8d86"
                        }
                    ],
                    "subSection": "Payment towards Life Insurance Policy",
                    "investmentCode": "1",
                    "division": "",
                    "investmentSchedule": "provisional",
                    "employeeCode": 1929180,
                    "createTimestamp": "01/10/23, 11:07 am",
                    "editTimestamp": "01/10/23, 04:53 pm",
                    "isConverted": true,
                    "conversionTimestamp": "01/10/23, 04:56 pm"
                },
                {
                    "uniqueId": "1929180-1696159469352",
                    "employeeName": "SANDEEP C DESAI",
                    "mainSection": "Section 80C",
                    "financialyear": "2023",
                    "subSectionCode": "13",
                    "nameOfAssured": "SANDEEP C DESAI",
                    "relation": "Self",
                    "policyNo": "1231",
                    "investment": "100000",
                    "file": [
                        {
                            "file": "65195678ff974051328c8d83"
                        }
                    ],
                    "subSection": "Repayment of Housing loan",
                    "investmentCode": "14",
                    "division": "",
                    "investmentSchedule": "actual",
                    "employeeCode": 1929180,
                    "createTimestamp": "01/10/23, 11:03 am",
                    "editTimestamp": "01/10/23, 04:59 pm",
                    "actualSubmission": true
                },
                {
                    "uniqueId": "1929180-1696159570793",
                    "employeeName": "SANDEEP C DESAI",
                    "mainSection": "Section 80C",
                    "financialyear": "2023",
                    "subSectionCode": "2",
                    "nameOfAssured": "SANDEEP C DESAI",
                    "relation": "Self",
                    "policyNo": "1231",
                    "investment": "70000",
                    "file": [
                        {
                            "file": "651956beff974051328c8d86"
                        }
                    ],
                    "subSection": "Payment towards Life Insurance Policy",
                    "investmentCode": "1",
                    "division": "",
                    "investmentSchedule": "actual",
                    "employeeCode": 1929180,
                    "createTimestamp": "01/10/23, 11:07 am",
                    "editTimestamp": "01/10/23, 04:53 pm",
                    "actualSubmission": true
                }
            ],
            "section80D": [
                {
                    "uniqueId": "1929180-1696140191090",
                    "employeeName": "SANDEEP C DESAI",
                    "mainSection": "Section 80D",
                    "financialyear": "2023",
                    "subSectionCode": "2",
                    "nameOfAssured": "SANDEEP C DESAI",
                    "relation": "Self",
                    "policyNo": "1",
                    "investment": "34000",
                    "file": [
                        {
                            "file": "65195a86ff974051328c8d9b"
                        }
                    ],
                    "subSection": "Medical Insr Premium (Non-Senior Ctz)",
                    "investmentCode": "",
                    "division": "1",
                    "investmentSchedule": "provisional",
                    "employeeCode": 1929180,
                    "createTimestamp": "01/10/23, 11:33 am",
                    "editTimestamp": "01/10/23, 05:09 pm",
                    "isConverted": true,
                    "conversionTimestamp": "01/10/23, 05:10 pm"
                },
                {
                    "uniqueId": "1929180-1696140269170",
                    "employeeName": "SANDEEP C DESAI",
                    "mainSection": "Section 80D",
                    "financialyear": "2023",
                    "subSectionCode": "2",
                    "nameOfAssured": "SANDEEP C DESAI",
                    "relation": "Mother",
                    "policyNo": "123211",
                    "investment": "5000",
                    "file": [
                        {
                            "file": "65195a96ff974051328c8d9d"
                        }
                    ],
                    "subSection": "Preventive Health Check up (Parents)",
                    "investmentCode": "",
                    "division": "6",
                    "investmentSchedule": "provisional",
                    "employeeCode": 1929180,
                    "createTimestamp": "01/10/23, 11:34 am",
                    "editTimestamp": "01/10/23, 05:10 pm",
                    "isConverted": true,
                    "conversionTimestamp": "01/10/23, 05:10 pm"
                },
                {
                    "uniqueId": "1929180-1696160421064",
                    "employeeName": "SANDEEP C DESAI",
                    "mainSection": "Section 80D",
                    "financialyear": "2023",
                    "subSectionCode": "2",
                    "nameOfAssured": "SANDEEP C DESAI",
                    "relation": "Self",
                    "policyNo": "1",
                    "investment": "34000",
                    "file": [
                        {
                            "file": "65195a86ff974051328c8d9b"
                        }
                    ],
                    "subSection": "Medical Insr Premium (Non-Senior Ctz)",
                    "investmentCode": "",
                    "division": "1",
                    "investmentSchedule": "actual",
                    "employeeCode": 1929180,
                    "createTimestamp": "01/10/23, 11:33 am",
                    "editTimestamp": "01/10/23, 05:09 pm",
                    "actualSubmission": true
                },
                {
                    "uniqueId": "1929180-1696160433168",
                    "employeeName": "SANDEEP C DESAI",
                    "mainSection": "Section 80D",
                    "financialyear": "2023",
                    "subSectionCode": "2",
                    "nameOfAssured": "SANDEEP C DESAI",
                    "relation": "Mother",
                    "policyNo": "123211",
                    "investment": "5000",
                    "file": [
                        {
                            "file": "65195a96ff974051328c8d9d"
                        }
                    ],
                    "subSection": "Preventive Health Check up (Parents)",
                    "investmentCode": "",
                    "division": "6",
                    "investmentSchedule": "actual",
                    "employeeCode": 1929180,
                    "createTimestamp": "01/10/23, 11:34 am",
                    "editTimestamp": "01/10/23, 05:10 pm",
                    "actualSubmission": true
                }
            ],
            "section10": [
                {
                    "uniqueId": "1929180-1696146369788",
                    "employeeName": "SANDEEP C DESAI",
                    "mainSection": "Section 10",
                    "financialyear": "2023",
                    "subSectionCode": "13A",
                    "nameOfAssured": "SANDEEP C DESAI",
                    "relation": "Self",
                    "policyNo": "1231",
                    "investment": "15000",
                    "file": [
                        {
                            "file": "65195acfff974051328c8da1"
                        }
                    ],
                    "subSection": "House Rent Allowance",
                    "accommodationType": 1,
                    "cityCategory": "",
                    "pan": "ACIPD6571H",
                    "landLoardName": "Test Name",
                    "landLoardAddress": "Test Address",
                    "investmentSchedule": "provisional",
                    "employeeCode": 1929180,
                    "createTimestamp": "01/10/23, 01:16 pm",
                    "editTimestamp": "01/10/23, 05:11 pm",
                    "isConverted": true,
                    "conversionTimestamp": "01/10/23, 05:14 pm"
                },
                {
                    "uniqueId": "1929180-1696146537453",
                    "employeeName": "SANDEEP C DESAI",
                    "mainSection": "Section 10",
                    "financialyear": "2023",
                    "subSectionCode": "13A",
                    "nameOfAssured": "SANDEEP C DESAI",
                    "relation": "Self",
                    "policyNo": "1232",
                    "investment": "8000",
                    "file": [
                        {
                            "file": "65195ba2ff974051328c8da3"
                        }
                    ],
                    "subSection": "House Rent Allowance",
                    "accommodationType": 1,
                    "cityCategory": "1",
                    "pan": "",
                    "landLoardName": "",
                    "landLoardAddress": "",
                    "investmentSchedule": "provisional",
                    "employeeCode": 1929180,
                    "createTimestamp": "01/10/23, 01:18 pm",
                    "editTimestamp": "01/10/23, 05:14 pm",
                    "isConverted": true,
                    "conversionTimestamp": "01/10/23, 05:14 pm"
                },
                {
                    "uniqueId": "1929180-1696160687768",
                    "employeeName": "SANDEEP C DESAI",
                    "mainSection": "Section 10",
                    "financialyear": "2023",
                    "subSectionCode": "13A",
                    "nameOfAssured": "SANDEEP C DESAI",
                    "relation": "Self",
                    "policyNo": "1231",
                    "investment": "15000",
                    "file": [
                        {
                            "file": "65195acfff974051328c8da1"
                        }
                    ],
                    "subSection": "House Rent Allowance",
                    "accommodationType": 1,
                    "cityCategory": "",
                    "pan": "ACIPD6571H",
                    "landLoardName": "Test Name",
                    "landLoardAddress": "Test Address",
                    "investmentSchedule": "actual",
                    "employeeCode": 1929180,
                    "createTimestamp": "01/10/23, 01:16 pm",
                    "editTimestamp": "01/10/23, 05:11 pm",
                    "actualSubmission": true
                },
                {
                    "uniqueId": "1929180-1696160689624",
                    "employeeName": "SANDEEP C DESAI",
                    "mainSection": "Section 10",
                    "financialyear": "2023",
                    "subSectionCode": "13A",
                    "nameOfAssured": "SANDEEP C DESAI",
                    "relation": "Self",
                    "policyNo": "1232",
                    "investment": "8000",
                    "file": [
                        {
                            "file": "65195ba2ff974051328c8da3"
                        }
                    ],
                    "subSection": "House Rent Allowance",
                    "accommodationType": 1,
                    "cityCategory": "1",
                    "pan": "",
                    "landLoardName": "",
                    "landLoardAddress": "",
                    "investmentSchedule": "actual",
                    "employeeCode": 1929180,
                    "createTimestamp": "01/10/23, 01:18 pm",
                    "editTimestamp": "01/10/23, 05:14 pm",
                    "actualSubmission": true
                }
            ],
            "section24": [
                {
                    "uniqueId": "1929180-1696150736912",
                    "employeeName": "SANDEEP C DESAI",
                    "mainSection": "Section 24",
                    "financialyear": "2023",
                    "subSectionCode": "B",
                    "nameOfAssured": "SANDEEP C DESAI",
                    "relation": "Self",
                    "policyNo": "123221",
                    "investment": "90000",
                    "file": [
                        {
                            "file": "65195bd9ff974051328c8da6"
                        }
                    ],
                    "propertyType": "1",
                    "eligible80EEA": "",
                    "possession": "",
                    "subSection": "Home loan interest Exemption (a deduction of Rs 2 lakh is allowed for self-occupied property)",
                    "pan": "Test Bank Pan",
                    "landLoardName": "Test Bank Name",
                    "landLoardAddress": "Test Bank Address",
                    "investmentSchedule": "provisional",
                    "employeeCode": 1929180,
                    "createTimestamp": "01/10/23, 02:28 pm",
                    "editTimestamp": "01/10/23, 05:15 pm",
                    "isConverted": true,
                    "conversionTimestamp": "01/10/23, 05:15 pm"
                },
                {
                    "uniqueId": "1929180-1696160736816",
                    "employeeName": "SANDEEP C DESAI",
                    "mainSection": "Section 24",
                    "financialyear": "2023",
                    "subSectionCode": "B",
                    "nameOfAssured": "SANDEEP C DESAI",
                    "relation": "Self",
                    "policyNo": "123221",
                    "investment": "90000",
                    "file": [
                        {
                            "file": "65195bd9ff974051328c8da6"
                        }
                    ],
                    "propertyType": "1",
                    "eligible80EEA": "",
                    "possession": "",
                    "subSection": "Home loan interest Exemption (a deduction of Rs 2 lakh is allowed for self-occupied property)",
                    "pan": "Test Bank Pan",
                    "landLoardName": "Test Bank Name",
                    "landLoardAddress": "Test Bank Address",
                    "investmentSchedule": "actual",
                    "employeeCode": 1929180,
                    "createTimestamp": "01/10/23, 02:28 pm",
                    "editTimestamp": "01/10/23, 05:15 pm",
                    "actualSubmission": true
                }
            ],
            "section80CCD": [],
            "finalActualSubmission": false,
            "plant": "HO",
            "__v": 6
        }
    }

    useEffect(() => {
        const generatePDF = () => {
            const doc = new jsPDF();

            // Iterate through different sections (e.g., Section 80C, Section 10)
            for (const section in data) {
                if (Array.isArray(data[section])) {
                    doc.text(`Section ${section}`, 10, 10); // Section header

                    const sectionData = data[data][section];

                    // Extract table headers from the first item in the section
                    const headers = Object.keys(sectionData[0]);

                    // Extract table data from the section
                    const tableData = sectionData.map((item) => Object.values(item));

                    // Generate the table
                    doc.autoTable({
                        head: [headers],
                        body: tableData,
                        startY: 20,
                        theme: 'grid',
                        margin: { top: 15 },
                    });

                    doc.addPage(); // Add a new page for the next section
                }
            }

            // Save or download the PDF
            doc.save('sample.pdf');
        };

        generatePDF();
    }, []);

    return (
        <div>
            <div ref={pdfRef}></div>
        </div>
    );
};

export default PDFGenerator;
