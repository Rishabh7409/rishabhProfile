import RestMethod from "../ApiConfig/RestMethod";


export const addBook = async (data) => {
    let url = "/addBook";
    try {
        const response = await RestMethod.POST(url, data);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const getBookById = async (id) => {
    let url = "/getById/" + id;
    try {
        const response = await RestMethod.GET(url);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getAllBook = async () => {
    let url = "/getAll";
    try {
        const response = await RestMethod.GET(url);
       return response;
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const updateBookById = async (id, data) => {
    let url = "/updateById/" + id;
    try {
        const response = await RestMethod.PUT(url, data);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const deleteBookById = async (id) => {
    let url = "/deleteById/" + id;
    try {
        const response = await RestMethod.DELETE(url);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
};
