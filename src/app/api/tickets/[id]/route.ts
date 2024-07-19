import { allTickets, usersData } from "@/libs/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const bearer = request.headers.get("Authorization");
    const token = bearer?.split(" ")[1];
    const user = usersData.find((user) => user.token === token);

    if (!user) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const ticket = allTickets.find((ticket: any) => ticket.id == params.id);

    if (!ticket) {
        return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    const ticketWithUserData = {
        ...ticket,
        userData: user
    }

    return NextResponse.json(ticketWithUserData);

}