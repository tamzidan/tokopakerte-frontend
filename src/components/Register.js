// src/components/Register.js
import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register(formData.name, formData.email, formData.password, formData.password_confirmation);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Nama" className="w-full p-3 border rounded-lg" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" className="w-full p-3 border rounded-lg" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" className="w-full p-3 border rounded-lg" onChange={handleChange} required />
                    <input type="password" name="password_confirmation" placeholder="Konfirmasi Password" className="w-full p-3 border rounded-lg" onChange={handleChange} required />
                    <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">Daftar</button>
                </form>
                <p className="text-center mt-4">Sudah punya akun? <Link to="/login" className="text-blue-500">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;