import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Reports from '../Pages/Reports';
import Settings from '../Pages/Settings';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default AppRoutes;
