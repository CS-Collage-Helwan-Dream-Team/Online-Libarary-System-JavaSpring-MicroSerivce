import { useSearchParams } from "react-router-dom";
import Table from "@/ui/MyTable";
import {
	acceptUser,
	deleteUser,
	rejectUser,
} from "@/services/adminUsersManagementApis";
import RowActions from "../RowActions";
import EditForm from "./EditForm";

const Row = ({ data, num, maxRate, refetch }) => {
	const [searchParams] = useSearchParams();
	const page = +searchParams.get("page") || 1;
	// const rowNum = (page - 1) * LIMIT + num;
	const rowNum = page - 1 + num;
	const { id, username, email, role, maxBorrowedBooks, status } = data;

	const handleAccept = async () => {
		await acceptUser(id);
		refetch();
	};

	const handleReject = async () => {
		await rejectUser(id);
		refetch();
	};

	const handleDelete = async () => {
		await deleteUser(id);
		refetch();
	};

	return (
		<Table.Row>
			<div>{rowNum}</div>
			<div>{username}</div>
			<div className="text-ellipsis overflow-hidden max-w-[19ch]">{email}</div>
			<div>{role}</div>
			<div>{maxBorrowedBooks}</div>
			<div>{status}</div>

			<RowActions
				status={status}
				onAccept={handleAccept}
				onReject={handleReject}
				onDelete={handleDelete}
				editForm={<EditForm data={{ id, maxBorrowedBooks }} />}
			/>
		</Table.Row>
	);
};

export default Row;
