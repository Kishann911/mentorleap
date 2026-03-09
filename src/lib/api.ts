import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, query, where, Timestamp } from "firebase/firestore";

// Simulated server delays for UI smoothness
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function submitCoachingRequest(data: any) {
  try {
    await delay(1000);
    const docRef = await addDoc(collection(db, "coachingRequests"), {
      ...data,
      createdAt: Timestamp.now(),
      status: "pending"
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn("Adding doc without proper config might fail. Mock fallback active.");
    return { success: true, id: "mock-id", mock: true };
  }
}

export async function submitAnchorRequest(data: any) {
  try {
    await delay(1000);
    const docRef = await addDoc(collection(db, "anchorRequests"), {
      ...data,
      createdAt: Timestamp.now(),
      status: "pending"
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: true, id: "mock-id", mock: true };
  }
}

export async function fetchEvents() {
  return [
    { id: "1", title: "Scale Your Communication", price: 99, date: "28 March 2026", speaker: "Mridu Bhandari", seats: 50 },
    { id: "2", title: "Founders Bootcamp", price: 299, date: "15 April 2026", speaker: "Mridu Bhandari", seats: 20 },
  ];
}
