import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import DashboardHeader from '@/components/organisms/dashboard/DashboardHeader';
import Protected from '@/components/organisms/protected/Protected';
import { useUserStore } from '@/stores/useUserStore';
import MyPages from '@/components/organisms/dashboard/tabs/MyPages';
import CreatePage from '@/components/organisms/dashboard/tabs/CreatePage';
import Analytics from '@/components/organisms/dashboard/tabs/Analytics';
import { IPageData } from '@/app';
import axios from 'axios';
import { API_ROUTES } from '@/globals';

const Dashboard: NextPage = () => {
    const [activeTab, setActiveTab] = useState<'myPages' | 'create' | 'analytics'>('myPages');
    const [loading, setLoading] = useState(false);
    const [userPages, setUserPages] = useState<IPageData[]>([]); // Replace with actual type if available
    // Mock data for demonstration

    const { user } = useUserStore();

    const fetchUserPages = async () => {
        try {
            setLoading(true);
            const resp = await axios.get(API_ROUTES.USER.PAGES.GET);
            setUserPages(resp?.data);
        } catch(err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            fetchUserPages();
        };
    }, [user]);

    return (
        <Protected>
            <Head>
                <title>Dashboard | The End Page</title>
                <meta name="description" content="Manage your dramatic exit pages" />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                {user && <DashboardHeader title="Dashboard" user={user} />}
                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    {/* Tabs */}
                    <div className="flex border-b mb-8">
                        <button
                            onClick={() => setActiveTab('myPages')}
                            className={`px-6 py-3 font-medium ${activeTab === 'myPages' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
                        >
                            My pages
                        </button>
                        <button
                            onClick={() => setActiveTab('create')}
                            className={`px-6 py-3 font-medium ${activeTab === 'create' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
                        >
                            Create
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`px-6 py-3 font-medium ${activeTab === 'analytics' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
                        >
                            Analytics
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'myPages' && (
                        <MyPages pages={userPages} onClickCta={() => setActiveTab('create')} />
                    )}

                    {activeTab === 'create' && (
                        <CreatePage />
                    )}

                    {activeTab === 'analytics' && (
                        <Analytics />
                    )}
                </main>
            </div>
        </Protected>
    );
};

export default Dashboard;
