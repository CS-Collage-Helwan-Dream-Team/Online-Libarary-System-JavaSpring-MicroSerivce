import { fetchAndDownloadExel } from "@/utils/fetchAndDownload";

export const getAvailableBooksReport = async () =>
	await fetchAndDownloadExel(
		"Report/available-books",
		`available-books-report`
	);

export const getBorrowedBooksReport = async () =>
	await fetchAndDownloadExel("Report/borrowed-books", `borrowed-books-report`);
