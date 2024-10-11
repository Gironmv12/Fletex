import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AppRoutes from './Routes/AppRoutes';

function App() {
  return (
    <Router>
      <Sidebar />
      <Navbar />
      <div className="main-content">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
