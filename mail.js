// const express = require('express');
// const cors = require('cors');
// const sgMail = require('@sendgrid/mail');
// const Razorpay = require('razorpay');
// require('dotenv').config();

// const app = express();

// // Middleware

// app.use(cors());

// // Alternative explicit configuration for all origins
// // app.use(cors({
// //   origin: '*',
// //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// //   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// // }));

// // Handle preflight requests for all routes
// app.options('*', cors())

// // const corsOptions = {
// //   origin: function (origin, callback) {
// //     // List of allowed origins
// //     const allowedOrigins = [
// //       'https://ayurved-a0e30.web.app',
// //       'http://localhost:3000',
// //       'https://localhost:3000' // Added https for localhost
// //     ];
    
// //     // Allow requests with no origin (like mobile apps or curl requests)
// //     if (!origin) return callback(null, true);
    
// //     if (allowedOrigins.indexOf(origin) !== -1) {
// //       callback(null, true);
// //     } else {
// //       callback(new Error('Not allowed by CORS'));
// //     }
// //   },
// //   credentials: true, // Allow cookies if needed
// //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// //   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// // };

// // Middleware

// app.use(express.json());

// // Set SendGrid API Key
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// // Email sending endpoint
// app.post('/api/send-verification-email', async (req, res) => {
//   try {
//     const { to, otp } = req.body;

//     if (!to || !otp) {
//       return res.status(400).json({ 
//         success: false, 
//         error: 'Email and OTP are required' 
//       });
//     }

//     const msg = {
//       to: to,
//       from: {
//         email: 'neeleshnama2002@gmail.com',
//         name: 'Mediconnect'
//       },
//       subject: 'Your Verification Code - Mediconnect',
//       text: `Your verification code is: ${otp}. This code will expire in 10 minutes.`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <style>
//                 body { 
//                     font-family: Arial, sans-serif; 
//                     max-width: 600px; 
//                     margin: 0 auto; 
//                     padding: 20px;
//                     background-color: #f9fafb;
//                 }
//                 .container {
//                     background: white;
//                     padding: 30px;
//                     border-radius: 12px;
//                     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//                 }
//                 .header {
//                     text-align: center;
//                     color: #2563eb;
//                     margin-bottom: 20px;
//                 }
//                 .otp-code {
//                     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//                     color: white;
//                     padding: 25px;
//                     text-align: center;
//                     font-size: 36px;
//                     font-weight: bold;
//                     letter-spacing: 8px;
//                     margin: 25px 0;
//                     border-radius: 8px;
//                     box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
//                 }
//                 .info {
//                     color: #6b7280;
//                     line-height: 1.6;
//                     margin: 20px 0;
//                 }
//                 .footer {
//                     text-align: center;
//                     color: #9ca3af;
//                     font-size: 12px;
//                     margin-top: 30px;
//                     padding-top: 20px;
//                     border-top: 1px solid #e5e7eb;
//                 }
//                 .warning {
//                     background-color: #fef3c7;
//                     border: 1px solid #f59e0b;
//                     padding: 12px;
//                     border-radius: 6px;
//                     margin: 15px 0;
//                     color: #92400e;
//                 }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <div class="header">
//                     <h1>Mediconnect</h1>
//                     <h2>Email Verification</h2>
//                 </div>
                
//                 <p class="info">Hello,</p>
//                 <p class="info">Your verification code is:</p>
                
//                 <div class="otp-code">${otp}</div>
                
//                 <div class="warning">
//                     <strong>⚠️ This code will expire in 10 minutes</strong>
//                 </div>
                
//                 <p class="info">
//                     Enter this code in the verification field to complete your 
//                     ${req.body.action || 'registration'} process.
//                 </p>
                
//                 <p class="info">
//                     If you didn't request this code, please ignore this email.
//                 </p>
                
//                 <div class="footer">
//                     <p>This is an automated message from Mediconnect.</p>
//                     <p>© ${new Date().getFullYear()} Mediconnect. All rights reserved.</p>
//                 </div>
//             </div>
//         </body>
//         </html>
//       `,
//     };

//     await sgMail.send(msg);
    
//     console.log(`Verification email sent to: ${to}`);
//     res.json({ 
//       success: true, 
//       message: 'Verification email sent successfully' 
//     });
    
//   } catch (error) {
//     console.error('SendGrid error:', error);
    
//     if (error.response) {
//       console.error('SendGrid response error:', error.response.body);
//     }
    
//     res.status(500).json({ 
//       success: false, 
//       error: 'Failed to send verification email',
//       details: error.message 
//     });
//   }
// });



// // Add this endpoint to your existing backend
// app.post('/api/send-appointment-email', async (req, res) => {
//   try {
//     const { 
//       to, 
//       appointmentId, 
//       patientName, 
//       doctorName, 
//       appointmentType, 
//       appointmentDate, 
//       appointmentTime, 
//       duration, 
//       reason, 
//       consultationFee,
//       action 
//     } = req.body;

//     if (!to || !appointmentId) {
//       return res.status(400).json({ 
//         success: false, 
//         error: 'Email and appointment ID are required' 
//       });
//     }

//     const msg = {
//       to: to,
//       from: {
//         email: 'neeleshnama2002@gmail.com',
//         name: 'Mediconnect'
//       },
//       subject: `Appointment Confirmation - ${appointmentType === 'video' ? 'Video Consultation' : 'Appointment'}`,
//       text: generateEmailText(req.body),
//       html: generateEmailHTML(req.body)
//     };

