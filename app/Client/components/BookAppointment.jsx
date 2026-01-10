import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiRequest } from '../src/api/client';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken) return;
    const controller = new AbortController();
    setLoadingDoctors(true);
    apiRequest('/users/doctors', { token: accessToken, signal: controller.signal })
      .then(setDoctors)
      .catch((error) => setFeedback(error.message))
      .finally(() => setLoadingDoctors(false));

    return () => controller.abort();
  }, [accessToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.doctor) tempErrors.doctor = 'Please select a doctor';
    if (!formData.date) tempErrors.date = 'Date is required';
    if (!formData.time) tempErrors.time = 'Time is required';
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!accessToken) {
      setFeedback('Please login to book an appointment');
      return;
    }

    try {
      setSubmitting(true);
      setFeedback(null);
      const scheduledAt = new Date(`${formData.date}T${formData.time}`);

      await apiRequest('/appointments', {
        method: 'POST',
        body: {
          doctorId: formData.doctor,
          scheduledAt,
          reason: formData.notes,
        },
        token: accessToken,
      });

      setFeedback('Appointment booked successfully!');
      setFormData({ doctor: '', date: '', time: '', notes: '' });
    } catch (error) {
      setFeedback(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Doctor Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Select Doctor</label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            disabled={loadingDoctors}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white disabled:bg-gray-200 disabled:text-gray-500"
          >
            <option value="">{loadingDoctors ? 'Loading doctors...' : '-- Choose Doctor --'}</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.fullName}
              </option>
            ))}
          </select>
          {errors.doctor && <p className="text-red-500 text-sm mt-1">{errors.doctor}</p>}
        </div>

        {/* Date Picker */}
        <div>
          <label className="block mb-1 font-medium">Appointment Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        {/* Time Picker */}
        <div>
          <label className="block mb-1 font-medium">Appointment Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
        </div>

        {/* Notes */}
        <div>
          <label className="block mb-1 font-medium">Description (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            placeholder="Mention any symptoms or notes"
          ></textarea>
        </div>

        {feedback && <p className="text-center text-sm text-blue-600 dark:text-blue-400">{feedback}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          {submitting ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
