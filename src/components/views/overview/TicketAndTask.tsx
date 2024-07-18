'use client'
import api from '@/service/api'
import { Badge, Radio, Spinner } from 'flowbite-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { DialogAddTask } from './DialogAddTask'
import toast from 'react-hot-toast'

export default function TicketAndTask() {
    const [detailUnresolved, setDetailUnresolved] = useState<any>(null)
    const [isLoadingUnresolved, setIsLoadingUnresolved] = useState<boolean>(true)

    const [detailTasks, setDetailTasks] = useState<any>(null)
    const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true)
    const [isDialogAddTaskOpen, setIsDialogAddTaskOpen] = useState<boolean>(false)

    const handleGetDataUnresolved = async () => {
        setIsLoadingUnresolved(true)
        await api.get(`/unresolved-tickets`).then((res) => {
            setDetailUnresolved(res.data)
        }).catch((err) => {
            console.log(err)
        })

        setIsLoadingUnresolved(false)
    }

    const handleGetDataTasks = async () => {
        setIsLoadingTasks(true)
        await api.get(`/tasks`).then((res) => {
            setDetailTasks(res.data)
        }).catch((err) => {
            console.log(err)
        })

        setIsLoadingTasks(false)
    }

    const handleTaskStatusChange = (index: number) => {
        setDetailTasks((prevTasks: any) =>
            prevTasks.map((task: any, i: number) =>
                i === index ? { ...task, status: task.status === 'done' ? 'pending' : 'done' } : task
            )
        )
        toast.success('Task status changed successfully')
    }

    const handleAddTask = (newTaskLabel: string) => {
        const newTask = {
            label: newTaskLabel,
            status: 'pending',
            type: 'new',
        }
        setDetailTasks((prevTasks: any) => [...prevTasks, newTask])
        toast.success('New task added successfully')
    }

    useEffect(() => {
        handleGetDataUnresolved()
    }, [])

    useEffect(() => {
        handleGetDataTasks()
    }, [])

    return (
        <div className='flex lg:flex-row flex-col md:gap-10 gap-5'>
            <div className='w-full h-full flex flex-col rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-400 justify-between '>
                <div className='flex flex-row justify-between w-full items-center lg:p-6 p-4'>
                    <div className='flex flex-col gap-1'>
                        <p className='md:text-xl text-base font-bold'>Unresolved Tickets</p>
                        <p className='text-gray-400 md:text-sm text-xs font-medium'>
                            Group: <span className='text-gray-500 dark:text-gray-400'>Support</span>
                        </p>
                    </div>
                    <Link href={'/unresolved-tickets'} className='text-blue-500 hover:underline font-medium md:text-base text-xs'>
                        View details
                    </Link>
                </div>
                {isLoadingUnresolved ? (
                    <div className='w-full flex justify-center items-center h-[200px]'>
                        <Spinner />
                    </div>
                ) : (
                    <div className='flex flex-col divide-y dark:divide-gray-500'>
                        {detailUnresolved && Object.keys(detailUnresolved).map((key, index) => (
                            <div key={index} className='flex flex-row justify-between items-center lg:p-6 p-4'>
                                <p className='md:text-base text-sm'>{key}</p>
                                <p className='text-gray-400 md:text-base text-sm'>{detailUnresolved[key]}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='w-full h-full flex flex-col rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-400 justify-between '>
                <div className='flex flex-row justify-between w-full items-center lg:p-6 p-4'>
                    <div className='flex flex-col gap-1'>
                        <p className='md:text-xl text-base font-bold'>Tasks</p>
                        <p className='text-gray-400 md:text-sm text-xs font-medium'>
                            Today
                        </p>
                    </div>
                    <Link href={'/tasks'} className='text-blue-500 hover:underline font-medium md:text-base text-xs'>
                        View details
                    </Link>
                </div>
                <div className='flex flex-col divide-y dark:divide-gray-500'>
                    <button className='flex flex-row justify-between items-center lg:p-6 p-4'
                        onClick={() => setIsDialogAddTaskOpen(true)}
                    >
                        <p className='md:text-base text-sm text-gray-400 font-medium'>Create new task</p>
                        <div className='rounded-md p-2 bg-gray-200'>
                            <FaPlus size={14} className='text-gray-400 dark:text-gray-600' />
                        </div>
                    </button>
                    {isLoadingTasks ? (
                        <div className='w-full flex justify-center items-center h-[150px]'>
                            <Spinner />
                        </div>
                    ) :
                        detailTasks.map((item: any, index: number) => (
                            <div key={index} className='flex flex-row justify-between items-center lg:p-6 p-4' onClick={() => handleTaskStatusChange(index)}>
                                <div className='flex flex-row items-center gap-2'>
                                    <Radio checked={item.status === 'done'} readOnly />
                                    <p className={`md:text-base text-sm ${item.status === 'done' ? 'line-through' : ''}`}>{item.label}</p>
                                </div>
                                <Badge color={item.type == 'urgent' ? 'warning' : item.type == 'default' ? 'gray' : 'success'}>
                                    {item.type}
                                </Badge>
                            </div>
                        ))
                    }
                </div>
            </div>

            <DialogAddTask
                onClose={() => setIsDialogAddTaskOpen(false)}
                open={isDialogAddTaskOpen}
                onSubmit={(newTaskLabel: string) => {
                    handleAddTask(newTaskLabel);
                    setIsDialogAddTaskOpen(false);
                }}
            />
        </div>
    )
}