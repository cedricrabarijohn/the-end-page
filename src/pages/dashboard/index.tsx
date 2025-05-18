import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import DashboardHeader from '@/components/organisms/dashboard/DashboardHeader';
import Protected from '@/components/organisms/protected/Protected';
import { useUserStore } from '@/stores/useUserStore';
import MyPages from '@/components/organisms/dashboard/tabs/MyPages';
import CreatePage from '@/components/organisms/dashboard/tabs/CreatePage';
import Analytics from '@/components/organisms/dashboard/tabs/Analytics';

const Dashboard: NextPage = () => {
    const [activeTab, setActiveTab] = useState<'myPages' | 'create' | 'analytics'>('myPages');

    // Mock data for demonstration
    const mockExitPages = [
        { id: '1', title: 'Quitting My Job', views: 245, created: '2023-10-15', status: 'active' },
        { id: '2', title: 'Relationship Goodbye', views: 518, created: '2023-09-22', status: 'active' },
        { id: '3', title: 'Farewell College', views: 127, created: '2023-08-05', status: 'draft' },
    ];

    const [existingPages] = useState(mockExitPages);

    const { user } = useUserStore();

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
                        <MyPages pages={existingPages} onClickCta={() => setActiveTab('create')} />
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
