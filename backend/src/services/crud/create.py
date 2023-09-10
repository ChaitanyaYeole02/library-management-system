from datetime import datetime

from src.config.mysql_config import mysql_db


def add_book(body: dict) -> int:
    body['publication_date'] = (datetime.strptime(body['publication_date'], '%Y-%m-%dT%H:%M:%S.%fZ').
                                strftime('%Y-%m-%d'))
    body['availability_date'] = (datetime.strptime(body['availability_date'], '%Y-%m-%dT%H:%M:%S.%fZ').
                                 strftime('%Y-%m-%d %H:%M:%S'))
    body['borrowed_date'] = (datetime.strptime(body['borrowed_date'], '%Y-%m-%dT%H:%M:%S.%fZ').
                             strftime('%Y-%m-%d %H:%M:%S'))

    query = ("INSERT INTO books (title, author, publication_date, availability_date, borrowed_date, "
             "is_active) VALUES (%s, %s, %s, %s, %s, %s)")
    params = (body['title'], body['author'], body['publication_date'], body.get('availability_date', None),
              body.get('borrowed_date', None), 1)

    return mysql_db.insert(query, params)
