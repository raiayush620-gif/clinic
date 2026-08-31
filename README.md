# Dr. Anoop Kumar Rai Homeopathic Clinic

A complete, real MERN stack application for a single-doctor homeopathic clinic.

## TECH STACK
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT + bcrypt
- **Email:** Nodemailer + SMTP

## FEATURES
- User registration & login with secure password hashing
- JWT authentication
- Real login notification email
- User dashboard to view appointments
- Real appointment booking with duplicate slot prevention
- MongoDB storage
- Admin dashboard to manage appointments and block dates
- Appointment status email notifications (Confirmation, Cancellation, etc.)
- WhatsApp integration
- Fully responsive design

## LOCAL DEVELOPMENT

### Backend
1. `cd server`
2. `npm install`
3. Create a `.env` file using the provided `.env.example` as a template and add your MongoDB connection string and SMTP credentials (e.g., Google App Password).
4. `npm run dev`

### Frontend
1. `cd client`
2. `npm install`
3. Create a `.env` file using `.env.example` and set `VITE_API_URL=http://localhost:5000/api`.
4. `npm run dev`

## DEPLOYMENT

### GitHub
1. `git init`
2. `git add .`
3. `git commit -m "Initial commit"`
4. `git branch -M main`
5. `git remote add origin YOUR_GITHUB_REPOSITORY_URL`
6. `git push -u origin main`

### Backend (Render or Railway)
- Use `process.env.PORT`
- Configure `CLIENT_URL` to point to the frontend deployed URL (e.g., Vercel URL) for CORS.
- Set all environment variables (MongoDB URI, JWT Secret, SMTP credentials).
- The start script `npm start` is configured in `package.json`.

### Frontend (Vercel)
- Import the repository.
- Set the root directory to `client`.
- Add environment variable `VITE_API_URL` pointing to the deployed backend URL (e.g., `https://your-backend-domain.com/api`).
- Deploy.
