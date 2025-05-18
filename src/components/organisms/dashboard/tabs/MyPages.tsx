import { API_ROUTES } from "@/globals";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export interface MyPagesProps {
    onClickCta?: () => void;
    pages: any[];
}

const MyPages: React.FC<MyPagesProps> = ({
    onClickCta,
    pages
}) => {
    const [loading, setLoading] = useState(false);
    const onDelete = async (pageId: any) => {
        try {
            setLoading(true);
            const resp = await axios.post(API_ROUTES.USER.PAGES.DELETE, {
                data: {
                    pageId: pageId
                }
            });
            toast.success('Deleted successfully');
            window.location.reload();
        } catch {
            toast.error('Error');
        } finally {
            setLoading(false);
        };
    };

    return <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">My pages</h2>
            <button
                onClick={() => onClickCta?.()}
                className="cta-gradient text-black font-bold py-2 px-6 rounded-full transition transform hover:scale-105"
            >
                + Create
            </button>
        </div>

        {/* Pages List */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pages.map((page) => (
                            <tr key={page.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{page.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {page.status === 'published' ? 'Active' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.views}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-3">
                                        {/* <button className="text-blue-600 hover:text-blue-900">Edit</button> */}
                                        <button onClick={() => onDelete()} className="text-red-600 hover:text-red-900">Delete</button>
                                        <button className="text-gray-600 hover:text-gray-900">Share</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
};

export default MyPages;