import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { LIMIT } from "@/constants.js";
import Table from "@/ui/MyTable";
import TableAction from "@/ui/TableAction";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/ui/dialog";
import AddEditBookForm from "./AddEditBookForm";
import { useDeleteBook } from "./useDeleteBook";
import FullPageLoading from "@/ui/FullPageLoading";

const Img = styled.img`
    max-height: 10rem;
    width: auto;
`;

const BookRow = ({ data, num, maxRate }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +searchParams.get("page") || 1;
    // const rowNum = (page - 1) * LIMIT + num;
    const rowNum = page - 1 + num;
    const {
        id,
        title,
        authorName,
        imageUrl,
        isbn,
        category: { name },
        rackNumber,
    } = data;
    const { deleteBook, isDeleting } = useDeleteBook();

    return (
        <Table.Row>
            {isDeleting && <FullPageLoading />}
            <div>{rowNum}</div>

            <div>
                <Img src={imageUrl} alt="" />
            </div>
            <div className="text-ellipsis overflow-hidden max-w-[19ch] whitespace-nowrap">
                {title}
            </div>
            <div>{rackNumber}</div>
            <div>{authorName}</div>
            <div>{isbn}</div>
            <div>{name}</div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <TableAction />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Dialog>
                            <DialogTrigger>
                                <DropdownMenuLabel>
                                    <FaPencilAlt />
                                    edit
                                </DropdownMenuLabel>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>edit book</DialogTitle>
                                    <AddEditBookForm data={data} />
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        <div>
                            <button
                                onClick={() => {
                                    deleteBook(id);
                                }}
                            >
                                <DropdownMenuLabel>
                                    <FaTrash />
                                    delete
                                </DropdownMenuLabel>
                            </button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Table.Row>
    );
};

export default BookRow;
