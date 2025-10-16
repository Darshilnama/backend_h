const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();

// Middleware

app.use(cors());

// Alternative explicit configuration for all origins
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// }));

// Handle preflight requests for all routes
app.options('*', cors())

// const corsOptions = {
//   origin: function (origin, callback) {
//     // List of allowed origins
//     const allowedOrigins = [
//       'https://ayurved-a0e30.web.app',
//       'http://localhost:3000',
//       'https://localhost:3000' // Added https for localhost
//     ];
    
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Allow cookies if needed
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// };

// Middleware

app.use(express.json());

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email sending endpoint
app.post('/api/send-verification-email', async (req, res) => {
  try {
    const { to, otp } = req.body;

    if (!to || !otp) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and OTP are required' 
      });
    }

    const msg = {
      to: to,
      from: {
        email: 'neeleshnama2002@gmail.com',
        name: 'Mediconnect'
      },
      subject: 'Your Verification Code - Mediconnect',
      text: `Your verification code is: ${otp}. This code will expire in 10 minutes.`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    max-width: 600px; 
                    margin: 0 auto; 
                    padding: 20px;
                    background-color: #f9fafb;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    color: #2563eb;
                    margin-bottom: 20px;
                }
                .otp-code {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 25px;
                    text-align: center;
                    font-size: 36px;
                    font-weight: bold;
                    letter-spacing: 8px;
                    margin: 25px 0;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                }
                .info {
                    color: #6b7280;
                    line-height: 1.6;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    color: #9ca3af;
                    font-size: 12px;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #e5e7eb;
                }
                .warning {
                    background-color: #fef3c7;
                    border: 1px solid #f59e0b;
                    padding: 12px;
                    border-radius: 6px;
                    margin: 15px 0;
                    color: #92400e;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Mediconnect</h1>
                    <h2>Email Verification</h2>
                </div>
                
                <p class="info">Hello,</p>
                <p class="info">Your verification code is:</p>
                
                <div class="otp-code">${otp}</div>
                
                <div class="warning">
                    <strong>⚠️ This code will expire in 10 minutes</strong>
                </div>
                
                <p class="info">
                    Enter this code in the verification field to complete your 
                    ${req.body.action || 'registration'} process.
                </p>
                
                <p class="info">
                    If you didn't request this code, please ignore this email.
                </p>
                
                <div class="footer">
                    <p>This is an automated message from Mediconnect.</p>
                    <p>© ${new Date().getFullYear()} Mediconnect. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    await sgMail.send(msg);
    
    console.log(`Verification email sent to: ${to}`);
    res.json({ 
      success: true, 
      message: 'Verification email sent successfully' 
    });
    
  } catch (error) {
    console.error('SendGrid error:', error);
    
    if (error.response) {
      console.error('SendGrid response error:', error.response.body);
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send verification email',
      details: error.message 
    });
  }
});



// Add this endpoint to your existing backend
app.post('/api/send-appointment-email', async (req, res) => {
  try {
    const { 
      to, 
      appointmentId, 
      patientName, 
      doctorName, 
      appointmentType, 
      appointmentDate, 
      appointmentTime, 
      duration, 
      reason, 
      consultationFee,
      action 
    } = req.body;

    if (!to || !appointmentId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and appointment ID are required' 
      });
    }

    const msg = {
      to: to,
      from: {
        email: 'neeleshnama2002@gmail.com',
        name: 'Mediconnect'
      },
      subject: `Appointment Confirmation - ${appointmentType === 'video' ? 'Video Consultation' : 'Appointment'}`,
      text: generateEmailText(req.body),
      html: generateEmailHTML(req.body)
    };

    await sgMail.send(msg);
    
    console.log(`Appointment confirmation email sent to: ${to}`);
    res.json({ 
      success: true, 
      message: 'Appointment confirmation email sent successfully' 
    });
    
  } catch (error) {
    console.error('SendGrid appointment email error:', error);
    
    if (error.response) {
      console.error('SendGrid response error:', error.response.body);
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send appointment confirmation email',
      details: error.message 
    });
  }
});

