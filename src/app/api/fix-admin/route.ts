import { NextRequest, NextResponse } from "next/server";
import { db, auth } from "@/lib/firebaseAdmin";

export async function GET() {
    try {
        const adminEmail = "admin@mentorleap.com";
        console.log(`Fixing permissions for ${adminEmail}...`);

        const userRecord = await auth.getUserByEmail(adminEmail);
        const uid = userRecord.uid;

        // 1. Update Firestore
        await db.collection("users").doc(uid).update({
            role: "admin"
        });

        // 2. Set Custom Claims
        await auth.setCustomUserClaims(uid, { role: "admin" });

        return NextResponse.json({
            success: true,
            message: `Admin role restored for ${adminEmail}. Please log out and log back in.`
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
