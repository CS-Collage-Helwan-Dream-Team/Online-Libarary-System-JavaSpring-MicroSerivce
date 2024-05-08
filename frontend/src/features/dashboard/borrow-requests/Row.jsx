import { useSearchParams } from "react-router-dom";
import Table from "@/ui/MyTable";
import {
	acceptBorrowRequest,
	rejectBorrowRequest,
} from "@/services/adminBorrowRequestsApis";
import RowActions from "../RowActions";

const BookRow = ({ data, num, maxRate, refetch }) => {
	const [searchParams] = useSearchParams();
	const page = +searchParams.get("page") || 1;
	// const rowNum = (page - 1) * LIMIT + num;
	const rowNum = page - 1 + num;
	const { id, bookName, requestUserName, requestedAt, status } = data;

	const handleAccept = async () => {
		await acceptBorrowRequest(id);
		refetch();
	};

	const handleReject = async () => {
		await rejectBorrowRequest(id);
		refetch();
	};

	return (
		<Table.Row>
			<div>{rowNum}</div>
			<div>{bookName}</div>
			<div>{requestUserName}</div>
			<div>{requestedAt}</div>
			<div>{status}</div>

			<RowActions
				status={status}
				onAccept={handleAccept}
				onReject={handleReject}
				hasActionsMenu={false}
				// onDelete={handleDelete}
				// editForm={<EditForm data={{ id, maxBorrowedBooks }} />}
			/>
		</Table.Row>
	);
};

export default BookRow;
