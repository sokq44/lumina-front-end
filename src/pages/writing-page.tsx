import GoBackArrow from "@/components/go-back-arrow";
import TextEditor from "@/components/text-editor";
import ThemeSwitch from "@/components/theme-switch";
import { useLoggedIn } from "@/hooks/user";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WritingPage = () => {
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn.error) navigate("/login");
  }, [loggedIn.error, navigate]);

  if (loggedIn.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <LoaderCircle size={24} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <ThemeSwitch position="top-right" />
      <GoBackArrow to="/user/articles" />
      <TextEditor />
    </div>
  );
};

export default WritingPage;
