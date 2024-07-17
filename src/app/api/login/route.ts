import { usersData } from "@/libs/data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const user = usersData.find((user) => user.email === body.email && user.password === body.password);

    if (user) {
        return NextResponse.json({ token: user.token });
    } else {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
}