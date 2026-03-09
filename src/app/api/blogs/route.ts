import { NextRequest, NextResponse } from "next/server";
import { BlogService } from "@/services/blogService";

export async function GET() {
    try {
        const blogs = await BlogService.getBlogs();
        return NextResponse.json(blogs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const blog = await BlogService.createBlog(data);
        return NextResponse.json(blog);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
