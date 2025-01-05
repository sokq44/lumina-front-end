import Separator from "@/components/separator";
import ThemeSwitch from "@/components/theme-switch";
import { Clover, CornerUpLeft, Frown } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center gap-x-4">
      <ThemeSwitch position="top-right" />
      <span className="text-6xl font-semibold">404</span>
      <Separator orientation="vertical" className="h-20 w-1" />
      <div className="flex flex-col items-center">
        <span className="text-lg flex items-center gap-x-1">
          <Frown size={24} />
          Oops, seems like this page couldn't be found.
        </span>
        <div className="flex gap-x-6">
          <Link
            to="/user"
            className="flex items-center gap-x-1 text-muted-foreground sliding-link"
          >
            <CornerUpLeft size={18} /> Go back
          </Link>
          <Link
            to="https://www.youtube.com/watch?v=xvFZjo5PgG0"
            className="flex items-center gap-x-1 text-muted-foreground sliding-link"
            target="_blank"
          >
            <Clover size={18} /> Feeling Lucky?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
