import { FC, ReactNode } from "react";
import { DialogueContext } from "@/hooks/use-dialogue";
import LogoutDialogue from "@/components/dialogues/logout-dialogoue";
import AddLinkDialogue from "@/components/dialogues/add-link-dialogue";
import UploadImageDialogue from "@/components/dialogues/upload-image-dialog";
import AddYTVideoDialogue from "@/components/dialogues/add-yt-video-dialogue";
import ChangeBannerDialogue from "@/components/dialogues/change-banner-dialogue";
import DeleteArticleDialogue from "@/components/dialogues/delete-article-dialogue";
import ProfilePictureDialogue from "@/components/dialogues/profile-picture-dialogue";
import ArticleVisibilityDialogue from "@/components/dialogues/article-visibility-dialogue";

const eventTarget = new EventTarget();

function dispatch(name: string) {
  eventTarget.dispatchEvent(new Event(name));
}

const DialogueProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <DialogueContext.Provider
      value={{
        eventTarget,
        logoutDialogue: () => dispatch("logout-dialogue"),
        addLinkDialogue: () => dispatch("add-link-dialogue"),
        uploadImageDialogue: () => dispatch("upload-image-dialogue"),
        youtubeVideoDialogue: () => dispatch("add-yt-video-dialogue"),
        changeBannerDialogue: () => dispatch("change-banner-dialogue"),
        deleteArticleDialogue: () => dispatch("delete-article-dialogue"),
        profilePictureDialogue: () => dispatch("change-profile-picture"),
        articleVisibilityDialogue: () =>
          dispatch("article-visibility-dialogue"),
      }}
    >
      <LogoutDialogue />
      <AddLinkDialogue />
      <AddYTVideoDialogue />
      <UploadImageDialogue />
      <ChangeBannerDialogue />
      <DeleteArticleDialogue />
      <ProfilePictureDialogue />
      <ArticleVisibilityDialogue />
      {children}
    </DialogueContext.Provider>
  );
};

export default DialogueProvider;
