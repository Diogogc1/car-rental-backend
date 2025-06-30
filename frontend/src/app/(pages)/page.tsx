"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { carService } from "@/services/car.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

const formSchema = z.object({
  search: z.string().min(1, "Search term is required"),
});

type LoginFormData = z.infer<typeof formSchema>;

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  const searchValue = form.watch("search");
  const [debouncedSearch] = useDebounce(searchValue, 500);

  const { data, error } = useQuery({
    queryKey: ["cars", debouncedSearch],
    queryFn: async () => {
      return await carService.getAllCars(debouncedSearch);
    },
    enabled: !!debouncedSearch || debouncedSearch === "",
  });

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  if (!session) {
    return <div>Redirecionando...</div>;
  }

  const onSubmit = async (data: LoginFormData) => {
    console.log("Search term:", data.search);
  };

  const handleReserveCar = (carId: number) => {
    router.push(`/reserve/${carId}`);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-700">
        Alugue carros de forma fácil e simples
      </h1>
      <h2 className="mt-2 mb-8 text-sm">
        Lorem ipsum dolor sit amet consectetur. Orci tincidunt laoreet.
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-1/2 relative"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    className="w-full p-4 border rounded-full bg-gray-200"
                    placeholder="Search"
                    icon={SearchIcon}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </form>
      </Form>

      {error && (
        <div className="mt-4 text-red-500">
          Ocorreu um erro ao buscar os carros: {error.message}
        </div>
      )}

      {data &&
        data.data.map((car) => (
          <Card key={car.id} className="mt-4 w-1/4 border rounded-lg">
            <CardContent className="flex flex-col gap-4 py-2 items-center w-full">
              <div className="flex items-center justify-between w-full">
                <Image
                  src={car.imageUrl}
                  width={100}
                  height={100}
                  alt={`Imagem do carro ${car.name}`}
                ></Image>

                <CardTitle className="text-xl font-semibold">
                  {car.name}
                </CardTitle>

                <p className="text-gray-500 text-xl font-bold">
                  R$ {car.price}
                </p>
              </div>

              <div className="flex items-center justify-between w-full">
                <div>
                  <p className="text-gray-500 text-sm">Marca: {car.brand}</p>
                  <p className="text-gray-500 text-sm">Ano: {car.year}</p>
                  <p className="text-gray-500 text-sm">Placa: {car.plate}</p>
                </div>
                <p className="text-gray-500 text-center">{car.status}</p>
              </div>
            </CardContent>
            <Button onClick={() => handleReserveCar(car.id)}>Reservar</Button>
          </Card>
        ))}
    </>
  );
}
