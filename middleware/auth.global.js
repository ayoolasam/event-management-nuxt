import { useUserStore } from "#imports";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const roleDashboards = {
    Admin: "/admin/dashboard",
    User: "/user/dashboard",
  };

  // If the user is not logged in, redirect to login unless already on the login page
  if (!userStore.loggedIn) {
    if (to.path !== "/Login") {
      return navigateTo("/Login");
    }
    return; // Prevents further execution
  }

  // If the user is logged in, check role and layout for appropriate redirection
  if (userStore.loggedIn) {
    const userRole = userStore.userRole;
    if (to.meta.layout === "user" && userRole !== "User") {
      return navigateTo(roleDashboards[userRole]);
    }
    if (to.meta.layout === "admin" && userRole !== "Admin") {
      return navigateTo(roleDashboards[userRole]);
    }
  }
});
