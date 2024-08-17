'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import Link from 'next/link';
import { CustomButton, CustomInput } from '../../components/ui';
import { zodResolver } from '@hookform/resolvers/zod';

const formschema = z
  .object({
    name: z.string().min(1, 'Nome muito curto'),
    email: z.string(),
    password: z.string().min(8, 'Senha muito curta'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword'],
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
    console.error({
      email: values.email,
      password: values.password,
    });
    setLoading(false);
  }

  return (
    <div className="w-[80%] h-full max-w-[400px] p-4 flex flex-col justify-center items-center gap-4 text-black">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-full flex flex-col justify-start gap-4 p-4 bg-primary-base border-1 border-solid border-white rounded-default"
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
            {...register('name')}
          />

          <CustomInput
            className="w-full"
            type="email"
            label="E-mail"
            required
            {...register('email')}
          />

          <CustomInput
            className="w-full"
            placeholder="****"
            type="password"
            label="Senha"
            required
            {...register('password')}
          />

          <CustomInput
            className="w-full"
            placeholder="****"
            type="password"
            label="Confirme sua senha"
            required
            {...register('confirmPassword')}
          />
          {errors && errors.confirmPassword ? (
            <div className="w-full text-dangerBase text-sm">
              {errors.confirmPassword.message}
            </div>
          ) : null}
        </div>

        <CustomButton className="w-full h-16" variant="contained" type="submit">
          Criar conta
        </CustomButton>
        <div className="w-full flex items-center justify-end cursor-pointer">
          <button onClick={() => router.push('/')}>
            já tem conta? Faça Login
          </button>
        </div>
      </form>
    </div>
  );
}