//     await sgMail.send(msg);
    
//     console.log(`Appointment confirmation email sent to: ${to}`);
//     res.json({ 
//       success: true, 
//       message: 'Appointment confirmation email sent successfully' 
//     });
    
//   } catch (error) {
//     console.error('SendGrid appointment email error:', error);
    
//     if (error.response) {
//       console.error('SendGrid response error:', error.response.body);
//     }
    
//     res.status(500).json({ 
//       success: false, 
//       error: 'Failed to send appointment confirmation email',
//       details: error.message 
//     });
//   }
// });

// // Generate email HTML content
// const generateEmailHTML = (data) => {
//   const { 
//     appointmentId, 
//     patientName, 
//     doctorName, 
//     appointmentType, 
//     appointmentDate, 
//     appointmentTime, 
//     duration, 
//     reason, 
//     consultationFee 
//   } = data;

//   const isVideoConsultation = appointmentType === 'video';
  
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <style>
//             body { 
//                 font-family: Arial, sans-serif; 
//                 max-width: 600px; 
//                 margin: 0 auto; 
//                 padding: 20px;
//                 background-color: #f9fafb;
//             }
//             .container {
//                 background: white;
//                 padding: 30px;
//                 border-radius: 12px;
//                 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             }
//             .header {
//                 text-align: center;
//                 color: #2563eb;
//                 margin-bottom: 20px;
//             }
//             .appointment-details {
//                 background: #f8fafc;
//                 padding: 20px;
//                 border-radius: 8px;
//                 margin: 20px 0;
//             }
//             .detail-row {
//                 display: flex;
//                 justify-content: space-between;
//                 margin-bottom: 10px;
//                 padding-bottom: 10px;
//                 border-bottom: 1px solid #e2e8f0;
//             }
//             .video-instructions {
//                 background: #dbeafe;
//                 padding: 15px;
//                 border-radius: 8px;
//                 margin: 20px 0;
//                 border-left: 4px solid #2563eb;
//             }
//             .button {
//                 display: inline-block;
//                 background: #2563eb;
//                 color: white;
//                 padding: 12px 24px;
//                 text-decoration: none;
//                 border-radius: 6px;
//                 margin: 10px 0;
//             }
//             .footer {
//                 text-align: center;
//                 color: #6b7280;
//                 font-size: 12px;
//                 margin-top: 30px;
//                 padding-top: 20px;
//                 border-top: 1px solid #e5e7eb;
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <div class="header">
//                 <h1>Mediconnect</h1>
//                 <h2>Appointment Confirmation</h2>
//             </div>
            
//             <p>Dear ${patientName},</p>
            
//             <p>Your appointment has been successfully booked! Here are your appointment details:</p>
            
//             <div class="appointment-details">
//                 <div class="detail-row">
//                     <strong>Appointment ID:</strong>
//                     <span>${appointmentId}</span>
//                 </div>
//                 <div class="detail-row">
//                     <strong>Doctor:</strong>
//                     <span>${doctorName}</span>
//                 </div>
//                 <div class="detail-row">
//                     <strong>Appointment Type:</strong>
//                     <span>${appointmentType === 'video' ? 'Video Consultation' : appointmentType}</span>
//                 </div>
//                 <div class="detail-row">
//                     <strong>Date & Time:</strong>
//                     <span>${appointmentDate} at ${appointmentTime}</span>
//                 </div>
//                 <div class="detail-row">
//                     <strong>Duration:</strong>
//                     <span>${duration} minutes</span>
//                 </div>
//                 <div class="detail-row">
//                     <strong>Reason:</strong>
//                     <span>${reason}</span>
//                 </div>
                
//             </div>
            
//             ${isVideoConsultation ? `
//             <div class="video-instructions">
//                 <h3>🎥 Video Consultation Instructions</h3>
//                 <p><strong>How to join your video call:</strong></p>
//                 <ol>
//                     <li>Click the button below 5 minutes before your scheduled time</li>
//                     <li>Allow camera and microphone permissions when prompted</li>
//                     <li>Test your audio and video before the call starts</li>
//                     <li>Ensure you have a stable internet connection</li>
//                     <li>Find a quiet, well-lit space for the consultation</li>
//                 </ol>
                
//             </div>
            
//             <p><strong>Important Notes:</strong></p>
//             <ul>
//                 <li>Please be ready 5 minutes before your scheduled time</li>
//                 <li>Have your ID ready for verification</li>
//                 <li>Prepare any questions or concerns you want to discuss</li>
//                 <li>Cancel or reschedule at least 2 hours in advance if needed</li>
//             </ul>
//             ` : ''}
            
//             <p>If you have any questions or need to reschedule, please contact us.</p>
            
//             <div class="footer">
//                 <p>This is an automated message from Healthcare App.</p>
//                 <p>© ${new Date().getFullYear()} Healthcare App. All rights reserved.</p>
//             </div>
//         </div>
//     </body>
//     </html>
//   `;
// };

// // Generate plain text email content
// const generateEmailText = (data) => {
//   const { 
//     appointmentId, 
//     patientName, 
//     doctorName, 
//     appointmentType, 
//     appointmentDate, 
//     appointmentTime, 
//     duration, 
//     reason, 
//     consultationFee 
//   } = data;

