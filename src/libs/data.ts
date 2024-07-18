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
export const chartDetail = {
    "resolved": getRandomValue(10, 500),
    "received": getRandomValue(10, 500),
    "avgFirstResponseTime": getRandomValue(10, 99),
    "avgFesponseTime": getRandomValue(10, 99),
    "resolutionWithSLA": getRandomValue(1, 100),
}

export const unresolvedTicket = {
    "Waiting on Feature Request": getRandomValue(1000, 5000),
    "Awaiting Customer Response": getRandomValue(1000, 5000),
    "Awaiting Developer Fix": getRandomValue(100, 1000),
    "Pending": getRandomValue(100, 500),
}

export const tasks = [
    {
        label: "Finish ticket update",
        type: "urgent",
        status: "undone",
    },
    {
        label: "Create new ticket example",
        type: "new",
        status: "undone",
    },
    {
        label: "Update ticket report",
        type: "default",
        status: "done",
    }
]