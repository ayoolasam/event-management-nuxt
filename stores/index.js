import axios from "axios";

export const useUserStore = defineStore({
  id: "user-store",
  state: () => ({
    loggedIn: false,
    user: {},
    userRole: "",
  }),
  actions: {
    async fetchUserDetails() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/me",
          {
            withCredentials: true,
          }
        );

        if (response) {
          this.user = response.data.data.user;
          this.userRole = response.data.data.user.role;
        }
      } catch (e) {
        if (e.message.includes("Network")) {
          toast.error("Please check your internet connection");
        } else {
          toast.error(e.response.data.message);
        }
      }
    },
  },
  persist: true,
});
