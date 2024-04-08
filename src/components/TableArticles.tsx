import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsData, selectInfoSearch, setInfoSearch } from "../redux/productsSlice";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";

const TableArticles: React.FC<{ isClickable: boolean }> = ({ isClickable }) => {

    const data = useSelector(selectProductsData);
    const infoSearch = useSelector(selectInfoSearch);
    const startIdx = 0;
    const endIdx = Math.min(infoSearch.RowForPage, data.length);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePositionClick = (position: string) => {
        dispatch(setInfoSearch({ ...infoSearch, IndexPage: 0 }));
        navigate(`/articles-by-position/${position}`, {
            state: {
                position: position
            }
        });
    };

    return (
        <TableContainer component={Paper} sx={{ minHeight: 0 }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableCell><strong>Posizione</strong></TableCell>
                        <TableCell><strong>Riferimento</strong></TableCell>
                        <TableCell><strong>Codice</strong></TableCell>
                        <TableCell><strong>Descrizione</strong></TableCell>
                        <TableCell><strong>Listino</strong></TableCell>
                        <TableCell><strong>Netto</strong></TableCell>
                        <TableCell><strong>Esistenza</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(startIdx, endIdx).map((product) => (
                        <TableRow key={product.Codice} hover >
                            <TableCell>
                                {isClickable ?
                                    <Link underline="hover" component='button' color='black'
                                        onClick={() => handlePositionClick(product.Posizione)} >
                                        {product.Posizione}
                                    </Link>
                                    :
                                    product.Posizione
                                }

                            </TableCell>
                            <TableCell>{product.Riferimento}</TableCell>
                            <TableCell>{product.Codice}</TableCell>
                            <TableCell>{product.Descrizione}</TableCell>
                            <TableCell>€ {product.Listino}</TableCell>
                            <TableCell>€ {product.Netto}</TableCell>
                            <TableCell>{product.Esistenza}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableArticles;