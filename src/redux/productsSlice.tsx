import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { InfoSearch, Product, ProductsState, SearchResult } from '../utilities/types';

const initialState: ProductsState = {
    data: [],
    result: { Sucess: true, Errors: [], Warnings: [], Infos: [] },
    infoSearch: { TotRows: 0, IndexPage: 0, RowForPage: 10 },
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<Product[]>) {
            state.data = action.payload;
        },
        setResult(state, action: PayloadAction<SearchResult>) {
            state.result = action.payload;
        },
        setInfoSearch(state, action: PayloadAction<InfoSearch>) {
            state.infoSearch = action.payload;
        },
    },
});

export const { setData, setResult, setInfoSearch } = productsSlice.actions;
export const selectProductsData = (state: RootState) => state.products.data;
export const selectSearchResult = (state: RootState) => state.products.result;
export const selectInfoSearch = (state: RootState) => state.products.infoSearch;
export default productsSlice.reducer;