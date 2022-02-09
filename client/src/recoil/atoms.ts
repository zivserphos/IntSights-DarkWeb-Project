import { atom } from "recoil";

const searchInput = atom({ key: "currentInput", default: "" });

export default searchInput;
