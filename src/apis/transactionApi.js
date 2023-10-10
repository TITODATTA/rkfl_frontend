import axios from "axios";
import { url } from "../utils/constants";

export const handleCreateOrUpdateTransaction = async (
    array80C, array80D, array10, array24, array80CCD, setSuccess,
    setSuccessMessage, handleCloseReviewModal, selectedOption, edit) => {
    const empCode = JSON.parse(sessionStorage.getItem("userData"))
    const finalSubmit = selectedOption === "actual" ? true : false

    const addKeyToObjects = (array) => {
        return array.map((obj) => {
            if (finalSubmit && array.length > 0 && !edit && obj.investmentSchedule === "actual") {
                // Only add the key-value pair if selectedOption is "actual" and the array is not empty
                return { ...obj, actualSubmission: true }; // Replace 'key' and 'value' with the desired key and value
            }
            return { ...obj, actualSubmission: false }; // Otherwise, return the object as-is
        });
    };


    const modifiedArray80C = addKeyToObjects(array80C);
    const modifiedArray80D = addKeyToObjects(array80D);
    const modifiedArray10 = addKeyToObjects(array10);
    const modifiedArray24 = addKeyToObjects(array24);
    const modifiedArray80CCD = addKeyToObjects(array80CCD);

    const postData = {
        employeeCode: parseInt(empCode.employeeCode), // Convert the email to an integer
        section80C: modifiedArray80C,
        section80D: modifiedArray80D,
        section10: modifiedArray10,
        section24: modifiedArray24,
        section80CCD: modifiedArray80CCD,
        // finalActualSubmission: finalSubmit,
        plant: empCode.plant
    };


    axios.post(`${url}/api/transactions/createOrUpdateTransaction`, postData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            const message = edit ? "Correction updated successfully,Please Wait for review by Admin" : "Transactions Created or Updated successfully, Page will reload in a few seconds ..."
            setSuccess(true)
            setSuccessMessage(message);
            if (!edit) {
                handleCloseReviewModal()
            }
            if (!edit) {
                setTimeout(function () {
                    window.location.reload();
                }, 2000); // 2000 milliseconds (2 seconds)
            }
        })
        .catch(error => {
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
            console.log(error)
            alert("Server Error:Redirecting To Login")
            window.location = "/login"
        });

};

export const handleGetTransaction = async (
    setArray80C, setArray80D, setArray10,
    setArray24, setArray80CCD, setIsLoading,
    setFinalActualSubmission) => {
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
            console.log(response)
            setArray80C(response.data.data.section80C)
            setArray80D(response.data.data.section80D)
            setArray10(response.data.data.section10)
            setArray24(response.data.data.section24)
            setArray80CCD(response.data.data.section80CCD)
            setFinalActualSubmission(response.data.data.finalActualSubmission)
            setIsLoading(false)
        })
        .catch(error => {
            setArray80C([])
            setArray80D([])
            setArray10([])
            setArray24([])
            setArray80CCD([])
            setIsLoading(false)
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
        });

};
export const handleGetInvestmentTransaction = async (
    setInvestment80C, setInvestment80D, setInvestment10,
    setInvestment24, selectedOption, openyear) => {
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
            console.log(response)
            const totalInvestment80C = response.data.data.section80C.length > 0 ?
                response.data.data.section80C
                    .filter(item => item.investmentSchedule === selectedOption && item.financialyear === openyear)
                    .reduce((acc, item) => {
                        const investmentValue = parseInt(item.investment);
                        return isNaN(investmentValue) ? acc : acc + investmentValue;
                    }, 0) : 0;
            const totalInvestment80D = response.data.data.section80D.length > 0 ?
                response.data.data.section80D
                    .filter(item => item.investmentSchedule === selectedOption && item.financialyear === openyear)
                    .reduce((acc, item) => {
                        const investmentValue = parseInt(item.investment);
                        return isNaN(investmentValue) ? acc : acc + investmentValue;
                    }, 0) : 0;
            const totalInvestment10 = response.data.data.section10.length > 0 ?
                response.data.data.section10
                    .filter(item => item.investmentSchedule === selectedOption && item.financialyear === openyear)
                    .reduce((acc, item) => {
                        const investmentValue = parseInt(item.investment);
                        return isNaN(investmentValue) ? acc : acc + investmentValue;
                    }, 0) : 0;
            const totalInvestment24 = response.data.data.section24.length > 0 ?
                response.data.data.section24
                    .filter(item => item.investmentSchedule === selectedOption && item.financialyear === openyear)
                    .reduce((acc, item) => {
                        const investmentValue = parseInt(item.investment);
                        return isNaN(investmentValue) ? acc : acc + investmentValue;
                    }, 0) : 0;
            setInvestment80C(totalInvestment80C)
            setInvestment80D(totalInvestment80D)
            setInvestment10(totalInvestment10)
            setInvestment24(totalInvestment24)
        })
        .catch(error => {
            setInvestment10(0)
            setInvestment24(0)
            setInvestment80D(0)
            setInvestment80C(0)
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
        });

};

export const handleGetAllTransaction = async (setSection80C, setSection80D, setSection10, setSection24, setSection80CCD) => {
    axios.get(`${url}/api/transactions/getAllTransactionData`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Admin'
        }
    })
        .then(response => {
            setSection80C(response.data.data.section80C)
            setSection80D(response.data.data.section80D)
            setSection10(response.data.data.section10)
            setSection24(response.data.data.section24)
            setSection80CCD(response.data.data.section80CCD)
        })
        .catch(error => {
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
            alert("Server Error:Redirecting To Login")
            console.log(error)
        });

};


