import Table from "@/ui/MyTable";

const Row = ({ data }) => {
	const { borrowRecordId, bookName, authorName, borrowedAt } = data;

	return (
		<Table.Row>
			<div>{borrowRecordId}</div>
			<div>{bookName}</div>
			<div>{authorName}</div>
			<div>{new Date(borrowedAt).toDateString()}</div>
		</Table.Row>
	);
};

export default Row;
