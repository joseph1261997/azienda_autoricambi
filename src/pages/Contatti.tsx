import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import '../styles/Contatti.css'

const Contatti: React.FC = () => {
    return (

        <Container id='contact-container'>
            
                <Typography variant="h4" align="center"><strong>PER QUALSIASI INFORMAZIONE O PREVENTIVO NON ESITARE A CONTATTARCI!</strong></Typography>
                <Typography variant="h4" align="center"><Link href="mailto:info@raiadautoricambi.it">info@raiadautoricambi.it</Link></Typography>
                <Typography variant="body1" align="center"><Link href="https://files.synapp.it/56246/editor/files/Modello%20di%20esercizio%20dei%20diritti.pdf" target="_blank">Visualizza modulo sulla privacy</Link></Typography>
                <Typography variant="h5" align="center"><strong>CHIAMACI</strong></Typography>
                <Typography variant="h5" align="center">+39 0932 903777</Typography>
                <Typography variant="h5" align="center">INVIACI UN MESSAGGIO SU <strong>WHATSAPP</strong></Typography>
                <Typography variant="h5" align="center">333 7162013</Typography>
            
        </Container>

    );
};

export default Contatti;