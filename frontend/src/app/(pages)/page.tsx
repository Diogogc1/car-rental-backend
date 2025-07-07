"use client";

import { CarCard } from "@/components/ui/carCard";
import { DateRangePicker } from "@/components/ui/date-range-picker";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
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
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchValue = form.watch("search");
  const [debouncedSearch] = useDebounce(searchValue, 500);
  const [debouncedDateRange] = useDebounce(dateRange, 500);

  const { data, error, isLoading } = useQuery({
    queryKey: ["cars", debouncedSearch, currentPage, debouncedDateRange],
    queryFn: async () => {
      let dateReservation;
      if (debouncedDateRange?.from && debouncedDateRange?.to) {
        dateReservation = {
          startDate: debouncedDateRange.from.toISOString(),
          endDate: debouncedDateRange.to.toISOString(),
        };
      }
      return await carService.getAllCars(
        debouncedSearch,
        currentPage,
        itemsPerPage,
        dateReservation
      );
    },
    enabled: !!debouncedSearch || debouncedSearch === "",
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

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
        <form className="space-y-5 w-full relative">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full relative flex justify-center items-center">
                <FormControl className="w-[600px]">
                  <Input
                    type="text"
                    className="p-4 border rounded-full bg-gray-300"
                    placeholder="Buscar pelo nome"
                    icon={SearchIcon}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <div className="mt-2 flex-start">
            <DateRangePicker
              date={dateRange}
              onDateChange={setDateRange}
              placeholder="Filtrar por período de reserva"
            />
          </div>
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
            <CarCard key={car.id} props={{ car, handleReserveCar }}></CarCard>
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
