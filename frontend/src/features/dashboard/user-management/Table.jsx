import { useGetFilteredUsers } from "./useGetFilteredUsers";
import Spinner from "@/ui/Spinner";
import Table from "@/ui/MyTable";
import Container from "@/ui/layouts/Container";
import Row from "./Row";

export default function UsersTable() {
	const { data, isLoading, refetch } = useGetFilteredUsers();
	const users = data?.data || [];

	return (
		<Container>
			{isLoading && <Spinner />}
			{!isLoading && (
				<Table columns="0.2fr 1fr 1fr 1fr 1fr 1fr 1.5fr" minWidth="0">
					<Table.Header>
						<div># </div>
						<div>user name</div>
						<div>email</div>
						<div>role</div>
						<div>maxBorrowedBooks</div>
						<div>status</div>
						<div>actions</div>
					</Table.Header>
					<Table.Body
						data={users}
						render={(user, index) => (
							<Row key={index} data={user} num={index + 1} refetch={refetch} />
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
