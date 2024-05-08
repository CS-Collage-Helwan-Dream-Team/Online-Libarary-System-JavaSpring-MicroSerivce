import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Book, GitPullRequestCreate, HomeIcon, User2Icon } from "lucide-react";
import { FloatingNavbar } from "@/features/dashboard/FloatingNavbar";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";

export default function DashboardLayout() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, token } = useAuthContext();
    useEffect(() => {
        if (!token) navigate(`/login?redirect=${pathname}`);
        if (user?.role !== "librarian") navigate("/unauthorized");
    }, [pathname, token, user, navigate]);

    return (
        <>
            <FloatingNavbar navItems={navItems} />
            <main>
                <Outlet />
            </main>
        </>
    );
}

const navItems = [
    {
        name: "Books Management",
        link: "/dashboard/Books-Management",
        icon: <Book className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
        name: "Borrow Requests",
        link: "/dashboard/borrow-requests",
        icon: (
            <GitPullRequestCreate className="h-4 w-4 text-neutral-500 dark:text-white" />
        ),
    },
    {
        name: "Users Management",
        link: "/dashboard/users-management",
        icon: (
            <User2Icon className="h-4 w-4 text-neutral-500 dark:text-white" />
        ),
    },
];
