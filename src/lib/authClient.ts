import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  //you can pass client configuration here
});

// TODO: remove mock session api
export const useSession = () => ({
  data: null as { user: { name: string; image?: string } } | null,
  isPending: false,
});
