import { create } from "zustand";

interface ProfileType {
  name: string;
  image: string;
}

const useProfileStore = create<ProfileType>((set) => ({
  name: "luffy",
  image:
    "https://i.pinimg.com/736x/db/c6/78/dbc6782e3d91c386697084e237969aeb.jpg",
}));

export default useProfileStore;