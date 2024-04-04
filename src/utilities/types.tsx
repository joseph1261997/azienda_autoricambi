export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

export interface Info {
    ragioneSociale: string,
    partitaIva: string,
    codiceFiscale: string,
    indirizzo: string,
    cap: string,
    localita: string,
    prov: string
}

export interface InfoSearch {
    TotRows: number;
    IndexPage: number;
    RowForPage: number;
}

export interface Product {
    Posizione: string;
    Riferimento: string;
    CodiceRaw: string;
    Codice: string;
    Descrizione: string;
    Prezzo: number;
    Aliq: number;
    Esistenza: number;
}

export interface ProductsState {
    data: Product[];
    result: SearchResult;
    infoSearch: InfoSearch;
}

export interface SearchBarProps {
    onSearch: (value: string) => void;
}

export interface SearchResult {
    Sucecss: boolean;
    Errors: string[];
    Warnings: string[];
    Infos: string[];
}

export interface TableArticlesProps {
    handleClick: (product: Product) => void;
}

export interface User {
    username: string;
    password: string;
}