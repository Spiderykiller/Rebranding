import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::user-profile.user-profile",
  ({ strapi }) => ({
    async createFromClerk(ctx) {
      const { clerkUserid, email } = ctx.request.body;

      if (!clerkUserid || !email) {
        return ctx.badRequest("Missing data");
      }

      // Prevent duplicates
      const existing = await strapi.entityService.findMany(
        "api::user-profile.user-profile",
        {
          filters: { clerkUserid },
        }
      );

      if (existing.length > 0) {
        return ctx.send(existing[0]);
      }

      const profile = await strapi.entityService.create(
        "api::user-profile.user-profile",
        {
          data: {
            clerkUserid,
            email,
            role: "user",
          },
        }
      );

      return ctx.send(profile);
    },
  })
);

