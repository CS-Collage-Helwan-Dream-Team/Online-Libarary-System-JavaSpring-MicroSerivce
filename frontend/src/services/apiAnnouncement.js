import { apiCalling } from "@/utils/helpers";

export async function sendAnnouncement(announcement) {
    console.log(announcement);
    try {
        const res = await apiCalling(
            `annotation/send`,
            "POST",
            JSON.stringify(announcement),
            {}
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
