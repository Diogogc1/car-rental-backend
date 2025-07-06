"use client";

import { UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "sonner";
import logo from "./../../../public/logo.svg";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.isExpired) {
      signOut({ callbackUrl: "/login" });
    }
  }, [session, status, router]);

  if (!session) {
    return <div>Redirecionando...</div>;
  }
  return (
    <>
      <header className="flex items-center justify-between bg-background p-4 border-b-2 border-gray-200">
        <Image
          onClick={() => router.push("/")}
          className="cursor-pointer"
          src={logo}
          alt="Logo da empresa, um ícone de roda e o nome laranja na frente Wheel&Road"
          width={150}
          height={150}
        />
        <div className="flex items-center gap-4">
          <button className="cursor-pointer" onClick={() => signOut()}>
            Sair
          </button>
          <UserIcon
            className="cursor-pointer"
            onClick={() => router.push("/profile")}
          ></UserIcon>
        </div>
      </header>
      <main className="flex justify-center items-center flex-col xl:px-28 px-8 py-12">
        {children}
      </main>
      <Toaster />
    </>
  );
}
