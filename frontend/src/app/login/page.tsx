"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import logo from "./../../../public/logo.svg";

const formSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof formSchema>;

export default function Login() {
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.ok) {
      setIsLoading(false);
      router.push("/");
      return;
    }

    setIsLoading(false);
    if (result?.error) {
      toast.error(`Erro ao fazer login: Email ou senha inválidos`);
    } else {
      toast.error("Erro desconhecido ao fazer login.");
    }
  };

  return (
    <main className="flex w-screen h-screen items-center justify-center">
      <div className="flex h-[80%] w-[600px] p-8 shadow-xl border-2 border-gray-300 rounded-lg">
        <div className="w-full h-full space-y-10 flex flex-col items-center justify-center">
          <Image
            src={logo}
            alt="Logo da empresa, um ícone de roda e o nome laranja na frente Wheel&Road"
            width={350}
            height={350}
          />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 w-full"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite seu email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Entrando..." : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
