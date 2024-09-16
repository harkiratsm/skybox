import { auth } from "@/auth";
import { Header } from "@/components/(dashboard)/layout/header";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
      redirect("/signin");
  }

  return (
    <>
      <Header user={session?.user} />
    
    </>
  );
}
