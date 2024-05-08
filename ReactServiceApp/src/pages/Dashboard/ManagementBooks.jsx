import Container from "@/ui/layouts/Container";
import BooksTable from "@/features/dashboard/book-management/BooksTable";
import HeaderTitle from "@/ui/HeaderTitle";
import React from "react";

const ManagementBooks = () => {
    return (
        <div>
            <HeaderTitle>book management</HeaderTitle>
            <Container>
                <BooksTable />
            </Container>
        </div>
    );
};

export default ManagementBooks;
