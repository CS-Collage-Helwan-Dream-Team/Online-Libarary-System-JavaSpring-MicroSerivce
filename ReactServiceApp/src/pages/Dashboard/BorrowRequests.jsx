import Table from "@/features/dashboard/borrow-requests/Table";
import HeaderTitle from "@/ui/HeaderTitle";
import Container from "@/ui/layouts/Container";

export default function BorrowRequests() {
	return (
		<>
			<HeaderTitle>manage borrow requests</HeaderTitle>

			<Container>
				<Table />
			</Container>
		</>
	);
}
