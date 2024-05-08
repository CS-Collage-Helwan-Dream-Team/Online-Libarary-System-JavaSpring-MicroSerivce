import { DataTable } from "@/ui/DataTable";
import { useGetlibirarianBooks } from "./useGetlibirarianBooks";
import Table from "@/ui/MyTable";
import BookRow from "./BookRow";
import Spinner from "@/ui/Spinner";
import Button from "@/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/ui/dialog";
import AddEditBookForm from "./AddEditBookForm";
import { useState } from "react";
import BooksFilters from "./BooksFilters";

export default function BooksTable() {
    const { data, isLoading } = useGetlibirarianBooks();
    const books = data?.data || [];
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div className="flex items-center mb-[5rem] justify-between gap-12">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <Button className="">add book</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>add book</DialogTitle>
                            <AddEditBookForm setDialogOpen={setOpen} />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <BooksFilters />
            </div>

            {isLoading && <Spinner />}
            {!isLoading && (
                <Table
                    columns="0.2fr .6fr 1fr .6fr .9fr .5fr .5fr .3fr"
                    minWidth="0"
                >
                    <Table.Header>
                        <div># </div>
                        <div>image</div>
                        <div>name</div>
                        <div>rack number</div>
                        <div>author name</div>
                        <div>isbn</div>
                        <div>category</div>
                        <div>actions</div>
                    </Table.Header>
                    <Table.Body
                        data={books}
                        render={(book, index) => (
                            <BookRow
                                setDialogOpen={setOpen}
                                data={book}
                                key={book.id}
                                num={index + 1}
                            />
                        )}
                    ></Table.Body>
                </Table>
            )}
            {/* {!isLoading && (
                <PagParent>
                    <MyPagination
                        dataLength={books?.data?.total}
                        pagePerView={searchParams.get("perPage") || LIMIT}
                    />
                </PagParent>
            )} */}
        </div>
    );
}

const columns = [
    {
        accessorKey: "title",
        header: "Book Name",
    },
    {
        accessorKey: "authorName",
        header: "author name",
    },
    {
        accessorKey: "category",
        header: "category",
    },
    {
        accessorKey: "isbn",
        header: "isbn",
    },
    {
        accessorKey: "isbn",
        header: "isbn",
    },
];
