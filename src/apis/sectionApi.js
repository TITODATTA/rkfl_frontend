import axios from "axios";
const url = process.env.REACT_APP_BASE_URL
export const handleGetSection = async (mainSection, setSubSection, setIsLoading) => {
    if (mainSection === "Section 80C") {
        axios.get(`${url}/api/section/getSection80CData`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setSubSection(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            });
    }
    else if (mainSection === "Section 80D") {
        axios.get(`${url}/api/section/getSection80DData`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setSubSection(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            });
    }
    else if (mainSection === "Section 10") {
        axios.get(`${url}/api/section/getSection10Data`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setSubSection(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            });
    }
    else if (mainSection === "Section 24") {
        axios.get(`${url}/api/section/getSection24Data`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setSubSection(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            });
    }
    else if (mainSection === "Section 80CCD") {
        axios.get(`${url}/api/section/getSection80CCDData`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setSubSection(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            });
    }
    else {
        setSubSection([])
    }
};