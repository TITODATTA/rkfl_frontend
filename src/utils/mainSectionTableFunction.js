import axios from 'axios'
import { url } from './constants';
import * as XLSX from 'xlsx';

export const shouldDisplaySubmitButton = (rows, array80C, array80D, array10, array24, array80CCD) => {
    if (array80C.length === 0 && array80D.length === 0 && array10.length === 0 && array24.length === 0 && array80CCD.length === 0) {
        return false; // Hide the button
    }
    else {
        return true; // Hide the button
    }
};

export const handleAddRow = (setRows, rows, setAddState) => {
    setRows([...rows, {}]);
    setAddState(true)
};

export const handleDeleteRow = (index, rows, setRows, setSubSectionValue, setAddState, fileList, setFileList) => {
    if (fileList.length !== 0) {
        fileList.forEach((file) => {
            axios.delete(`${url}/file/${file.file}`)
                .then((res) => {
                    setFileList([])
                })  // Handle further actions as needed
                .catch((error) => {
                    alert(error.response.data.error)
                })
        })
    }
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
    setSubSectionValue("");
    setAddState(false);
};

export const handleDropdownChange = (e, setSubSectionValue) => {
    setSubSectionValue(e.target.options[e.target.selectedIndex].getAttribute("data-subSectionCode"))
};
export const handleDeleteRow2 =
    (index, mainSection, array80C, setArray80C, array80D,
        setArray80D, array10, setArray10, array24, setArray24, array80CCD, setArray80CCD) => {
        if (array80C.length + array80D.length + array10.length + array24.length + array80CCD.length === 1) {
            alert("Error You cannot delete all your data after submission. Either you can edit ,add a new one and delete that,or make the investment amoun t to 0")
            return;
        }
        else {
            if (mainSection === "Section 80C") {
                if (array80C[index].file.length !== 0) {
                    array80C[index].file.forEach((file) => {
                        axios.delete(`${url}/file/${file.file}`)
                            .then((res) => {
                                console.log("Files deleted")
                            })  // Handle further actions as needed
                            .catch((error) => {
                                alert(error.response.data.error)
                            })
                    })
                }
                const updatedArray = array80C.filter((_, rowIndex) => rowIndex !== index);
                setArray80C(updatedArray);
            }
            else if (mainSection === "Section 80D") {
                if (array80D[index].file.length !== 0) {
                    array80D[index].file.forEach((file) => {
                        axios.delete(`${url}/file/${file.file}`)
                            .then((res) => {
                                console.log("Files deleted")
                            })  // Handle further actions as needed
                            .catch((error) => {
                                alert(error.response.data.error)
                            })
                    })
                }
                const updatedArray = array80D.filter((_, rowIndex) => rowIndex !== index);
                setArray80D(updatedArray);
            }
            else if (mainSection === "Section 10") {
                if (array10[index].file.length !== 0) {
                    array10[index].file.forEach((file) => {
                        axios.delete(`${url}/file/${file.file}`)
                            .then((res) => {
                                console.log("Files deleted")
                            })  // Handle further actions as needed
                            .catch((error) => {
                                alert(error.response.data.error)
                            })
                    })
                }
                const updatedArray = array10.filter((_, rowIndex) => rowIndex !== index);
                setArray10(updatedArray);
            }
            else if (mainSection === "Section 24") {
                if (array24[index].file.length !== 0) {
                    array24[index].file.forEach((file) => {
                        axios.delete(`${url}/file/${file.file}`)
                            .then((res) => {
                                console.log("Files deleted")
                            })  // Handle further actions as needed
                            .catch((error) => {
                                alert(error.response.data.error)
                            })
                    })
                }
                const updatedArray = array24.filter((_, rowIndex) => rowIndex !== index);
                setArray24(updatedArray);
            }
            else {
                if (array80CCD[index].file.length !== 0) {
                    array80CCD[index].file.forEach((file) => {
                        axios.delete(`${url}/file/${file.file}`)
                            .then((res) => {
                                console.log("Files deleted")
                            })  // Handle further actions as needed
                            .catch((error) => {
                                alert(error.response.data.error)
                            })
                    })
                }
                const updatedArray = array80CCD.filter((_, rowIndex) => rowIndex !== index);
                setArray80CCD(updatedArray);
            }
        }


    };

export const handleFileUpload = async (index, file, rows, setRows) => {
    const updatedRows = [...rows];
    if (file) {
        const fileName = file.name;
        const fileLink = URL.createObjectURL(file);
        updatedRows[index].fileName = fileName;
        updatedRows[index].fileLink = fileLink;
    } else {
        updatedRows[index].fileName = "";
        updatedRows[index].fileLink = "";
    }
    setRows(updatedRows);
};

