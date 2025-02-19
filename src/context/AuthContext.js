import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isGuest, setIsGuest] = useState(!localStorage.getItem('token')); // Perbaikan logika guest
    const navigate = useNavigate();
    
    // Tambahkan effect untuk memeriksa token saat komponen dimuat
    useEffect(() => {
        const checkTokenValidity = async () => {
            if (token) {
                try {
                    // Tambahkan endpoint untuk validasi token di backend Laravel
                    await axios.get('http://localhost:8000/api/validate-token', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setIsGuest(false);
                } catch (error) {
                    // Token tidak valid, logout
                    logout();
                }
            }
        };

        checkTokenValidity();
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            setToken(response.data.token);
            setIsGuest(false);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            alert('Login gagal: Periksa kembali email dan password Anda');
        }
    };

    const register = async (name, email, password, password_confirmation) => {
        try {
            const response = await axios.post('http://localhost:8000/api/register', { name, email, password, password_confirmation });
            setToken(response.data.token);
            setIsGuest(false);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            alert('Registrasi gagal: Periksa kembali data yang Anda masukkan');
        }
    };

    const logout = () => {
        setToken('');
        setIsGuest(true);
        localStorage.removeItem('token');
        navigate('/login');
    };

    const continueAsGuest = () => {
        setIsGuest(true);
        navigate('/dashboard');
    };

    return (
        <AuthContext.Provider value={{ token, isGuest, login, register, logout, continueAsGuest }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;