import Table from "@/features/dashboard/user-management/Table";
import HeaderTitle from "@/ui/HeaderTitle";
import Container from "@/ui/layouts/Container";

export default function UsersManagement() {
	return (
		<>
			<HeaderTitle>manage users</HeaderTitle>

			<Container>
				<Table />
			</Container>
		</>
	);
}
