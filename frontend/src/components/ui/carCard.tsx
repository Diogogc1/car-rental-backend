import { IGetAllCarResponse, IGetCarByIdResponse } from "@/dtos/car/responses";
import { IGetReservationByIdResponse } from "@/dtos/reservation/responses";
import Image from "next/image";
import { Button } from "./button";
import { Card, CardContent, CardTitle } from "./card";

interface CarCardProps {
  car: IGetAllCarResponse | IGetCarByIdResponse;
  reservation?: IGetReservationByIdResponse;
  handleReserveCar?: (id: number) => void;
  handleEditCar?: (id: number) => void;
}

export function CarCard({ props }: { props: CarCardProps }) {
  return (
    <Card className="mt-4 w-[340px] border rounded-3xl">
      <CardContent className="flex xl:flex-col flex-row items-center">
        <div className="w-full xl:h-70 h-50 relative">
          <Image
            src={props.car.imageUrl}
            fill
            className="rounded-l-3xl xl:rounded-t-3xl xl:rounded-b-none"
            alt={`Imagem do carro ${props.car.name}`}
          />
        </div>

        <div className="flex flex-col items-center justify-between w-full gap-6 px-4 py-4">
          <div className="flex w-full justify-between items-center">
            <CardTitle className="xl:text-xl text-md font-semibold">
              {props.car.name}
            </CardTitle>

            <p className="text-gray-500 xl:text-xl text-md font-bold">
              R$ {props.car.price}
            </p>
          </div>
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col items-start w-full">
              <p className="text-gray-500 text-sm">Marca: {props.car.brand}</p>
              <p className="text-gray-500 text-sm">Ano: {props.car.year}</p>
              <p className="text-gray-500 text-sm">Placa: {props.car.plate}</p>
            </div>
          </div>
          {props.reservation && (
            <p className="text-gray-500 text-sm">
              {new Date(props.reservation.startDate).toLocaleDateString()} -
              {new Date(props.reservation.endDate).toLocaleDateString()}
            </p>
          )}
          {(props.handleReserveCar || props.handleEditCar) && (
            <Button
              className="w-full"
              onClick={() => {
                if (props.handleReserveCar) {
                  props.handleReserveCar(props.car.id);
                } else if (props.handleEditCar) {
                  props.handleEditCar(props.car.id);
                }
              }}
            >
              {props.handleReserveCar ? "Reservar" : "Editar"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
