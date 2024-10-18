import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa'; // Import Save icon
import { fetchFees, deleteFee, updateFeesHistory } from '../../redux-toolkit/feeSlice'; // Import actions from the fee slice
import './FeesList.css';

function FeesList() {
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch(); // Initialize useDispatch

  // Access the fees state from the Redux store
  const { fees, isLoading, error } = useSelector((state) => state.fees);

  // Local state to track the row being edited
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [editedRecord, setEditedRecord] = useState({});

  useEffect(() => {
    dispatch(fetchFees()); // Fetch fees on component mount
  }, [dispatch]);

  const handleEdit = (fee) => {
    setEditingRecordId(fee._id); // Set the record ID being edited
    setEditedRecord({
      feesType: fee.feesType,
      amount: fee.amount,
      paymentDate: new Date(fee.paymentDate).toISOString().split('T')[0], // Format date for input
    });
  };

  // Save the changes
  const handleSave = (id) => {
    dispatch(updateFeesHistory({ id, updatedRecord: { ...editedRecord } }));
    setEditingRecordId(null); // Exit edit mode
  };

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this fee entry?')) {
      dispatch(deleteFee(id)); // Dispatch deleteFee action to remove fee entry
    }
  };

  return (
    <div>
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoChevronBackOutline />
        </button>
        <h2>Fees History</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        <table className="fees-table">
          <thead>
            <tr>
              <th>Admission No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Fees Type</th>
              <th>Amount Paid</th>
              <th>Paid Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fees.length > 0 ? (
              fees.map(fee => (
                <tr key={fee._id}>
                  <td>{fee.studentDetails?.admissionNo || 'N/A'}</td> {/* Safe access */}
                  <td>{fee.studentDetails?.name || 'N/A'}</td> {/* Safe access */}
                  <td>{fee.studentDetails?.class || 'N/A'}</td> {/* Safe access */}
                  {/* Editable fields */}
                  <td>
                    {editingRecordId === fee._id ? (
                      <input
                        type="text"
                        name="feesType"
                        value={editedRecord.feesType || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      fee.feesType
                    )}
                  </td>
                  <td>
                    {editingRecordId === fee._id ? (
                      <input
                        type="number"
                        name="amount"
                        value={editedRecord.amount || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      fee.amount
                    )}
                  </td>
                  <td>
                    {editingRecordId === fee._id ? (
                      <input
                        type="date"
                        name="paymentDate"
                        value={editedRecord.paymentDate || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      new Date(fee.paymentDate).toLocaleDateString()
                    )}
                  </td>
                  <td>{fee.status}</td>
                  <td>
                    {editingRecordId === fee._id ? (
                      <button className="action-button save-button" onClick={() => handleSave(fee._id)}>
                        <FaSave />
                      </button>
                    ) : (
                      <>
                        <button className="action-button edit-button" onClick={() => handleEdit(fee)}>
                          <FaEdit />
                        </button>
                        <button className="action-button delete-button" onClick={() => handleDelete(fee._id)}>
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No fees records available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeesList;
