'use client'
import { formatNumber } from '@/libs/utils';
import api from '@/service/api';
import { Spinner } from 'flowbite-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const detailChart = [
    {
        name: 'Resolved',
        value: 'resolved',
        prefix: '',
    },
    {
        name: 'Received',
        value: 'received',
        prefix: '',
    },
    {
        name: 'Average first response time',
        value: 'avgFirstResponseTime',
        prefix: 'm',
    },
    {
        name: 'Average response time',
        value: 'avgFesponseTime',
        prefix: '',
    },
    {
        name: 'Resolution with SLA',
        value: 'resolutionWithSLA',
        prefix: '%',
    }
]

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default function DataChart() {
    const [detail, setDetail] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const handleGetData = async () => {
        setIsLoading(true)
        await api.get(`/chart-data`).then((res) => {
            setDetail(res.data)
        }).catch((err) => {
            console.log(err)
        })

        setIsLoading(false)
    }

    useEffect(() => {
        handleGetData()
    }, [])

    console.log(detail)

    return (
        <div className='w-full h-full flex lg:flex-row flex-col gap-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-400 justify-between '>
            <div className='flex flex-col gap-8 w-full h-full lg:p-6 p-4'>
                <div className='flex flex-col gap-1'>
                    <p className='md:text-xl text-base font-bold'>Today&apos;s trends</p>
                    <p className='text-gray-400 md:text-sm text-xs font-medium'>
                        as {moment().format('MMMM Do YYYY, h:mm')}
                    </p>
                </div>
                {isLoading ? (
                    <div className='w-full flex justify-center items-center h-[300px]'>
                        <Spinner />
                    </div>
                ) : (
                    <div className='w-full h-[300px]'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                width={500}
                                height={400}
                                data={detail?.chartData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name"
                                    tick={<CustomizedAxisTick />}
                                />
                                <YAxis
                                    tick={<CustomYAxisLabel />}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="today" stroke="#8884d8" fill="#8884d8" />
                                <Area type="monotone" dataKey="yesterday" stroke="#82ca9d" fill="#82ca9d" />
                                <Legend />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
            {isLoading ? (
                <div className='w-full flex justify-center items-center lg:max-w-[20%]'>
                    <Spinner />
                </div>
            ) : (
                <div className='lg:flex flex-col grid grid-cols-2 border-l justify-evenly w-full lg:max-w-[20%] dark:border-l-gray-500'>
                    {Object.entries(detail?.chartDetailData).map(([key, value]: any, index: number) => (
                        <div className='flex flex-col gap-2 justify-center items-center border-b p-4 dark:border-b-gray-500' key={index}>
                            <p className='md:text-base text-xs text-gray-400 font-semibold text-center'>
                                {detailChart.find((item: any) => item.value === key)?.name}
                            </p>
                            <p className='md:text-2xl text-base font-semibold text-gray-900 dark:text-gray-200 text-center'>
                                {(key !== 'avgFirstResponseTime' && key !== 'avgFesponseTime') && value} {key === 'avgFirstResponseTime' || key === 'avgFesponseTime' ? `${Math.floor(70 / 60)}h ${70 % 60}m` : key == 'resolutionWithSLA' ? '%' : ''}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const CustomYAxisLabel = ({ x, y, stroke, payload }: any) => {
    return (
        <text x={x} y={y} dy={0} className='fill-gray-600 dark:fill-gray-400' fontSize={12} textAnchor="end">
            {formatNumber(payload.value)}
        </text>
    );
};

const CustomizedAxisTick = (props: any) => {
    const { x, y, payload, isChild } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                className='fill-gray-600 dark:fill-gray-400'
                fontSizeAdjust={1.5}
                fontSize={isChild ? 6 : 10}
            >
                {payload.value}
            </text>
        </g>
    );
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            // <Box bgcolor={"rgba(38, 39, 50, 0.9)"} borderRadius={'5px'} display={'flex'} flexDirection={'column'} gap={'5px'} color={'white'} padding={'8px'}>
            <div className="bg-black/70 text-white rounded-lg p-4 flex flex-col gap-2">
                <span style={{ textAlign: "center" }}>{label}</span>
                {payload.map((pld: any, index: number) => {
                    if (pld.strokeWidth) {
                        return
                    }
                    return (
                        <React.Fragment key={index}>
                            <span style={{ color: pld.fill }}>
                                {`${pld.dataKey.replace("Percentage", "").charAt(0).toUpperCase() + pld.dataKey.replace("Percentage", "").slice(1).replace("Violation", "")}
                                :
                            ${formatNumber(pld.value)}`}</span>
                        </React.Fragment>
                    )
                })}
            </div>
        );
    }
    return null;
};

