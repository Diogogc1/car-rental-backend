"use client";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { reservationService } from "@/services";
import { carService } from "@/services/car.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
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

  const { data, error, isLoading } = useQuery({
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
      alert(`Carro ${idCar} reservado com sucesso!`);
    },
    onError: (err) => {
      alert(`Falha ao reservar: ${err.message}`);
    },
  });

  const handleReserve = () => {
    if (!dateRange?.from || !dateRange?.to) {
      alert("Por favor, selecione as datas de início e fim da reserva.");
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

    const totalPrice = data?.price ? data.price * days : 0;

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
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Carro não encontrado</h1>
        <p className="mt-4 text-gray-500">
          Por favor, selecione um carro válido.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Carregando...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Erro ao carregar o carro</h1>
        <p className="mt-4 text-red-500">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Reservar Carro {idCar}</h1>
      <p className="mt-4 text-gray-500">Aqui você pode reservar o carro.</p>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Detalhes do Carro</h2>
        <p>Modelo: {data?.name}</p>
        <p>Marca: {data?.brand}</p>
        <p>Ano: {data?.year}</p>
        <p>Preço: R$ {data?.price}</p>
        <p>Status: {data?.status}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          Selecione o período da reserva
        </h3>
        <DateRangePicker
          date={dateRange}
          onDateChange={setDateRange}
          placeholder="Selecione as datas de início e fim"
        />
      </div>

      <Button onClick={handleReserve} className="mt-6">
        Reservar
      </Button>
    </div>
  );
}
