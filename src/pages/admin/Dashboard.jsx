import React from 'react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Revenue Placeholder', value: '$45,231', color: 'bg-primary' },
    { title: 'Total Products', value: '156', color: 'bg-accent' },
    { title: 'New Inquiries', value: '24', color: 'bg-warning' },
    { title: 'Active Visitors', value: '312', color: 'bg-success' }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg ${stat.color} text-white flex items-center justify-center text-xl font-bold`}>
              #
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-3xl font-bold text-secondary">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Recent Inquiries</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center p-4 border border-gray-50 rounded-lg bg-gray-50">
                <div>
                  <p className="font-semibold text-secondary">John Doe - Tech Corp</p>
                  <p className="text-sm text-gray-500">Interested in Premium Bucket 20L</p>
                </div>
                <span className="px-3 py-1 bg-warning/20 text-warning text-xs font-bold rounded-full">New</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors font-medium">
              + Add New Product
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors font-medium">
              + Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
