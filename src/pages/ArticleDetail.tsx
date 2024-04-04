import { useLocation } from "react-router-dom";
import { Product } from '../utilities/types';
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const ArticleDetail: React.FC = () => {

    const location = useLocation();
    const product: Product = location.state?.product;

    return (
        product ? (
            <Box >
                <Typography variant="h3" align="center" sx={{ mt: 2 }}>Dettagli del Prodotto</Typography>
                <List>
                    <ListItem>
                        <ListItemText primary={<strong>Posizione</strong>} secondary={product.Posizione} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={<strong>Riferimento</strong>} secondary={product.Riferimento} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={<strong>Codice Raw</strong>} secondary={product.CodiceRaw} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={<strong>Codice</strong>} secondary={product.Codice} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={<strong>Descrizione</strong>} secondary={product.Descrizione} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={<strong>Prezzo</strong>} secondary={`€ ${product.Prezzo}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={<strong>Aliquota</strong>} secondary={`${product.Aliq}%`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={<strong>Esistenza</strong>} secondary={product.Esistenza.toString()} />
                    </ListItem>
                </List>
            </Box>
        ) : (
            <Typography variant="h3" align="center" marginTop={2} color={'red'}>Articolo non trovato</Typography>
        )
    );
};

export default ArticleDetail;