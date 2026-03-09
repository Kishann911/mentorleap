import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const seedDatabase = functions.https.onRequest(async (req, res) => {
    try {
        const ts = admin.firestore.FieldValue.serverTimestamp();

        console.log('--- Seeding Collections into LIVE Firestore database ---');

        console.log('1. Users...');
        await db.collection('users').doc('uid123').set({
            name: "Kishan",
            email: "kishan@gmail.com",
            role: "student",
            enrolledCourses: [],
            registeredEvents: [],
            certificates: [],
            createdAt: ts
        });
        await db.collection('users').doc('admin99').set({
            name: "Admin User",
            email: "admin@mentorleap.com",
            role: "admin",
            enrolledCourses: [],
            registeredEvents: [],
            certificates: [],
            createdAt: ts
        });

        console.log('2. Courses & Modules...');
        const courseRef = db.collection('courses').doc('course1');
        await courseRef.set({
            title: "Public Speaking Mastery",
            description: "Become a confident speaker",
            instructor: "Mridu",
            thumbnail: "cloudinary-url",
            price: 2999,
            category: "communication",
            modules: [],
            createdAt: ts
        });
        const moduleRef = courseRef.collection('modules').doc('module1');
        await moduleRef.set({ title: "Introduction", order: 1 });
        await moduleRef.collection('lessons').doc('lesson1').set({
            title: "Confidence Basics",
            videoUrl: "cloudinary-video",
            duration: 10,
            order: 1
        });

        console.log('3. Events...');
        await db.collection('events').doc('event1').set({
            title: "Leadership Bootcamp",
            type: "bootcamp",
            date: ts,
            price: 999,
            banner: "cloudinary-url",
            zoomLink: "url",
            attendees: []
        });

        console.log('4. Resources...');
        await db.collection('resources').doc('resource1').set({
            title: "Speech Template Pack",
            category: "PDF Templates",
            fileUrl: "cloudinary-url",
            createdAt: ts
        });

        console.log('5. Certificates...');
        await db.collection('certificates').doc('certificate1').set({
            userId: "uid123",
            courseId: "course1",
            certificateUrl: "cloudinary-url",
            issuedAt: ts
        });

        console.log('6. Transactions...');
        await db.collection('transactions').doc('tx1').set({
            userId: "uid123",
            amount: 2999,
            itemType: "course",
            itemId: "course1",
            status: "completed",
            createdAt: ts
        });

        console.log('7. Blogs...');
        await db.collection('blogs').doc('blog1').set({
            title: "Mastering Executive Presence",
            content: "## The core of presence\\nBeing an executive isn't just about the title...",
            author: "Mridu",
            thumbnail: "cloudinary-url",
            createdAt: ts
        });

        res.status(200).send("Database successfully seeded into LIVE Firestore!");
    } catch (error: any) {
        console.error("Error seeding:", error);
        res.status(500).send("Error seeding database: " + error.message);
    }
});
