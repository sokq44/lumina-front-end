import Separator from "@/components/separator";
import { Button } from "@/components/ui/button";
import { CornerUpLeft, Frown } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center gap-x-4">
      <span className="text-6xl font-semibold">404</span>
      <Separator orientation="vertical" className="h-20 w-1" />
      <div className="flex flex-col items-center gap-2">
        <span className="text-lg flex items-center gap-x-1">
          <Frown size={24} />
          Oops, seems like this page couldn't be found.
        </span>
        <Button className="w-full transition-all duration-300" asChild>
          <Link to="/user" className="w-100 flex items-center gap-x-1">
            <CornerUpLeft size={18} /> Go back
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