//   const isVideoConsultation = appointmentType === 'video';
  
//   let text = `
// APPOINTMENT CONFIRMATION

// Dear ${patientName},

// Your appointment has been successfully booked!

// Appointment Details:
// - Appointment ID: ${appointmentId}
// - Doctor: ${doctorName}
// - Type: ${appointmentType === 'video' ? 'Video Consultation' : appointmentType}
// - Date & Time: ${appointmentDate} at ${appointmentTime}
// - Duration: ${duration} minutes
// - Reason: ${reason}
// - Consultation Fee: $${consultationFee}
//   `;

//   if (isVideoConsultation) {
//     text += `

// VIDEO CONSULTATION INSTRUCTIONS:

// How to join your video call:
// 1. Click the video call link 5 minutes before your scheduled time
// 2. Allow camera and microphone permissions
// 3. Test your audio and video before the call
// 4. Ensure stable internet connection
// 5. Find a quiet, well-lit space

// Important Notes:
// - Be ready 5 minutes before your scheduled time
// - Have your ID ready for verification
// - Prepare questions or concerns in advance
// - Cancel or reschedule at least 2 hours in advance if needed

//     `;
//   }

//   text += `

// If you have any questions, please contact us.

// Thank you,
// Mediconnect
//   `;

//   return text;
// };




// // Update the existing email endpoint to handle reschedule emails
// app.post('/api/send-reappointment-email', async (req, res) => {
//   try {
//     const { 
//       to, 
//       appointmentId, 
//       patientName, 
//       doctorName, 
//       appointmentType, 
//       appointmentDate, 
//       appointmentTime, 
//       duration, 
//       reason, 
//       consultationFee,
//       action,
//       // Reschedule specific fields
//       oldDate,
//       oldTime,
//       newDate,
//       newTime
//     } = req.body;

//     if (!to) {
//       return res.status(400).json({ 
//         success: false, 
//         error: 'Email is required' 
//       });
//     }

//     let subject, text, html;

//     if (action === 'appointment_rescheduled') {
//       // Reschedule notification email
//       subject = `Appointment Rescheduled - ${appointmentType === 'video' ? 'Video Consultation' : 'Appointment'}`;
//       text = generateRescheduleEmailText(req.body);
//       html = generateRescheduleEmailHTML(req.body);
//     } else {
//       // Regular appointment confirmation email
//       subject = `Appointment Confirmation - ${appointmentType === 'video' ? 'Video Consultation' : 'Appointment'}`;
//       text = generateEmailText(req.body);
//       html = generateEmailHTML(req.body);
//     }

//     const msg = {
//       to: to,
//       from: {
//         email: 'neeleshnama2002@gmail.com',
//         name: 'Mediconnect'
//       },
//       subject: subject,
//       text: text,
//       html: html
//     };

//     await sgMail.send(msg);
    
//     console.log(`Appointment email sent to: ${to} - Action: ${action}`);
//     res.json({ 
//       success: true, 
//       message: 'Appointment email sent successfully' 
//     });
    
//   } catch (error) {
//     console.error('SendGrid appointment email error:', error);
    
//     if (error.response) {
//       console.error('SendGrid response error:', error.response.body);
//     }
    
//     res.status(500).json({ 
//       success: false, 
//       error: 'Failed to send appointment email',
//       details: error.message 
//     });
//   }
// });

// // Generate reschedule email HTML content
// const generateRescheduleEmailHTML = (data) => {
//   const { 
//     patientName, 
//     doctorName, 
//     appointmentType, 
//     oldDate, 
//     oldTime, 
//     newDate, 
//     newTime,
//     appointmentId,
//     reason
//   } = data;

//   const isVideoConsultation = appointmentType === 'video';
  
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <style>
//             body { 
//                 font-family: Arial, sans-serif; 
//                 max-width: 600px; 
//                 margin: 0 auto; 
//                 padding: 20px;
//                 background-color: #f9fafb;
//             }
//             .container {
//                 background: white;
//                 padding: 30px;
//                 border-radius: 12px;
//                 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             }
//             .header {
//                 text-align: center;
//                 color: #2563eb;
//                 margin-bottom: 20px;
//             }
//             .apology-notice {
//                 background: #fef3c7;
//                 border: 1px solid #f59e0b;
//                 padding: 15px;
//                 border-radius: 8px;
//                 margin: 20px 0;
//                 text-align: center;
//             }
//             .appointment-details {
//                 background: #f8fafc;
//                 padding: 20px;
//                 border-radius: 8px;
//                 margin: 20px 0;
//             }
//             .detail-row {
//                 display: flex;
//                 justify-content: space-between;
//                 margin-bottom: 10px;
//                 padding-bottom: 10px;
//                 border-bottom: 1px solid #e2e8f0;
//             }
//             .old-appointment {
//                 background: #fee2e2;
//                 padding: 15px;
//                 border-radius: 6px;
//                 margin: 10px 0;
//             }
//             .new-appointment {
//                 background: #d1fae5;
//                 padding: 15px;
//                 border-radius: 6px;
//                 margin: 10px 0;
//             }
//             .video-instructions {
//                 background: #dbeafe;
//                 padding: 15px;
//                 border-radius: 8px;
//                 margin: 20px 0;
//                 border-left: 4px solid #2563eb;
//             }
//             .button {
//                 display: inline-block;
//                 background: #2563eb;
//                 color: white;
//                 padding: 12px 24px;
//                 text-decoration: none;
//                 border-radius: 6px;
//                 margin: 10px 0;
//             }
//             .footer {
//                 text-align: center;
//                 color: #6b7280;
//                 font-size: 12px;
//                 margin-top: 30px;
//                 padding-top: 20px;
//                 border-top: 1px solid #e5e7eb;
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <div class="header">
//                 <h1>Mediconnect</h1>
//                 <h2>Appointment Rescheduled</h2>
//             </div>
            
