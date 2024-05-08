export default function Container({ children, isLogin }) {
	const backgroundImg = isLogin
		? `bg-[url('/imgs/home_pages/about.jpg')]`
		: `bg-[url('/imgs/home_pages/book1.jpg')]`;

	return (
		<main
			className={`w-dvw h-dvh flex justify-center items-center ${backgroundImg} bg-cover bg-center`}
		>
			<div className="absolute inset-0 bg-brand-200/25 backdrop-blur-[2px] pointer-events-none" />

			<div className="flex flex-col items-center max-w-6xl w-full mx-auto rounded-none md:rounded-2xl p-8 md:p-20 shadow-input bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm border shadow-lg shadow-brand-500/50">
				{children}
			</div>
		</main>
	);
}
