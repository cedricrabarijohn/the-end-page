export interface AnalyticsProps { }

const Analytics: React.FC<AnalyticsProps> = () => {
    return <div>
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
{/* 
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-bold mb-4">Performance by Page</h3>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500">Chart will be displayed here</p>
            </div>
        </div> */}

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
                            <i className={`fas ${activity.action.includes('Viewed') ? 'fa-eye' :
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
};

export default Analytics;