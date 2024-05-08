import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useSendAnnouncement } from "@/features/announcement/useSendAnnouncement";
import { FaXmark } from "react-icons/fa6";
import { GrAnnounce } from "react-icons/gr";

const MessageForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState("");
	const { isSending, sendAnnouncement } = useSendAnnouncement();
	const { user } = useAuthContext();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!message) return;
		sendAnnouncement({
			sender: user?.username,
			content: message,
		});
		setMessage("");
	};

	return (
		<>
			{user?.role === "librarian" && (
				<div className="fixed bottom-12 left-12 w-[100%] max-w-[40rem] ">
					{isOpen && (
						<div className="fade animated bg-white shadow-2xl rounded-xl overflow-hidden mb-8 ml-[3rem]">
							<div className="flex justify-between p-4 px-6 bg-[var(--color-brand-700)] text-white ">
								<h2 className="text-2xl font-bold">Announcement</h2>
								<button
									onClick={() => {
										setIsOpen(false);
									}}
								>
									<FaXmark />
								</button>
							</div>
							<form className="px-[1rem] py-[2rem]" onSubmit={handleSubmit}>
								<h3 className="mb-[2rem] text-[1.8rem]">enter your message</h3>
								<textarea
									className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 mb-[2rem]"
									placeholder="Enter your announcement here"
									value={message}
									onChange={(e) => setMessage(e.target.value)}
								></textarea>
								<button
									type="submit"
									className="w-full bg-[var(--color-brand-600)] text-white p-4"
								>
									send
								</button>
							</form>
						</div>
					)}
					<button
						onClick={() => {
							setIsOpen(!isOpen);
						}}
						className="text-[4.5rem] bg-[var(--color-brand-600)] w-[6.5rem] aspect-[1/1] flex items-center justify-center text-white rounded-full hover:bg-[var(--color-brand-700)]"
					>
						<GrAnnounce />
					</button>
				</div>
			)}
		</>
	);
};

export default MessageForm;
