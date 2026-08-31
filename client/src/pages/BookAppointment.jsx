import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookAppointment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    consultationType: 'New Consultation',
    date: '',
    time: '',
    message: ''
  });
  
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (formData.date) {
        try {
          const { data } = await api.get(`/appointments/slots?date=${formData.date}`);
          setAvailableSlots(data);
        } catch (err) {
          console.error('Error fetching slots', err);
        }
      }
    };
    fetchSlots();
  }, [formData.date]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.time) {
      return setError('Please select a time slot');
    }
    
    try {
      setError('');
      setLoading(true);
      await api.post('/appointments', formData);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-gray-100">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h2>
          <p className="text-gray-600 mb-6">Your appointment request has been successfully submitted. We will review and confirm it shortly.</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary w-full">Go to Dashboard</button>
        </div>
      </div>
    );
  }

  // Get tomorrow's date as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="py-12 bg-background min-h-[80vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6 text-center">Book an Appointment</h2>
          
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-6">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
                <select name="consultationType" value={formData.consultationType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
                  <option value="New Consultation">New Consultation</option>
                  <option value="Follow-up Consultation">Follow-up Consultation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
              <input type="date" name="date" required min={minDate} value={formData.date} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
            </div>

            {formData.date && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Time</label>
                {availableSlots.length === 0 ? (
                  <p className="text-red-500 text-sm">No available slots for this date.</p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {availableSlots.map(slot => (
                      <div 
                        key={slot}
                        onClick={() => setFormData({...formData, time: slot})}
                        className={`cursor-pointer text-center py-2 rounded-md border ${formData.time === slot ? 'bg-primary text-white border-primary' : 'bg-gray-50 border-gray-200 hover:border-primary text-sm'}`}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Health Concern / Message (Optional)</label>
              <textarea name="message" rows="3" value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"></textarea>
            </div>

            <button type="submit" disabled={loading || !formData.time} className="w-full btn-primary py-3">
              {loading ? 'Submitting...' : 'Confirm Booking Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
