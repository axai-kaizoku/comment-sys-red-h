"use client";
import { users } from "@/lib/mockData";
import { useState } from "react";

import { Building2, Mail, User } from "lucide-react";
import { UserAvatar } from "./user-avatar";
import { UserDialog } from "./user-dialog";

export const CommentCard = ({
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

  const userDetails = {
    name,
    userId,
    cards: [
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
    ],
  };

  return (
    <>
      <UserDialog open={open} setOpen={setOpen} userDetails={userDetails} />
      <div className="bg-white w-full h-fit py-6 pr-6 border border-neutral-300 shadow-sm hover:bg-neutral-100 hover:shadow-lg rounded-lg flex">
        <div className="w-24 shrink-0">
          <UserAvatar
            name={name}
            className="cursor-pointer  mx-auto hover:ring-2 transition-all duration-200 ring-blue-500 ring-offset-2"
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="w-full">
          <div className="flex items-center sm:justify-between mb-3">
            <div className="flex flex-col justify-start">
              <h5
                className=" text-lg sm:text-xl font-semibold cursor-pointer hover:text-blue-500 transition-all duration-200"
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
