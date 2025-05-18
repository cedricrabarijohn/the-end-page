import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import DashboardHeader from '@/components/organisms/dashboard/DashboardHeader';
import Protected from '@/components/organisms/protected/Protected';

const Dashboard: NextPage = () => {
  const [activeTab, setActiveTab] = useState<'myPages' | 'create' | 'analytics'>('myPages');
  
  // Mock data for demonstration
  const mockExitPages = [
    { id: '1', title: 'Quitting My Job', views: 245, created: '2023-10-15', status: 'active' },
    { id: '2', title: 'Relationship Goodbye', views: 518, created: '2023-09-22', status: 'active' },
    { id: '3', title: 'Farewell College', views: 127, created: '2023-08-05', status: 'draft' },
  ];

  const [existingPages] = useState(mockExitPages);
  
  return (
    <Protected>
      <Head>
        <title>Dashboard | The End Page</title>
        <meta name="description" content="Manage your dramatic exit pages" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <DashboardHeader title="Dashboard" />
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
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">My pages</h2>
                <button 
                  onClick={() => setActiveTab('create')} 
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {existingPages.map((page) => (
                        <tr key={page.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{page.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              page.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {page.status === 'active' ? 'Active' : 'Draft'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.created}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.views}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button className="text-blue-600 hover:text-blue-900">Edit</button>
                              <button className="text-red-600 hover:text-red-900">Delete</button>
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
          )}

          {activeTab === 'create' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Create a New Exit Page</h2>
              
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="My Dramatic Exit"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tone
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {['Dramatic', 'Ironic', 'Cringe', 'Classy'].map((tone) => (
                      <div key={tone} className="flex items-center">
                        <input id={`tone-${tone}`} type="radio" name="tone" className="hidden peer" />
                        <label
                          htmlFor={`tone-${tone}`}
                          className="w-full p-3 text-center border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-red-500 peer-checked:text-red-500 hover:bg-gray-50"
                        >
                          {tone}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="message"
                    placeholder="Share your dramatic exit message here..."
                    rows={5}
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className={`h-16 rounded-lg bg-${['red', 'blue', 'purple', 'green', 'orange', 'gray'][i]}-100 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-${['red', 'blue', 'purple', 'green', 'orange', 'gray'][i]}-500`}></div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Add Media
                  </label>
                  <div className="flex space-x-4">
                    <button className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400">
                      <div className="text-center">
                        <i className="fas fa-image text-gray-400 text-2xl mb-2"></i>
                        <p className="text-sm text-gray-500">Add Image</p>
                      </div>
                    </button>
                    <button className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400">
                      <div className="text-center">
                        <i className="fas fa-film text-gray-400 text-2xl mb-2"></i>
                        <p className="text-sm text-gray-500">Add Video</p>
                      </div>
                    </button>
                    <button className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400">
                      <div className="text-center">
                        <i className="fas fa-music text-gray-400 text-2xl mb-2"></i>
                        <p className="text-sm text-gray-500">Add Audio</p>
                      </div>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full"
                  >
                    Save as Draft
                  </button>
                  <button
                    className="cta-gradient text-black font-bold py-2 px-6 rounded-full transition transform hover:scale-105"
                  >
                    Publish <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Analytics Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { title: 'Total Views', value: '890', icon: 'fas fa-eye', color: 'blue' },
                  { title: 'Pages Created', value: '3', icon: 'fas fa-file-alt', color: 'green' },
                  { title: 'Share Clicks', value: '45', icon: 'fas fa-share-alt', color: 'purple' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center mr-4`}>
                        <i className={`${stat.icon} text-${stat.color}-500 text-xl`}></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-lg font-bold mb-4">Performance by Page</h3>
                <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                  <p className="text-gray-500">Chart will be displayed here</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'Page Viewed', page: 'Quitting My Job', time: '2 hours ago' },
                    { action: 'Page Shared', page: 'Relationship Goodbye', time: '1 day ago' },
                    { action: 'Page Created', page: 'Farewell College', time: '3 days ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 mt-1">
                        <i className={`fas ${
                          activity.action.includes('Viewed') ? 'fa-eye' : 
                          activity.action.includes('Shared') ? 'fa-share-alt' : 'fa-plus'
                        } text-gray-500 text-sm`}></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.action}: <span className="text-blue-500">{activity.page}</span></p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </Protected>
  );
};

export default Dashboard;
