"use client";

import { CarCard } from "@/components/ui/carCard";
import { Card, CardContent } from "@/components/ui/card";
import { reservationService, userService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/components/navigation";

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();

  console.log("Session data:", session);
  const userId = session?.user?.id;

  const {
    data: user,
    isLoading: isUserLoading,
    error: errorUser,
  } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      return await userService.getById(userId as string);
    },
    enabled: !!userId,
  });

  const {
    data: userReservations,
    isLoading: isLoadingReservations,
    error: errorReservations,
  } = useQuery({
    queryKey: ["userReservations", userId],
    queryFn: async () => {
      return await reservationService.getByUserId(userId as string);
    },
    enabled: !!userId,
  });

  const handleEditReservation = (idCar: number, idReservation: number) => {
    router.push(`/reserve/${idCar}?reservationId=${idReservation}`);
  };

  if (isUserLoading || isLoadingReservations) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center px-20">
        <h1 className="text-3xl font-bold text-gray-700 text-center">
          Carregando...
        </h1>
      </div>
    );
  }

  if (errorUser || errorReservations) {
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
    <div className=" lg:px-20 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">Meu Perfil</h1>
        <h2 className="text-sm text-gray-500">
          Gerencie suas informações e reservas
        </h2>
      </div>

      <Card className="border rounded-3xl">
        <CardContent className="p-6 flex items-center justify-center">
          <div className="flex items-center justify-center  gap-6">
            <div className="lg:w-20 w-16 lg:h-20 h-16 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 justify-center items-center text-left ">
              <h2 className="xl:text-xl text-md font-bold text-gray-700 mb-2">
                {user?.name}
              </h2>
              <p className="text-gray-500 xl:text-lg text-md">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-center mt-4 gap-8">
        {userReservations?.map((reservation) => (
          <CarCard
            key={reservation.id}
            props={{
              car: reservation.car,
              reservation: reservation,
              handleEditCar: () =>
                handleEditReservation(reservation.car.id, reservation.id),
            }}
          ></CarCard>
        ))}
      </div>
    </div>
  );
}
