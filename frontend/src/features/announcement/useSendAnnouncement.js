import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { sendAnnouncement as sendAnnouncementApi } from "@/services/apiAnnouncement";

export function useSendAnnouncement() {
    const { isPending: isSending, mutate: sendAnnouncement } = useMutation({
        mutationFn: (bookData) => {
            return sendAnnouncementApi(bookData);
        },
        onSuccess: (success) => {
            toast.success(success?.message);
        },
        onError: (err) => toast.error(err.message),
    });

    return { isSending, sendAnnouncement };
}
