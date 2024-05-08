export default function Heading({ title, titlePrefix, subtitle }) {
	return (
		<>
			<h1 className="font-bold text-4xl text-gray-800 dark:text-gray-200">
				<span className="text-brand-700">{titlePrefix}</span> {title}
			</h1>
			<p className="text-gray-700 text-2xl mt-2 dark:text-gray-300">
				{subtitle}
			</p>
		</>
	);
}
