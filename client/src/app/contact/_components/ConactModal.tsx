'use client';

import { CustomModal, CustomButton, CustomInput } from '../../components/ui';

import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

interface IProps {
  open: boolean;
  onClose: () => void;
  isEdit: boolean;
}

const formschema = z.object({
  email: z.string(),
  name: z.string(),
  phone: z.string(),
});

type HandleUpdateFormData = z.infer<typeof formschema>;

export function ConactModal({ open, onClose, isEdit }: IProps) {
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register } = useForm<HandleUpdateFormData>({
    resolver: zodResolver(formschema),
  });

  async function formSubmit(values: HandleUpdateFormData) {
    setLoading(true);
    console.log(values);
    setLoading(false);
  }

  return (
    <div className="w-full p-6 flex flex-row justify-between items-center gap-4 text-black">
      <h1 className="text-2xl font-bold">Contatos</h1>

      <CustomModal open={open} onClose={() => onClose()}>
        <header className="w-full p-6 flex flex-row justify-between items-center gap-4 text-black">
          <h1 className="text-6">{isEdit ? 'Editar' : 'Cadastrar'}</h1>
          <button onClick={() => onClose()}>X</button>
        </header>

        <main className="w-full h-full">
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="w-full h-full flex flex-col justify-between gap-4 p-4 border-1 border-none rounded-default"
          >
            <div className="w-full h-full flex flex-col justify-start items-start mt-8 gap-4">
              <CustomInput
                className="w-full"
                type="text"
                label="Nome"
                required
                {...register('name')}
              />

              <CustomInput
                className="w-full"
                placeholder=""
                type="text"
                label="E-mail"
                {...register('phone')}
              />

              <CustomInput
                className="w-full"
                placeholder="(00) 00000-0000"
                type="text"
                label="Telefone"
                required
                {...register('email')}
              />
            </div>

            <div className="w-full flex items-center justify-end p-2 gap-3">
              <CustomButton
                variant="contained"
                onClick={() => onClose()}
                type="button"
              >
                Cancelar
              </CustomButton>
              <CustomButton variant="contained" type="submit">
                Salvar
              </CustomButton>
            </div>
          </form>
        </main>
      </CustomModal>
    </div>
  );
}
