// src/components/DashboardTemplate.js
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

const DashboardTemplate = ({ logout, isGuest }) => {
    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-white text-xl font-bold">Dashboard</h1>
                        </div>
                        <div className="flex items-center">
                            {isGuest ? (
                                <div className="flex space-x-2">
                                    <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                        Login
                                    </a>
                                    <a href="/register" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                                        Register
                                    </a>
                                </div>
                            ) : (
                                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Disclosure>
        </div>
    );
};

export default DashboardTemplate;
