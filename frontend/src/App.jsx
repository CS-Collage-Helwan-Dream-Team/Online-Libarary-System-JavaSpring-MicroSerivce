import "./globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";

import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import BookDetails from "./pages/BookDetails";

import HomeLayout from "@/ui/layouts/HomeLayout";
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import Login from "@pages/Login";
import SignUp from "@pages/SignUp";
import AllBooks from "@pages/AllBooks";
import BorrowHistory from "@/pages/BorrowHistory";
import DashboardLayout from "@/ui/layouts/DashboardLayout";
import BorrowRequests from "@pages/Dashboard/BorrowRequests";
import UsersManagement from "@pages/Dashboard/UsersManagement";
import Providers from "./Providers";

import ManagementBooks from "./pages/Dashboard/ManagementBooks";

import UnAuthorized from "./pages/UnAuthorized";
import AuthLayout from "./ui/layouts/AuthLayout";

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 0,
                refetchOnWindowFocus: false,
            },
        },
    });

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />

                <Providers>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<HomeLayout />}>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/books/:id"
                                    element={<BookDetails />}
                                />
                                <Route path="/books" element={<AllBooks />} />
                                <Route
                                    path="/borrow-history"
                                    element={<BorrowHistory />}
                                />
                            </Route>

                            <Route
                                path="/dashboard"
                                element={<DashboardLayout />}
                            >
                                <Route
                                    path=""
                                    element={
                                        <Navigate to="./Books-Management" />
                                    }
                                />
                                <Route
                                    path="borrow-requests"
                                    element={<BorrowRequests />}
                                />
                                <Route
                                    path="users-management"
                                    element={<UsersManagement />}
                                />
                                <Route
                                    path="Books-Management"
                                    element={<ManagementBooks />}
                                />
                            </Route>

                            <Route path="/" element={<AuthLayout />}>
                                <Route path="login" element={<Login />} />
                                <Route path="signup" element={<SignUp />} />
                            </Route>

                            <Route
                                path="/unauthorized"
                                element={<UnAuthorized />}
                            />
                            <Route path="/not-found" element={<NotFound />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </Providers>

                <Toaster
                    gutter={12}
                    position="top-center"
                    containerStyle={{ margin: "0px" }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },

                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backgroundColor: "var(--color-grey-0)",
                            color: "var(--color-grey-700)",
                        },
                    }}
                />
            </QueryClientProvider>
        </>
    );
}

export default App;
