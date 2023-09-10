import mysql.connector as conn

from contextlib import contextmanager

host_val = "mysql"
user_val = "root"
pass_val = "yeole"
db_val = "library_management_dev"


@contextmanager
def get_mysql_connection():
    connection = conn.connect(
        host=host_val,
        user=user_val,
        password=pass_val,
        database=db_val
    )

    try:
        yield connection
    finally:
        connection.close()


class MySQLDatabase:
    def __init__(self):
        pass

    def fetch_all(self, query, params=None):
        with get_mysql_connection() as connection:
            if connection:
                cursor = connection.cursor()
                cursor.execute(query, params)
                return cursor.fetchall()

    def fetch_all_dictionary(self, query, params=None):
        with get_mysql_connection() as connection:
            if connection:
                cursor = connection.cursor(dictionary=True)
                cursor.execute(query, params)
                return cursor.fetchall()

    def is_exists(self, query, params=None):
        with get_mysql_connection() as connection:
            if connection:
                cursor = connection.cursor()
                cursor.execute(query, params)
                return cursor.fetchone()

    def insert(self, query, params=None):
        with get_mysql_connection() as connection:
            if connection:
                cursor = connection.cursor()
                cursor.execute(query, params)
                connection.commit()
                return cursor.lastrowid

    def update(self, query, params=None):
        with get_mysql_connection() as connection:
            if connection:
                cursor = connection.cursor()
                cursor = cursor.execute(query, params)
                connection.commit()
                return cursor


mysql_db = MySQLDatabase()
