import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await api.get('/appointments/my');
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h2>
            <p className="text-gray-600 mt-1">Manage your appointments and health journey.</p>
          </div>
          <a href="/ai-assistant" className="btn-secondary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Ask AI Assistant
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">My Appointments</h3>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading appointments...</div>
          ) : appointments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">You have no appointments yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm">
                    <th className="p-4 font-semibold">Date & Time</th>
                    <th className="p-4 font-semibold">Consultation Type</th>
                    <th className="p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {appointments.map((apt) => (
                    <tr key={apt._id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{new Date(apt.date).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{apt.time}</div>
                      </td>
                      <td className="p-4 text-gray-700">{apt.consultationType}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(apt.status)}`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
