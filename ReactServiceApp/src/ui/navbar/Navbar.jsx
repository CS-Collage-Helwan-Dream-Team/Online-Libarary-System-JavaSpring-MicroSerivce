import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button";
import { useLogout } from "@/features/auth-pages/useLogout";
import { useAuthContext } from "@/context/AuthContext";
import { BiLogOut } from "react-icons/bi";
import { Bell, History, LayoutDashboard, LogOut } from "lucide-react";
const NavStyle = styled.nav`
    background: var(--color-grey-0);
    position: fixed;
    width: 100%;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    z-index: 99;
`;
const Item = styled.li`
    font-size: 1.6rem;
    font-weight: 500;
`;

const Navbar = () => {
    const { pathname } = useLocation();
    const afterAuthRedirect = `?redirect=${pathname}`;
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const handleSearch = () => {
        navigate(`/books?q=${search}`);
    };

    const { logout } = useLogout();
    const { token, user } = useAuthContext();

    return (
        <NavStyle>
            <div className=" py-6 container flex justify-between items-center ">
                <Link className="flex items-center gap-5" to={"/"}>
                    <div className=" w-20">
                        <img src="/logo.svg" alt="logo" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className=" text-4xl text-brand-700 font-bold">
                            Books
                        </h1>
                        <p>Library System</p>
                    </div>
                </Link>
                <div className="flex gap-14 items-center">
                    <form
                        action=""
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch();
                        }}
                    >
                        <input
                            type="search"
                            placeholder="Search books"
                            className="p-2 border-2 border-brand-600 rounded-lg focus:outline-none focus:border-brand-700"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                    {!token ? (
                        <div className="flex gap-6">
                            <Link>
                                <NavLink to={`/login${afterAuthRedirect}`}>
                                    <Button>login</Button>
                                </NavLink>
                            </Link>
                            <Link>
                                <NavLink to={`/signup${afterAuthRedirect}`}>
                                    <Button variation="secondary">
                                        Signup
                                    </Button>
                                </NavLink>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex gap-6">
                            {user?.role === "librarian" ? (
                                <Link to="/dashboard/Books-Management">
                                    <button className="p-4 w-fit rounded-full bg-brand-500">
                                        <LayoutDashboard
                                            size={20}
                                            className="text-white"
                                        />
                                    </button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/borrow-history">
                                        <button className="p-4 w-fit rounded-full bg-brand-500">
                                            <History
                                                size={20}
                                                className="text-white"
                                            />
                                        </button>
                                    </Link>
                                </>
                            )}

                            <button
                                onClick={logout}
                                className="p-4 w-fit rounded-full bg-brand-500"
                            >
                                <LogOut size={20} className="text-white" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </NavStyle>
    );
};

export default Navbar;