//             <div class="apology-notice">
//                 <h3>🔄 Appointment Rescheduled</h3>
//                 <p><strong>We apologize for any inconvenience caused.</strong></p>
//                 <p>Your appointment has been rescheduled by the doctor. Please find the new details below.</p>
//             </div>
            
//             <p>Dear ${patientName},</p>
            
//             <p>Your appointment with <strong>${doctorName}</strong> has been rescheduled. Here are the updated details:</p>
            
//             <div class="appointment-details">
//                 <div class="detail-row">
//                     <strong>Appointment ID:</strong>
//                     <span>${appointmentId}</span>
//                 </div>
//                 <div class="detail-row">
//                     <strong>Doctor:</strong>
//                     <span>${doctorName}</span>
//                 </div>
//                 <div class="detail-row">
//                     <strong>Appointment Type:</strong>
//                     <span>${appointmentType === 'video' ? 'Video Consultation' : appointmentType}</span>
//                 </div>
                
//                 <div class="old-appointment">
//                     <h4>❌ Previous Schedule:</h4>
//                     <p><strong>${oldDate} at ${oldTime}</strong></p>
//                 </div>
                
//                 <div class="new-appointment">
//                     <h4>✅ New Schedule:</h4>
//                     <p><strong>${newDate} at ${newTime}</strong></p>
//                 </div>
                
//                 <div class="detail-row">
//                     <strong>Reason for Visit:</strong>
//                     <span>${reason}</span>
//                 </div>
//             </div>
            
//             ${isVideoConsultation ? `
//             <div class="video-instructions">
//                 <h3>🎥 Video Consultation Instructions</h3>
//                 <p><strong>How to join your video call:</strong></p>
//                 <ol>
//                     <li>Click the video call link 5 minutes before your new scheduled time</li>
//                     <li>Allow camera and microphone permissions when prompted</li>
//                     <li>Test your audio and video before the call starts</li>
//                     <li>Ensure you have a stable internet connection</li>
//                     <li>Find a quiet, well-lit space for the consultation</li>
//                 </ol>
//                 <a href="#" class="button">Join Video Call</a>
//                 <p><small>This link will be activated 15 minutes before your new appointment time</small></p>
//             </div>
//             ` : ''}
            
//             <p><strong>Important Notes:</strong></p>
//             <ul>
//                 <li>Please update your calendar with the new appointment time</li>
//                 <li>Be ready 5 minutes before your new scheduled time</li>
//                 <li>Cancel or reschedule at least 2 hours in advance if needed</li>
//                 <li>Contact us if you have any questions about the new timing</li>
//             </ul>
            
//             <p>We appreciate your understanding and look forward to seeing you at the new scheduled time.</p>
            
//             <div class="footer">
//                 <p>This is an automated message from Mediconnect .</p>
//                 <p>© ${new Date().getFullYear()} Mediconnect. All rights reserved.</p>
//             </div>
//         </div>
//     </body>
//     </html>
//   `;
// };

// // Generate reschedule plain text email content
// const generateRescheduleEmailText = (data) => {
//   const { 
//     patientName, 
//     doctorName, 
//     appointmentType, 
//     oldDate, 
//     oldTime, 
//     newDate, 
//     newTime,
//     appointmentId,
//     reason
//   } = data;

//   const isVideoConsultation = appointmentType === 'video';
  
//   let text = `
// APPOINTMENT RESCHEDULED

// Dear ${patientName},

// We apologize for any inconvenience caused. Your appointment has been rescheduled by the doctor.

// APPOINTMENT RESCHEDULE DETAILS:

// Appointment ID: ${appointmentId}
// Doctor: ${doctorName}
// Type: ${appointmentType === 'video' ? 'Video Consultation' : appointmentType}

// ❌ PREVIOUS SCHEDULE:
// ${oldDate} at ${oldTime}

// ✅ NEW SCHEDULE:
// ${newDate} at ${newTime}

// Reason for Visit: ${reason}
//   `;

//   if (isVideoConsultation) {
//     text += `

// VIDEO CONSULTATION INSTRUCTIONS:

// How to join your video call:
// 1. Click the video call link 5 minutes before your new scheduled time
// 2. Allow camera and microphone permissions
// 3. Test your audio and video before the call
// 4. Ensure stable internet connection
// 5. Find a quiet, well-lit space

// Video Call Link: [Will be activated 15 minutes before new appointment time]
//     `;
//   }

//   text += `

// IMPORTANT NOTES:
// - Please update your calendar with the new appointment time
// - Be ready 5 minutes before your new scheduled time
// - Cancel or reschedule at least 2 hours in advance if needed
// - Contact us if you have any questions about the new timing

// We appreciate your understanding and look forward to seeing you at the new scheduled time.

