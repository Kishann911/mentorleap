import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { verifyUser } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const decodedToken = await verifyUser(req);
        const uid = decodedToken.uid;

        // Fetch user stats
        const userDoc = await db.collection("users").doc(uid).get();
        const userData = userDoc.data() || {};

        const enrolledCoursesCount = (userData.enrolledCourses || []).length;
        
        // Fetch upcoming events for this user (simulated logic)
        const upcomingEventsCount = 1; // Placeholder
        
        // Fetch certificates
        const certificatesCount = (userData.certificates || []).length;

        // Fetch "Continue Learning" course
        let continueLearning = null;
        if (userData.lastCourseId) {
            const courseDoc = await db.collection("courses").doc(userData.lastCourseId).get();
            if (courseDoc.exists) {
                const courseData = courseDoc.data();
                continueLearning = {
                    id: courseDoc.id,
                    title: courseData?.title,
                    thumbnail: courseData?.thumbnail,
                    progress: userData.courseProgress?.[userData.lastCourseId] || 0
                };
            }
        }

        return NextResponse.json({
            name: userData.name || "Student",
            activeCourses: enrolledCoursesCount,
            upcomingEvents: upcomingEventsCount,
            certificates: certificatesCount,
            continueLearning
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}
