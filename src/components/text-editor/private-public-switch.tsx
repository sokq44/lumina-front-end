import { BookCheck, BookLock, LoaderCircle } from "lucide-react";
import { useTextEditor } from "@/hooks/text-editor";
import { FC } from "react";
import Informative from "../inform-badge/informative";

interface PrivatePublicSwitchProps {
  isLoading: boolean;
}

export const PrivatePublicSwitch: FC<PrivatePublicSwitchProps> = ({
  isLoading,
}) => {
  const textEditor = useTextEditor();
  return (
    <Informative
      label={
        textEditor.article?.public
          ? "This article is possible to view for every user."
          : "You're the only one able to view this article"
      }
    >
      <div className="flex items-center justify-between p-2 border-2 border-secondary-foreground bg-secondary-foreground text-secondary rounded-md transition-all duration-300 hover:cursor-pointer hover:bg-muted hover:text-primary">
        {isLoading ? (
          <LoaderCircle size={28} className="animate-spin" />
        ) : (
          <div>
            <div className="flex items-center text-lg font-bold transition-all duration-300">
              {textEditor.article?.public ? (
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
              {textEditor.article?.public
                ? "This article is possible to view for every user."
                : "You're the only one able to view this article"}{" "}
              Click Here to change that.
            </span>
          </div>
        )}
      </div>
    </Informative>
  );
};
