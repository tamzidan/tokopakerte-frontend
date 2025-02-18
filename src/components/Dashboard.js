// src/components/Dashboard.js
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import DashboardTemplate from './DashboardTemplate';

const Dashboard = () => {
    const { logout, isGuest } = useContext(AuthContext);
    
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
                ) : null}
                
                {/* Konten dashboard */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Dashboard Content</h2>
                    {isGuest ? (
                        // Konten terbatas untuk tamu
                        <div>
                            <p>Ini adalah konten yang bisa diakses tamu</p>
                            {/* Tambahkan konten terbatas lainnya di sini */}
                        </div>
                    ) : (
                        // Konten lengkap untuk user yang sudah login
                        <div>
                            <p>Selamat datang! Ini adalah konten lengkap dashboard</p>
                            {/* Tambahkan konten lengkap lainnya di sini */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
