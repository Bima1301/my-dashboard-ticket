'use client'
import api from '@/service/api'
import { Badge, Button, Spinner } from 'flowbite-react'
import moment from 'moment'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaArrowLeft } from 'react-icons/fa'

export default function TicketDetails({ params }: { params: { id: string } }) {
    const [status, setStatus] = useState<any>('')

    const [detail, setDetail] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    const handleGetData = async () => {
        await api.get(`/tickets/${params.id}`).then((res) => {
            setDetail(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        setIsLoading(true)
        if (params.id == 'new') {
            const dataLocal = localStorage.getItem('ticketDetails')
            if (dataLocal) {
                setDetail(JSON.parse(dataLocal))
            }
        } else {
            handleGetData()
        }
        setIsLoading(false)
    }, [params.id])

    const handlleStatus = (status: string) => {
        setStatus(status)
        setDetail((prev: any) => ({ ...prev, updatedAt: new Date().toISOString() }))
        toast.success('Ticket status updated successfully')
    }

    return (
        <div className='w-full h-full flex flex-col rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-400 my-10'>
            {isLoading ? (
                <div className='w-full flex justify-center items-center h-[300px]'>
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className='flex flex-row justify-between items-center p-6'>
                        <div className='flex flex-row gap-2 items-center'>
                            <Link href={'/tickets'}>
                                <button className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600'>
                                    <FaArrowLeft />
                                </button>
                            </Link>
                            <p className='md:text-xl text-lg font-semibold'>Ticket Details</p>
                        </div>
                        {status ? (
                            <Badge color={status == 'approved' ? 'success' : 'failure'} className='uppercase'>
                                {status}
                            </Badge>
                        ) : (
                            <div className='flex flex-row gap-2'>
                                <Button color='failure' onClick={() => handlleStatus('rejected')}>
                                    Reject
                                </Button>
                                <Button color='success' onClick={() => handlleStatus('approved')}>
                                    Approve
                                </Button>
                            </div>

                        )}
                    </div>
                    <div className='flex flex-col gap-4 p-6'>
                        <div className='flex flex-row w-full border-b border-gray-300 dark:border-gray-500 pb-4 md:text-base text-sm'>
                            <p className='w-full font-medium'>Name</p>
                            <p className='w-full text-gray-700 dark:text-gray-300'>{detail?.label}</p>
                        </div>
                        <div className='flex flex-row w-full border-b border-gray-300 dark:border-gray-500 pb-4 md:text-base text-sm'>
                            <p className='w-full font-medium'>Date</p>
                            <p className='w-full text-gray-700 dark:text-gray-300'>{moment(detail?.date).format('MMMM Do, YYYY')}</p>
                        </div>
                        <div className='flex flex-row w-full border-b border-gray-300 dark:border-gray-500 pb-4 md:text-base text-sm'>
                            <p className='w-full font-medium'>Priority</p>
                            <p className='w-full text-gray-700 dark:text-gray-300'><Badge color={detail?.priority === "high" ? "failure" : detail?.priority === "low" ? "warning" : "success"} className="uppercase w-fit py-1 px-3 rounded-full">{detail?.priority}</Badge></p>
                        </div>
                        <div className='flex flex-row w-full border-b border-gray-300 dark:border-gray-500 pb-4 md:text-base text-sm'>
                            <p className='w-full font-medium'>Created At</p>
                            <p className='w-full text-gray-700 dark:text-gray-300'>{moment(detail?.createdAt).format('MMMM Do, YYYY')}</p>
                        </div>
                        <div className='flex flex-row w-full border-b border-gray-300 dark:border-gray-500 pb-4 md:text-base text-sm'>
                            <p className='w-full font-medium'>Updated At</p>
                            <p className='w-full text-gray-700 dark:text-gray-300'>{moment(detail?.updatedAt).fromNow()}</p>
                        </div>
                        <p className='w-full md:text-xl text-lg font-medium my-5'>User Data</p>
                        <div className='flex flex-row w-full border-b border-gray-300 dark:border-gray-500 pb-4 md:text-base text-sm'>
                            <p className='w-full font-medium'>Name</p>
                            <p className='w-full text-gray-700 dark:text-gray-300'>{detail?.userData?.name}</p>
                        </div>
                        <div className='flex flex-row w-full border-b border-gray-300 dark:border-gray-500 pb-4 md:text-base text-sm'>
                            <p className='w-full font-medium'>Email</p>
                            <p className='w-full text-gray-700 dark:text-gray-300'>{detail?.userData?.email}</p>
                        </div>
                        <div className='flex flex-row w-full border-b border-gray-300 dark:border-gray-500 pb-4 md:text-base text-sm'>
                            <p className='w-full font-medium'>Role</p>
                            <p className='w-full text-gray-700 dark:text-gray-300'>
                                {detail?.userData?.role.charAt(0).toUpperCase() + detail?.userData?.role.slice(1)}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
