from datetime import datetime

from src.config.mysql_config import mysql_db

from src.services.crud.common import BookFilters


def check_post_body(body: dict) -> bool:
    if not (body.get('title', False) and body.get('author', False) and body.get('publication_date', False)):
        return False
    return True


def is_duplicate_book(title: str, author: str) -> bool:
    query = "SELECT EXISTS (SELECT 1 FROM books WHERE title=%s AND author=%s) AS exist"
    params = (title, author)
    return mysql_db.is_exists(query, params)[0]


def is_book_inactive(book_id: int) -> bool:
    query = "SELECT EXISTS (SELECT 1 FROM books WHERE id=%s AND is_active = %s) AS exist"
    params = (book_id, 0)
    return mysql_db.is_exists(query, params)[0]


def fetch_book_data(book_filters: BookFilters) -> dict:
    params = []
    query = ("SELECT id, title, author, publication_date, availability_date, borrowed_date "
             "FROM books "
             "WHERE is_active = 1")

    if book_filters.title:
        query += " AND title LIKE %s"
        params.append(f"%{book_filters.title}%")
    if book_filters.author:
        query += " AND author LIKE %s"
        params.append(f"%{book_filters.author}%")
    if book_filters.publication_date:
        book_filters.publication_date = (datetime.strptime(
            book_filters.publication_date, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d'))
        query += " AND publication_date LIKE %s"
        params.append(f"%{book_filters.publication_date}%")
    if book_filters.availability_date:
        book_filters.availability_date = (datetime.strptime(
            book_filters.availability_date, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d'))
        query += " AND availability_date LIKE %s"
        params.append(f"%{book_filters.availability_date}%")
    if book_filters.borrowing_time_range_start:
        book_filters.borrowing_time_range_start = (datetime.strptime(
            book_filters.borrowing_time_range_start, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d %H:%M:%S'))
        query += f" AND borrowed_date >= %s"
        params.append(f"{book_filters.borrowing_time_range_start}")
    if book_filters.borrowing_time_range_end:
        book_filters.borrowing_time_range_end = (datetime.strptime(
            book_filters.borrowing_time_range_end, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d %H:%M:%S'))
        query += f" AND borrowed_date <= %s"
        params.append(f"{book_filters.borrowing_time_range_end}")

    query += " ORDER BY created_at DESC"

    print(query, params, book_filters)

    return mysql_db.fetch_all_dictionary(query, tuple(params))
