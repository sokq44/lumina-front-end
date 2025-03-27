import { FC, ReactNode } from "react";
import { DialogueContext } from "@/hooks/dialogue";
import LogoutDialogue from "@/components/dialogues/logout-dialogoue";
import AddLinkDialogue from "@/components/dialogues/add-link-dialogue";
import UploadImageDialogue from "@/components/dialogues/upload-image-dialog";
import AddYTVideoDialogue from "@/components/dialogues/add-yt-video-dialogue";
import DeleteArticleDialogue from "@/components/dialogues/delete-article-dialogue";
import ArticleVisibilityDialogue from "@/components/dialogues/article-visibility-dialogue";

const eventTarget = new EventTarget();

function logoutDialogue() {
  eventTarget.dispatchEvent(new Event("logout-dialogue"));
}

function uploadImageDialogue() {
  eventTarget.dispatchEvent(new Event("upload-image-dialogue"));
}

function youtubeVideoDialogue() {
  eventTarget.dispatchEvent(new Event("add-yt-video-dialogue"));
}

function addLinkDialogue() {
  eventTarget.dispatchEvent(new Event("add-link-dialogue"));
}

function articleVisibilityDialogue() {
  eventTarget.dispatchEvent(new Event("article-visibility-dialogue"));
}

function deleteArticleDialogue() {
  eventTarget.dispatchEvent(new Event("delete-article-dialogue"));
}

const DialogueProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <DialogueContext.Provider
      value={{
        eventTarget,
        logoutDialogue,
        addLinkDialogue,
        uploadImageDialogue,
        youtubeVideoDialogue,
        deleteArticleDialogue,
        articleVisibilityDialogue,
      }}
    >
      <LogoutDialogue />
      <AddLinkDialogue />
      <AddYTVideoDialogue />
      <UploadImageDialogue />
      <DeleteArticleDialogue />
      <ArticleVisibilityDialogue />
      {children}
    </DialogueContext.Provider>
  );
};

export default DialogueProvider;
