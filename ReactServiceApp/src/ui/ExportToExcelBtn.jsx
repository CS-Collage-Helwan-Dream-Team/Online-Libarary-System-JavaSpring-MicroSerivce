import { FaFileCsv } from "react-icons/fa6";

export default function ExportToExcelBtn({ onClick }) {
	return (
		<button
			onClick={onClick}
			className="p-4 bg-brand-700 rounded-full shadow-md shadow-brand-500"
		>
			<FaFileCsv size={18} className="fill-white" />
		</button>
	);
}
