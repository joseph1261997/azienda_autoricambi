import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectInfoSearch, selectSearchResult, setData, setInfoSearch, setResult } from "../redux/productsSlice";
import api from "../utilities/api";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Loading from "../components/Loading";
import Box from "@mui/material/Box";
import ErrorAlert from "../components/ErrorAlert";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableArticles from "../components/TableArticles";
import Pagination from "@mui/material/Pagination";

const ArticlesByPosition: React.FC = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const infoSearch = useSelector(selectInfoSearch);
    const result = useSelector(selectSearchResult);
    const isMounted = useRef(false);
    const field = location.state?.position;

    useEffect(() => {
        const fetchData = async () => {

            try {
                setIsLoading(true);
                const response = await api.get(`/search-positions?field=${field}&indexPage=${infoSearch.IndexPage}&rowsForPage=${infoSearch.RowForPage}`);
                const responseData = response.data;
                dispatch(setResult(responseData.Result));

                if (result.Sucess) {
                    dispatch(setData(responseData.Data));
                    dispatch(setInfoSearch(responseData.InfoSearch));
                }

                setIsLoading(false);

            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
                dispatch(setResult({ Sucess: false, Errors: ["Error occurred while fetching data"], Warnings: [], Infos: [] }));
            }
        };
        if (!isMounted.current) {
            fetchData();
        }

        isMounted.current = true;


        const handleBeforeUnload = () => {
            // l'utente refresha la pagina
            isMounted.current = false;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };


    }, [field, infoSearch.IndexPage, infoSearch.RowForPage]);

    const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
        isMounted.current = false;
        const rowforpage = event.target.value;
        const firstProductIdx = (infoSearch.IndexPage) * infoSearch.RowForPage + 1; // Calcola l'indice del primo articolo visualizzato
        const newPage = Math.floor(firstProductIdx / +rowforpage); // Calcola la nuova pagina in base al nuovo numero di articoli per pagina
        dispatch(setInfoSearch({ ...infoSearch, IndexPage: newPage, RowForPage: +rowforpage }));
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        console.log(event);
        isMounted.current = false;
        dispatch(setInfoSearch({ ...infoSearch, IndexPage: newPage - 1 }));
    };

    return (
        <CssBaseline>

            <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center", flex: 1, gap: 1, minHeight: 0 }}>

                <ErrorAlert />

                {result.Sucess ?
                    (isLoading ? (<Loading />) :
                        (
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', width: '100%', m: 2 }}>
                                    <InputLabel id="rows-for-page-select-autowidth-label" sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}>Articoli per pagina</InputLabel>
                                    <FormControl sx={{ mr: 'auto' }}>
                                        <Select
                                            labelId="rows-for-page-select-autowidth-label"
                                            value={infoSearch.RowForPage}
                                            onChange={handleChangeRowsPerPage}
                                        >
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={25}>25</MenuItem>
                                            <MenuItem value={50}>50</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <TableArticles isClickable={false} />
                                <Pagination
                                    count={Math.ceil(infoSearch.TotRows / infoSearch.RowForPage)}
                                    page={infoSearch.IndexPage + 1}
                                    onChange={handleChangePage}
                                    showFirstButton
                                    showLastButton
                                    color="primary"
                                    sx={{ mt: 'auto', mb: 1 }}
                                />

                            </>
                        )
                    ) : null}

            </Container>

        </CssBaseline>
    );
}

export default ArticlesByPosition;