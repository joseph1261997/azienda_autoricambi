import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { selectSearchResult } from '../redux/productsSlice';

const ErrorAlert = () => {
    const result = useSelector(selectSearchResult);
    return !result.Sucess ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {result.Errors.map((error, index) => (
                    <div key={index}>{error}</div>
                ))}
            </Alert>
        </Box>
    ) : null
};

export default ErrorAlert;