import { useState } from "react";
import { BookCheck, BookLock } from "lucide-react";

export const PrivatePublicSwitch = () => {
  const [publicity, setPublicity] = useState<boolean>(false);

  const changePublicity = () => {
    setPublicity((previous) => !previous);
  };

  return (
    <div
      onClick={changePublicity}
      className="flex items-center justify-between p-2 border rounded-md transition-all duration-300 hover:cursor-pointer hover:bg-gray-200"
    >
      <div>
        <div className="flex items-center text-lg font-bold transition-all duration-300">
          {publicity ? (
            <>
              <BookCheck size={22} />
              <span>Public</span>
            </>
          ) : (
            <>
              <BookLock size={22} />
              <span>Private</span>
            </>
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          {publicity
            ? "This article is possible to view for every user."
            : "You're the only one able to view this article"}{" "}
          Click Here to change that.
        </span>
      </div>
    </div>
  );
};
