import { PasswordType } from "aws-sdk/clients/cognitoidentityserviceprovider";
import getCategory from "./getCategory";

/* eslint-disable no-restricted-syntax */
const addCategory = (pasteObj: Paste) => {
  const title = pasteObj.title.toLowerCase();
  const content = pasteObj.content.toLowerCase();
  const category = getCategory(title);
  if (category === "general") {
    const categoryByContent = getCategory(content);
    const fullPasteObj = pasteObj;
    fullPasteObj.category = categoryByContent;
    return fullPasteObj;
  }
  const fullPasteObj = pasteObj;
  fullPasteObj.category = category;
  return fullPasteObj;
};
// const counter = 0;

export default addCategory;