// Thank you,
// Mediconnect
//   `;

//   return text;
// };


// //FOR PAYMENTS


// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// app.post('/api/create-razorpay-order', async (req, res) => {
//   try {
//     const { amount, currency } = req.body;

//     const options = {
//       amount: amount,
//       currency: currency,
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
    
//     res.json({
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency
//     });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ error: 'Failed to create order' });
//   }
// });

// const crypto = require('crypto');

// app.post('/api/verify-payment', async (req, res) => {
//   try {
//     const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest('hex');

//     const isAuthentic = expectedSignature === razorpay_signature;

//     if (isAuthentic) {
//       res.json({ success: true, paymentId: razorpay_payment_id });
//     } else {
//       res.status(400).json({ success: false, error: 'Invalid signature' });
//     }
//   } catch (error) {
//     console.error('Payment verification error:', error);
//     res.status(500).json({ success: false, error: 'Verification failed' });
//   }
// });
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
require('dotenv').config();

const app = express();
app.use(cors());
// Middleware
app.options('*', cors())

app.use(express.json());

// Email aliases configuration
const EMAIL_ALIASES = {
  VERIFICATION: 'welcome@ayushportal.com',
  APPOINTMENTS: 'appointments@ayushportal.com',
  RESCHEDULING: 'rescheduling@ayushportal.com',
  SUPPORT: 'support@ayushportal.com',
  DEFAULT: 'noreply@ayushportal.com'
};

// Nodemailer configuration for Hostinger
// const createTransporter = () => {
//   return nodemailer.createTransport({
//     host: process.env.HOSTINGER_SMTP_HOST || 'smtp.hostinger.com',
//     port: process.env.HOSTINGER_SMTP_PORT || 465,
//     secure: true,
//     auth: {
//       user: process.env.HOSTINGER_EMAIL,
//       pass: process.env.HOSTINGER_EMAIL_PASSWORD,
//     },
//     tls: {
//       rejectUnauthorized: false
//     }
//   });
// };
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.HOSTINGER_SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.HOSTINGER_SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.HOSTINGER_EMAIL,
      pass: process.env.HOSTINGER_EMAIL_PASSWORD,
    },
    // Enhanced connection settings
    connectionTimeout: 30000, // 30 seconds
    greetingTimeout: 30000,
    socketTimeout: 60000, // 60 seconds
    // TLS settings
    tls: {
      rejectUnauthorized: false, // Bypass certificate validation issues
      minVersion: 'TLSv1.2' // Force TLS 1.2 or higher
    },
    // Pooling for better performance
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    
  });
};

// Test email configuration on startup
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Hostinger SMTP configuration is correct');
  } catch (error) {
    console.error('❌ Hostinger SMTP configuration error:', error);
  }
};

testEmailConfig();

// Helper function to get appropriate email alias
const getEmailAlias = (emailType) => {
  return EMAIL_ALIASES[emailType] || EMAIL_ALIASES.DEFAULT;
};

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

    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'AyushPortal - Welcome',
        address: getEmailAlias('VERIFICATION')
      },
      to: to,
      subject: 'Your Verification Code - AyushPortal',
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
                .alias-notice {
                    background-color: #e0f2fe;
                    border: 1px solid #0ea5e9;
                    padding: 8px;
                    border-radius: 4px;
                    margin: 10px 0;
                    font-size: 12px;
                    color: #0369a1;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="alias-notice">
                    📧 Email from: AyushPortal Welcome Team
                </div>
                
                <div class="header">
                    <h1>AyushPortal</h1>
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
                    <p>This is an automated message from AyushPortal Welcome Team.</p>
                    <p>For support, contact: ${EMAIL_ALIASES.SUPPORT}</p>
                    <p>© ${new Date().getFullYear()} AyushPortal. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Verification email sent to: ${to} - From: ${EMAIL_ALIASES.VERIFICATION} - Message ID: ${info.messageId}`);
    res.json({ 
      success: true, 
      message: 'Verification email sent successfully',
      messageId: info.messageId,
      fromAlias: EMAIL_ALIASES.VERIFICATION
    });
    
  } catch (error) {
    console.error('❌ Nodemailer error:', error);
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send verification email',
      details: error.message 
    });
  }
});

// Appointment confirmation email endpoint
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

    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'AyushPortal - Appointments',
        address: getEmailAlias('APPOINTMENTS')
      },
      to: to,
      subject: `Appointment Confirmation - ${appointmentType === 'video' ? 'Video Consultation' : 'Appointment'}`,
      text: generateEmailText(req.body),
      html: generateAppointmentEmailHTML(req.body)
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Appointment confirmation email sent to: ${to} - From: ${EMAIL_ALIASES.APPOINTMENTS} - Message ID: ${info.messageId}`);
    res.json({ 
      success: true, 
      message: 'Appointment confirmation email sent successfully',
      messageId: info.messageId,
      fromAlias: EMAIL_ALIASES.APPOINTMENTS
    });
    
  } catch (error) {
    console.error('❌ Nodemailer appointment email error:', error);
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send appointment confirmation email',
      details: error.message 
    });
  }
});

