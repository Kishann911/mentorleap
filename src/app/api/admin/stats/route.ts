import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth-server";
import { db } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        await verifyAdmin(req);

        const usersCount = (await db.collection("users").count().get()).data().count;
        const coursesCount = (await db.collection("courses").count().get()).data().count;
        const resourcesCount = (await db.collection("resources").count().get()).data().count;
        const eventsCount = (await db.collection("events").count().get()).data().count;

        return NextResponse.json({
            users: usersCount,
            courses: coursesCount,
            resources: resourcesCount,
            events: eventsCount,
            revenue: 40290, // Static for now as revenue is simulated
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.message.includes("Forbidden") ? 403 : 500 });
    }
}
