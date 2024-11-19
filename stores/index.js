import axios from "axios";

export const useUserStore = defineStore({
  id: "user-store",
  state: () => ({
    loggedIn: false,
    user: {},
    userRole: "",
  }),
  actions: {
    async getUser() {
      //fecthUser from Api
      try {
        const response = await axios.get("http:localhost:5000/api/v1/users/me");

        if (user) {
          console.log(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
