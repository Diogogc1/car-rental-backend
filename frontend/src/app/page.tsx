"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  if (!session) {
    return <div>Redirecionando...</div>;
  }

  return <div>Bem-vindo, {session.user?.email}!</div>;
}
