"use client";
import { UserAvatar } from "@/components/common/user-avatar";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { users } from "@/lib/mockData";
import { MessageCircle, Send } from "lucide-react";
import { FormEvent } from "react";

export type UserType = (typeof users)[0];

export const AddCommentSecx = ({
  handleSubmit,
  selectedUser,
  setSelectedUser,
  comment,
  setComment,
}: {
  handleSubmit: (e: FormEvent) => void;
  selectedUser: UserType | null;
  setSelectedUser: (user: UserType) => void;
  comment: string;
  setComment: (comment: string) => void;
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit w-full rounded-lg bg-white p-5 border border-neutral-300 space-y-4"
    >
      <div className="flex gap-1 items-center text-lg font-semibold">
        <MessageCircle className="text-blue-500 size-5 mr-1" /> Add Comment
      </div>

      <div className="flex flex-col">
        <label htmlFor="user-select" className="mb-2 text-sm font-medium">
          Select User
        </label>

        <Select
          value={JSON.stringify(selectedUser)}
          onValueChange={(val) => {
            setSelectedUser(JSON.parse(val));
          }}
        >
          <Select.Trigger className="w-full bg-neutral-50">
            <Select.Value placeholder="Choose a user to comment as..." />
          </Select.Trigger>

          <Select.Content className="bg-white w-full">
            {users.map((user) => (
              <Select.Item
                key={user.id}
                value={JSON.stringify(user)}
                className=" hover:bg-black hover:text-white rounded  "
              >
                <div className="flex items-center justify-start gap-2">
                  <UserAvatar name={user.name} className={"size-6 text-xs"} />
                  <span>{user.name}</span>
                  <span className="text-neutral-500">
                    ({user.company.name})
                  </span>
                </div>
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="comment" className="mb-2 text-sm font-medium">
          Your Comment
        </label>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          id="comment"
          className="resize-none text-sm rounded-md border border-neutral-300 bg-neutral-50 p-3 min-h-28"
          placeholder="Write your comment here..."
        ></textarea>
      </div>
      <Button
        type="submit"
        className="bg-blue-500 text-white disabled:opacity-50 sm:w-fit w-full justify-center"
        disabled={comment.trim().length === 0 || !selectedUser}
      >
        <Send className="size-4" /> Post Comment
      </Button>
    </form>
  );
};
