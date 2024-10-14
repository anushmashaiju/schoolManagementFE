import { useState } from 'react'
import './LibraryForm.css'

function LibraryForm() {
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
    const [newBook, setNewBook] = useState({
        studentName: '',
        class: '',
        admissionNo: '',
        bookId: '',
        bookName: '',
        autherName: '',
        borrowDate: '',
        returnDate: ''
    });


    const handleBookChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prev) => ({ ...prev, [name]: value }));
    };

    const handleBookSubmit = (e) => {
        e.preventDefault();
        const newBookEntry = {
            studentName: newBook.studentName,
            class: newBook.class,
            admissionNo: newBook.admissionNo,
            BookId: newBook.bookId,
            BookName: newBook.bookName,
            AutherName: newBook.autherName,
            BorrowDate: newBook.borrowDate,
            ReturnDate: newBook.returnDate,
        };
        setBookHistory((prev) => [...prev, newBookEntry]);
        setNewBook({
            studentName: '',
            class: '',
            admissionNo: '',
            bookId: '',
            bookName: '',
            autherName: '',
            borrowDate: '',
            returnDate: ''
        }); // Reset form
    };

    return (
        <div>
            {/* Add Details Form */}
            <div className="library-form-card">
                <h3>Add Book Details</h3>
                <form onSubmit={handleBookSubmit}>
                    <div>
                        <label>Name of Student:</label>
                        <input
                            type="text"
                            name="studentName" // Corrected the name to match state
                            value={newBook.studentName}
                            onChange={handleBookChange}
                            required
                        />
                        </div>
                        <div>
                            <label>Class:</label>
                            <input
                                type="text"
                                name="class"
                                value={newBook.class}
                                onChange={handleBookChange}
                                required
                            />
                        </div>
            

                    <div>
                        <label>Admission No:</label>
                        <input
                            type="text"
                            name="admissionNo" // Corrected the name to match state
                            value={newBook.admissionNo}
                            onChange={handleBookChange}
                            required
                        />
                        </div>
                        <div>
                            <label>Book Id:</label>
                            <input
                                type="text"
                                name="bookId"
                                value={newBook.bookId}
                                onChange={handleBookChange}
                                required
                            />
                        </div>

                    <div>
                        <label>Book Name:</label>
                        <input
                            type="text"
                            name="bookName"
                            value={newBook.bookName}
                            onChange={handleBookChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Auther Name:</label>
                        <input
                            type="text"
                            name="autherName"
                            value={newBook.autherName}
                            onChange={handleBookChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Borrow Date:</label>
                        <input
                            type="date"
                            name="borrowDate"
                            value={newBook.borrowDate}
                            onChange={handleBookChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Return Date:</label>
                        <input
                            type="date"
                            name="returnDate"
                            value={newBook.returnDate}
                            onChange={handleBookChange}
                            required
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form >
            </div >

        </div>
    )
}

export default LibraryForm
