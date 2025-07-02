"use client";

import { Card, CardContent } from "@/components/ui/card";
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
    return (
      <div className="flex flex-col min-h-screen items-center justify-center px-20">
        <h1 className="text-3xl font-bold text-gray-700 text-center">
          Carregando...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center px-20">
        <h1 className="text-3xl font-bold text-gray-700 text-center">
          Erro ao carregar o perfil
        </h1>
        <p className="mt-4 text-red-500 text-center">
          Erro ao carregar o perfil do usuário.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-20 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">Meu Perfil</h1>
        <h2 className="text-sm text-gray-500">
          Gerencie suas informações e reservas
        </h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="border rounded-3xl">
          <CardContent className="p-8 flex items-center justify-center">
            <div className="flex items-center justify-center  gap-6">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {data?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 text-center justify-center items-center md:text-left ">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">
                  {data?.name}
                </h2>
                <p className="text-gray-500 text-lg">{data?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border rounded-3xl flex items-center justify-center">
          <CardContent className="p-6">
            {data?.reservations && data.reservations.length > 0 ? (
              <div className="space-y-4">
                {data.reservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="p-4 bg-gray-50 rounded-2xl"
                  >
                    <p className="text-sm text-gray-500">Período</p>
                    <p className="font-medium text-gray-700">
                      {new Date(reservation.startDate).toLocaleDateString(
                        "pt-BR"
                      )}{" "}
                      até{" "}
                      {new Date(reservation.endDate).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                    <p className="text-sm text-blue-600 font-medium mt-1">
                      R${" "}
                      {reservation.totalPrice?.toLocaleString("pt-BR") || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Nenhuma reserva encontrada
                </h3>
                <p className="text-gray-500">
                  Quando você fizer uma reserva, ela aparecerá aqui.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
