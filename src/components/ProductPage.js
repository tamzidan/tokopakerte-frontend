import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ProductContext from '../context/ProductContext';
import DashboardTemplate from './DashboardTemplate';

const ProductPage = () => {
    const { logout, isGuest } = useContext(AuthContext);
    const { products, fetchProducts } = useContext(ProductContext);
    const navigate = useNavigate();

    // Fetch produk saat komponen dimuat
    useEffect(() => {
        if (!isGuest) {
            fetchProducts();
        }
    }, [isGuest]);

    return (
        <div>
            <DashboardTemplate logout={logout} isGuest={isGuest} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {isGuest ? (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                        <p className="text-yellow-700">
                            Anda sedang menggunakan akses terbatas sebagai tamu. 
                            Silakan <a href="/login" className="underline">login</a> atau 
                            <a href="/register" className="underline"> register </a> 
                            untuk mengakses semua fitur.
                        </p>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Daftar Produk</h2>
                            <button 
                                onClick={() => navigate('/products/add')}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                + Tambah Produk
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {products.map(product => (
                                <div key={product.id} className="bg-white shadow-md rounded-lg p-6">
                                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                    <p className="text-gray-600 mb-2">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-green-600 font-bold">
                                            Rp {product.price.toLocaleString()}
                                        </span>
                                        <span className="text-gray-500">
                                            Stok: {product.stock}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;