import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const NotFound: React.FC = () => {

    return (
        <Box sx={{ textAlign: 'center', marginTop: 10 }} >
            <Typography variant="h4" color="textPrimary">
                Pagina non trovata
            </Typography>
            <Typography variant="body1" color="textSecondary">
                Spiacenti, la pagina che stai cercando non esiste.
            </Typography>
        </Box>
    );
};

export default NotFound;