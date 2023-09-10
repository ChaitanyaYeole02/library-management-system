from datetime import datetime

from src.config.mysql_config import mysql_db


def mark_book_inactive(book_id: int) -> None:
    query = "UPDATE books SET is_active=0 WHERE id=%s"
    params = (book_id,)

    mysql_db.update(query, params)


def calculate_availability(book_data: list) -> list:
    for i in range(len(book_data)):
        book_data[i]['available'] = True if (book_data[i]['availability_date'] and
                                             (book_data[i]['availability_date'] < datetime.utcnow().
                                              strftime('%Y-%m-%d %H:%M:%S'))) else False
    return book_data
