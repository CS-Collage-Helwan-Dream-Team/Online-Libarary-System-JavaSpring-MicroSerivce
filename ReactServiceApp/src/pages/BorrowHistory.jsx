import SparkledTitle from "@/ui/SparkledTitle";
import Table from "@/features/home-pages/borrow-history/Table";

export default function BorrowHistory() {
	return (
		<main>
			<header className="flex justify-center pt-64 pb-10 px-2 bg-neutral-100">
				<SparkledTitle TitleComponent="h1">Borrow History</SparkledTitle>
			</header>
			<div className="bg-gradient-to-b from-neutral-100 to-transparent h-10" />

			<Table />
		</main>
	);
}
