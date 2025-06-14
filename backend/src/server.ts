import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import predictionRoutes from './routes/predictionRoutes';
import trackingRoutes from './routes/trackingRoutes';

const app = express();
const PORT = 4000;


// Because the browser says through the cross-origin policy: unless the server gives me permission, I will block the request
app.use(cors({
  origin: process.env.FRONTEND_URL, // allow requests from the frontend (CORS policy)
  credentials: true,
}));

app.use(express.json());
app.use('/auth', authRoutes);
app.use(predictionRoutes);
app.use(trackingRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Backend is working!');
});