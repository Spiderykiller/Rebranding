module.exports = {
  routes: [
    {
      method: "POST",
      path: "/user-profiles/from-clerk",
      handler: "user-profile.createFromClerk",
    },
  ],
};
