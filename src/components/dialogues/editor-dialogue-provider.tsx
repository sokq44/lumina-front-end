import { FC, ReactNode } from "react";
import { EditorDialogueContext } from "@/hooks/editor-dialogue";
import UploadImageDialogue from "@/components/dialogues/upload-image-dialog";
import DeleteArticleDialogue from "@/components/dialogues/delete-article-dialogue";
import ArticleVisibilityDialogue from "@/components/dialogues/article-visibility-dialogue";
import AddLinkDialogue from "./add-link-dialogue";

const eventTarget = new EventTarget();

const uploadImageDialogue = () => {
  eventTarget.dispatchEvent(new Event("upload-image-dialogue"));
};

const youtubeVideoDialogue = () => {};
const addLinkDialogue = () => {
  eventTarget.dispatchEvent(new Event("add-link-dialogue"));
};

const articleVisibilityDialogue = () => {
  eventTarget.dispatchEvent(new Event("article-visibility-dialogue"));
};

const deleteArticleDialogue = () => {
  eventTarget.dispatchEvent(new Event("delete-article-dialogue"));
};

const EditorDialogueProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <EditorDialogueContext.Provider
      value={{
        eventTarget,
        addLinkDialogue,
        uploadImageDialogue,
        youtubeVideoDialogue,
        deleteArticleDialogue,
        articleVisibilityDialogue,
      }}
    >
      <AddLinkDialogue />
      <UploadImageDialogue />
      <DeleteArticleDialogue />
      <ArticleVisibilityDialogue />
      {children}
    </EditorDialogueContext.Provider>
  );
};

export default EditorDialogueProvider;
