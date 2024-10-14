import { useNavigate } from 'react-router-dom';
import FeesForm from '../../components/Fees/FeesForm';

const StaffDashboard = () => {
 
 
  const navigate = useNavigate();

  // Function to handle logout and navigate to login page
  const handleLogout = () => {
    navigate('/'); // Navigate to the login page
  };

  return (
    <div>
        <nav className="custom-navbar">
        <h1>Office Staff Dashboard</h1>
        <div className="nav-buttons">
          <button onClick={() =>navigate('/students')}>Students Details</button>
          <button onClick={() =>navigate('/library')}>Library History</button>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
<FeesForm/>
    
    </div >
  );
};

export default StaffDashboard;
