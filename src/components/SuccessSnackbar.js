import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const SuccessSnackbar = ({ state, setState, successMessage }) => {
    const vertical = 'top'
    const horizontal = 'center'
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setState(false);
    };
    return (
        <Snackbar open={state} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {successMessage}
            </Alert>
        </Snackbar>
    )
}

export default SuccessSnackbar