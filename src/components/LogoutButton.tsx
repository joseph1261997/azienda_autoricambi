import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import api from '../utilities/api';
import Button from '@mui/material/Button';

function LogoutButton({ isDrawer }: { isDrawer: boolean }) {

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await api.get('/logout');
            if (response.status === 200) {
                dispatch(logout());
            }
        } catch (error) {
            console.log("Errore nel logout: ", error);
        }
    };

    return (
        <Button variant={isDrawer ? 'text' : 'contained'} sx={{ textTransform: 'none', color: isDrawer ? 'black' : 'primary', fontSize: 'inherit' }} onClick={handleLogout}>
            Logout
        </Button>
    );
}

export default LogoutButton;