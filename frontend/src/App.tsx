import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Prediction from './pages/Prediction';
import Results from './pages/Results';
import Tracking from './pages/Tracking';
import VerifyCode from './pages/VerifyCode';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/results" element={<Results />} />
        <Route path="/traking" element={<Tracking />} />
      </Route>
    </Routes>
  );
}

export default App
