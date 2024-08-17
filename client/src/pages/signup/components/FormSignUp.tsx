"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
import { z } from "zod";

import { CustomButton, CustomInput } from "@/components/ui";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";

const formschema = z
  .object({
    name: z.string().min(1, "Nome muito curto"),
    email: z.string().min(1, "E-mail muito curto"),
    password: z.string().min(8, "Senha muito curta"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

type HandleUpdateFormData = z.infer<typeof formschema>;

export function FormSignUp() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<HandleUpdateFormData>({
    resolver: zodResolver(formschema),
  });

  async function formSubmit(values: { email: string; password: string }) {
    setLoading(true);

    try {
      await api.post("/auth/singup", values);

      toast.success("Cadastro efetuado com sucesso!");

      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao fazer cadastro");
    }

    setLoading(false);
  }

  return (
    <div className="w-[80%] h-full max-w-[400px] p-4 flex flex-col justify-center items-center gap-4 text-black">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-full flex flex-col justify-start gap-4 p-4 bg-white border-1 border-solid border-white rounded-default"
      >
        <div className="w-full flex justify-center items-center">
          <h1 className="text-2xl font-bold">Cadastrar Conta</h1>
        </div>
        <div className="w-full h-full flex flex-col justify-start items-start mt-8 gap-4">
          <CustomInput
            className="w-full"
            type="text"
            label="Nome completo"
            required
            {...register("name")}
          />
          {errors && errors.name ? (
            <div className="w-full text-dangerBase text-sm">
              {errors.name.message}
            </div>
          ) : null}
          <CustomInput
            className="w-full"
            type="email"
            label="E-mail"
            required
            {...register("email")}
          />

          {errors && errors.email ? (
            <div className="w-full text-dangerBase text-sm">
              {errors.email.message}
            </div>
          ) : null}

          <CustomInput
            className="w-full"
            placeholder="****"
            type="password"
            label="Senha"
            required
            {...register("password")}
          />

          {errors && errors.password ? (
            <div className="w-full text-dangerBase text-sm">
              {errors.password.message}
            </div>
          ) : null}

          <CustomInput
            className="w-full"
            placeholder="****"
            type="password"
            label="Confirme sua senha"
            required
            {...register("confirmPassword")}
          />
          {errors && errors.confirmPassword ? (
            <div className="w-full text-dangerBase text-sm">
              {errors.confirmPassword.message}
            </div>
          ) : null}
        </div>

        <CustomButton
          className="w-full h-16"
          variant="contained"
          type="submit"
          disabled={loading}
        >
          Criar conta
        </CustomButton>
        <div className="w-full flex items-center justify-end cursor-pointer">
          <button type="button" onClick={() => router.push("/")}>
            já tem conta? Faça Login
          </button>
        </div>
      </form>
    </div>
  );
}
