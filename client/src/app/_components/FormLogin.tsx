'use client';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { CustomButton, CustomInput } from '../components/ui';
import { zodResolver } from '@hookform/resolvers/zod';

const formschema = z.object({
  email: z.string(),
  password: z.string(),
});

type HandleUpdateFormData = z.infer<typeof formschema>;

export function FormLogin() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { handleSubmit, register } = useForm<HandleUpdateFormData>({
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
          <h1 className="text-2xl font-bold">Login</h1>
        </div>
        <div className="w-full h-full flex flex-col justify-start items-start mt-8 gap-4">
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
        </div>
        <CustomButton className="w-full h-16" variant="contained" type="submit">
          Entrar
        </CustomButton>
        <div className="w-full flex items-center justify-end cursor-pointer">
          <button onClick={() => router.push('/signup')}>
            Não tem conta? Cadastre-se agora
          </button>
        </div>
      </form>
    </div>
  );
}
