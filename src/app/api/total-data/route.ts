import { totalDatas, usersData } from "@/libs/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const bearer = request.headers.get("Authorization");
    const token = bearer?.split(" ")[1];

    const user = usersData.find((user) => user.token === token);

    if (!user) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const queryParams = new URL(request.url).searchParams;
    const type = queryParams.get('type') ?? '';

    return NextResponse.json({
        totalDatas: type ? totalDatas[type] : 0
    });
}
