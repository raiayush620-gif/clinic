import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get('/admin/appointments');
      setAppointments(data);
    } catch (error) {
      console.error('Failed to fetch appointments', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/admin/appointments/${id}/status`, { status: newStatus });
      fetchAppointments();
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Failed to update status');
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

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
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
            <p className="text-gray-600 mt-1">Manage appointments and clinic schedule</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-primary/10 p-4 rounded-lg text-center min-w-[120px]">
              <div className="text-2xl font-bold text-primary">{appointments.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg text-center min-w-[120px]">
              <div className="text-2xl font-bold text-yellow-600">{appointments.filter(a => a.status === 'pending').length}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
            <h3 className="text-xl font-bold text-gray-900">All Appointments</h3>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading appointments...</div>
          ) : filteredAppointments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No appointments found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm">
                    <th className="p-4 font-semibold">Patient</th>
                    <th className="p-4 font-semibold">Contact</th>
                    <th className="p-4 font-semibold">Date & Time</th>
                    <th className="p-4 font-semibold">Type</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt._id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{apt.name}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-900">{apt.phone}</div>
                        <div className="text-xs text-gray-500">{apt.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-900">{new Date(apt.date).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">{apt.time}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-700">{apt.consultationType}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize inline-block ${getStatusColor(apt.status)}`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <select 
                          value={apt.status}
                          onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                          className="text-xs border border-gray-300 rounded p-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirm</option>
                          <option value="completed">Complete</option>
                          <option value="cancelled">Cancel</option>
                        </select>
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

export default AdminDashboard;
