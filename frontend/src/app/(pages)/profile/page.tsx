"use client";

import { userService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  console.log("Session data:", session);
  const userId = session?.user?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      return await userService.getById(userId as string);
    },
    enabled: !!userId,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar o perfil do usuário.</div>;
  }

  return (
    <div>
      <h1>Perfil</h1>
      <p>ID do usuário: {userId}</p>
      <p>Nome: {data?.name}</p>
      <p>Email: {data?.email}</p>

      <div>
        <h2>Reservas</h2>
        {data?.reservations && data.reservations.length > 0 ? (
          <ul>
            {data.reservations.map((reservation) => (
              <li key={reservation.id}>
                Reserva ID: {reservation.id}, Carro: {reservation.car?.name},
                Data de Início: {reservation.startDate.toString()}, Data de Fim:{" "}
                {reservation.endDate.toString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma reserva encontrada.</p>
        )}
      </div>
    </div>
  );
}
