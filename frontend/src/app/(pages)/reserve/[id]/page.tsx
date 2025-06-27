"use client";

import { useParams } from "next/navigation";

export default function Reserve() {
  const params = useParams();
  const idCar = params?.id;

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Reservar Carro {idCar}</h1>
      <p className="mt-4 text-gray-500">Aqui você pode reservar o carro.</p>
    </div>
  );
}
