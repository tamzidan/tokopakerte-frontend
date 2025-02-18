// src/context/AuthContext.js
import { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isGuest, setIsGuest] = useState(true); // Tambahkan state untuk guest mode
    const navigate = useNavigate();
    
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            setToken(response.data.token);
            setIsGuest(false); // Set isGuest ke false ketika user login
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
            setIsGuest(false); // Set isGuest ke false ketika user register
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            alert('Registrasi gagal: Periksa kembali data yang Anda masukkan');
        }
    };

    const logout = () => {
        setToken('');
        setIsGuest(true); // Set isGuest ke true ketika user logout
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