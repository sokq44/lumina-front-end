import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/container";
import ThemeSwitch from "@/components/ui/theme-switch";
import {
  BookType,
  Calendar,
  Facebook,
  FileClock,
  Github,
  Heart,
  Instagram,
  PenLine,
  Star,
  Twitter,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import GoBackArrow from "@/components/ui/go-back-arrow";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <Container className="w-[70rem] mx-auto">
      <ThemeSwitch position="top-right" />
      <GoBackArrow position="top-left" />
      <Container className="flex gap-x-2 mb-24 mt-12">
        <Avatar className="w-28 h-28">
          <AvatarFallback>UP</AvatarFallback>
          <AvatarImage src="/default-profile-picture.png"></AvatarImage>
        </Avatar>
        <Container className="flex flex-col">
          <span className="text-4xl font-bold mb-2">Username</span>
          <Container className="flex gap-x-1 mb-2">
            <Badge variant="outline">Hometown</Badge>
            <Badge variant="outline">Wrting since ...</Badge>
          </Container>
          <Container className="flex gap-x-1">
            <Button
              variant="outline"
              onClick={() => navigate("#")}
              className="flex text-muted-foreground gap-x-1 px-3 rounded-xl"
            >
              <Github className="w-5 h-5" /> Github
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("#")}
              className="flex text-muted-foreground gap-x-1 px-3 rounded-xl"
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("#")}
              className="flex text-muted-foreground gap-x-1 px-3 rounded-xl"
            >
              <Instagram className="w-5 h-5" /> Instagram
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("#")}
              className="flex text-muted-foreground gap-x-1 px-3 rounded-xl"
            >
              <Twitter className="w-5 h-5" /> Twitter
            </Button>
          </Container>
        </Container>
      </Container>
      <Container className="h-full flex gap-x-4">
        <Container className="flex flex-col">
          <Container className="border rounded-lg p-4 mb-4">
            <Container className="flex items-center content-center gap-x-2 mb-1">
              <PenLine className="w-5 h-5" />
              <span className="text-xl font-bold">About Me</span>
            </Container>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Container>
          <Container className="w-full border rounded-lg p-4 mb-4">
            <Container className="flex items-center gap-x-2 mb-1">
              <FileClock className="w-5 h-5" />
              <span className="text-xl font-bold">Writing Journey</span>
            </Container>
            <Container className="w-full flex items-center justify-center my-8 gap-x-12">
              <Container className="flex flex-col items-center content-center gap-y-1">
                <span className="text-4xl font-bold">123</span>
                <span className="text-muted-foreground">
                  Articles Published
                </span>
              </Container>
              <Container className="flex flex-col items-center content-center gap-y-1">
                <span className="text-4xl font-bold">1.2M</span>
                <span className="text-muted-foreground">Words Written</span>
              </Container>
              <Container className="flex flex-col items-center content-center gap-y-1">
                <span className="text-4xl font-bold">89K</span>
                <span className="text-muted-foreground">Total Reads</span>
              </Container>
              <Container className="flex flex-col items-center content-center gap-y-1">
                <span className="text-4xl font-bold">4.6</span>
                <span className="text-muted-foreground">Average Rating</span>
              </Container>
            </Container>
          </Container>
          <Container className="border rounded-lg p-4">
            <Container className="flex items-center gap-x-2 mb-4">
              <FileClock className="w-5 h-5" />
              <span className="text-xl font-bold">Recent Articles</span>
            </Container>
            <Container className="flex flex-col gap-y-3">
              {[1, 1, 1].map(() => (
                <Container className="pl-2 flex gap-x-3">
                  <Container className="w-1 min-h-24 bg-muted text-muted"></Container>
                  <Container className="flex flex-col gap-y-1">
                    <span className="text-xl">Title</span>
                    <span className="w-[46rem] text-muted-foreground truncate">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris.
                    </span>
                    <Container className="flex items-center gap-x-4">
                      <Container className="flex items-center justify-center gap-x-1 text-muted-foreground">
                        <Calendar className="w-5 h-5" /> 12.12.2025
                      </Container>
                      <Container className="flex items-center justify-center gap-x-1 text-muted-foreground">
                        123 views
                      </Container>
                      <Container className="flex items-center justify-center gap-x-1 text-muted-foreground">
                        <Star className="w-5 h-5 text-yellow-500" /> 30
                      </Container>
                    </Container>
                  </Container>
                </Container>
              ))}
            </Container>
          </Container>
        </Container>
        <Container className="flex flex-col gap-y-3">
          <Container className="h-2/3 border rounded-lg p-4">
            <Container className="flex items-center content-center gap-x-2 mb-1">
              <BookType className="w-5 h-5" />
              <span className="text-xl font-bold">Favorite Topics</span>
            </Container>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </Container>
          <Container className="h-1/3 border rounded-lg p-4 mb-4">
            <Container className="flex items-center content-center gap-x-2 mb-1">
              <Heart className="w-5 h-5" />
              <span className="text-xl font-bold">Currently Reading</span>
            </Container>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default ProfilePage;