export const handleGetCombinedTransaction = async (setTransactions, plant, investmentType, mainSection, openYear, setIsLoading, setSubmitButtonState) => {
    setIsLoading(true)
    if (plant.length === 0) {
        alert("Choose Plant")
        setIsLoading(false)
        setSubmitButtonState(false)
        return;
    }
    if (investmentType.length === 0) {
        alert("Choose Investment Type")
        setIsLoading(false)
        setSubmitButtonState(false)
        return;
    }
    // if (mainSection.length === 0) {
    //     alert("Choose Main Section")
    //     setIsLoading(false)
    //     setSubmitButtonState(false)
    //     return;
    // }
    else {
        const postData = {
            plant: plant
        }
        axios.post(`${url}/api/transactions/combineEmployeeArrays`, postData, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Admin'
            }
        })
            .then(response => {
                if (response.data.data.length === 0) {
                    alert("There is no data")
                    setTransactions([])
                    setIsLoading(false)
                    setSubmitButtonState(false)
                }
                else if (investmentType === 'Actual') {
                    if (mainSection.length === 0) {
                        setTransactions(response.data.data.filter((item) => item.investmentSchedule === "actual" && item.financialyear === openYear))
                        setIsLoading(false)
                        setSubmitButtonState(true)
                    }
                    else {
                        setTransactions(response.data.data.filter((item) => item.investmentSchedule === "actual" && item.financialyear === openYear && item.mainSection === mainSection))
                        setIsLoading(false)
                        setSubmitButtonState(true)
                    }

                }
                else if (investmentType === 'Provisional') {
                    if (mainSection.length === 0) {
                        setTransactions(response.data.data.filter((item) => item.investmentSchedule === "provisional" && item.financialyear === openYear))
                        setIsLoading(false)
                        setSubmitButtonState(true)
                    }
                    else {
                        setTransactions(response.data.data.filter((item) => item.investmentSchedule === "provisional" && item.financialyear === openYear && item.mainSection === mainSection))
                        setIsLoading(false)
                        setSubmitButtonState(true)
                    }

                }
            })
            .catch(error => {
                if (error.code === "ERR_NETWORK") {
                    alert("Server Error:Redirecting To Login")
                    window.location = "/login"
                    return;
                }
                alert("Server Error:Redirecting To Login")
                setSubmitButtonState(false)
            });

    }
};

export const handleUpdateTransaction = (data, setTransactions, setSubmitButtonState, setData) => {
    // Filter out empty objects from the data array
    const filteredData = data.filter(item => item?.checked === true);

    if (filteredData.length === 0) {
        alert("No Rejected Transactions")
        return;
    }

    const axiosRequests = filteredData.map((item) => {
        const postData = {
            employeeCode: item?.employeeCode,
            sectionArray: item?.mainSection,
            objectId: item?.uniqueId,
            isEdit: item?.isEdit,
            status: "Reject",
            accountantsComments: item?.accountantsComments,
        };

        return axios.put(
            `${url}/api/transactions/updateTransactionObject`,
            postData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Admin',
                },
            }
        );
    });

    Promise.all(axiosRequests)
        .then((responses) => {
            alert('Status And comments Updated Successfully. Hit Submit on the filter options to check status');
            setTransactions([])
            setSubmitButtonState(false)
            setData([])
        })
        .catch((error) => {
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
            alert('Error');
            console.log(error);
        });
}

export const handleUpdateOneTransaction = async (sectionArray, objectToUpdate, setSuccess, setError, setSuccessMessage, setErrorMessage) => {
    const postData = {
        employeeCode: JSON.parse(sessionStorage.getItem("userData")).employeeCode,
        sectionArray: sectionArray,
        objectToUpdate: objectToUpdate,

    }
    axios.put(`${url}/api/transactions/updateObjectStatusAndResubmission`, postData, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Admin'
        }
    })
        .then(response => {
            setSuccess(true)
            setSuccessMessage("Resubmitted Successfully , Reloading in few seconds..")
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        })
        .catch(error => {
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
            console.log(error)
            setError(true)
            setErrorMessage("Error")
        });

};
export const handleUpdateAcceptedTransaction = (data, setTransactions, setSubmitButtonState) => {
    // Filter out empty objects from the data array

    if (data.length === 0) {
        alert("No Accepted Transaction")
        return;
    }

    const axiosRequests = data.map((item) => {
        const postData = {
            employeeCode: item?.employeeCode,
            sectionArray: item?.mainSection,
            objectId: item?.uniqueId,
            adjustedInvestment: item?.adjustedInvestment,
            adjustedComments: item?.adjustedComments || "",
        };

        return axios.put(
            `${url}/api/transactions/updateTransactionObjectAccepted`,
            postData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Admin',
                },
            }
        );
    });

    Promise.all(axiosRequests)
        .then((responses) => {
            alert('Accepted Data has been submitted, Hit Submit on the filter options to check status');
            setTransactions([])
            setSubmitButtonState(false)
        })
        .catch((error) => {
            alert('Error');
            console.log(error);
        });
}


export const handleCopyTransaction = async (financialYear, setIsLoading) => {
    setIsLoading(true)
    const postData = {
        financialYear: financialYear
    }
    axios.post(`${url}/api/transactions/copyObjects`, postData, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Admin'
        }
    })
        .then(response => {
            setIsLoading(false)
            alert('Successfully Converted Actual To Provisional for the New Financial Year');
        })
        .catch(error => {
            console.log(error)
            setIsLoading(false)
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
            alert('Error');

        });

}
export const handleGetAllTransactionForCsv = async (setIsLoading) => {
    setIsLoading(true)
    axios.get(`${url}/api/transactions/combineAllEmployeeArrays`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            alert("CSV/JSON Data Successfully Created Successfully")
            setIsLoading(false)
        })
        .catch(error => {
            setIsLoading(false)
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
            alert('Server Error');
        });

};