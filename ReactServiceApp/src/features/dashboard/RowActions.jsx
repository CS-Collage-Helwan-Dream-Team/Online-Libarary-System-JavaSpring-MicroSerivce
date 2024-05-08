import TableAction from "@/ui/TableAction";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

export default function RowActions({
	status,
	acceptTitle = "Accept",
	onAccept,
	rejectTitle = "Reject",
	onReject,
	onDelete,
	editForm,
}) {
	return status?.toLowerCase() === "pending" ? (
		<div className="flex justify-center gap-4">
			<button
				type="button"
				className="bg-green-500 text-white rounded-full p-4"
				onClick={onAccept}
				disabled={status?.toLowerCase() !== "pending"}
			>
				{acceptTitle}
			</button>
			<button
				type="button"
				className="bg-red-500 text-white rounded-full p-4"
				onClick={onReject}
				disabled={status?.toLowerCase() !== "pending"}
			>
				{rejectTitle}
			</button>
		</div>
	) : (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<TableAction />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<Dialog>
						<DialogTrigger>
							<DropdownMenuLabel>
								<FaPencilAlt />
								edit
							</DropdownMenuLabel>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>edit</DialogTitle>
								{editForm}
							</DialogHeader>
						</DialogContent>
					</Dialog>

					<button
						onClick={() => {
							onDelete();
						}}
						className="w-full flex justify-center"
					>
						<DropdownMenuLabel>
							<FaTrash />
							delete
						</DropdownMenuLabel>
					</button>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
