"use client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AdminBlog() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog CMS</h1>
          <p className="text-[#94a3b8]">Publish and manage articles.</p>
        </div>
        <Button>+ Write New Post</Button>
      </div>
      <Card className="!p-0 overflow-hidden" hoverable={false}>
        <div className="p-10 text-center text-[#94a3b8]">No posts created yet.</div>
      </Card>
    </div>
  );
}
