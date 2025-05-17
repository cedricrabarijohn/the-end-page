import { IComponentWithChildren } from "@/app";
import { useEffect, useState } from "react";

export interface AlertProps extends IComponentWithChildren {
    type: 'error' | 'success' | 'info' | 'warning';
}

const Alert: React.FC<AlertProps> = ({ children, type }) => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        setIsVisible(true);
        return () => setIsVisible(false);
    }, []);

    const getIcon = () => {
        switch (type) {
            case 'error':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'success':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'info':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    const getStyles = () => {
        const baseStyles = "flex items-center p-2 rounded-lg shadow-md border-l-4 mb-4 transition-all duration-300";
        
        switch (type) {
            case 'error':
                return `${baseStyles} bg-red-50 text-red-800 border-red-500`;
            case 'success':
                return `${baseStyles} bg-green-50 text-green-800 border-green-500`;
            case 'info':
                return `${baseStyles} bg-blue-50 text-blue-800 border-blue-500`;
            case 'warning':
                return `${baseStyles} bg-yellow-50 text-yellow-800 border-yellow-500`;
            default:
                return baseStyles;
        }
    };

    return (
        <div 
            className={`${getStyles()} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            role="alert"
        >
            <div className="mr-3 flex-shrink-0">{getIcon()}</div>
            <div className="flex-1 text-[14px]">{children}</div>
        </div>
    );
};

export default Alert;