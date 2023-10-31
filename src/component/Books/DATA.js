import { deleteBookById, getAllBook } from "../../_helper/CallApi/bookService";

export const bookPrimaryKey = "id";

export const bookPageLink = () => `/books`;

export const bookInitialForm = {
    title: "",
    author: "",
    summary: "",
};

export const bookApis = Object.freeze({
    getAll: {
        api: getAllBook,
    },
    delete: {
        api: deleteBookById,
    },
});
