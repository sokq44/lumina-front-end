import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

const AccountPage = () => {
  return (
    <Container className="flex flex-col gap-y-4">
      <Link to={"/password"}>
        <Button
          variant="outline"
          className="w-full transition-all duration-300"
        >
          Change your password
        </Button>
      </Link>
      <Link to={""}>
        <Button
          variant="outline"
          className="w-full transition-all duration-300"
        >
          Change your Email Address
        </Button>
      </Link>
    </Container>
  );
};

export default AccountPage;
