const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/userRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');
const boatRoutes = require('./routes/boatRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const PORT = process.env.PORT || 3000;

const app = express();
// your mongodb Cloud URL
const dbCloudUrl = "mongodb+srv://fetizananjohnkenneth:Johnkenn23@cluster0.dmpyias.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbLocalUrl = 'mongodb://localhost:27017/express-mongo-api';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose
.connect(dbCloudUrl || dbLocalUrl)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connect to MongoDB', error));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

app.use('/.netlify/functions/app', router, bookingRoutes, boatRoutes, feedbackRoutes);

module.exports.handler = serverless(app);
