import { apiCalling } from "@/utils/helpers";

export async function getBooks(query) {
    try {
        const res = await apiCalling(`librarian/books?${query}`, "GET", {}, {});
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
export async function createBook(bookData, setError) {
    // change the bookData object to form data

    try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(bookData)) {
            formData.append(key, value || "");
        }
        // formData.append("categoryId", "1");
        formData.append("isAvailable", true);
        const res = await apiCalling(
            `librarian/books`,
            "POST",
            formData,
            {},
            true
        );
        const data = await res.json();
        if (!res.ok) {
            for (const [key, value] of Object.entries(data.errors)) {
                setError(key, { message: value });
            }
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
export async function updateBook(bookData, setError) {
    // change the bookData object to form data

    try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(bookData)) {
            if (key === "image") {
                typeof value === "string"
                    ? formData.append(key, "")
                    : formData.append(key, value);
                continue;
            }
            formData.append(key, value || "");
        }
        formData.append("categoryId", "1");
        formData.append("isAvailable", true);
        const res = await apiCalling(
            `librarian/books/${bookData.id}`,
            "PUT",
            formData,
            {},
            true
        );
        const data = await res.json();
        if (!res.ok) {
            for (const [key, value] of Object.entries(data.errors)) {
                setError(key, { message: value });
            }
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
export async function deleteBook(id) {
    try {
        const res = await apiCalling(
            `librarian/books/${id}`,
            "DELETE",
            JSON.stringify({
                id,
            }),
            {},
            true
        );
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
