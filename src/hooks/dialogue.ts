import { createContext, useContext } from "react";

export const DialogueContext = createContext<{
  eventTarget?: EventTarget;
  logoutDialogue?: () => void;
  addLinkDialogue?: () => void;
  uploadImageDialogue?: () => void;
  youtubeVideoDialogue?: () => void;
  changeBannerDialogue?: () => void;
  deleteArticleDialogue?: () => void;
  profilePictureDialogue?: () => void;
  articleVisibilityDialogue?: () => void;
}>({});

export const useDialogue = () => useContext(DialogueContext);
