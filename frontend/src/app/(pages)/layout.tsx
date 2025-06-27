"use client";

import { UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "./../../../public/logo.svg";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
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
      <main className="flex justify-center items-center flex-col px-28 py-12">
        {children}
      </main>
    </>
  );
}