// Reschedule appointment email endpoint
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

    const transporter = createTransporter();

    let subject, text, html;

      subject = `Appointment Rescheduled - ${appointmentType === 'video' ? 'Video Consultation' : 'Appointment'}`;
      text = generateRescheduleEmailText(req.body);
      html = generateRescheduleEmailHTML(req.body);
    

    const mailOptions = {
      from: {
        name:  'AyushPortal - Rescheduling' ,
        address:  getEmailAlias('RESCHEDULING') 
      },
      to: to,
      subject: subject,
      text: text,
      html: html
    };

    const info = await transporter.sendMail(mailOptions);
    
    const fromAlias = EMAIL_ALIASES.RESCHEDULING ;
    //console.log(`✅ Appointment email sent to: ${to} - Action: ${action} - From: ${fromAlias} - Message ID: ${info.messageId}`);
    
    res.json({ 
      success: true, 
      message: ' rescheduled Appointment email sent successfully',
      messageId: info.messageId,
      fromAlias: fromAlias
    });
    
  } catch (error) {
    console.error('❌ Nodemailer appointment email error:', error);
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send  re appointment email',
      details: error.message 
    });
  }
});

// New endpoint for welcome emails
app.post('/api/send-welcome-email', async (req, res) => {
  try {
    const { to, userName } = req.body;

    if (!to || !userName) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and user name are required' 
      });
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'AyushPortal - Welcome',
        address: getEmailAlias('VERIFICATION')
      },
      to: to,
      subject: 'Welcome to AyushPortal - Your Journey to Better Health Begins!',
      text: generateWelcomeEmailText(req.body),
      html: generateWelcomeEmailHTML(req.body)
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Welcome email sent to: ${to} - From: ${EMAIL_ALIASES.VERIFICATION} - Message ID: ${info.messageId}`);
    res.json({ 
      success: true, 
      message: 'Welcome email sent successfully',
      messageId: info.messageId,
      fromAlias: EMAIL_ALIASES.VERIFICATION
    });
    
  } catch (error) {
    console.error('❌ Nodemailer welcome email error:', error);
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send welcome email',
      details: error.message 
    });
  }
});

// New endpoint for support emails
app.post('/api/send-support-email', async (req, res) => {
  try {
    const { to, userName, subject, message, ticketNumber } = req.body;

    if (!to || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and message are required' 
      });
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'AyushPortal - Support',
        address: getEmailAlias('SUPPORT')
      },
      to: to,
      subject: subject || `Support Request - ${ticketNumber || 'New Ticket'}`,
      text: generateSupportEmailText(req.body),
      html: generateSupportEmailHTML(req.body)
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Support email sent to: ${to} - From: ${EMAIL_ALIASES.SUPPORT} - Message ID: ${info.messageId}`);
    res.json({ 
      success: true, 
      message: 'Support email sent successfully',
      messageId: info.messageId,
      fromAlias: EMAIL_ALIASES.SUPPORT
    });
    
  } catch (error) {
    console.error('❌ Nodemailer support email error:', error);
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send support email',
      details: error.message 
    });
  }
});

// Email content generation functions

