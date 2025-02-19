import { useContext, useEffect } from 'react';
import ProductContext from '../context/ProductContext';
import AuthContext from '../context/AuthContext';

const ProductList = () => {
    const { products, fetchProducts } = useContext(ProductContext);
    const { isGuest } = useContext(AuthContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    if (isGuest) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                    <p className="text-yellow-700">
                        Anda perlu login untuk melihat daftar produk lengkap.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Daftar Produk</h1>
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
    );
};

export default ProductList;