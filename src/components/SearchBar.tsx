import React from 'react';
import { SearchBarProps } from '../utilities/types';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formElement = event.currentTarget;
        const data = new FormData(formElement);
        const search = data.get('search') as string;
        onSearch(search);
    };

    return (
        <Box component='form' onSubmit={handleSearch}>
            <TextField
                placeholder="Cerca..."
                name='search'
                label='search'
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end' >
                            <IconButton type="submit" sx={{ '&:hover': { color: '#1976D2', backgroundColor: 'transparent' } }}>
                                <SearchIcon fontSize='large' />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{ mt: 3, mb: 3 }}
            />
        </Box>
    );
};

export default SearchBar;