// Generate email HTML content
const generateEmailHTML = (data) => {
  const { 
    appointmentId, 
    patientName, 
    doctorName, 
    appointmentType, 
    appointmentDate, 
    appointmentTime, 
    duration, 
    reason, 
    consultationFee 
  } = data;

  const isVideoConsultation = appointmentType === 'video';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px;
                background-color: #f9fafb;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                color: #2563eb;
                margin-bottom: 20px;
            }
            .appointment-details {
                background: #f8fafc;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e2e8f0;
            }
            .video-instructions {
                background: #dbeafe;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #2563eb;
            }
            .button {
                display: inline-block;
                background: #2563eb;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                margin: 10px 0;
            }
            .footer {
                text-align: center;
                color: #6b7280;
                font-size: 12px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Mediconnect</h1>
                <h2>Appointment Confirmation</h2>
            </div>
            
            <p>Dear ${patientName},</p>
            
            <p>Your appointment has been successfully booked! Here are your appointment details:</p>
            
            <div class="appointment-details">
                <div class="detail-row">
                    <strong>Appointment ID:</strong>
                    <span>${appointmentId}</span>
                </div>
                <div class="detail-row">
                    <strong>Doctor:</strong>
                    <span>${doctorName}</span>
                </div>
                <div class="detail-row">
                    <strong>Appointment Type:</strong>
                    <span>${appointmentType === 'video' ? 'Video Consultation' : appointmentType}</span>
                </div>
                <div class="detail-row">
                    <strong>Date & Time:</strong>
                    <span>${appointmentDate} at ${appointmentTime}</span>
                </div>
                <div class="detail-row">
                    <strong>Duration:</strong>
                    <span>${duration} minutes</span>
                </div>
                <div class="detail-row">
                    <strong>Reason:</strong>
                    <span>${reason}</span>
                </div>
                
            </div>
            
            ${isVideoConsultation ? `
            <div class="video-instructions">
                <h3>🎥 Video Consultation Instructions</h3>
                <p><strong>How to join your video call:</strong></p>
                <ol>
                    <li>Click the button below 5 minutes before your scheduled time</li>
                    <li>Allow camera and microphone permissions when prompted</li>
                    <li>Test your audio and video before the call starts</li>
                    <li>Ensure you have a stable internet connection</li>
                    <li>Find a quiet, well-lit space for the consultation</li>
                </ol>
                
            </div>
            
            <p><strong>Important Notes:</strong></p>
            <ul>
                <li>Please be ready 5 minutes before your scheduled time</li>
                <li>Have your ID ready for verification</li>
                <li>Prepare any questions or concerns you want to discuss</li>
                <li>Cancel or reschedule at least 2 hours in advance if needed</li>
            </ul>
            ` : ''}
            
            <p>If you have any questions or need to reschedule, please contact us.</p>
            
            <div class="footer">
                <p>This is an automated message from Healthcare App.</p>
                <p>© ${new Date().getFullYear()} Healthcare App. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Generate plain text email content
const generateEmailText = (data) => {
  const { 
    appointmentId, 
    patientName, 
    doctorName, 
    appointmentType, 
    appointmentDate, 
    appointmentTime, 
    duration, 
    reason, 
    consultationFee 
  } = data;

  const isVideoConsultation = appointmentType === 'video';
  
  let text = `
APPOINTMENT CONFIRMATION

Dear ${patientName},

Your appointment has been successfully booked!

Appointment Details:
- Appointment ID: ${appointmentId}
- Doctor: ${doctorName}
- Type: ${appointmentType === 'video' ? 'Video Consultation' : appointmentType}
- Date & Time: ${appointmentDate} at ${appointmentTime}
- Duration: ${duration} minutes
- Reason: ${reason}
- Consultation Fee: $${consultationFee}
  `;

  if (isVideoConsultation) {
    text += `

VIDEO CONSULTATION INSTRUCTIONS:

How to join your video call:
1. Click the video call link 5 minutes before your scheduled time
2. Allow camera and microphone permissions
3. Test your audio and video before the call
4. Ensure stable internet connection
5. Find a quiet, well-lit space

Important Notes:
- Be ready 5 minutes before your scheduled time
- Have your ID ready for verification
- Prepare questions or concerns in advance
- Cancel or reschedule at least 2 hours in advance if needed

    `;
  }

  text += `

If you have any questions, please contact us.

Thank you,
Mediconnect
  `;

  return text;
};




// Update the existing email endpoint to handle reschedule emails
app.post('/api/send-reappointment-email', async (req, res) => {
  try {
    const { 
      to, 
      appointmentId, 
      patientName, 
      doctorName, 
      appointmentType, 
      appointmentDate, 
      appointmentTime, 
      duration, 
      reason, 
      consultationFee,
      action,
      // Reschedule specific fields
      oldDate,
      oldTime,
      newDate,
      newTime
    } = req.body;

    if (!to) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email is required' 
      });
    }

    let subject, text, html;

    if (action === 'appointment_rescheduled') {
      // Reschedule notification email
      subject = `Appointment Rescheduled - ${appointmentType === 'video' ? 'Video Consultation' : 'Appointment'}`;
      text = generateRescheduleEmailText(req.body);
      html = generateRescheduleEmailHTML(req.body);
    } else {
      // Regular appointment confirmation email
      subject = `Appointment Confirmation - ${appointmentType === 'video' ? 'Video Consultation' : 'Appointment'}`;
      text = generateEmailText(req.body);
      html = generateEmailHTML(req.body);
    }

    const msg = {
      to: to,
      from: {
        email: 'neeleshnama2002@gmail.com',
        name: 'Mediconnect'
      },
      subject: subject,
      text: text,
      html: html
    };

    await sgMail.send(msg);
    
    console.log(`Appointment email sent to: ${to} - Action: ${action}`);
    res.json({ 
      success: true, 
      message: 'Appointment email sent successfully' 
    });
    
  } catch (error) {
    console.error('SendGrid appointment email error:', error);
    
    if (error.response) {
      console.error('SendGrid response error:', error.response.body);
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send appointment email',
      details: error.message 
    });
  }
});

