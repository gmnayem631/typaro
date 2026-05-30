// Faisal Bhai replace this with real Better Auth client

export const useSession = () => ({
  data: null as { user: { name: string; image?: string } } | null,
  isPending: false,
});
