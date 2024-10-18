import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import StaffDashboard from './pages/staffDashboard/StaffDashboard';
import LibrarianDashboard from './pages/librarianDashboard/LibrarianDashboard';
import StudentsDetails from './pages/adminDashboard/StudentsDetails';
import FeesHistory from './pages/staffDashboard/FeesHistory';
import LibraryHistory from './pages/librarianDashboard/LibraryHistory';
//import ProtectedRoute from './components/signUp/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Protected Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/librarian" element={<LibrarianDashboard />} />
        
        {/* Other Routes */}
        <Route path="/students" element={<StudentsDetails />} />
        <Route path="/fees" element={<FeesHistory />} />
        <Route path="/library" element={<LibraryHistory />} />
        
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
