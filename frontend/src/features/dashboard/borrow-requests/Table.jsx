import { useGetFilteredBorrowRequests } from "./useGetFilteredBorrowRequests";
import Spinner from "@/ui/Spinner";
import Table from "@/ui/MyTable";
import Container from "@/ui/layouts/Container";
import Row from "./Row";
import ExportToExcelBtn from "@/ui/ExportToExcelBtn";
import { getBorrowedBooksReport } from "@/services/reports";

export default function BorrowTable() {
	const { data, isLoading, refetch } = useGetFilteredBorrowRequests();
	const borrowRequests =
		data?.data?.filter((item) => item.status === "Pending") || [];

	const handleReportDownload = async () => await getBorrowedBooksReport();

	return (
		<Container className="relative">
			<div className="absolute -top-4 end-8">
				<ExportToExcelBtn onClick={handleReportDownload} />
			</div>
			{isLoading && <Spinner />}
			{!isLoading && (
				<Table columns="0.2fr 1fr 1fr 1fr 1fr 1fr" minWidth="0">
					<Table.Header>
						<div># </div>
						<div>book name</div>
						<div>request User Name</div>
						<div>requested At</div>
						<div>status</div>
						<div>actions</div>
					</Table.Header>
					<Table.Body
						data={borrowRequests}
						render={(borrowRequest, index) => (
							<Row
								key={index}
								data={borrowRequest}
								num={index + 1}
								refetch={refetch}
							/>
						)}
					></Table.Body>
				</Table>
			)}
			{/* {!isLoading && (
                <PagParent>
                    <MyPagination
                        dataLength={books?.data?.total}
                        pagePerView={searchParams.get("perPage") || LIMIT}
                    />
                </PagParent>
            )} */}
		</Container>
	);
}

// {
//             "id": 2,
//             "bookName": "asd",
//             "requestUserName": "librarian",
//             "requestedAt": "2024-04-30T01:36:43.0675684",
//             "status": "Pending"
//         }
