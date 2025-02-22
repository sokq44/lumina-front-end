import { createContext, useContext } from "react";

export const EditorDialogueContext = createContext<{
  eventTarget: EventTarget | undefined;
  addLinkDialogue: (() => void) | undefined;
  uploadImageDialogue: (() => void) | undefined;
  youtubeVideoDialogue: (() => void) | undefined;
  deleteArticleDialogue: (() => void) | undefined;
  articleVisibilityDialogue: (() => void) | undefined;
}>({
  eventTarget: undefined,
  addLinkDialogue: undefined,
  uploadImageDialogue: undefined,
  youtubeVideoDialogue: undefined,
  deleteArticleDialogue: undefined,
  articleVisibilityDialogue: undefined,
});

export const useEditorDialogue = () => useContext(EditorDialogueContext);
