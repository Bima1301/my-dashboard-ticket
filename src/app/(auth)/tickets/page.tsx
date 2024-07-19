'use client';

import { DialogAddTicket } from '@/components/views/tickets/dialog/DialogAddTicket';
import { DialogEditTicket } from '@/components/views/tickets/dialog/DialogEditTicket';
import { TableTickets } from '@/components/views/tickets/table/TableTickets';
import api from '@/service/api';
import { Button, Dropdown, Pagination, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaFilter } from 'react-icons/fa';
import { FaArrowUpShortWide } from 'react-icons/fa6';

export default function Tickets() {
    const [data, setData] = useState<any[]>([]);
    const [sort, setSort] = useState<string>('desc');
    const [filter, setFilter] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const onPageChange = (page: number) => setCurrentPage(page);

    const handleFilterClick = (newFilter: string) => {
        setFilter(filter === newFilter ? '' : newFilter);
        setCurrentPage(1);
    };

    const handleSortClick = () => {
        setSort(sort === 'asc' ? 'desc' : 'asc');
        setCurrentPage(1);
    };

    const handleGetAllData = async () => {
        setIsLoading(true);
        try {
            const res = await api.get(`/tickets?page=${currentPage}&limit=10&sort=${sort}&filter=${filter}`);
            setData(res.data.data);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error(err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        handleGetAllData();
    }, [currentPage, sort, filter]);

    const handleAddTicket = (newTicket: { label: string, date: string, createdAt: string, updatedAt: string, userId: number }) => {
        setData(prevData => [newTicket, ...prevData]);
        toast.success("Ticket added successfully.");
    };

    const handleUpdateTicket = (updatedTicket: { id: number, label: string, date: string, priority: string, createdAt: string, updatedAt: string, userId: number }) => {
        setData(prevData => prevData.map(ticket =>
            ticket.id === updatedTicket.id ? { ...ticket, ...updatedTicket, updatedAt: new Date().toISOString() } : ticket
        ));
        toast.success("Ticket updated successfully.");
    };

    const handleDeleteTicket = (id: number) => {
        setData(prevData => prevData.filter(ticket => ticket.id !== id));
        toast.success("Ticket deleted successfully.");
    };

    return (
        <div className='w-full h-full flex flex-col rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-400 my-10'>
            <div className='flex flex-row justify-between items-center p-6'>
                <p className='text-xl font-semibold'>All Tickets</p>
                <div className='flex flex-row items-center gap-3'>
                    <button className='inline-flex items-center gap-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-500 dark:text-gray-400' onClick={handleSortClick}>
                        <FaArrowUpShortWide className={sort === 'desc' ? 'rotate-180' : ''} />
                        Sort
                    </button>

                    <Dropdown label="filter" dismissOnClick={false} renderTrigger={() => <button className='inline-flex items-center gap-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-500 dark:text-gray-400'>
                        <FaFilter />
                        Filter
                    </button>}>
                        <Dropdown.Item
                            className={`hover:bg-gray-300 dark:hover:bg-gray-500 ${filter === 'low' ? 'bg-gray-300 dark:bg-gray-500' : ''}`}
                            onClick={() => handleFilterClick('low')}
                        >
                            LOW
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`hover:bg-gray-300 dark:hover:bg-gray-500 ${filter === 'high' ? 'bg-gray-300 dark:bg-gray-500' : ''}`}
                            onClick={() => handleFilterClick('high')}
                        >
                            HIGH
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`hover:bg-gray-300 dark:hover:bg-gray-500 ${filter === 'normal' ? 'bg-gray-300 dark:bg-gray-500' : ''}`}
                            onClick={() => handleFilterClick('normal')}
                        >
                            NORMAL
                        </Dropdown.Item>
                    </Dropdown>
                    <Button onClick={() => setIsAddDialogOpen(true)}>
                        Add Ticket
                    </Button>
                </div>
            </div>
            <div>
                {isLoading ? (
                    <div className="flex justify-center items-center w-full h-[200px]">
                        <Spinner size="xl" />
                    </div>
                ) : (
                    <TableTickets
                        data={data}
                        setIsDialogEditOpen={setIsEditDialogOpen}
                        setSelectedItem={setSelectedItem}
                        onDelete={handleDeleteTicket}
                    />
                )}
            </div>
            <div className="flex justify-end w-full p-6">
                <Pagination layout="table" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            </div>

            <DialogAddTicket
                open={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onSubmit={handleAddTicket}
            />

            <DialogEditTicket
                open={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                onSubmit={handleUpdateTicket}
                values={selectedItem}
            />
        </div>
    );
}
