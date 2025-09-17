"use client";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { comments as mockComments, users } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import {
  Building2,
  Calendar,
  Clock,
  Mail,
  MessageCircle,
  Send,
  User,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { Select } from "../components/ui/select";
import { useToast } from "@/components/ui/toast";

type ExtendedComment = (typeof mockComments)[0] & {
  company?: string;
  userId?: number;
};

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null
  );
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
    <main className="min-h-screen w-full bg-neutral-50 p-4  text-background">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl text-center font-bold">Comment System</h1>
        <p className="text-xl text-background/80 text-center max-w-2xl mx-auto my-6  sm:my-2 text-pretty">
          Share your thoughts and engage with the community. Join the
          conversation below!
        </p>

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
                      <UserAvatar
                        name={user.name}
                        className={"size-6 text-xs"}
                      />
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
      </div>
    </main>
  );
}

const CommentCard = ({
  company: oldCompany,
  email,
  name,
  comment,
  userId: oldUserId,
}: {
  id?: number;
  name: string;
  email: string;
  company?: string;
  comment: string;
  userId?: number;
}) => {
  const [open, setOpen] = useState(false);

  const company =
    oldCompany ?? users.filter((u) => u.email === email)[0].company.name;
  const userId = oldUserId ?? users.filter((u) => u.email === email)[0].id;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <Dialog.Title>
            <div className="w-full flex items-center justify-start gap-2">
              <UserAvatar name={name} className="mx-" />
              <span className="font-semibold">User Details</span>
            </div>
          </Dialog.Title>

          <div className="w-full mt-8 space-y-3">
            {[
              {
                icon: <User className="text-neutral-500 size-5 mx-1" />,
                title: "Full Name",
                value: name,
              },
              {
                icon: <Mail className="text-neutral-500 size-5 mx-1" />,
                title: "Email Address",
                value: email,
              },
              {
                icon: <Building2 className="text-neutral-500 size-5 mx-1" />,
                title: "Company",
                value: company,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex gap-2 items-center p-3 rounded-lg bg-neutral-50"
              >
                {card.icon}
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-500">{card.title}</span>
                  <span className="font-semibold">{card.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center items-center mt-8">
            <div className="rounded-full py-2 px-5 bg-neutral-50 text-sm font-medium">
              User ID: #{userId}
            </div>
          </div>
        </Dialog.Content>
      </Dialog>
      <div className="bg-white w-full h-fit py-6 pr-6 border border-neutral-300 shadow-sm hover:bg-neutral-100 hover:shadow-lg rounded-lg flex">
        <div className="w-24 shrink-0">
          <UserAvatar
            name={name}
            className="cursor-pointer focus:ring mx-auto"
            onClick={() => setOpen(true)}
          />
        </div>
        <div>
          <div className="flex items-center sm:justify-between mb-3">
            <div className="flex flex-col justify-start">
              <h5
                className=" text-lg sm:text-xl font-semibold cursor-pointer"
                onClick={() => setOpen(true)}
              >
                {name}
              </h5>
              <p className="text-sm text-neutral-400 font-medium">{email}</p>
              <div className="text-sm font-medium text-neutral-400 sm:hidden block">
                {company}
              </div>
            </div>

            <div className="text-sm font-medium text-neutral-400 hidden sm:block">
              {company}
            </div>
          </div>

          <div className="leading-relaxed">{comment}</div>
        </div>
      </div>
    </>
  );
};

const UserAvatar = ({
  name,
  className,
  onClick,
}: {
  name: string;
  className?: string;
  onClick?: () => void;
}) => {
  const [first, second] = name.split(" ");

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-full text-lg  bg-black text-white font-bold p-2.5 size-11 flex justify-center items-center",
        className
      )}
    >
      {first.charAt(0)}
      {second.charAt(0)}
    </div>
  );
};
