from typing import Optional
from pydantic import BaseModel


class BookFilters(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    publication_date: Optional[str] = None
    availability_date: Optional[str] = None
    borrowing_time_range_start: Optional[str] = None
    borrowing_time_range_end: Optional[str] = None
