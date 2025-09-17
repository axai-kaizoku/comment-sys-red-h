"use client";
import { CommentCard } from "@/components/common/comment-card";
import { Button } from "@/components/ui/button";
import { comments as mockComments } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

export type ExtendedComment = (typeof mockComments)[0] & {
  company?: string;
  userId?: number;
};

export const CommentsSecx = ({
  handleSort,
  comments,
  sortType,
}: {
  handleSort: (type: "new" | "old") => void;
  sortType: "new" | "old";
  comments: ExtendedComment[];
}) => {
  return (
    <div className="space-y-5 mt-6">
      <div className="flex w-full justify-between items-center">
        <h3 className=" text-2xl  sm:text-3xl lg:text-4xl font-bold">
          Comments ({comments.length})
        </h3>
        <div className="flex items-center gap-2 ">
          <Button
            onClick={() => {
              handleSort("new");
            }}
            className={cn(
              sortType === "new"
                ? "bg-blue-500 text-white"
                : "bg-neutral-50 hover:bg-neutral-800 hover:text-white text-black"
            )}
          >
            <Clock className="size-4" />
            Newest
          </Button>
          <Button
            onClick={() => {
              handleSort("old");
            }}
            className={cn(
              sortType === "old"
                ? "bg-blue-500 text-white"
                : "bg-neutral-50 hover:bg-neutral-800 hover:text-white text-black"
            )}
          >
            <Calendar className="size-4" /> Oldest
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        {comments.map((comment) => (
          <CommentCard
            comment={comment.body}
            company={comment?.company}
            userId={comment?.userId}
            email={comment.email}
            name={comment.name}
            key={comment.id}
          />
        ))}
      </div>
    </div>
  );
};
