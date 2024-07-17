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