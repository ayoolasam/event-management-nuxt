import axios from "axios";

export const useUserStore = defineStore({
  id: "user-store",
  state: () => ({
    loggedIn: false,
    user: {},
    userRole: "",
  }),
  actions: {},
});
