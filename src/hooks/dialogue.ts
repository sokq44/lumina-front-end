import { createContext, useContext } from "react";

export const DialogueContext = createContext<{
  eventTarget: EventTarget | undefined;
  logoutDialogue: (() => void) | undefined;
  addLinkDialogue: (() => void) | undefined;
  uploadImageDialogue: (() => void) | undefined;
  youtubeVideoDialogue: (() => void) | undefined;
  deleteArticleDialogue: (() => void) | undefined;
  articleVisibilityDialogue: (() => void) | undefined;
}>({
  eventTarget: undefined,
  logoutDialogue: undefined,
  addLinkDialogue: undefined,
  uploadImageDialogue: undefined,
  youtubeVideoDialogue: undefined,
  deleteArticleDialogue: undefined,
  articleVisibilityDialogue: undefined,
});

export const useDialogue = () => useContext(DialogueContext);
