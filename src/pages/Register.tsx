import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import api from '../utilities/api';
import { User } from '../utilities/types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';

export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({});

        const formElement = event.currentTarget; //evita bubbling

        const data = new FormData(formElement);
        const username = data.get('username') as string;
        const password = data.get('password') as string;
        const ripetiPassword = data.get('ripetiPassword') as string;
        const piva = data.get('Piva') as string;

        let newErrors: { [key: string]: string } = {};

        const validateField = (fieldName: string, fieldValue: string, regex: RegExp, errorMessage: string) => {
            const trimmedValue = fieldValue.trim();
            if (!trimmedValue) {
                newErrors[fieldName] = 'Campo obbligatorio';
            } else if (!regex.test(trimmedValue)) {
                newErrors[fieldName] = errorMessage;
            }
        };

        validateField('username', username, /^[a-zA-Z0-9_-]{5,20}$/, "L'username deve contenere almeno 5 caratteri e al massimo 20 e può contenere solo lettere, numeri, trattini e underscore");
        validateField('password', password, /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~]).{8,}$/, "La password deve contenere almeno 8 caratteri, almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale.");
        validateField('piva', piva, /^[0-9]{11}$/, 'La Partita Iva deve contenere 11 cifre');

        if (!ripetiPassword) {
            newErrors = { ...newErrors, ripetiPassword: 'Campo obbligatorio' };
        }
        if (ripetiPassword && (password !== ripetiPassword)) {
            newErrors = { ...newErrors, ripetiPassword: 'Le password non corrispondono' };
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // Submit the form if all fields are valid
            try {
                const response = await api.get('/register', { params: { username, password, piva } });

                if (response.status === 200 && response.data.Result.Sucess === true) {
                    const user: User = { username, password }
                    dispatch(login(user));
                    navigate('/');
                }
                else if(response.status === 200 && response.data.Result.Sucess === false){
                    setErrors({ errorRegister: `Errore in fase di registrazione: ${response.data.Result.Errors}`});
                    formElement.reset();
                }
                else {
                    setErrors({ errorRegister: `Errore in fase di registrazione: ${response.statusText}` });
                    formElement.reset();
                }
            } catch (error: any) {
                console.error('Errore nella registrazione:', error)
                setErrors({ errorRegister: `Errore in fase di registrazione: ${error.message}` });
                formElement.reset();
            }
        }
    };

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <Avatar sx={{ border: '1px solid', height: 100, width: 100, margin: 2 }} src='/favicon.ico' />

                <Typography component="h1" variant="h5">Registrati</Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={!!errors.username}
                                helperText={errors.username}
                                autoComplete="username"
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error={!!errors.password}
                                helperText={errors.password}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error={!!errors.ripetiPassword}
                                helperText={errors.ripetiPassword}
                                required
                                fullWidth
                                name="ripetiPassword"
                                label="Ripeti Password"
                                type="password"
                                id="RipetiPassword"
                                autoComplete="new-password"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error={!!errors.piva}
                                helperText={errors.piva}
                                required
                                fullWidth
                                label="Partita Iva"
                                name="Piva"
                                id="Piva"
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Registrati</Button>

                    {errors.errorRegister && <Typography variant="body2" color="error" align='center'>{errors.errorRegister}</Typography>}

                </Box>
            </Box>
            <Copyright sx={{ mt: 3 }} />
        </Container>
    );
}