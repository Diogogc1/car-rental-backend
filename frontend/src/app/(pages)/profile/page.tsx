"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  console.log("Session data:", session);
  const userId = session?.user?.id;

  return (
    <div>
      <h1>Perfil</h1>
      <p>ID do usuário: {userId}</p>
    </div>
  );
}
