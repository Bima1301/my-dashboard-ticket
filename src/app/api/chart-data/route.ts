import { chartData, chartDetail, usersData } from "@/libs/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const bearer = request.headers.get("Authorization");
    const token = bearer?.split(" ")[1];

    const user = usersData.find((user) => user.token === token);

    if (!user) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json({
        chartData: chartData,
        chartDetailData: chartDetail
    });
}
