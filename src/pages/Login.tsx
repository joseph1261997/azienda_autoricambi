import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { User } from '../utilities/types';
import api from '../utilities/api';
import Copyright from '../components/Copyright';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({});

        const formElement = event.currentTarget; //evita bubbling

        const data = new FormData(formElement);
        const username = data.get('username') as string;
        const password = data.get('password') as string;

        let newErrors: { [key: string]: string } = {};

        if (!username) {
            newErrors = { ...newErrors, username: 'Campo obbligatorio' };
        }
        if (!password) {
            newErrors = { ...newErrors, password: 'Campo obbligatorio' };
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }
        else {
            try {
                const response = await api.get('/login', { params: { username, password } });
                if (response.data !== 'bad credentials') {
                    const user: User = { username: username.trim(), password: password.trim() }
                    dispatch(login(user));
                    navigate('/');
                }
                else {
                    setErrors({ badCredential: 'Credenziali errate' });
                    formElement.reset();
                }
            } catch (error: any) {
                console.error('Errore nel login:', error)
                setErrors({ errorLogin: `Errore nel Login: ${error.message}` });
            }
        }
    };

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                <Avatar sx={{ border: '1px solid', height: 100, width: 100, margin: 2 }} src='logo.jpg' />

                <Typography component="h1" variant="h5">Login</Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        error={!!errors.username}
                        helperText={errors.username}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />

                    <TextField
                        error={!!errors.password}
                        helperText={errors.password}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Login</Button>

                    {errors.badCredential && <Typography variant="body2" color="error" align='center'>{errors.badCredential}</Typography>}
                    {errors.errorLogin && <Typography variant="body2" color="error" align='center'>{errors.errorLogin}</Typography>}

                </Box>
            </Box>
            <Copyright sx={{ mt: 3 }} />
        </Container>

    );
}