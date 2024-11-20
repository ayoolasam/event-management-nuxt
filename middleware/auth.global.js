import { useUserStore } from "#imports";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  const roleDashboards = {
    Admin: "/admin/dashboard",
    User: "/user/dashboard",
  };

  // Redirect to login if not logged in and not already navigating to login
  if (!userStore.loggedIn && to.path !== "/Login") {
    return navigateTo("/Login");
  }

  // Allow access to all pages if logged in
  if (userStore.loggedIn) {
    // Redirect to appropriate dashboard if the role doesn't match the route layout
    if (to.meta.layout === "user" && userStore.role !== "User") {
      return navigateTo(roleDashboards[userStore.role]);
    }

    if (to.meta.layout === "admin" && userStore.role !== "Admin") {
      return navigateTo(roleDashboards[userStore.role]);
    }
  }

  // If logged in and no conflicts, allow navigation
});
