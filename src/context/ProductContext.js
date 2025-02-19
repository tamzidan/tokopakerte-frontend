import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const { token } = useContext(AuthContext);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Gagal mengambil produk:', error);
        }
    };

    const fetchProductById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/products/${id}`);
            setCurrentProduct(response.data);
        } catch (error) {
            console.error('Gagal mengambil detail produk:', error);
        }
    };

    const createProduct = async (productData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/products', productData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Refresh produk setelah berhasil membuat
            await fetchProducts();
            return response.data;
        } catch (error) {
            console.error('Gagal membuat produk:', error);
            throw error;
        }
    };

    return (
        <ProductContext.Provider value={{ 
            products, 
            currentProduct, 
            fetchProducts, 
            fetchProductById, 
            createProduct 
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;