// Welcome Email HTML
const generateWelcomeEmailHTML = (data) => {
  const { userName } = data;
  
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
            .welcome-section {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 8px;
                margin: 20px 0;
            }
            .feature {
                background: #f8fafc;
                padding: 15px;
                border-radius: 8px;
                margin: 10px 0;
                border-left: 4px solid #2563eb;
            }
            .alias-notice {
                background-color: #e0f2fe;
                border: 1px solid #0ea5e9;
                padding: 8px;
                border-radius: 4px;
                margin: 10px 0;
                font-size: 12px;
                color: #0369a1;
                text-align: center;
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
            <div class="alias-notice">
                📧 Email from: AyushPortal Welcome Team
            </div>
            
            <div class="header">
                <h1>AyushPortal</h1>
                <h2>Welcome to Your Health Journey!</h2>
            </div>
            
            <div class="welcome-section">
                <h1>Welcome, ${userName}! 🎉</h1>
                <p>We're thrilled to have you on board with AyushPortal</p>
            </div>
            
            <p>Dear ${userName},</p>
            
            <p>Thank you for choosing AyushPortal for your healthcare needs. Here's what you can do:</p>
            
            <div class="feature">
                <strong>📅 Book Appointments</strong>
                <p>Schedule consultations with expert Ayurvedic doctors</p>
            </div>
            
            <div class="feature">
                <strong>🎥 Video Consultations</strong>
                <p>Connect with doctors from the comfort of your home</p>
            </div>
            
            <div class="feature">
                <strong>📱 Easy Rescheduling</strong>
                <p>Manage your appointments with ease</p>
            </div>
            
            <div class="feature">
                <strong>🔒 Secure Platform</strong>
                <p>Your health data is protected and private</p>
            </div>
            
            <p><strong>Need Help?</strong></p>
            <ul>
                <li>Book appointments: ${EMAIL_ALIASES.APPOINTMENTS}</li>
                <li>Reschedule appointments: ${EMAIL_ALIASES.RESCHEDULING}</li>
                <li>Technical support: ${EMAIL_ALIASES.SUPPORT}</li>
            </ul>
            
            <p>We're committed to providing you with the best Ayurvedic healthcare experience.</p>
            
            <div class="footer">
                <p>This is an automated message from AyushPortal Welcome Team.</p>
                <p>For support, contact: ${EMAIL_ALIASES.SUPPORT}</p>
                <p>© ${new Date().getFullYear()} AyushPortal. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Support Email HTML
const generateSupportEmailHTML = (data) => {
  const { userName, message, ticketNumber, subject } = data;
  
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
            .ticket-info {
                background: #fef3c7;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                text-align: center;
            }
            .message-box {
                background: #f8fafc;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #2563eb;
            }
            .alias-notice {
                background-color: #e0f2fe;
                border: 1px solid #0ea5e9;
                padding: 8px;
                border-radius: 4px;
                margin: 10px 0;
                font-size: 12px;
                color: #0369a1;
                text-align: center;
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
            <div class="alias-notice">
                📧 Email from: AyushPortal Support Team
            </div>
            
            <div class="header">
                <h1>AyushPortal Support</h1>
                <h2>We've Received Your Request</h2>
            </div>
            
            <div class="ticket-info">
                <h3>Ticket Number: ${ticketNumber || 'Processing...'}</h3>
                <p>Subject: ${subject || 'General Support'}</p>
            </div>
            
            <p>Dear ${userName || 'Valued Customer'},</p>
            
            <p>Thank you for contacting AyushPortal Support. We've received your message and our team will get back to you within 24 hours.</p>
            
            <div class="message-box">
                <strong>Your Message:</strong>
                <p>${message}</p>
            </div>
            
            <p><strong>What happens next?</strong></p>
            <ol>
                <li>Our support team will review your request</li>
                <li>We'll contact you with a solution or additional questions</li>
                <li>You'll receive updates on this ticket</li>
            </ol>
            
            <p><strong>For urgent matters:</strong></p>
            <ul>
                <li>Appointment issues: ${EMAIL_ALIASES.APPOINTMENTS}</li>
                <li>Rescheduling: ${EMAIL_ALIASES.RESCHEDULING}</li>
                <li>General inquiries: ${EMAIL_ALIASES.SUPPORT}</li>
            </ul>
            
            <p>We appreciate your patience and look forward to assisting you.</p>
            
            <div class="footer">
                <p>This is an automated message from AyushPortal Support Team.</p>
                <p>Ticket: ${ticketNumber || 'New'} | Received: ${new Date().toLocaleString()}</p>
                <p>© ${new Date().getFullYear()} AyushPortal. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Appointment Email HTML (updated with alias notice)
const generateAppointmentEmailHTML = (data) => {
  const { 
    appointmentId, 
    patientName, 
    doctorName, 
    appointmentType, 
    appointmentDate, 
    appointmentTime, 
    duration, 
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
            .alias-notice {
                background-color: #e0f2fe;
                border: 1px solid #0ea5e9;
                padding: 8px;
                border-radius: 4px;
                margin: 10px 0;
                font-size: 12px;
                color: #0369a1;
                text-align: center;
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
            <div class="alias-notice">
                📧 Email from: AyushPortal Appointments Team
            </div>
            
            <div class="header">
                <h1>AyushPortal</h1>
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
                



                   <li>Login to AyushPortal</li>
                    <li>Go To your Appointments Page</li>
                     <li>Click join video call button</li> 
                     <li>You will now enter into the waiting Room wait for doctor to start your call</li> 
                     <li>JOIN WAITING ROOM 10 MINUTE BEFORE TO AVOID LAST MINUTE FAULTS</li>
                      <li>Allow camera and microphone permissions</li>
                       <li>Test your audio and video before the call</li> 
                       <li>Ensure stable internet connection</li>
                    <li>Find a quiet, well-lit space</li>
               
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
            
            <p>If you have any questions or need to reschedule, please contact: ${EMAIL_ALIASES.RESCHEDULING}</p>
            
            <div class="footer">
                <p>This is an automated message from AyushPortal Appointments Team.</p>
                <p>For rescheduling: ${EMAIL_ALIASES.RESCHEDULING} | For support: ${EMAIL_ALIASES.SUPPORT}</p>
                <p>© ${new Date().getFullYear()} AyushPortal. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Reschedule Email HTML (updated with alias notice)
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
            .alias-notice {
                background-color: #e0f2fe;
                border: 1px solid #0ea5e9;
                padding: 8px;
                border-radius: 4px;
                margin: 10px 0;
                font-size: 12px;
                color: #0369a1;
                text-align: center;
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
            <div class="alias-notice">
                📧 Email from: AyushPortal Rescheduling Team
            </div>
            
            <div class="header">
                <h1>AyushPortal</h1>
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
               
                <div class="old-appointment">
                    <h4>❌ Previous Schedule:</h4>
                    <p><strong>${oldDate} at ${oldTime}</strong></p>
                </div>
                
                <div class="new-appointment">
                    <h4>✅ New Schedule:</h4>
                    <p><strong>${newDate} at ${newTime}</strong></p>
                </div>
                
                
            </div>
            
            ${isVideoConsultation ? `
            <div class="video-instructions">
                <h3>🎥 Video Consultation Instructions</h3>
                <p><strong>How to join your video call:</strong></p>
                <ol>
                VIDEO CONSULTATION INSTRUCTIONS:

How to join your video call:

                   <li>Login to AyushPortal</li>
                    <li>Go To your Appointments Page</li>
                     <li>Click join video call button</li> 
                     <li>You will now enter into the waiting Room wait for doctor to start your call</li> 
                     <li>JOIN WAITING ROOM 10 MINUTE BEFORE TO AVOID LAST MINUTE FAULTS</li>
                      <li>Allow camera and microphone permissions</li>
                       <li>Test your audio and video before the call</li> 
                       <li>Ensure stable internet connection</li>
                    <li>Find a quiet, well-lit space</li>
                </ol>
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
                <p>This is an automated message from AyushPortal Rescheduling Team.</p>
                <p>For appointment changes: ${EMAIL_ALIASES.RESCHEDULING} | For support: ${EMAIL_ALIASES.SUPPORT}</p>
                <p>© ${new Date().getFullYear()} AyushPortal. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Text email generation functions (keep the same structure as before)
const generateEmailText = (data) => {
  const { 
    appointmentId, 
    patientName, 
    doctorName, 
    appointmentType, 
    appointmentDate, 
    appointmentTime, 
    duration, 
    reason
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

Contact for changes: ${EMAIL_ALIASES.RESCHEDULING}
  `;

  if (isVideoConsultation) {
    text += `

VIDEO CONSULTATION INSTRUCTIONS:


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
AyushPortal Appointments Team
${EMAIL_ALIASES.APPOINTMENTS}
  `;

  return text;
};

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

ID: ${appointmentId}
Doctor: ${doctorName}


❌ PREVIOUS SCHEDULE:
${oldDate} at ${oldTime}

✅ NEW SCHEDULE:
${newDate} at ${newTime}



Contact for changes: ${EMAIL_ALIASES.RESCHEDULING}
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
VIDEO CONSULTATION INSTRUCTIONS:

How to join your video call:
1. login to AyushPortal
2.go To your Appointments Page
3.click join video call button
4. you will now enter into the waiting Room wait for doctor to start your call 
5. JOIN WAITING ROOM 10 MINUTE BEFORE TO AVOID LAST MINUTE FAULTS
6. Allow camera and microphone permissions
7. Test your audio and video before the call
8. Ensure stable internet connection
9. Find a quiet, well-lit space
IMPORTANT NOTES:
- Please update your calendar with the new appointment time
- Be ready 5 minutes before your new scheduled time
- Cancel or reschedule at least 2 hours in advance if needed
- Contact us if you have any questions about the new timing

We appreciate your understanding and look forward to seeing you at the new scheduled time.

Thank you,
AyushPortal Rescheduling Team
${EMAIL_ALIASES.RESCHEDULING}
  `;

  return text;
};

const generateWelcomeEmailText = (data) => {
  const { userName } = data;
  
  return `
WELCOME TO AYUSHPORTAL

Dear ${userName},

Welcome to AyushPortal! We're thrilled to have you on board.

WHAT YOU CAN DO:
📅 Book Appointments - Schedule consultations with expert Ayurvedic doctors
🎥 Video Consultations - Connect with doctors from the comfort of your home
📱 Easy Rescheduling - Manage your appointments with ease
🔒 Secure Platform - Your health data is protected and private

CONTACT INFORMATION:
- Book appointments: ${EMAIL_ALIASES.APPOINTMENTS}
- Reschedule appointments: ${EMAIL_ALIASES.RESCHEDULING}
- Technical support: ${EMAIL_ALIASES.SUPPORT}
- Welcome & verification: ${EMAIL_ALIASES.VERIFICATION}

We're committed to providing you with the best Ayurvedic healthcare experience.

Thank you for choosing AyushPortal!

Best regards,
AyushPortal Welcome Team
${EMAIL_ALIASES.VERIFICATION}
  `;
};

const generateSupportEmailText = (data) => {
  const { userName, message, ticketNumber, subject } = data;
  
  return `
SUPPORT REQUEST RECEIVED

Dear ${userName || 'Valued Customer'},

Thank you for contacting AyushPortal Support.

TICKET INFORMATION:
- Ticket Number: ${ticketNumber || 'Processing...'}
- Subject: ${subject || 'General Support'}
- Received: ${new Date().toLocaleString()}

YOUR MESSAGE:
${message}

WHAT HAPPENS NEXT:
1. Our support team will review your request
2. We'll contact you with a solution or additional questions
3. You'll receive updates on this ticket

CONTACT INFORMATION:
- Appointment issues: ${EMAIL_ALIASES.APPOINTMENTS}
- Rescheduling: ${EMAIL_ALIASES.RESCHEDULING}
- General inquiries: ${EMAIL_ALIASES.SUPPORT}

We appreciate your patience and look forward to assisting you.

Thank you,
AyushPortal Support Team
${EMAIL_ALIASES.SUPPORT}
  `;
};

// Payment endpoints (keep the same as before)
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'AyushPortal Backend',
    emailAliases: EMAIL_ALIASES,
    timestamp: new Date().toISOString()
  });
});

// Email aliases info endpoint
app.get('/api/email-aliases', (req, res) => {
  res.json({
    success: true,
    aliases: EMAIL_ALIASES,
    description: 'Email aliases used for different types of communications'
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email aliases configured:`);
  console.log(`   - Welcome & Verification: ${EMAIL_ALIASES.VERIFICATION}`);
  console.log(`   - Appointments: ${EMAIL_ALIASES.APPOINTMENTS}`);
  console.log(`   - Rescheduling: ${EMAIL_ALIASES.RESCHEDULING}`);
  console.log(`   - Support: ${EMAIL_ALIASES.SUPPORT}`);
  console.log(`   - Default: ${EMAIL_ALIASES.DEFAULT}`);
});