import { getRandomValue } from "./utils";

export const usersData = [
    {
        "id": 1,
        "name": "John Doe",
        "email": "john@doe.com",
        "password": "123123123",
        "role": "guest",
        "token": "tokenforuser1"
    },
    {
        "id": 2,
        "name": "Super Admin",
        "email": "super@admin.com",
        "password": "123123123",
        "role": "admin",
        "token": "tokenforuser2"
    }
]

export const totalDatas: { [key: string]: number } = {
    unresolved: 60,
    overdue: 16,
    open: 43,
    onHold: 64
}

export const chartData = [
    {
        name: 1,
        today: getRandomValue(10, 99),
        yesterday: getRandomValue(10, 99)
    },
    {
        name: 2,
        today: getRandomValue(10, 99),
        yesterday: getRandomValue(10, 99)
    },
    {
        name: 3,
        today: getRandomValue(10, 99),
        yesterday: getRandomValue(10, 99)
    },
    {
        name: 4,
        today: getRandomValue(10, 99),
        yesterday: getRandomValue(10, 99)
    },
    {
        name: 5,
        today: getRandomValue(10, 99),
        yesterday: getRandomValue(10, 99)
    },
    {
        name: 6,
        today: getRandomValue(10, 99),
        yesterday: getRandomValue(10, 99)
    },
    {
        name: 7,
        today: getRandomValue(10, 99),
        yesterday: getRandomValue(10, 99)
    }
];
// const detailChart = [
//     {
//         name: 'Resolved',
//         value: 'resolved',
//     },
//     {
//         name: 'Received',
//         value: 'received',
//     },
//     {
//         name: 'Average first response time',
//         value: 'avgFirstResponseTime',
//     },
//     {
//         name: 'Average response time',
//         value: 'avgFesponseTime',
//     },
//     {
//         name: 'Resolution with SLA',
//         value: 'resolutionWithSLA',
//     }
// ]
export const chartDetail = {
    "resolved": getRandomValue(10, 500),
    "received": getRandomValue(10, 500),
    "avgFirstResponseTime": getRandomValue(10, 99),
    "avgFesponseTime": getRandomValue(10, 99),
    "resolutionWithSLA": getRandomValue(1, 100),
} 