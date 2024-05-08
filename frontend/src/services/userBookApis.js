import { apiCalling } from "@/utils/helpers";

export async function getBooks(query) {
    try {
        const res = await apiCalling(`user/books?${query}`, "GET", {}, {});
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
export async function getBook(id) {
    try {
        const res = await apiCalling(`user/books/${id}`, "GET", {}, {});
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
export async function getCategories() {
    try {
        const res = await apiCalling(`librarian/categories`, "GET", {}, {});
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
export async function borrowBook(id) {
    try {
        const res = await apiCalling(`borrow/${id}/request`, "POST", {}, {});
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
