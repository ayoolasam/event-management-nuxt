import { useUserStore } from "#imports";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  const publicRoutes = [
    "/",
    "/Login",
    "/Register",
    "/forgotPassword",
  ,
  ];

  if (to.meta.auth === false) {
    return
  }

  // If the route is public, just allow access without checks
  if (publicRoutes.includes(to.path)) {
    return;
  }

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