// Generate reschedule email HTML content
const generateRescheduleEmailHTML = (data) => {
  const { 
    patientName, 
    doctorName, 
    appointmentType, 
    oldDate, 
    oldTime, 
    newDate, 
    newTime,
    appointmentId,
    reason
  } = data;

  const isVideoConsultation = appointmentType === 'video';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px;
                background-color: #f9fafb;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                color: #2563eb;
                margin-bottom: 20px;
            }
            .apology-notice {
                background: #fef3c7;
                border: 1px solid #f59e0b;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                text-align: center;
            }
            .appointment-details {
                background: #f8fafc;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e2e8f0;
            }
            .old-appointment {
                background: #fee2e2;
                padding: 15px;
                border-radius: 6px;
                margin: 10px 0;
            }
            .new-appointment {
                background: #d1fae5;
                padding: 15px;
                border-radius: 6px;
                margin: 10px 0;
            }
            .video-instructions {
                background: #dbeafe;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #2563eb;
            }
            .button {
                display: inline-block;
                background: #2563eb;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                margin: 10px 0;
            }
            .footer {
                text-align: center;
                color: #6b7280;
                font-size: 12px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Mediconnect</h1>
                <h2>Appointment Rescheduled</h2>
            </div>
            
            <div class="apology-notice">
                <h3>🔄 Appointment Rescheduled</h3>
                <p><strong>We apologize for any inconvenience caused.</strong></p>
                <p>Your appointment has been rescheduled by the doctor. Please find the new details below.</p>
            </div>
            
            <p>Dear ${patientName},</p>
            
            <p>Your appointment with <strong>${doctorName}</strong> has been rescheduled. Here are the updated details:</p>
            
            <div class="appointment-details">
                <div class="detail-row">
                    <strong>Appointment ID:</strong>
                    <span>${appointmentId}</span>
                </div>
                <div class="detail-row">
                    <strong>Doctor:</strong>
                    <span>${doctorName}</span>
                </div>
                <div class="detail-row">
                    <strong>Appointment Type:</strong>
                    <span>${appointmentType === 'video' ? 'Video Consultation' : appointmentType}</span>
                </div>
                
                <div class="old-appointment">
                    <h4>❌ Previous Schedule:</h4>
                    <p><strong>${oldDate} at ${oldTime}</strong></p>
                </div>
                
                <div class="new-appointment">
                    <h4>✅ New Schedule:</h4>
                    <p><strong>${newDate} at ${newTime}</strong></p>
                </div>
                
                <div class="detail-row">
                    <strong>Reason for Visit:</strong>
                    <span>${reason}</span>
                </div>
            </div>
            
            ${isVideoConsultation ? `
            <div class="video-instructions">
                <h3>🎥 Video Consultation Instructions</h3>
                <p><strong>How to join your video call:</strong></p>
                <ol>
                    <li>Click the video call link 5 minutes before your new scheduled time</li>
                    <li>Allow camera and microphone permissions when prompted</li>
                    <li>Test your audio and video before the call starts</li>
                    <li>Ensure you have a stable internet connection</li>
                    <li>Find a quiet, well-lit space for the consultation</li>
                </ol>
                <a href="#" class="button">Join Video Call</a>
                <p><small>This link will be activated 15 minutes before your new appointment time</small></p>
            </div>
            ` : ''}
            
            <p><strong>Important Notes:</strong></p>
            <ul>
                <li>Please update your calendar with the new appointment time</li>
                <li>Be ready 5 minutes before your new scheduled time</li>
                <li>Cancel or reschedule at least 2 hours in advance if needed</li>
                <li>Contact us if you have any questions about the new timing</li>
            </ul>
            
            <p>We appreciate your understanding and look forward to seeing you at the new scheduled time.</p>
            
            <div class="footer">
                <p>This is an automated message from Mediconnect .</p>
                <p>© ${new Date().getFullYear()} Mediconnect. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Generate reschedule plain text email content
const generateRescheduleEmailText = (data) => {
  const { 
    patientName, 
    doctorName, 
    appointmentType, 
    oldDate, 
    oldTime, 
    newDate, 
    newTime,
    appointmentId,
    reason
  } = data;

  const isVideoConsultation = appointmentType === 'video';
  
  let text = `
APPOINTMENT RESCHEDULED

Dear ${patientName},

We apologize for any inconvenience caused. Your appointment has been rescheduled by the doctor.

APPOINTMENT RESCHEDULE DETAILS:

Appointment ID: ${appointmentId}
Doctor: ${doctorName}
Type: ${appointmentType === 'video' ? 'Video Consultation' : appointmentType}

❌ PREVIOUS SCHEDULE:
${oldDate} at ${oldTime}

✅ NEW SCHEDULE:
${newDate} at ${newTime}

Reason for Visit: ${reason}
  `;

  if (isVideoConsultation) {
    text += `

VIDEO CONSULTATION INSTRUCTIONS:

How to join your video call:
1. Click the video call link 5 minutes before your new scheduled time
2. Allow camera and microphone permissions
3. Test your audio and video before the call
4. Ensure stable internet connection
5. Find a quiet, well-lit space

Video Call Link: [Will be activated 15 minutes before new appointment time]
    `;
  }

  text += `

IMPORTANT NOTES:
- Please update your calendar with the new appointment time
- Be ready 5 minutes before your new scheduled time
- Cancel or reschedule at least 2 hours in advance if needed
- Contact us if you have any questions about the new timing

We appreciate your understanding and look forward to seeing you at the new scheduled time.

Thank you,
Mediconnect
  `;

  return text;
};


//FOR PAYMENTS


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post('/api/create-razorpay-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

const crypto = require('crypto');

app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      res.json({ success: true, paymentId: razorpay_payment_id });
    } else {
      res.status(400).json({ success: false, error: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ success: false, error: 'Verification failed' });
  }
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});