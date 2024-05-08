import { useGetBorrowRequestsHistory } from "./useGetBorrowRequestsHistory";
import Spinner from "@/ui/Spinner";
import Table from "@/ui/MyTable";
import Container from "@/ui/layouts/Container";
import Row from "./Row";

export default function BorrowHistoryTable() {
	const { data, isLoading } = useGetBorrowRequestsHistory();
	const borrowRequestsHistory = data?.data;

	return (
		<Container>
			{isLoading && <Spinner />}
			{!isLoading && (
				<Table columns="0.2fr 1fr 1fr 1fr" minWidth="0">
					<Table.Header>
						<div># </div>
						<div>book name</div>
						<div>author name</div>
						<div>borrowed At</div>
					</Table.Header>
					<Table.Body
						data={borrowRequestsHistory}
						render={(borrowHistoryItem) => (
							<Row
								key={borrowHistoryItem.borrowRecordId}
								data={borrowHistoryItem}
							/>
						)}
					></Table.Body>
				</Table>
			)}
		</Container>
	);
}
