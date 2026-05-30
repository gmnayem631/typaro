import { prisma } from "@/lib/prisma";

export default async function Home() {
  // fetch all users from the database
  const users = await prisma.user.findMany();
  console.log(users);

  return (
    <div>
      <h1>Welcome to Typaro!</h1>
      <p>This is the home page of our application.</p>
    </div>
  );
}
