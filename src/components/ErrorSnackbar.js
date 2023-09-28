import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ErrorSnackbar = ({ state, setState, errorMessage }) => {
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
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
        </Snackbar>
    )
}

export default ErrorSnackbar