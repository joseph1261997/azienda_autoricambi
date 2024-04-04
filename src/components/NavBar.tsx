import React, { useEffect, useState } from 'react';
import { Link as RouterLink, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { selectIsLogged } from '../redux/authSlice';
//utilities
import api from '../utilities/api';
import { User } from '../utilities/types';
//MUI Component
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
//MUI Icon
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
//My Component
import LogoutButton from './LogoutButton';
//CSS
import '../styles/NavBar.css';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const isLogged = useSelector(selectIsLogged);
    const isSmallScreen = useMediaQuery('(max-width:750px)');
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [image, setImage] = useState<string | null>(null);
    const user: User | null = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {

        api.get('/get-info-societa-logo', {
            responseType: "arraybuffer"
        })
            .then((res) => {
                // Converti l'array di byte in base64
                const base64 = btoa(
                    new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                );
                // Imposta l'immagine nel tuo componente React
                setImage(base64);
            })
            .catch((error) => {
                console.error("Errore durante la richiesta GET:", error);
            });
    }, []);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <AppBar position="sticky" sx={{ bgcolor: '#fff' }}>
            <Toolbar>
                {isSmallScreen &&
                    <IconButton edge="start" sx={{ color: 'black' }} aria-label="menu" onClick={handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                }

                <Link href='/' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: '5px' }}>
                    <img src={`data:image/png;base64,${image}`} alt="Raiad di Roccasalva Pietro Sas" style={{ height: '50px' }} />
                </Link>

                {!isSmallScreen &&
                    <Grid >
                        <NavLink className={({ isActive }) => isActive ? 'active' : 'inactive'} to="/" >Home</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'active' : 'inactive'} to="/contatti" >Contatti</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'active' : 'inactive'} to="/dove-siamo" >Dove siamo</NavLink>
                    </Grid>
                }

                <Box sx={{ ml: 'auto' }}> {/* Sposta a destra il pulsante di login */}
                    <Grid sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Typography variant='h6' component='span' color='text.primary'> {user?.username} </Typography>
                        {!isSmallScreen && (isLogged ? <LogoutButton isDrawer={false} /> :
                            <>
                                <Button variant="contained" color="primary" onClick={() => navigate('/login')} >Login</Button>
                                <Button variant="contained" color="primary" onClick={() => navigate('/register')} >Registrati</Button>
                            </>
                        )}
                    </Grid>
                </Box>

            </Toolbar>
            <Drawer open={drawerOpen} onClose={handleDrawerClose}>
                <List>
                    <ListItem sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={`data:image/png;base64,${image}`} alt="Raiad di Roccasalva Pietro Sas" style={{ height: '50px' }} />
                    </ListItem>
                    <ListItemButton component={RouterLink} to="/" onClick={handleDrawerClose}>
                        <HomeIcon sx={{ marginRight: 1 }} />
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    <ListItemButton component={RouterLink} to="/contatti" onClick={handleDrawerClose}>
                        <ContactsIcon sx={{ marginRight: 1 }} />
                        <ListItemText primary="Contatti" />
                    </ListItemButton>
                    <ListItemButton component={RouterLink} to="/dove-siamo" onClick={handleDrawerClose}>
                        <LocationOnIcon sx={{ marginRight: 1 }} />
                        <ListItemText primary="Dove siamo" />
                    </ListItemButton>
                    {isLogged ?
                        <ListItemButton component={RouterLink} to="/" onClick={handleDrawerClose}>
                            <LogoutIcon sx={{ marginRight: 1 }} />
                            <LogoutButton isDrawer={true} />
                        </ListItemButton>
                        : <>
                            <ListItemButton component={RouterLink} to="/login" onClick={handleDrawerClose}>
                                <LoginIcon sx={{ marginRight: 1 }} />
                                <ListItemText primary="Login" />
                            </ListItemButton>

                            <ListItemButton component={RouterLink} to="/register" onClick={handleDrawerClose}>
                                <AppRegistrationIcon sx={{ marginRight: 1 }} />
                                <ListItemText primary="Registrati" />
                            </ListItemButton>
                        </>
                    }

                </List>
            </Drawer>
        </AppBar >
    );
};

export default Navbar;