import { IUserDetails } from "@/app";
import React from "react";

export interface DashboardHeaderProps {
    title?: string;
    user?: IUserDetails;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, user }) => {
    return <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
                <button className="bg-gray-200 p-2 rounded-full">
                    <i className="fas fa-bell text-gray-600"></i>
                </button>
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        u
                    </div>
                </div>
            </div>
        </div>
    </header>
}

export default DashboardHeader;