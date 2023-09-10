from fastapi import APIRouter, Request, Body, Depends
from fastapi.responses import JSONResponse

from src.config import logger

from src.services.crud.common import BookFilters
from src.services.crud.create import add_book
from src.services.crud.update import mark_book_inactive, calculate_availability
from src.services.crud.read import check_post_body, is_duplicate_book, is_book_inactive, fetch_book_data

router = APIRouter(prefix="/api/v1/library")


@router.post("")
async def insert_book(request: Request, body: dict = Body()):
    try:
        if not check_post_body(body):
            return JSONResponse(status_code=201, content={"detail": "Missing or Invalid Parameters"})
        elif is_duplicate_book(body['title'], body['author']):
            return JSONResponse(status_code=202, content={"detail": "Book already present"})

        row_id = add_book(body)
        if row_id:
            return JSONResponse(status_code=200, content={"book_id": row_id, "detail": "Book Added!"})
        return JSONResponse(status_code=400, content={"detail": "Unable to add a book"})
    except Exception as e:
        logger.error(f"{e}", exc_info=True)
        return JSONResponse(status_code=500, content={"detail": "Error while adding a book!"})


@router.delete("/{book_id}")
async def delete_book(request: Request, book_id: int):
    try:
        if is_book_inactive(book_id):
            return JSONResponse(status_code=201, content={"detail": "Book Already Deleted!"})

        mark_book_inactive(book_id)
        return JSONResponse(status_code=200, content={"detail": "Book Deleted!"})
    except Exception as e:
        logger.error(f"{e}", exc_info=True)
        return JSONResponse(status_code=500, content={"detail": "Error while deleting a book!"})


@router.get("")
async def get_books(request: Request, book_filters: BookFilters = Depends()):
    try:
        book_data = calculate_availability(fetch_book_data(book_filters))
        return JSONResponse(status_code=200, content=book_data)
    except Exception as e:
        logger.error(f"{e}", exc_info=True)
        return JSONResponse(status_code=500, content={"detail": "Error in fetching book details"})
