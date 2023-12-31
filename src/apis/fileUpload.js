import axios from "axios";
import { url } from "../utils/constants";

export const uploadFile = async (file, setFileList, setSuccess, setSuccessMessage, setError, setErrorMessage, setUploadLoading) => {
    const empCode = JSON.parse(sessionStorage.getItem("userData"))
    setUploadLoading(true)
    try {
        const formData = new FormData();
        formData.append('file', file);

        if (file.size > 300 * 1024) {
            setError(true);
            setErrorMessage("File size exceeds 300KB");
            setUploadLoading(false)
            return;
        }
        const filenameRegex = /^\d{6}_.*$/; // Matches 6 digits followed by an underscore and any characters
        if (!filenameRegex.test(file.name)) {
            setError(true);
            setErrorMessage('Invalid filename format');
            setUploadLoading(false)
            return;
        }
        if (parseInt(file.name.substr(0, 6)) !== empCode.employeeCode) {
            setError(true);
            setErrorMessage('Incorrect employee code in filename');
            setUploadLoading(false)
            return;
        }

        const response = await axios.post(`${url}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Access file name and object from the response
        const { filename, file: uploadedFile } = response.data;
        setFileList((prevState) => [...prevState, { file: uploadedFile._id }]);
        setSuccess(true)
        setSuccessMessage("File uploaded successfully")
        setUploadLoading(false)
    } catch (error) {
        if (error.code === "ERR_NETWORK") {
            alert("Server Error:Redirecting To Login")
            window.location = "/login"
            return;
        }
        setError(true)
        setErrorMessage(error.response.data.error)
        setUploadLoading(false)
    }
};


// Function to delete a file by ID
export const deleteFile = async (file, index, fileList, setFileList, setSuccess, setSuccessMessage, setError, setErrorMessage, setUploadLoading) => {
    setUploadLoading(true)
    await axios.delete(`${url}/file/${file.file}`)
        .then((res) => {
            const updatedItems = [...fileList.slice(0, index), ...fileList.slice(index + 1)];
            setFileList(updatedItems);
            setSuccess(true);
            setSuccessMessage('File deleted successfully');
            setUploadLoading(false)
        })  // Handle further actions as needed
        .catch((error) => {
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
            setError(true)
            setErrorMessage('Error deleting file:', error);
            setUploadLoading(false)
        })
};




