import { useState } from "react";
import { addBook } from "../features/api/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddBook = ({ onAddBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationDate, setPublicationDate] = useState(null);
  const [availabilityDate, setAvailabilityDate] = useState(null);
  const [borrowedDate, setBorrowedDate] = useState(null);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!title) {
        toast.error("Please add book", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return;
      }

      const response = await addBook({
        title,
        author,
        publication_date: publicationDate,
        availability_date: availabilityDate,
        borrowed_date: borrowedDate,
      });
      if (response.status === 200) {
        setTitle("");
        setAuthor("");
        setPublicationDate(null);
        setAvailabilityDate(null);
        setBorrowedDate(null);
        toast.success("Book added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });

        const newBook = {
          id: response.data.book_id,
          title,
          author,
          publication_date: publicationDate.toLocaleDateString(),
          availability_date: availabilityDate.toLocaleDateString(),
          borrowed_date: borrowedDate.toLocaleDateString(),
        };

        onAddBook(newBook);
      } else {
        toast.error(response.data.detail, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="add-from" onSubmit={onSubmit}>
        <div className="form-control">
          <label>
            Title<span>*</span>
          </label>
          <input
            type="text"
            placeholder="Add Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label>
            Author<span>*</span>
          </label>
          <input
            type="text"
            placeholder="Add Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label>
            Publication Date<span>*</span>
          </label>
          <DatePicker
            selected={publicationDate}
            onChange={(date) => setPublicationDate(date)}
            placeholderText="Select Publication Date"
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
            required
          />
        </div>
        <div className="form-control">
          <label>Availability Date</label>
          <DatePicker
            selected={availabilityDate}
            onChange={(date) => setAvailabilityDate(date)}
            placeholderText="Select Availability Date"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div className="form-control">
          <label>Borrowed Date</label>
          <DatePicker
            selected={borrowedDate}
            onChange={(date) => setBorrowedDate(date)}
            placeholderText="Select Borrowed Date"
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
          />
        </div>

        <input type="submit" value="Save Book" className="btn btn-block" />
      </form>
    </>
  );
};

export default AddBook;
