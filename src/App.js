import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProductPage from './components/ProductPage';
import AddProductPage from './components/AddProductPage'; // Tambahkan import ini

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <ProductProvider>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/products" element={<ProductPage />} />
                        <Route path="/products/add" element={<AddProductPage />} /> {/* Tambahkan rute baru ini */}
                    </Routes>
                </ProductProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;