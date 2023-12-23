require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const MemoryStore = require('memorystore')(session);
const authRoute = require('./routes/auth');
const passportStrategy = require('./passport'); 
const app = express();
const axios = require('axios');

app.use(
  session({
    secret: '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',
    resave: true,
    saveUninitialized: true,
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

// Import your routes
const adminActivities = require('./routes/AdminActRoute');
const employee = require('./routes/EmployeeRoutes');
const adminRoute = require('./routes/AdminRoute');
const pendingEmployeeApplication = require('./routes/PendingEmpAppRoutes');
const payroll = require('./routes/PayrollRoutes');
const productSubmission = require('./routes/ProductSubmissionRoute');
const user = require('./routes/UserRoute');
const userNotification = require('./routes/UserNotificationRoutes');
const userActivity = require('./routes/UserActRoutes');
const userProfile = require('./routes/UserProfileRoute')
const userPayroll = require('./routes/UserPayrollRoute');
const productRoute = require('./routes/ProductRoute');
const sewerShareRoute = require('./routes/SewerShareRoute');
const adminLogin = require('./routes/LoginAdminRoute');
const userRoutes = require('./routes/UserRoute');
const employeeLogin = require('./routes/LoginEmployeeRoute');
const clients = require('./routes/ClientRoute');
const productReport = require('./routes/productReportRoute');
const pendingEmployees = require('./routes/PendingEmpAppRoutes');
const pendingUser = require('./routes/PendingUserRoute');
const validate = require('./routes/ValidateUser');
const approvedProduct = require('./routes/ApprovedProductRoute');
const retriveProducts = require('./routes/adminRetrieveProducts');
const validateProduct = require('./routes/validateProductSubmission');

const authenticateToken = require('./middleware/UserJwtMiddleware');


const errorMiddleware = require('./middleware/errorMiddleware');


// Configuration
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND = process.env.FRONTEND;
const port = process.env.PORT || 3000;
const tokenSecret = process.env.JWT_SECRET || 'fallback-secret-key';

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions)); // Use cors here
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: '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',
    resave: true,
    saveUninitialized: true,
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
  })
);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
   // Include 'Authorization'
  next();
});


// Define routes
app.use('/api/adminActivities', adminActivities);
app.use('/api/admins', adminRoute);
app.use('/api/pendingEmployeeApplication', pendingEmployeeApplication);
app.use('/api/employee', employee);
app.use('/api/payroll', payroll);
app.use('/api/users/prodSub', productSubmission);
app.use('/api/user', user);
app.use('/api/userNotification', userNotification);
app.use('/api/userActivity', userActivity);
app.use('/api/userProfile', userProfile);
app.use('/api/userPayroll', userPayroll);
app.use('/api/products', productRoute);
app.use('/api/sewerShare', sewerShareRoute);
app.use('/api/admins/login', adminLogin);
app.use('/api/users', userRoutes);
app.use('/api/users/login', employeeLogin);
app.use('/api/clients', clients);
app.use('/api/productReport', productReport);
app.use('/api/user/pending',pendingEmployees);
app.use('/api/user/pendingUser',pendingUser);
app.use('/api/user/',validate);
app.use('/api/user/approvedProduct',approvedProduct);
app.use('/api/admin/',retriveProducts);
app.use('/auth', authRoute);
app.use('/api/admin', validateProduct);


const weatherAPIKey = process.env.TOMORROW_IO_API_KEY || 'Qb6SRxiXb74W1JJls7prkNZ7pILzRKKO'; 

app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required parameters.' });
    }

    console.log('Using API key:', weatherAPIKey);

    const response = await axios.get('https://api.tomorrow.io/v4/timelines', {
      params: {
        location: `${lat},${lon}`,
        fields: 'temperature_2m',
        apiKey: weatherAPIKey,
      },
    });

    console.log('Response from Tomorrow.io API:', response.data);

    const weatherData = response.data.data.timelines[0];
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Routes
app.get('/', (req, res) => {
  res.send('Hello ka'); 
});

app.get('/blog', (req, res) => {
  res.send('Hello Blog ka'); 
});

// Error handling middleware
app.use(errorMiddleware);

mongoose.connect('mongodb+srv://root:root1234@lawa.rcuij0u.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Node API app is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });