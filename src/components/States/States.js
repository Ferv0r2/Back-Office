import { atom } from "recoil";

const typeState = atom({
  key: "typeState",
  default: "All",
});

const healthState = atom({
  key: "healthState",
  default: "All",
});

const yearState = atom({
  key: "yearState",
  default: "All",
});

export { typeState, healthState, yearState };
