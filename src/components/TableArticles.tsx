import { useSelector } from "react-redux";
import { selectProductsData, selectInfoSearch } from "../redux/productsSlice";
import { TableArticlesProps } from "../utilities/types";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


const TableArticles = ({ handleClick }: TableArticlesProps) => {

    const data = useSelector(selectProductsData);
    const infoSearch = useSelector(selectInfoSearch);
    const startIdx = 0;
    const endIdx = Math.min(infoSearch.RowForPage, data.length);

    return (
        <TableContainer component={Paper} sx={{ minHeight: 0 }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableCell><strong>Codice</strong></TableCell>
                        <TableCell><strong>Prezzo</strong></TableCell>
                        <TableCell><strong>Esistenza</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(startIdx, endIdx).map((product) => (
                        <TableRow key={product.Codice} hover onClick={() => handleClick(product)}>
                            <TableCell>{product.Codice}</TableCell>
                            <TableCell>€ {product.Prezzo}</TableCell>
                            <TableCell>{product.Esistenza}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableArticles;