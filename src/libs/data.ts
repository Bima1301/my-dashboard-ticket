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
        userId: 1
    },
    {
        label: "Create new ticket example",
        type: "new",
        status: "undone",
        userId: 1
    },
    {
        label: "Update ticket report",
        type: "default",
        status: "done",
        userId: 1
    },
    {
        label: "Update support ticket",
        type: "default",
        status: "done",
        userId: 2
    },
    {
        label: "Make new ticket example",
        type: "new",
        status: "undone",
        userId: 2
    },
    {
        label: "Resolve ticket example",
        type: "default",
        status: "done",
        userId: 2
    }
]

export const allTickets = [
    {
        "id": 1,
        "label": "Create User Login Page",
        "priority": "normal",
        "date": "2023-07-02T10:15:23.456Z",
        "createdAt": "2023-06-25T08:30:45.123Z",
        "updatedAt": "2023-06-28T09:45:30.789Z",
        "userId": 1
    },
    {
        "id": 2,
        "label": "Implement Authentication API",
        "priority": "high",
        "date": "2023-09-10T11:20:35.789Z",
        "createdAt": "2023-08-30T07:15:50.987Z",
        "updatedAt": "2023-09-05T08:40:25.654Z",
        "userId": 2
    },
    {
        "id": 3,
        "label": "Set Up Database Backup",
        "priority": "low",
        "date": "2024-01-14T12:25:47.123Z",
        "createdAt": "2023-12-10T06:00:34.567Z",
        "updatedAt": "2024-01-01T07:35:40.321Z",
        "userId": 1
    },
    {
        "id": 4,
        "label": "Design Dashboard UI",
        "priority": "normal",
        "date": "2023-10-21T09:10:59.456Z",
        "createdAt": "2023-09-15T05:45:12.890Z",
        "updatedAt": "2023-10-10T06:55:47.123Z",
        "userId": 2
    },
    {
        "id": 5,
        "label": "Optimize Database Queries",
        "priority": "high",
        "date": "2024-02-18T08:05:11.789Z",
        "createdAt": "2024-01-25T04:30:45.678Z",
        "updatedAt": "2024-02-05T05:50:21.456Z",
        "userId": 1
    },
    {
        "id": 6,
        "label": "Update Server Security",
        "priority": "low",
        "date": "2023-11-28T07:00:23.123Z",
        "createdAt": "2023-11-01T03:15:50.234Z",
        "updatedAt": "2023-11-15T04:30:10.987Z",
        "userId": 2
    },
    {
        "id": 7,
        "label": "Refactor Payment Module",
        "priority": "normal",
        "date": "2023-08-13T06:55:35.456Z",
        "createdAt": "2023-07-20T02:00:12.345Z",
        "updatedAt": "2023-08-05T03:25:56.789Z",
        "userId": 1
    },
    {
        "id": 8,
        "label": "Test Mobile Responsiveness",
        "priority": "high",
        "date": "2023-12-07T05:50:47.789Z",
        "createdAt": "2023-11-10T01:45:23.123Z",
        "updatedAt": "2023-11-25T02:55:42.456Z",
        "userId": 2
    },
    {
        "id": 9,
        "label": "Implement User Notifications",
        "priority": "low",
        "date": "2024-03-04T04:45:59.123Z",
        "createdAt": "2024-02-10T00:30:34.567Z",
        "updatedAt": "2024-02-25T01:40:19.234Z",
        "userId": 1
    },
    {
        "id": 10,
        "label": "Integrate Payment Gateway",
        "priority": "normal",
        "date": "2024-01-23T03:40:11.789Z",
        "createdAt": "2023-12-20T23:15:50.987Z",
        "updatedAt": "2024-01-10T00:25:32.345Z",
        "userId": 2
    },
    {
        "id": 11,
        "label": "Deploy New Server",
        "priority": "high",
        "date": "2023-10-16T02:35:23.456Z",
        "createdAt": "2023-09-25T22:00:12.345Z",
        "updatedAt": "2023-10-05T23:15:45.678Z",
        "userId": 1
    },
    {
        "id": 12,
        "label": "Set Up Continuous Integration",
        "priority": "low",
        "date": "2024-02-08T01:30:35.789Z",
        "createdAt": "2024-01-05T21:45:23.123Z",
        "updatedAt": "2024-01-25T22:50:56.789Z",
        "userId": 2
    },
    {
        "id": 13,
        "label": "Update Documentation",
        "priority": "normal",
        "date": "2023-11-27T00:25:47.123Z",
        "createdAt": "2023-11-10T20:30:45.678Z",
        "updatedAt": "2023-11-20T21:35:11.456Z",
        "userId": 1
    },
    {
        "id": 14,
        "label": "Fix Critical Bugs",
        "priority": "high",
        "date": "2024-03-02T23:20:59.456Z",
        "createdAt": "2024-02-10T19:15:50.234Z",
        "updatedAt": "2024-02-20T20:25:34.567Z",
        "userId": 2
    },
    {
        "id": 15,
        "label": "Implement Logging System",
        "priority": "low",
        "date": "2023-08-05T22:15:11.789Z",
        "createdAt": "2023-07-10T18:00:12.345Z",
        "updatedAt": "2023-07-25T19:10:34.567Z",
        "userId": 1
    },
    {
        "id": 16,
        "label": "Create API Documentation",
        "priority": "normal",
        "date": "2023-09-13T21:10:23.123Z",
        "createdAt": "2023-08-15T17:45:50.987Z",
        "updatedAt": "2023-09-01T18:55:12.345Z",
        "userId": 2
    },
    {
        "id": 17,
        "label": "Run Performance Tests",
        "priority": "high",
        "date": "2024-02-18T20:05:35.456Z",
        "createdAt": "2024-01-20T16:30:34.567Z",
        "updatedAt": "2024-02-05T17:40:19.234Z",
        "userId": 1
    },
    {
        "id": 18,
        "label": "Update API Endpoints",
        "priority": "low",
        "date": "2023-12-20T19:00:47.789Z",
        "createdAt": "2023-11-25T15:15:45.678Z",
        "updatedAt": "2023-12-10T16:20:23.123Z",
        "userId": 2
    },
    {
        "id": 19,
        "label": "Improve Search Functionality",
        "priority": "normal",
        "date": "2023-07-14T18:55:59.123Z",
        "createdAt": "2023-06-30T14:30:12.345Z",
        "updatedAt": "2023-07-10T15:40:56.789Z",
        "userId": 1
    },
    {
        "id": 20,
        "label": "Create User Profile Page",
        "priority": "high",
        "date": "2024-03-25T17:50:11.456Z",
        "createdAt": "2024-02-20T13:15:34.567Z",
        "updatedAt": "2024-03-10T14:25:12.345Z",
        "userId": 2
    }
];


