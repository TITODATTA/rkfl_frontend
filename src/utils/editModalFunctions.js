export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY: 'auto',
    p: 2
};

export const handleCloseEditModal = (
    setEditModal,
    setSubSectionValue,
    setSubSectionCode,
    setName,
    setRelation,
    setPolicy,
    setInvestment,
    setFile,
    setPan,
    setName1,
    setAddress,
    setIsFileUploaded,
) => {
    setEditModal(false)
    // setSubSectionValue("")
    // setSubSectionCode("")
    // setName("")
    // setRelation("")
    // setPolicy("")
    // setInvestment(null)
    // setFile([])
    // setPan("")
    // setName1("")
    // setAddress("")
    // setIsFileUploaded(false);
}

export const handleFileChange = (event, setFile, setIsFileUploaded) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        const blobURL = URL.createObjectURL(selectedFile);
        setFile(blobURL);
        setIsFileUploaded(true);
    }
};

export const handleFileRemove = (file, setFile, setIsFileUploaded) => {
    URL.revokeObjectURL(file);
    setFile('');
    setIsFileUploaded(false);
};

export const handleChangeInputFileds = (e, setState) => {
    setState(e.target.value)
}
export const handleEdit = (
    type,
    mainSection,
    editIndex,
    name,
    investment,
    pan,
    address,
    name1,
    file,
    cityCategory,
    startDate,
    endDate,
    propertyType,
    eligible80EEA,
    possession,
    policy,
    paymentDate,
    relation,
    subSectionCode,
    subSectionValue,
    array80C,
    array80D,
    array10,
    array24,
    array80CCD,
    alphanumericPattern,
    setEditModal,
    setName,
    setName1,
    setPan,
    setAddress,
    setPolicy,
    setInvestment,
    setRelation,
    setFile,
    setCityCategory,
    setSubSectionCode,
    setSubSectionValue,
    setIsFileUploaded,
    setArray80C,
    setArray80D,
    setArray10,
    setArray24,
    setArray80CCD,
    setError,
    setErrorMessage,


) => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (type === "provisional") {
        if (name.length === 0) {
            setError(true)
            setErrorMessage("Name of Assured Cannot be empty")
        }
        else if (investment.length === 0) {
            setError(true)
            setErrorMessage("Investment Cannot be empty")

        }
        else if (relation.length === 0) {
            setError(true)
            setErrorMessage("Relation Cannot be empty")

        }
        else if (isNaN(investment)) {
            setError(true)
            setErrorMessage("Investment Can only be numbers");

        }
        else if (mainSection === "Section 10" && parseInt(investment) >= 8333) {
            if (pan.length === 0 && subSectionCode === "13A") {
                setError(true)
                setErrorMessage("Pan of Landord empty if investment is more than 8333")
            }
            else if (!panPattern.test(pan) && subSectionCode === "13A") {
                setError(true)
                setErrorMessage("Pan of Landord is not a valid format")
            }
            else if (name1.length === 0 && subSectionCode === "13A") {
                setError(true)
                setErrorMessage("Name of Landord cannot empty if investment is more than 8333")
            }
            else if (address.length === 0 && subSectionCode === "13A") {
                setError(true)
                setErrorMessage("Address of Landord cannot empty if investment is more than 8333")
            }
            else if (startDate.length === 0) {
                setError(true)
                setErrorMessage("Start Date cannot be empty");
            }
            else if (endDate.length === 0) {
                setError(true)
                setErrorMessage("End Date cannot be empty");
            }
            else {
                const updatedData = [...array10];
                updatedData[editIndex] = {
                    ...updatedData[editIndex],
                    file: file,
                    investment: investment,
                    adjustedInvestment: investment,
                    nameOfAssured: name,
                    policyNo: policy,
                    relation: relation,
                    subSectionCode: subSectionCode,
                    subSection: subSectionValue,
                    startDate: startDate.split("-").reverse().join("."),
                    endDate: endDate.split("-").reverse().join("."),
                    pan: pan,
                    cityCategory: cityCategory,
                    landLoardAddress: address,
                    landLoardName: name1,
                    editTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                };
                setArray10(updatedData)
                handleCloseEditModal(setEditModal,
                    setSubSectionValue,
                    setSubSectionCode,
                    setName,
                    setRelation,
                    setPolicy,
                    setInvestment,
                    setFile,
                    setPan,
                    setName1,
                    setAddress,
                    setIsFileUploaded,
                )
            }
        }
        else if (mainSection === "Section 24") {
            if (pan.length === 0) {
                setError(true)
                setErrorMessage("Pan of Lender cannot be empty")
            }
            else if (!panPattern.test(pan)) {
                setError(true)
                setErrorMessage("Pan of Lender is not a valid format")
            }
            else if (name1.length === 0) {
                setError(true)
                setErrorMessage("Name of Lender cannot be empty ")
            }
            else if (address.length === 0) {
                setError(true)
                setErrorMessage("Address of Lender cannot be empty ")
            }
            else {
                const updatedData = [...array24];
                updatedData[editIndex] = {
                    ...updatedData[editIndex],
                    file: file,
                    investment: investment,
                    adjustedInvestment: investment,
                    nameOfAssured: name,
                    policyNo: policy,
                    relation: relation,
                    subSectionCode: subSectionCode,
                    subSection: subSectionValue,
                    pan: pan,
                    propertyType: propertyType,
                    eligible80EEA: eligible80EEA,
                    possession: possession,
                    landLoardAddress: address,
                    landLoardName: name1,
                    editTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                };
                setArray24(updatedData)
                handleCloseEditModal(setEditModal,
                    setSubSectionValue,
                    setSubSectionCode,
                    setName,
                    setRelation,
                    setPolicy,
                    setInvestment,
                    setFile,
                    setPan,
                    setName1,
                    setAddress,
                    setIsFileUploaded,
                )
            }
        }
        else {
            if (mainSection === "Section 80C") {
                const updatedData = [...array80C];
                updatedData[editIndex] = {
                    ...updatedData[editIndex],
                    file: file,
                    investment: investment,
                    adjustedInvestment: investment,
                    nameOfAssured: name,
                    policyNo: policy,
                    paymentDate: paymentDate,
                    relation: relation,
                    subSectionCode: subSectionCode,
                    subSection: subSectionValue,
                    editTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                };
                setArray80C(updatedData)
                handleCloseEditModal(
                    setEditModal,
                    setSubSectionValue,
                    setSubSectionCode,
                    setName,
                    setRelation,
                    setPolicy,
                    setInvestment,
                    setFile,
                    setPan,
                    setName1,
                    setAddress,
                    setIsFileUploaded,
                )
            }
            else if (mainSection === "Section 80D") {
                const updatedData = [...array80D];
                updatedData[editIndex] = {
                    ...updatedData[editIndex],
                    file: file,
                    investment: investment,
                    adjustedInvestment: investment,
                    nameOfAssured: name,
                    paymentDate: paymentDate,
                    policyNo: policy,
                    relation: relation,
                    subSectionCode: subSectionCode,
                    subSection: subSectionValue,
                    editTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                };
                setArray80D(updatedData)
                handleCloseEditModal(
                    setEditModal,
                    setSubSectionValue,
                    setSubSectionCode,
                    setName,
                    setRelation,
                    setPolicy,
                    setInvestment,
                    setFile,
                    setPan,
                    setName1,
                    setAddress,
                    setIsFileUploaded,
                )
            }
            else if (mainSection === "Section 80CCD") {
                const updatedData = [...array80CCD];
                updatedData[editIndex] = {
                    ...updatedData[editIndex],
                    file: file,
                    investment: investment,
                    adjustedInvestment: investment,
                    nameOfAssured: name,
                    policyNo: policy,
                    relation: relation,
                    subSectionCode: subSectionCode,
                    subSection: subSectionValue,
                    editTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                };
                setArray80CCD(updatedData)
                handleCloseEditModal(
                    setEditModal,
                    setSubSectionValue,
                    setSubSectionCode,
                    setName,
                    setRelation,
                    setPolicy,
                    setInvestment,
                    setFile,
                    setPan,
                    setName1,
                    setAddress,
                    setIsFileUploaded,
                )
            }
            else if (mainSection === "Section 10") {
                if (startDate.length === 0) {
                    setError(true)
                    setErrorMessage("Start Date cannot be empty");
                }
                else if (endDate.length === 0) {
                    setError(true)
                    setErrorMessage("End Date cannot be empty");
                }
                else {
                    const updatedData = [...array10];
                    updatedData[editIndex] = {
                        ...updatedData[editIndex],
                        file: file,
                        investment: investment,
                        adjustedInvestment: investment,
                        nameOfAssured: name,
                        policyNo: policy,
                        relation: relation,
                        cityCategory: cityCategory,
                        subSectionCode: subSectionCode,
                        subSection: subSectionValue,
                        startDate: startDate.split("-").reverse().join("."),
                        endDate: endDate.split("-").reverse().join("."),
                        pan: pan,
                        landLoardName: name1,
                        landLoardAddress: address,
                        editTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                    };
                    setArray10(updatedData)
                    handleCloseEditModal(
                        setEditModal,
                        setSubSectionValue,
                        setSubSectionCode,
                        setName,
                        setRelation,
                        setPolicy,
                        setInvestment,
                        setFile,
                        setPan,
                        setName1,
                        setAddress,
                        setIsFileUploaded,
                    )
                }
            }
        }
    }
    else if (type === "actual") {
        if (name.length === 0) {
            setError(true)
            setErrorMessage("Name of Assured Cannot be empty")

        }
        else if (relation.length === 0) {
            setError(true)
            setErrorMessage("Relation Cannot be empty")

        }
        else if (investment.length === 0) {
            setError(true)
            setErrorMessage("Investment Cannot be empty")

        }
        else if (isNaN(investment)) {
            setError(true)
            setErrorMessage("Investment Can only be numbers");

        }
        else if (policy.length === 0) {
            setError(true)
            setErrorMessage("Policy Number Cannot be empty");

        }
        else if (mainSection === "Section 80C" && paymentDate.length === 0) {
            setError(true)
            setErrorMessage("Payment Date Cannot be empty");

        }
        else if (mainSection === "Section 80D" && paymentDate.length === 0) {
            setError(true)
            setErrorMessage("Payment Date Cannot be empty");

        }
        else if (alphanumericPattern.test(policy) === false) {
            setError(true)
            setErrorMessage("Policy Number Can only be alphanumeric");

        }
        else if (file.length === 0) {
            setError(true)
            setErrorMessage("File Cannot be empty");

        }
        else if (mainSection === "Section 10" && parseInt(investment) >= 8333) {
            if (pan.length === 0 && subSectionCode === "13A") {
                setError(true)
                setErrorMessage("Pan of Landord empty if investment is more than 8333")
            }
            else if (!panPattern.test(pan)) {
                setError(true)
                setErrorMessage("Pan of Landord is not a valid format")
            }
            else if (name1.length === 0 && subSectionCode === "13A") {
                setError(true)
                setErrorMessage("Name of Landord cannot empty if investment is more than 8333")
            }
            else if (address.length === 0 && subSectionCode === "13A") {
                setError(true)
                setErrorMessage("Address of Landord cannot empty if investment is more than 8333")
            }
            else if (startDate.length === 0) {
                setError(true)
                setErrorMessage("Start Date cannot be empty");
            }
            else if (endDate.length === 0) {
                setError(true)
                setErrorMessage("End Date cannot be empty");
            }
            else {
                const updatedData = [...array10];
                updatedData[editIndex] = {
                    ...updatedData[editIndex],
                    file: file,
                    investment: investment,
                    adjustedInvestment: investment,
                    nameOfAssured: name,
                    policyNo: policy,
                    relation: relation,
                    subSectionCode: subSectionCode,
                    subSection: subSectionValue,
                    startDate: startDate.split("-").reverse().join("."),
                    endDate: endDate.split("-").reverse().join("."),
                    pan: pan,
                    cityCategory: cityCategory,
                    landLoardAddress: address,
                    landLoardName: name1,
                    editTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                };
                setArray10(updatedData)
                handleCloseEditModal(
                    setEditModal,
                    setSubSectionValue,
                    setSubSectionCode,
                    setName,
                    setRelation,
                    setPolicy,
                    setInvestment,
                    setFile,
                    setPan,
                    setName1,
                    setAddress,
                    setIsFileUploaded,
                )
            }
        }
        else if (mainSection === "Section 24") {
            if (pan.length === 0) {
                setError(true)
                setErrorMessage("Pan of Lender cannot be empty")
            }
            else if (!panPattern.test(pan)) {
                setError(true)
                setErrorMessage("Pan of Lender is not a valid format")
            }
            else if (name1.length === 0) {
                setError(true)
                setErrorMessage("Name of Lender cannot be empty ")
            }
            else if (address.length === 0) {
                setError(true)
                setErrorMessage("Address of Lender cannot be empty ")
            }
            else {
                const updatedData = [...array24];
                updatedData[editIndex] = {
                    ...updatedData[editIndex],
                    file: file,
                    investment: investment,
                    adjustedInvestment: investment,
                    nameOfAssured: name,
                    policyNo: policy,
                    relation: relation,
                    subSectionCode: subSectionCode,
                    subSection: subSectionValue,
                    possession: possession,
                    propertyType: propertyType,
                    eligible80EEA: eligible80EEA,
                    pan: pan,
                    landLoardAddress: address,
                    landLoardName: name1,
                    editTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                };
                setArray24(updatedData)
                handleCloseEditModal(
                    setEditModal,
                    setSubSectionValue,
                    setSubSectionCode,
                    setName,
                    setRelation,
                    setPolicy,
                    setInvestment,
                    setFile,
                    setPan,
                    setName1,
                    setAddress,
                    setIsFileUploaded,
                )
            }
        }
        else {
            if (mainSection === "Section 80C") {
                const updatedData = [...array80C];
                updatedData[editIndex] = {
                    ...updatedData[editIndex],
                    file: file,
                    investment: investment,
                    adjustedInvestment: investment,
                    nameOfAssured: name,
                    policyNo: policy,
                    paymentDate: paymentDate,
                    relation: relation,
                    subSectionCode: subSectionCode,
                    subSection: subSectionValue,
                    editTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                };
                setArray80C(updatedData)
                handleCloseEditModal(
                    setEditModal,
                    setSubSectionValue,
                    setSubSectionCode,
                    setName,
                    setRelation,
                    setPolicy,
                    setInvestment,
                    setFile,
                    setPan,
                    setName1,
                    setAddress,
                    setIsFileUploaded,
                )
            }
            else if (mainSection === "Section 80D") {
                const updatedData = [...array80D];
                updatedData[editIndex] = {
                    ...updatedData[editIndex],
                    file: file,
                    investment: investment,
                    adjustedInvestment: investment,
                    nameOfAssured: name,
                    policyNo: policy,
                    paymentDate: paymentDate,
                    relation: relation,
                    subSectionCode: subSectionCode,
                    subSection: subSectionValue,
                    editTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                };
                setArray80D(updatedData)
                handleCloseEditModal(
                    setEditModal,
                    setSubSectionValue,
                    setSubSectionCode,
                    setName,
                    setRelation,
                    setPolicy,
                    setInvestment,
                    setFile,
                    setPan,
                    setName1,
                    setAddress,
                    setIsFileUploaded,
                )
            }
            else if (mainSection === "Section 80CCD") {
                const updatedData = [...array80CCD];
                updatedData[editIndex] = {
                    ...updatedData[editIndex],
                    file: file,
                    investment: investment,
                    adjustedInvestment: investment,
                    nameOfAssured: name,
                    policyNo: policy,
                    relation: relation,
                    subSectionCode: subSectionCode,
                    subSection: subSectionValue,
                    editTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                };
                setArray80CCD(updatedData)
                handleCloseEditModal(
                    setEditModal,
                    setSubSectionValue,
                    setSubSectionCode,
                    setName,
                    setRelation,
                    setPolicy,
                    setInvestment,
                    setFile,
                    setPan,
                    setName1,
                    setAddress,
                    setIsFileUploaded,
                )
            }
            else if (mainSection === "Section 10") {
                if (startDate.length === 0) {
                    setError(true)
                    setErrorMessage("Start Date cannot be empty");
                }
                else if (endDate.length === 0) {
                    setError(true)
                    setErrorMessage("End Date cannot be empty");
                }
                else {
                    const updatedData = [...array10];
                    updatedData[editIndex] = {
                        ...updatedData[editIndex],
                        file: file,
                        investment: investment,
                        adjustedInvestment: investment,
                        nameOfAssured: name,
                        policyNo: policy,
                        relation: relation,
                        subSectionCode: subSectionCode,
                        subSection: subSectionValue,
                        startDate: startDate.split("-").reverse().join("."),
                        endDate: endDate.split("-").reverse().join("."),
                        pan: pan,
                        cityCategory: cityCategory,
                        landLoardName: name1,
                        landLoardAddress: address,
                        editTimestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                    };
                    setArray10(updatedData)
                    handleCloseEditModal(
                        setEditModal,
                        setSubSectionValue,
                        setSubSectionCode,
                        setName,
                        setRelation,
                        setPolicy,
                        setInvestment,
                        setFile,
                        setPan,
                        setName1,
                        setAddress,
                        setIsFileUploaded,
                        setCityCategory
                    )
                }

            }
        }
    }
}