export async function getUserRole(clerkUserId: string) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/user-profiles?filters[clerkUserId][$eq]=${clerkUserId}`
  );

  const json = await res.json();
  return json.data?.[0]?.attributes?.role;
}