export const handleFileChange = (index, rows, setRows) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx";
    input.addEventListener("change", (e) => {
        handleFileUpload(index, e.target.files[0], rows, setRows);
    });
    input.click();
};
const checkInvestmentType = (array, year) => {
    return array.some((obj) => obj.investmentSchedule === "actual" && obj.financialyear === year && !obj.actualSubmission);
};
const checkInvestmentType2 = (array, year) => {
    return array.some((obj) => obj.investmentSchedule === "provisional" && obj.financialyear === year);
};

export const handleOpenReviewModal = (
    selectedOption,
    array80C,
    array80D,
    array10,
    array24,
    array80CCD,
    year,
    setReviewModal,
    setError,
    setErrorMessage) => {
    if (selectedOption === "actual") {
        if (checkInvestmentType(array80C, year) ||
            checkInvestmentType(array80D, year) ||
            checkInvestmentType(array10, year) ||
            checkInvestmentType(array24, year) ||
            checkInvestmentType(array80CCD, year)
        ) {
            setReviewModal(true)
        }
        else {
            setError(true)
            setErrorMessage("Error : You have No Actual Data to Submit")
        }
    }
    else {
        if (checkInvestmentType2(array80C, year) ||
            checkInvestmentType2(array80D, year) ||
            checkInvestmentType2(array10, year) ||
            checkInvestmentType2(array24, year) ||
            checkInvestmentType2(array80CCD, year)
        ) {
            setReviewModal(true)
        }
        else {
            setError(true)
            setErrorMessage("Error : You have No Provisional Data to Submit")
        }
    }
};

export const handleCloseReviewModal = (setReviewModal) => setReviewModal(false);

export const handleOpenEditModal = (index, setEditIndex, setEditModal) => {
    setEditIndex(index)
    setEditModal(true)
}

