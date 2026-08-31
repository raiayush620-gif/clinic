export const loginNotificationTemplate = (userName, time) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222222; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #245B45;">New Login Detected</h2>
      <p>Hello <strong>${userName}</strong>,</p>
      <p>A successful login to your account was detected.</p>
      <p><strong>Login Time:</strong> ${time}</p>
      <p>If this was you, no action is required.</p>
      <p>If you do not recognize this login, please contact the clinic immediately or change your password.</p>
      <br>
      <p>Regards,</p>
      <p><strong>Dr. Anoop Kumar Rai Homeopathic Clinic</strong><br>Golambar, Buxar</p>
    </div>
  `;
};

export const appointmentRequestTemplate = (name, date, time, type) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222222; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #245B45;">Appointment Request Received</h2>
      <p>Hello <strong>${name}</strong>,</p>
      <p>Your appointment request has been received successfully.</p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Consultation Type:</strong> ${type}</li>
        <li><strong>Status:</strong> <span style="color: #d97706;">Pending Confirmation</span></li>
      </ul>
      <p>The clinic will review your request and contact you regarding confirmation.</p>
      <br>
      <p>Regards,</p>
      <p><strong>Dr. Anoop Kumar Rai Homeopathic Clinic</strong><br>Golambar, Buxar</p>
    </div>
  `;
};

export const appointmentStatusTemplate = (name, date, time, status) => {
  let statusColor = status === 'confirmed' ? '#059669' : (status === 'cancelled' ? '#dc2626' : '#2563eb');
  
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222222; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #245B45;">Appointment Update</h2>
      <p>Hello <strong>${name}</strong>,</p>
      <p>Your appointment on <strong>${date}</strong> at <strong>${time}</strong> has been <strong style="color: ${statusColor}; text-transform: capitalize;">${status}</strong>.</p>
      <p>If you have any questions, feel free to contact us.</p>
      <br>
      <p>Regards,</p>
      <p><strong>Dr. Anoop Kumar Rai Homeopathic Clinic</strong><br>Golambar, Buxar</p>
    </div>
  `;
};
