'use client'
import api from '@/service/api'
import { Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function TotalData({ title, identifier }: { title: string, identifier: string }) {
    const [detail, setDetail] = useState<{ totalDatas: number } | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const handleGetData = async () => {
        setIsLoading(true)
        await api.get(`/total-data?type=${identifier}`).then((res) => {
            setDetail(res.data)
        }).catch((err) => {
            console.log(err)
        })

        setIsLoading(false)
    }

    useEffect(() => {
        if (identifier) {
            handleGetData()
        }
    }, [identifier])


    return (
        <div className='w-full h-full aspect-video p-4 flex flex-col gap-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-400 justify-between items-center'>
            <p className='md:text-lg text-xs text-gray-500 dark:text-gray-400 font-semibold'>{title}</p>
            {isLoading ? (
                <Spinner />
            ) : (
                <p className='md:text-5xl text-2xl font-semibold text-gray-900 dark:text-gray-200'>{detail?.totalDatas}</p>
            )}
            <span></span>
        </div>
    )
}
