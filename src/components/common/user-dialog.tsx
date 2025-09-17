"use client";
import { Dialog } from "@/components/ui/dialog";
import { JSX } from "react";
import { UserAvatar } from "./user-avatar";

export const UserDialog = ({
  open,
  setOpen,
  userDetails,
}: {
  userDetails: {
    name: string;
    userId: number;
    cards: {
      icon: JSX.Element;
      title: string;
      value: string;
    }[];
  };
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Content>
        <Dialog.Title>
          <div className="w-full flex items-center justify-start gap-2">
            <UserAvatar name={userDetails?.name} />
            <span className="font-semibold ">User Details</span>
          </div>
        </Dialog.Title>

        <div className="w-full mt-8 space-y-3">
          {userDetails?.cards?.map((card) => (
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
            User ID: #{userDetails?.userId}
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
