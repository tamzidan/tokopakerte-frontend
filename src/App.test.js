// src/App.js
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const AppWrapper = () => {
    const navigate = useNavigate();
    return (
        <AuthProvider navigate={navigate}>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </AuthProvider>
    );
};

const App = () => {
    return (
        <Router>
            <AppWrapper />
        </Router>
    );
};

export default App;
