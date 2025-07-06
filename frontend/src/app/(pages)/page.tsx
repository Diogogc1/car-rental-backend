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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { carService } from "@/services/car.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

const formSchema = z.object({
  search: z.string().min(1, "Search term is required"),
});

type LoginFormData = z.infer<typeof formSchema>;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchValue = form.watch("search");
  const [debouncedSearch] = useDebounce(searchValue, 500);

  const { data, error, isLoading } = useQuery({
    queryKey: ["cars", debouncedSearch, currentPage],
    queryFn: async () => {
      return await carService.getAllCars(
        debouncedSearch,
        currentPage,
        itemsPerPage
      );
    },
    enabled: !!debouncedSearch || debouncedSearch === "",
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const onSubmit = async (data: LoginFormData) => {
    console.log("Search term:", data.search);
  };

  const handleReserveCar = (carId: number) => {
    router.push(`/reserve/${carId}`);
  };

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-700 text-center">
        Alugue carros de forma fácil e simples
      </h1>
      <h2 className="mt-2 mb-8 text-sm text-center">
        Sua mobilidade garantida com praticidade e segurança
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full xl:w-[500px] relative"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    className="w-full p-4 border rounded-full bg-gray-300"
                    placeholder="Buscar pelo nome"
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

      <div className="flex flex-col xl:flex-row flex-wrap xl:gap-14 gap-8 mt-8 w-full xl:px-20 items-center justify-center">
        {data &&
          data.data.map((car) => (
            <Card key={car.id} className="mt-4 w-[340px] border rounded-3xl">
              <CardContent className="flex xl:flex-col flex-row items-center">
                <div className="w-full xl:h-70 h-50 relative">
                  <Image
                    src={car.imageUrl}
                    fill
                    className="xl:rounded-t-3xl rounded-l-3xl "
                    alt={`Imagem do carro ${car.name}`}
                  />
                </div>

                <div className="flex flex-col items-center justify-between w-full gap-6 px-4 py-4">
                  <div className="flex w-full justify-between items-center">
                    <CardTitle className="xl:text-xl text-md font-semibold">
                      {car.name}
                    </CardTitle>

                    <p className="text-gray-500 xl:text-xl text-md font-bold">
                      R$ {car.price}
                    </p>
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <div className="flex flex-col items-start w-full">
                      <p className="text-gray-500 text-sm">
                        Marca: {car.brand}
                      </p>
                      <p className="text-gray-500 text-sm">Ano: {car.year}</p>
                      <p className="text-gray-500 text-sm">
                        Placa: {car.plate}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleReserveCar(car.id)}
                  >
                    Reservar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
