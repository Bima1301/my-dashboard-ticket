import DataChart from '@/components/views/overview/DataChart'
import TicketAndTask from '@/components/views/overview/TicketAndTask'
import TotalData from '@/components/views/overview/TotalData'
import React from 'react'

const overview = [
    {
        title: "Unresolved",
        identifier: "unresolved"
    },
    {
        title: "Overdue",
        identifier: "overdue"
    },
    {
        title: "Open",
        identifier: "open"
    },
    {
        title: "On Hold",
        identifier: "onHold"
    }
]

export default function Overview() {

    return (
        <div className='flex justify-center my-7'>
            <div className='flex flex-col w-full h-full max-w-7xl md:gap-10 gap-5'>
                <div className='grid lg:grid-cols-4 grid-cols-2 md:gap-10 gap-3'>
                    {overview.map((item, index) => (
                        <TotalData key={index} title={item.title} identifier={item.identifier} />
                    ))}
                </div>
                <DataChart />
                <TicketAndTask />
            </div>
        </div>
    )
}
