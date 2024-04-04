import { useState, useEffect } from 'react';
import api from '../utilities/api';
import { Info } from '../utilities/types';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';



function Footer() {
    const [companyData, setCompanyData] = useState<Info>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/get-info-societa');
                setCompanyData(response.data);
            } catch (error) {
                console.error('Errore durante la richiesta:', error);
            }
        };

        fetchData();
    }, []);

    return (

        <Paper square sx={{ backgroundColor: '#1976D2', color: 'white', padding: '20px', mt: 'auto', width: '100%', }} elevation={3} component="footer" >
            <Container maxWidth="lg">
                <Typography variant="h6" component="h3">
                    {companyData?.ragioneSociale}
                </Typography>
                <Typography component="p">
                    Partita IVA: {companyData?.partitaIva} | Codice Fiscale: {companyData?.codiceFiscale} | Indirizzo: {companyData?.indirizzo} |
                    Cap: {companyData?.cap} | Località: {companyData?.localita} ({companyData?.prov})
                </Typography>
            </Container>
        </Paper>
    );
};

export default Footer;