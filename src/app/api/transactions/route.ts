import { NextRequest, NextResponse } from "next/server";
import { TransactionService } from "@/services/transactionService";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const transaction = await TransactionService.createTransaction(data);
        return NextResponse.json(transaction);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { transactionId, status } = await req.json();
        await TransactionService.updateTransactionStatus(transactionId, status);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        if (!userId) return NextResponse.json({ error: "userId is required" }, { status: 400 });

        const transactions = await TransactionService.getUserTransactions(userId);
        return NextResponse.json(transactions);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
