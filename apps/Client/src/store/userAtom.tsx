import { atom } from "recoil";

export const avatarState = atom({
  key: "avatarState", // unique ID (with respect to other atoms/selectors)
  default: { id: "", imageUrl: "" }, // default value (aka initial value)
});


export const userState = atom<{
  id: string;
  name: string;
  username: string;
  role: string;
} | null>({
  key: "userState",
  default: null,
});