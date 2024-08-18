'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { CustomButton, CustomInput } from '@/components/ui';
import { useAuth } from '@/contexts/Auth';
import { zodResolver } from '@hookform/resolvers/zod';

const formschema = z.object({
  email: z.string(),
  password: z.string(),
});

type HandleUpdateFormData = z.infer<typeof formschema>;

export default function FormLogin() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const { handleSubmit, register } = useForm<HandleUpdateFormData>({
    resolver: zodResolver(formschema),
  });

  async function formSubmit(values: { email: string; password: string }) {
    setLoading(true);

    const { success, message } = await signIn({
      email: values.email,
      password: values.password,
    });

    if (success) {
      router.push('/connections');
      return;
    }

    toast.error(message || 'Erro ao fazer login, tente novamente');
    setLoading(false);
  }

  return (
    <div className="w-[80%] h-full max-w-[400px] p-4 flex flex-col justify-center items-center gap-4 text-black">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-full flex flex-col justify-start gap-4 p-4 bg-white border-1 border-solid border-white rounded-default"
      >
        <div className="w-full flex justify-center items-center">
          <h1 className="text-xl font-bold">Login</h1>
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
        <CustomButton
          variant="contained"
          type="submit"
          loading={loading}
          className=" w-full h-16 gap-1 bg-purple hover:bg-purpleDark"
        >
          Entrar
        </CustomButton>
        <div className="w-full flex items-center justify-end cursor-pointer">
          <button type="button" onClick={() => router.push('/signup')}>
            Não tem conta? <span className="text-blue">Cadastre-se agora</span>
          </button>
        </div>
      </form>
    </div>
  );
}
