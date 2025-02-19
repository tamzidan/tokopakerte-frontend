import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ProductContext from '../context/ProductContext';
import DashboardTemplate from './DashboardTemplate';

const AddProductPage = () => {
    const { logout, isGuest } = useContext(AuthContext);
    const { createProduct } = useContext(ProductContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        image_url: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct({
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock)
            });
            // Redirect ke halaman produk setelah berhasil
            navigate('/products');
        } catch (error) {
            alert('Gagal menambahkan produk');
        }
    };

    if (isGuest) {
        return (
            <div>
                <DashboardTemplate logout={logout} isGuest={isGuest} />
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
                        <p className="text-yellow-700">
                            Anda tidak memiliki akses untuk menambah produk.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <DashboardTemplate logout={logout} isGuest={isGuest} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-bold mb-6">Tambah Produk Baru</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nama Produk"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-3"
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Deskripsi Produk"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-3"
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Harga"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-3"
                            required
                        />
                        <input
                            type="number"
                            name="stock"
                            placeholder="Stok"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-3"
                            required
                        />
                        <input
                            type="url"
                            name="image_url"
                            placeholder="URL Gambar (opsional)"
                            value={formData.image_url}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-3"
                        />
                        <div className="flex justify-between">
                            <button 
                                type="submit" 
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Simpan Produk
                            </button>
                            <button 
                                type="button"
                                onClick={() => navigate('/products')}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;