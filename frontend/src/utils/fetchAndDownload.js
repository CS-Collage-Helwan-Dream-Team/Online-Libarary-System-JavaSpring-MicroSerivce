import { apiCalling } from "./helpers";

export const fetchAndDownloadExel = async (route, fileName) => {
	const response = await apiCalling(route, "GET", {}, {});

	const blob = await response.blob();
	const urlBlob = window.URL.createObjectURL(new Blob([blob]));

	const link = document.createElement("a");
	link.href = urlBlob;
	link.setAttribute(
		"download",
		`${fileName} ${new Date().toDateString()}.xlsx`
	);
	document.body.appendChild(link);
	link.click();
	link.parentNode.removeChild(link);
};
