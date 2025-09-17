"use client";
import { useToast } from "@/components/ui/toast";
import { comments as mockComments } from "@/lib/mockData";
import { FormEvent, useState } from "react";
import { AddCommentSecx, UserType } from "./add-comment-secx";
import { CommentsSecx, ExtendedComment } from "./comments-secx";

export default function Main() {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const toast = useToast();

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState<ExtendedComment[]>(
    mockComments.sort((a, b) => b.id - a.id)
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newComment: ExtendedComment = {
      body: comment,
      email: selectedUser?.email ?? "",
      name: selectedUser?.name ?? "",
      id: comments.length + 1,
      postId: 1,
      userId: selectedUser?.id,
      company: selectedUser?.company.name,
    };
    setComments((prev) => {
      if (sortType === "new") {
        return [newComment, ...prev];
      } else {
        return [...prev, newComment];
      }
    });

    toast.addToast({
      title: "Comment Posted !",
      message: "Your comment has been successfully added.",
    });
    setSelectedUser(null);
    setComment("");
  };

  const [sortType, setSortType] = useState<"new" | "old">("new");

  const handleSort = (sort: typeof sortType) => {
    if (sort === "new") {
      setComments((prev) => [...prev].sort((a, b) => b.id - a.id));
      setSortType(sort);
    } else {
      setComments((prev) => [...prev].sort((a, b) => a.id - b.id));
      setSortType(sort);
    }
  };

  return (
    <main className="min-h-screen w-full bg-neutral-50 p-4 text-background">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl text-center font-bold">Comment System</h1>
        <p className="text-xl text-background/80 text-center max-w-2xl mx-auto my-6  sm:my-2 text-pretty">
          Share your thoughts and engage with the community. Join the
          conversation below!
        </p>

        <AddCommentSecx
          comment={comment}
          handleSubmit={handleSubmit}
          selectedUser={selectedUser}
          setComment={setComment}
          setSelectedUser={setSelectedUser}
        />
        <CommentsSecx
          comments={comments}
          handleSort={handleSort}
          sortType={sortType}
        />
      </div>
    </main>
  );
}
