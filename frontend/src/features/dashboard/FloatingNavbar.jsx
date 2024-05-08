import { useState } from "react";
import {
	motion,
	AnimatePresence,
	useScroll,
	useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/utils/cn";
import { NavLink } from "react-router-dom";
import { useLogout } from "../auth-pages/useLogout";
import { useAuthContext } from "@/context/AuthContext";

export const FloatingNavbar = ({ navItems, className }) => {
	const { scrollYProgress } = useScroll();
	const [visible, setVisible] = useState(true);
	const { token } = useAuthContext();
	const { logout } = useLogout();

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		// Check if current is not undefined and is a number
		if (typeof current === "number") {
			let direction = current - scrollYProgress.getPrevious();

			if (direction < 0 || current === 1) {
				setVisible(true);
			} else {
				setVisible(false);
			}
		}
	});

	return (
		<AnimatePresence mode="wait">
			<motion.div
				initial={{
					opacity: 1,
					y: -100,
				}}
				animate={{
					y: visible ? 0 : -100,
					opacity: visible ? 1 : 0,
				}}
				transition={{
					duration: 0.2,
				}}
				className={cn(
					"flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-50 px-12 py-4 items-center justify-center space-x-4",
					className
				)}
			>
				{navItems.map((navItem, idx) => (
					<NavLink
						key={`link=${idx}`}
						to={navItem.link}
						end
						className={({ isActive }) =>
							cn(
								`relative group dark:text-neutral-50 items-center flex space-x-1 px-4 py-2 text-neutral-600 border border-transparent rounded-full hover:border-brand-500 hover:text-neutral-500 transition-colors duration-300 ${
									isActive ? "!border-brand-700" : ""
								}`
							)
						}
					>
						<span className="block sm:hidden">{navItem.icon}</span>
						<span className="hidden sm:block text-lg">{navItem.name}</span>
					</NavLink>
				))}

				{token && (
					<button
						type="button"
						onClick={logout}
						className="relative group items-center flex space-x-1 px-4 py-2 text-white bg-brand-500 border !border-brand-500 rounded-full shadow-lg hover:text-neutral-500 hover:bg-transparent transition-colors duration-300"
					>
						<span className="text-lg">Logout</span>
					</button>
				)}
			</motion.div>
		</AnimatePresence>
	);
};
