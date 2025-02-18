// src/components/Login.js
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const { login, error, continueAsGuest } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full p-2 border rounded mb-3" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-2 border rounded mb-3" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button className="w-full bg-blue-500 text-white py-2 rounded mb-2">Login</button>
                </form>
                <button 
                    onClick={continueAsGuest} 
                    className="w-full bg-gray-500 text-white py-2 rounded mb-2"
                >
                    Lanjutkan sebagai Tamu
                </button>
                <p className="text-center mt-4">
                    Belum punya akun? <Link to="/register" className="text-blue-500">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