export const handleSaveData =
    (subSectionValue,
        rows,
        selectedOption,
        setError,
        setErrorMessage,
        mainSection,
        setArray80C,
        setArray80D,
        setArray10,
        setArray24,
        setArray80CCD,
        setRows,
        setAddState,
        setSubSectionValue,
        alphanumericPattern,
        fileList,
        setFileList, openyear) => {
        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        const savedData = [];
        const empCode = JSON.parse(sessionStorage.getItem("userData"))
        const currentDateMillis = Date.now();
        if (subSectionValue === "13A") {
            rows.forEach((row, index) => {
                const rowData = {
                    uniqueId: `${empCode.employeeCode}-${currentDateMillis}`,
                    employeeName: empCode.employeeName,
                    mainSection: mainSection,
                    financialyear: openyear,
                    subSectionCode: row.subSectionValue || "",
                    nameOfAssured: row.nameOfAssured || "",
                    relation: row.relation || "",
                    policyNo: row.policyNo || "",
                    investment: row.investment || "",
                    file: fileList || [],
                    subSection: row.subSection,
                    accommodationType: 1,
                    cityCategory: row.cityCategory || "",
                    pan: row.pan || "",
                    landLoardName: row.landLoardName || "",
                    landLoardAddress: row.landLoardAddress || "",
                    investmentSchedule: selectedOption,
                    employeeCode: empCode.employeeCode,
                    createTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                };
                if (selectedOption === "provisional") {
                    if (rowData.subSection.length === 0) {
                        setError(true)
                        setErrorMessage("Sub Section Cannot be empty");
                        return;
                    }
                    else if (rowData.nameOfAssured.length === 0) {
                        setError(true)
                        setErrorMessage("Name of Assured Cannot be empty");
                        return;
                    }
                    else if (rowData.relation.length === 0) {
                        setError(true)
                        setErrorMessage("Relation Cannot be empty");
                        return;
                    }
                    else if (rowData.investment.length === 0) {
                        setError(true)
                        setErrorMessage("Investment Cannot be empty");
                        return;
                    }
                    else if (isNaN(rowData.investment)) {
                        setError(true)
                        setErrorMessage("Investment Can only be numbers");
                        return;
                    }
                    else if (parseInt(rowData.investment) >= 8333) {
                        if (rowData.pan.length === 0) {
                            setError(true)
                            setErrorMessage("Pan of Landord cannot empty if investment  is more than 8333")
                            return;
                        }
                        if (!panPattern.test(rowData.pan)) {
                            setError(true)
                            setErrorMessage("Pan of Landord pattern is not a valid format")
                            return;
                        }
                        if (rowData.landLoardName.length === 0) {
                            setError(true)
                            setErrorMessage("Name of Landord cannot empty if investment is more than 8333")
                            return;
                        }
                        if (rowData.landLoardAddress.length === 0) {
                            setError(true)
                            setErrorMessage("Address of Landord cannot empty if investment is more than 8333")
                            return;
                        }
                    }
                }
                else {
                    if (rowData.subSection.length === 0) {
                        setError(true)
                        setErrorMessage("Sub Section Cannot be empty");
                        return;
                    }
                    else if (rowData.nameOfAssured.length === 0) {
                        setError(true)
                        setErrorMessage("Name of Assured Cannot be empty");
                        return;
                    }
                    else if (rowData.relation.length === 0) {
                        setError(true)
                        setErrorMessage("Relation Cannot be empty");
                        return;
                    }
                    else if (rowData.policyNo.length === "0") {
                        setError(true)
                        setErrorMessage("Policy Number Cannot be empty");
                        return;
                    }
                    else if (alphanumericPattern.test(rowData.policyNo) === false) {
                        setError(true)
                        setErrorMessage("Policy Number Can only be alphanumeric");
                        return;
                    }
                    else if (rowData.investment.length === 0) {
                        setError(true)
                        setErrorMessage("Investment Cannot be empty");
                        return;
                    }
                    else if (isNaN(rowData.investment)) {
                        setError(true)
                        setErrorMessage("Investment Can only be numbers");
                        return;
                    }
                    else if (rowData.file.length === 0) {
                        setError(true)
                        setErrorMessage("File Cannot be empty");
                        return;
                    }
                    else if (parseInt(rowData.investment) >= 8333) {
                        if (rowData.pan.length === 0) {
                            setError(true)
                            setErrorMessage("Pan of Landord empty if investment is more than 8333")
                            return
                        }
                        if (!panPattern.test(rowData.pan)) {
                            setError(true)
                            setErrorMessage("Pan of Landord pattern is not a valid format")
                            return;
                        }
                        if (rowData.landLoardName.length === 0) {
                            setError(true)
                            setErrorMessage("Name of Landord cannot empty if investment is more than 8333")
                            return
                        }
                        if (rowData.landLoardAddress.length === 0) {
                            setError(true)
                            setErrorMessage("Address of Landord cannot empty if investment is more than 8333")
                            return
                        }
                    }
                }
                savedData.push(rowData);
            });
        }
        else if (subSectionValue === "B") {
            rows.forEach((row, index) => {
                const rowData = {
                    uniqueId: `${empCode.employeeCode}-${currentDateMillis}`,
                    employeeName: empCode.employeeName,
                    mainSection: mainSection,
                    financialyear: openyear,
                    subSectionCode: row.subSectionValue || "",
                    nameOfAssured: row.nameOfAssured || "",
                    relation: row.relation || "",
                    policyNo: row.policyNo || "",
                    investment: row.investment || "",
                    file: fileList || [],
                    propertyType: row.propertyType || "1",
                    eligible80EEA: row.eligible80EEA || "",
                    possession: row.possession || "",
                    subSection: row.subSection,
                    pan: row.pan || "",
                    landLoardName: row.landLoardName || "",
                    landLoardAddress: row.landLoardAddress || "",
                    investmentSchedule: selectedOption,
                    employeeCode: empCode.employeeCode,
                    createTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                };
                if (selectedOption === "provisional") {
                    if (rowData.subSection.length === 0) {
                        setError(true)
                        setErrorMessage("Sub Section Cannot be empty");
                        return;
                    }
                    else if (rowData.nameOfAssured.length === 0) {
                        setError(true)
                        setErrorMessage("Name of Assured Cannot be empty");
                        return;
                    }
                    else if (rowData.relation.length === 0) {
                        setError(true)
                        setErrorMessage("Relation Cannot be empty");
                        return;
                    }
                    else if (rowData.investment.length === 0) {
                        setError(true)
                        setErrorMessage("Investment Cannot be empty");
                        return;
                    }
                    else if (isNaN(rowData.investment)) {
                        setError(true)
                        setErrorMessage("Investment Can only be numbers");
                        return;
                    }
                    else if (rowData.pan.length === 0) {
                        setError(true)
                        setErrorMessage("Pan of Lender cannot empty")
                        return;
                    }
                    if (!panPattern.test(rowData.pan)) {
                        setError(true)
                        setErrorMessage("Pan of Lender pattern is not a valid format")
                        return;
                    }
                    else if (rowData.landLoardName.length === 0) {
                        setError(true)
                        setErrorMessage("Name of Lender cannot empty")
                        return;
                    }
                    else if (rowData.landLoardAddress.length === 0) {
                        setError(true)
                        setErrorMessage("Address of Lender cannot empty")
                        return;
                    }

                }
                else {
                    if (rowData.subSection.length === 0) {
                        setError(true)
                        setErrorMessage("Sub Section Cannot be empty");
                        return;
                    }
                    else if (rowData.nameOfAssured.length === 0) {
                        setError(true)
                        setErrorMessage("Name of Assured Cannot be empty");
                        return;
                    }
                    else if (rowData.relation.length === 0) {
                        setError(true)
                        setErrorMessage("Relation Cannot be empty");
                        return;
                    }
                    else if (rowData.policyNo.length === 0) {
                        setError(true)
                        setErrorMessage("Policy Number Cannot be empty");
                        return;
                    }
                    else if (alphanumericPattern.test(rowData.policyNo) === false) {
                        setError(true)
                        setErrorMessage("Policy Number Can only be alphanumeric");
                        return;
                    }
                    else if (rowData.investment.length === 0) {
                        setError(true)
                        setErrorMessage("Investment Cannot be empty");
                        return;
                    }
                    else if (isNaN(rowData.investment)) {
                        setError(true)
                        setErrorMessage("Investment Can only be numbers");
                        return;
                    }
                    else if (rowData.file.length === 0) {
                        setError(true)
                        setErrorMessage("File Cannot be empty");
                        return;
                    }
                    else if (rowData.pan.length === 0) {
                        setError(true)
                        setErrorMessage("Pan of Lender cannot empty")
                        return;
                    }
                    else if (rowData.landLoardName.length === 0) {
                        setError(true)
                        setErrorMessage("Name of Lender cannot empty")
                        return;
                    }
                    else if (rowData.landLoardAddress.length === 0) {
                        setError(true)
                        setErrorMessage("Address of Lender cannot empty")
                        return;
                    }
                }
                savedData.push(rowData);
            });
        }
        else {
            rows.forEach((row, index) => {
                const rowData = {
                    uniqueId: `${empCode.employeeCode}-${currentDateMillis}`,
                    employeeName: empCode.employeeName,
                    mainSection: mainSection,
                    financialyear: openyear,
                    subSectionCode: row.subSectionValue || "",
                    nameOfAssured: row.nameOfAssured || "",
                    relation: row.relation || "",
                    policyNo: row.policyNo || "",
                    paymentDate: row.paymentDate || "",
                    investment: row.investment || "",
                    file: fileList || [],
                    subSection: row.subSection || "",
                    investmentCode: row.investmentCode || "",
                    division: row.division || "",
                    investmentSchedule: selectedOption,
                    employeeCode: empCode.employeeCode,
                    createTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                };
                if (selectedOption === "provisional") {
                    if (rowData.subSection.length === 0) {
                        setError(true)
                        setErrorMessage("Sub Section Cannot be empty");
                        return;
                    }
                    else if (rowData.nameOfAssured.length === 0) {
                        setError(true)
                        setErrorMessage("Name of Assured Cannot be empty");
                        return;
                    }
                    else if (rowData.relation.length === 0) {
                        setError(true)
                        setErrorMessage("Relation Cannot be empty");
                        return;
                    }
                    else if (rowData.investment.length === 0) {
                        setError(true)
                        setErrorMessage("Investment Cannot be empty");
                        return;
                    }
                    else if (isNaN(rowData.investment)) {
                        setError(true)
                        setErrorMessage("Investment Can only be numbers");
                        return;
                    }
                }
                else {
                    if (rowData.subSection.length === 0) {
                        setError(true)
                        setErrorMessage("Sub Section Cannot be empty");
                        return;
                    }
                    else if (rowData.nameOfAssured.length === 0) {
                        setError(true)
                        setErrorMessage("Name of Assured Cannot be empty");
                        return;
                    }
                    else if (rowData.relation.length === 0) {
                        setError(true)
                        setErrorMessage("Relation Cannot be empty");
                        return;
                    }
                    else if (rowData.policyNo.length === 0) {
                        setError(true)
                        setErrorMessage("Policy Number Cannot be empty");
                        return;
                    }
                    else if (alphanumericPattern.test(rowData.policyNo) === false) {
                        setError(true)
                        setErrorMessage("Policy Number Can only be alphanumeric");
                        return;
                    }
                    else if (rowData.investment.length === 0) {
                        setError(true)
                        setErrorMessage("Investment Cannot be empty");
                        return;
                    }
                    else if (isNaN(rowData.investment)) {
                        setError(true)
                        setErrorMessage("Investment Can only be numbers");
                        return;
                    }
                    else if (rowData.paymentDate.length === 0) {
                        setError(true)
                        setErrorMessage("Payment Date cannot be empty");
                        return;
                    }
                    else if (rowData.file.length === 0) {
                        setError(true)
                        setErrorMessage("File Cannot be empty");
                        return;
                    }
                }
                savedData.push(rowData);
            });
        }

        if (savedData.length !== 0) {
            if (mainSection === "Section 80C") {
                setArray80C((prevArray) => [...prevArray, ...savedData]);
                setRows([])
                setSubSectionValue("")
                setAddState(false)
                setFileList([])
            } else if (mainSection === "Section 80D") {
                setArray80D((prevArray) => [...prevArray, ...savedData]);
                setRows([])
                setSubSectionValue("")
                setAddState(false)
                setFileList([])
            } else if (mainSection === "Section 10") {
                setArray10((prevArray) => [...prevArray, ...savedData]);
                setRows([])
                setSubSectionValue("")
                setAddState(false)
                setFileList([])
            } else if (mainSection === "Section 24") {
                setArray24((prevArray) => [...prevArray, ...savedData]);
                setRows([])
                setSubSectionValue("")
                setAddState(false)
                setFileList([])
            } else {
                setArray80CCD((prevArray) => [...prevArray, ...savedData]);
                setRows([])
                setSubSectionValue("")
                setAddState(false)
                setFileList([])
            }
        }
    };
