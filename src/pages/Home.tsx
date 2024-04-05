import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData, setResult, setInfoSearch, selectSearchResult, selectInfoSearch } from '../redux/productsSlice';
import api from "../utilities/api";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ErrorAlert from "../components/ErrorAlert";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import TableArticles from "../components/TableArticles";
import { CssBaseline } from "@mui/material";

const Home: React.FC = () => {

    const result = useSelector(selectSearchResult);
    const infoSearch = useSelector(selectInfoSearch);
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [field, setField] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {

        const fetchData = async () => {
            console.log("sono dentro fetchData");
            try {
                console.log("sono dentro fetchData DENTRO TRY");
                setIsLoading(true);
                const response = await api.get(`/search-articles?field=${field}&indexPage=${infoSearch.IndexPage}&rowsForPage=${infoSearch.RowForPage}`);
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
            console.log('L\'utente ha refreshato la pagina');
            // Metti qui la logica da eseguire quando l'utente fa clic sul pulsante "Indietro"
            isMounted.current = false;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };

    }, [field, infoSearch.IndexPage, infoSearch.RowForPage]);

    const handleSearch = (value: string) => {
        isMounted.current = false;
        setField(value);
        dispatch(setInfoSearch({ ...infoSearch, IndexPage: 0 }));
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        isMounted.current = false;
        console.log(event);
        dispatch(setInfoSearch({ ...infoSearch, IndexPage: newPage - 1 }));
    };

    const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
        isMounted.current = false;
        const rowforpage = event.target.value;
        const firstProductIdx = (infoSearch.IndexPage) * infoSearch.RowForPage + 1; // Calcola l'indice del primo articolo visualizzato
        const newPage = Math.floor(firstProductIdx / +rowforpage); // Calcola la nuova pagina in base al nuovo numero di articoli per pagina
        dispatch(setInfoSearch({ ...infoSearch, IndexPage: newPage, RowForPage: +rowforpage }));
    };

    return (
        <CssBaseline>

            <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center", flex: 1, gap: 1, minHeight: 0 }}>

                <ErrorAlert />

                {result.Sucess ?
                    (isLoading ? (<Loading />) :
                        (
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', width: '100%' }}>
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
                                    <SearchBar onSearch={handleSearch} />
                                </Box>
                                <TableArticles isClickable={true}/>
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
};

export default Home;