 import  { useState } from 'react'
 import './LibraryList.css'
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';

 function LibraryList() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [bookHistory, setBookHistory] = useState([
    { 
      id: 1, studentName: 'John Doe', class: '10th', admissionNo: 'A101', 
      bookId: 'B001', bookName: 'To Kill a Mockingbird', authorName: 'Harper Lee', 
      borrowDate: '2024-09-01', returnDate: '2024-09-15' 
    },
    { 
      id: 2, studentName: 'Jane Smith', class: '11th', admissionNo: 'A102', 
      bookId: 'B002', bookName: '1984', authorName: 'George Orwell', 
      borrowDate: '2024-09-10', returnDate: '2024-09-25' 
    },
    { 
      id: 3, studentName: 'Michael Johnson', class: '12th', admissionNo: 'A103', 
      bookId: 'B003', bookName: 'The Great Gatsby', authorName: 'F. Scott Fitzgerald', 
      borrowDate: '2024-09-12', returnDate: '2024-09-26' 
    },
  ]);
   return (
     <div>
       {/* Fee history table */}
 <div className="container" >
 <button className="back-button" onClick={() => navigate(-1)}>
          <IoChevronBackOutline />
        </button>
 <h2>Library History</h2>
 <table className="book-table">
   <thead>
     <tr>
       <th>Student Name</th>
       <th>Class</th>
       <th>Admission No</th>
       <th>Book ID</th>
       <th>Book Name</th>
       <th>Auther Name</th>
       <th>Borrow Date</th>
       <th>Return Date</th>
     </tr>
   </thead>
   <tbody>
     {bookHistory.map(book => (
       <tr key={book.id}>
         <td>{book.studentName}</td>
         <td>{book.class}</td>
         <td>{book.admissionNo}</td>
         <td>{book.bookId}</td>
         <td>{book.bookName}</td>
         <td>{book.authorName}</td>
         <td>{new Date(book.borrowDate).toLocaleDateString()}</td>
         <td>{new Date(book.returnDate).toLocaleDateString()}</td>         
       </tr>
     ))}
   </tbody>
 </table>
</div>
     </div>
   )
 }
 
 export default LibraryList
 
 
 
 