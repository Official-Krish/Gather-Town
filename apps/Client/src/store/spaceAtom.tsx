import { atom } from "recoil";

export const spaceState = atom<{ id: string; name: string; thumbnail: string }[]>({
  key: "spaceState",
  default: [],
});