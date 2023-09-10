import axios from "axios";

const baseURL = "http://localhost:8000/api/v1/library";

export const fetchBooks = async (term = "", filter = "title") => {
  try {
    let queryParams = "";

    if (filter === "title" && term) {
      queryParams = `?title=${encodeURIComponent(term)}`;
    } else if (filter === "author" && term) {
      queryParams = `?author=${encodeURIComponent(term)}`;
    } else if (filter === "publicationDate" && term) {
      queryParams = `?publication_date=${encodeURIComponent(term)}`;
    } else if (filter === "availabilityDate" && term) {
      queryParams = `?availability_date=${encodeURIComponent(term)}`;
    } else if (filter === "borrowingRange" && term) {
      queryParams = `?borrowing_time_range_start=${encodeURIComponent(term.startDate)}&borrowing_time_range_end=${encodeURIComponent(term.endDate)}`;
    }
    const response = await axios.get(`${baseURL}${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const addBook = async (book_data) => {
  try {
    console.log("API REQUEST POST:", `${baseURL}`, book_data);
    const response = await axios.post(`${baseURL}`, book_data);
    console.log("API RESPONSE:", response);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

export const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(`${baseURL}/${bookId}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
