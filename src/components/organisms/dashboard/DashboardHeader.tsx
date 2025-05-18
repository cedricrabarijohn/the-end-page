import { IUserDetails } from "@/app";
import { logout } from "@/axios/auth";
import { PAGES_ROUTES } from "@/globals";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface DashboardHeaderProps {
    title?: string;
    user?: IUserDetails;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    
    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);
    
    const handleLogout = async() => {
        // Implement logout functionality here
        console.log("Logging out...");
        try {
            await logout();
            toast.success("You've been logged out");
            window.location.href = PAGES_ROUTES.AUTH.LOGIN
        } catch(err) {
            console.error(err);
        }
        // You could redirect to login page or call an API to logout
        // Example: router.push('/login')
    };
    
    return <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
                <button className="bg-gray-200 p-2 rounded-full">
                    <i className="fas fa-bell text-gray-600"></i>
                </button>
                <div className="flex items-center relative" ref={menuRef}>
                    <div 
                        className="avatar text-[12px] w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold relative cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {user && user?.firstname?.charAt(0).toUpperCase()}{user && user?.lastname?.charAt(0).toUpperCase()}
                    </div>
                    
                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                            {user && (
                                <div className="px-4 py-2 border-b">
                                    <p className="text-sm font-medium text-gray-900">{user.firstname} {user.lastname}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                            )}
                            <button 
                                onClick={handleLogout}
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <i className="fas fa-sign-out-alt mr-2 text-red-500"></i>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </header>
}

export default DashboardHeader;