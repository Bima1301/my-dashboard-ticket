import { allTickets, usersData } from "@/libs/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const bearer = request.headers.get("Authorization");
    const token = bearer?.split(" ")[1];
    const user = usersData.find((user) => user.token === token);

    if (!user) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sort = searchParams.get("sort") || "desc";
    const filter = searchParams.get("filter") || "";

    let filteredData = allTickets;

    if (filter) {
        filteredData = filteredData.filter(task => task.priority === filter);
    }

    if (sort === "asc") {
        filteredData.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
        filteredData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedData = filteredData.slice(start, end);
    const allTicketsWithUserData = paginatedData.map((task) => {
        const userData = usersData.find((user) => user.id === task.userId);
        return { ...task, userData };
    });

    return NextResponse.json({
        data: allTicketsWithUserData,
        totalPages: Math.ceil(filteredData.length / limit),
    });
}
