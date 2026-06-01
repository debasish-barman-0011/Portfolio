require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const projectsRoutes = require('./routes/projects');
const educationRoutes = require('./routes/education');
const achievementsRoutes = require('./routes/achievements');
const certificatesRoutes = require('./routes/certificates');
const blogsRoutes = require('./routes/blogs');
const communityRoutes = require('./routes/community');
const contactRoutes = require('./routes/contact');
const resumeRoutes = require('./routes/resume');
const lockerRoutes = require('./routes/locker');
const statsRoutes = require('./routes/stats');

connectDB();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(morgan('dev'));

// Global rate limiter
const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(globalLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/locker', lockerRoutes);
app.use('/api/stats', statsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));