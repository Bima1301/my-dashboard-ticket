"use client";

import useAuthStore from "@/stores/authStore";
import { Avatar, Badge, Table, Tooltip } from "flowbite-react";
import moment from "moment";
import Link from "next/link";
import { FaEye, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export function TableTickets({ data, setIsDialogEditOpen, setSelectedItem, onDelete }: { data: any, setIsDialogEditOpen: any, setSelectedItem: any, onDelete: (id: number) => void }) {
    const { currentUser } = useAuthStore()
    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>Ticket Details</Table.HeadCell>
                    <Table.HeadCell>Customer Name</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell>Priority</Table.HeadCell>
                    {currentUser?.role === "admin" && (
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    )}
                </Table.Head>
                <Table.Body className="divide-y">
                    {data?.map((ticket: any) => (
                        <Table.Row key={ticket.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="flex flex-row items-center gap-3 min-w-[300px]">
                                <Avatar
                                    img={`https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`}
                                    rounded
                                    size={"md"}
                                />
                                <div className="flex flex-col ">
                                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        {ticket.label}
                                    </p>
                                    <p className="text-xs text-gray-400 ">
                                        {moment(ticket.updatedAt).fromNow()}
                                    </p>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 min-w-[120px]">
                                    {ticket.userData.name}
                                </p>
                                <p className="text-xs text-gray-400 ">
                                    on {moment(ticket.createdAt).format("DD.MM.YYYY")}
                                </p>
                            </Table.Cell>
                            <Table.Cell>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 min-w-[120px]">
                                    {moment(ticket.date).format("MMMM DD, YYYY")}
                                </p>
                                <p className="text-xs text-gray-400 ">
                                    {moment(ticket.date).format("hh:mm A")}
                                </p>
                            </Table.Cell>
                            <Table.Cell>
                                <Badge color={ticket.priority === "high" ? "failure" : ticket.priority === "low" ? "warning" : "success"} className="uppercase w-fit py-1 px-3 rounded-full">{ticket.priority}</Badge>
                            </Table.Cell>
                            {currentUser?.role === "admin" && (
                                <Table.Cell className="min-w-[120px] flex flex-row items-center gap-2 ">
                                    <Tooltip content="Detail">
                                        <Link href={`/tickets/${ticket.id || 'new'}`} >
                                            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                                                onClick={() => {
                                                    if (!ticket.id) {
                                                        localStorage.setItem('ticketDetails', JSON.stringify(ticket));
                                                    }
                                                }}
                                            >
                                                <FaEye size={18} />
                                            </button>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip content="Edit">
                                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                                            onClick={() => {
                                                setSelectedItem(ticket);
                                                setIsDialogEditOpen(true);
                                            }}
                                        >
                                            <FaPencil size={18} />
                                        </button>
                                    </Tooltip>
                                    <Tooltip content="Delete">
                                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                                            onClick={() => onDelete(ticket.id)}
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </Tooltip>
                                </Table.Cell>
                            )}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
