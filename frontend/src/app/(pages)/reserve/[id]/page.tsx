"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { reservationService } from "@/services";
import { carService } from "@/services/car.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
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
  const idCar = params?.id;
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
    error,
    isLoading,
  } = useQuery({
    queryKey: ["car", idCar],
    queryFn: async () => {
      return await carService.getById(idCar as string);
    },
    enabled: !!idCar,
  });

  const { mutate } = useMutation({
    mutationFn: reservationService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success(`Carro ${idCar} reservado com sucesso!`);
    },
    onError: (err) => {
      toast.error(`Falha ao reservar: ${err.message}`);
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

    console.log("Dados da reserva:", {
      carId: idCar,
      startDate: dateRange.from,
      endDate: dateRange.to,
      userId,
    });

    const days =
      dateRange?.from && dateRange?.to
        ? Math.ceil(
            (dateRange.to.getTime() - dateRange.from.getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1
        : 0;

    const totalPrice = car?.price ? car.price * days : 0;

    mutate({
      carId: Number(idCar as string),
      startDate: dateRange.from,
      endDate: dateRange.to,
      userId: Number(userId as string),
      totalPrice,
    });
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
          Erro ao carregar o carro
        </h1>
        <p className="mt-4 text-red-500 text-center">
          {(error as Error).message}
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
        <Card key={car?.id} className="mt-4 w-[340px] border rounded-3xl">
          <CardContent className="flex xl:flex-col flex-row items-center">
            <div className="w-full xl:h-70 h-50 relative">
              <Image
                src={car!.imageUrl}
                fill
                className="rounded-l-3xl xl:rounded-t-3xl xl:rounded-b-none"
                alt={`Imagem do carro ${car?.name}`}
              />
            </div>

            <div className="flex flex-col items-center justify-between w-full gap-6 px-4 py-4">
              <div className="flex w-full justify-between items-center">
                <CardTitle className="xl:text-xl text-md font-semibold">
                  {car?.name}
                </CardTitle>

                <p className="text-gray-500 xl:text-xl text-md font-bold">
                  R$ {car?.price}
                </p>
              </div>
              <div className="flex w-full justify-between items-center">
                <div className="flex flex-col items-start w-full">
                  <p className="text-gray-500 text-sm">Marca: {car?.brand}</p>
                  <p className="text-gray-500 text-sm">Ano: {car?.year}</p>
                  <p className="text-gray-500 text-sm">Placa: {car?.plate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  : "Confirmar Reserva"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
