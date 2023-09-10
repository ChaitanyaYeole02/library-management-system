import { FaTimes } from "react-icons/fa";

const Book = ({ book, onDelete }) => {
  return (
    <div className={`book`}>
      <h3>
        {book.title}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(book.id)}
        />
      </h3>

      <p>by {book.author}</p>
    </div>
  );
};

export default Book;
