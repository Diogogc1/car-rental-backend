"use client";

import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/ui/carCard";
import { Card, CardContent } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  ICreateReservationPayload,
  IUpdateReservationByIdPayload,
} from "@/dtos/reservation/payloads";
import { IGetAllReservationResponse } from "@/dtos/reservation/responses";
import { reservationService } from "@/services";
import { carService } from "@/services/car.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

type ReserveFormData = z.infer<typeof formSchema>;

export default function Reserve() {
  const params = useParams();
  const searchParams = useSearchParams();
  const idCar = params?.id;
  const reservationId = searchParams.get("reservationId");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const form = useForm<ReserveFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
    },
  });

  const queryClient = useQueryClient();

  const {
    data: car,
    error: carError,
    isLoading: carIsLoading,
  } = useQuery({
    queryKey: ["car", idCar],
    queryFn: async () => {
      return await carService.getById(String(idCar));
    },
    enabled: !!idCar,
  });

  const {
    data: reservations,
    error: reservationsError,
    isLoading: reservationsIsLoading,
  } = useQuery({
    queryKey: ["reservations", idCar],
    queryFn: async () => {
      return await reservationService.getByCarId(String(idCar));
    },
    enabled: !!idCar,
  });

  const { data: reservationToEdit, isLoading: isLoadingReservationToEdit } =
    useQuery({
      queryKey: ["reservationToEdit", reservationId],
      queryFn: async () => {
        if (!reservationId) return undefined;
        return await reservationService.getById(reservationId);
      },
      enabled: !!reservationId,
    });

  useEffect(() => {
    if (reservationToEdit) {
      setDateRange({
        from: new Date(reservationToEdit.startDate),
        to: new Date(reservationToEdit.endDate),
      });
    }
  }, [reservationToEdit]);

  const createMutation = useMutation({
    mutationFn: async (data: ICreateReservationPayload) => {
      return reservationService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success(`Carro ${idCar} reservado com sucesso!`);
    },
    onError: (err) => {
      toast.error(`Falha ao reservar: ${err.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: IUpdateReservationByIdPayload) => {
      if (!reservationId) return;
      return reservationService.update(Number(reservationId), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success(`Reserva atualizada com sucesso!`);
    },
    onError: (err) => {
      toast.error(`Falha ao atualizar: ${err.message}`);
    },
  });

  const handleReserve = () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast.warning(
        "Por favor, selecione as datas de início e fim da reserva."
      );
      return;
    }

    form.setValue("startDate", dateRange.from);
    form.setValue("endDate", dateRange.to);

    const days =
      dateRange?.from && dateRange?.to
        ? Math.ceil(
            (dateRange.to.getTime() - dateRange.from.getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1
        : 0;

    const totalPrice = car?.price ? car.price * days : 0;

    const payload = {
      carId: Number(idCar as string),
      startDate: dateRange.from,
      endDate: dateRange.to,
      userId: Number(userId as string),
      totalPrice,
    };

    if (reservationId) {
      updateMutation.mutate({
        id: Number(reservationId),
        ...payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  if (!idCar) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center px-20">
        <h1 className="text-3xl font-bold text-gray-700 text-center">
          Carro não encontrado
        </h1>
        <p className="mt-4 text-gray-500 text-center">
          Por favor, selecione um carro válido.
        </p>
      </div>
    );
  }

  if (carIsLoading || reservationsIsLoading || isLoadingReservationToEdit) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center px-20">
        <h1 className="text-3xl font-bold text-gray-700 text-center">
          Carregando...
        </h1>
      </div>
    );
  }

  if (carError || reservationsError) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center px-20">
        <h1 className="text-3xl font-bold text-gray-700 text-center">
          Erro ao carregar o carro
        </h1>
        <p className="mt-4 text-red-500 text-center">
          {(carError as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="h-full xl:px-20 w-full">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">
          Reservar Carro
        </h1>
        <h2 className="text-sm text-gray-500">
          Complete os dados para finalizar sua reserva
        </h2>
      </div>

      <div className="flex h-96 flex-col justify-center items-center lg:flex-row gap-8">
        {car && (
          <CarCard
            props={{
              car,
            }}
          />
        )}

        <div className="h-full lg:w-1/2">
          <Card className="h-full rounded-3xl flex justify-center items-center">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                Período da Reserva
              </h3>

              <div className="mb-6 flex items-center justify-center">
                <DateRangePicker
                  date={dateRange}
                  onDateChange={setDateRange}
                  placeholder="Selecione as datas de início e fim"
                  disabledRanges={
                    reservations?.map(
                      (reservation: IGetAllReservationResponse) => ({
                        from: new Date(reservation.startDate),
                        to: new Date(reservation.endDate),
                      })
                    ) || []
                  }
                />
              </div>

              {dateRange?.from && dateRange?.to && (
                <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">
                        Período selecionado
                      </p>
                      <p className="font-medium text-gray-700">
                        {dateRange.from.toLocaleDateString("pt-BR")} até{" "}
                        {dateRange.to.toLocaleDateString("pt-BR")}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Total de dias</p>
                        <p className="font-medium text-gray-700">
                          {Math.ceil(
                            (dateRange.to.getTime() -
                              dateRange.from.getTime()) /
                              (1000 * 60 * 60 * 24)
                          ) + 1}{" "}
                          dias
                        </p>
                      </div>

                      {car?.price && (
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Valor total</p>
                          <p className="text-xl font-bold text-gray-700">
                            R${" "}
                            {(
                              car.price *
                              (Math.ceil(
                                (dateRange.to.getTime() -
                                  dateRange.from.getTime()) /
                                  (1000 * 60 * 60 * 24)
                              ) +
                                1)
                            ).toLocaleString("pt-BR")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleReserve}
                className="w-full h-10 text-lg font-semibold"
                disabled={!dateRange?.from || !dateRange?.to}
              >
                {!dateRange?.from || !dateRange?.to
                  ? "Selecione as datas"
                  : reservationId
                  ? "Atualizar Reserva"
                  : "Confirmar Reserva"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
