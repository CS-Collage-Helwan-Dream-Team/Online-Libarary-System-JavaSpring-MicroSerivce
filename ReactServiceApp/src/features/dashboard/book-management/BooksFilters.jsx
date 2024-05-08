import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ExportToExcelBtn from "@/ui/ExportToExcelBtn";
import { Input } from "@/ui/InputField/Input";
import { getAvailableBooksReport } from "@/services/reports";

const BooksFilters = () => {
	const [searchParams, setSearchParams] = useSearchParams("");
	const [search, setSearch] = useState(searchParams.get("isbn") || "");
	const [rackNumber, setRackNumber] = useState(
		searchParams.get("rackNumber") || ""
	);
	const submitSearch = (event) => {
		event.preventDefault();
		searchParams.set("isbn", search);
		setSearchParams(searchParams);
	};

	const submitRackNumber = (event) => {
		event.preventDefault();

		searchParams.set("rackNumber", rackNumber);
		setSearchParams(searchParams);
	};

	const handleReportDownload = async () => await getAvailableBooksReport();

	return (
		<div className="flex grow justify-end gap-8">
			<ExportToExcelBtn onClick={handleReportDownload} />
			<form onSubmit={submitSearch}>
				<Input
					className="w-[25rem]"
					placeholder="search by isbn"
					value={search}
					onChange={(event) => {
						setSearch(event.target.value);
					}}
				/>
			</form>
			<form onSubmit={submitRackNumber}>
				<Input
					className="w-[25rem]"
					placeholder="search by rack number"
					type="number"
					value={rackNumber}
					onChange={(event) => {
						setRackNumber(event.target.value);
					}}
				/>
			</form>
		</div>
	);
};

export default BooksFilters;