export const handleActualConversion = (index, array, setArray, setError, setErrorMessage, setSuccess, setSuccessMessage) => {
    console.log(array[index])
    if (array[index]?.file.length === 0 || array[index]?.policyNo.length === 0) {
        setError(true)
        setErrorMessage("Conversion to  Actual Requires File Upload and Policy/Document Number")
    }
    else if (array[index].paymentDate) {
        if (array[index]?.paymentDate.length === 0) {
            setError(true)
            setErrorMessage("Payment Date Is Required for Actual Entry")
        }
    }
    else {
        const empCode = JSON.parse(sessionStorage.getItem("userData"))
        const currentDateMillis = Date.now();
        const confirmed = window.confirm('Warning , after conversion, you cannot edit or  delete the provisional entry .  Do you wish to continue?');
        if (confirmed) {
            const updatedData = [...array];
            const ediObj = {
                ...updatedData[index],
                investmentSchedule: "actual",
                uniqueId: `${empCode.employeeCode}-${currentDateMillis}`,
            }
            updatedData[index] = {
                ...updatedData[index],
                isConverted: true,
                conversionTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
            };
            const newArray = [...updatedData];
            newArray[newArray.length] = ediObj;
            setArray(newArray)
            setSuccess(true)
            setSuccessMessage("Conversion Successfull")
        } else {
            return;
        }

    }
}

