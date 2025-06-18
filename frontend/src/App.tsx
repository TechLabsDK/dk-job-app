import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Prediction1 from './pages/Prediction1';
import Prediction2 from './pages/Prediction2';
import Results from './pages/Results';
import Tracking from './pages/Tracking';
import VerifyCode from './pages/VerifyCode';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/verify" element={<VerifyCode />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/prediction" element={<Prediction1 />} />
        <Route path="/prediction2" element={<Prediction2 />} />
        <Route path="/results" element={<Results />} />
        <Route path="/tracking" element={<Tracking />} />
      </Route>
    </Routes>
  );
}

export default App
