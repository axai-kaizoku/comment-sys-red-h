import { cn } from "@/lib/utils";

export const UserAvatar = ({
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