export const handleOpenCommentsModel = (item, setCommentsModel, setEntryStatus, setComments) => {
    setCommentsModel(true)
    setEntryStatus(item.status)
    setComments(item.accountantsComments)
}


export const handleDownloadCsv = () => {
    const empCode = JSON.parse(sessionStorage.getItem("userData"))
    const postData = {
        employeeCode: parseInt(empCode.employeeCode),
    }
    axios.post(`${url}/api/transactions/getTransactionByEmployeeCode`, postData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            const data = {
                section80C: response.data.data.section80C,
                section80D: response.data.data.section80D,
                section10: response.data.data.section10,
                section24: response.data.data.section24
            }
            const workbook = XLSX.utils.book_new();
            const allData = [];

            // Combine data from all sections into a single array
            for (const sectionName in data) {
                const sectionData = data[sectionName];

                if (sectionData.length > 0) {
                    allData.push(...sectionData);
                }
            }

            if (allData.length > 0) {
                // Define the fields you want in the Excel sheet
                const fields = ['employeeCode', 'subSection', 'mainSection', 'nameOfAssured', 'relation', 'accommodation',
                    'cityCategory', 'propertyType,eligible80EEA', 'possession', 'pan', 'landLoardName', 'landLoardAddress',
                    , 'policyNo', 'financialyear', 'investment', 'investmentSchedule', 'status'];

                // Create a worksheet with the combined data
                const worksheetData = [fields].concat(
                    allData.map((item) => fields.map((field) => item[field]))
                );

                const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

                // Add the worksheet to the workbook
                XLSX.utils.book_append_sheet(workbook, worksheet, 'TransactionData');
            }

            const filename = 'transaction_data.xlsx';

            // Save the entire workbook as a single Excel file
            XLSX.writeFile(workbook, filename);
        })
        .catch(error => {
            alert(error.response.data.error)
        });

};