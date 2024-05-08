import React, { useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Bell } from "lucide-react";
import toast from "react-hot-toast";

const Announcements = () => {
    const [data, setData] = useState([]);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        // Create a new WebSocket connection
        const ws = new WebSocket("ws://localhost:5214/api/annotation/connect");

        ws.onopen = () => {
            setConnection(ws);
        };

        ws.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            setData((prevData) => [...prevData, newData]);
        };

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <button className="p-4 w-fit rounded-full bg-brand-500 relative">
                        {data.length > 0 && (
                            <span className="absolute -top-0 -right-0 bg-red-500 text-white text-[1.4rem] px-2 py-1 rounded-full w-[1.2rem] aspect-[1/1] flex items-center justify-center"></span>
                        )}
                        <Bell size={20} className="text-white" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <ul className="flex flex-col gap-12 bg-white shadow-xl w-[37rem] py-[3rem] px-[2rem] rounded-lg border-t-4 border-[var(--color-brand-600)] mt-4">
                        {data?.map((item, index) => (
                            <li className="flex gap-6" key={index}>
                                <span className="bg-blue-200 min-w-[4rem] h-[4rem] flex items-center justify-center rounded-xl">
                                    <Bell
                                        size={20}
                                        className=" text-blue-700"
                                    />
                                </span>
                                <div>
                                    <h3 className="text-[1.6rem] text-[var(--color-grey-700)] mb-2">
                                        {" "}
                                        {item.Sender}
                                    </h3>
                                    <p className="text-[1.3rem] text-[var(--color-grey-400)]">
                                        {item.Content}
                                    </p>
                                </div>
                            </li>
                        ))}
                        {data.length === 0 && (
                            <li className="text-center text-[1.6rem] text-[var(--color-grey-500)]">
                                No new announcements
                            </li>
                        )}
                    </ul>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default Announcements;
