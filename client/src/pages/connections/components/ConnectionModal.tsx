'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { z } from 'zod';

import {
  CustomModal,
  CustomButton,
  CustomInput,
  CustomSwitch,
} from '@/components/ui';
import { IConnection } from '@/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';

interface IProps {
  open: boolean;
  onClose: () => void;
  isEdit: boolean;
  connection?: IConnection;
}

const formschema = z.object({
  id: z.string().or(z.undefined()),
  name: z.string(),
  active: z.boolean(),
});

type HandleUpdateFormData = z.infer<typeof formschema>;

export function ConnectionModal({ open, onClose, isEdit, connection }: IProps) {
  const [, setLoading] = useState(false);

  const { handleSubmit, register, control } = useForm<HandleUpdateFormData>({
    resolver: zodResolver(formschema),

    defaultValues: async () => {
      if (isEdit && connection) {
        return {
          id: connection.id,
          name: connection.name,
          active: connection?.active,
        };
      }
      return {
        name: '',
        active: false,
      };
    },
  });

  async function formSubmit(values: HandleUpdateFormData) {
    setLoading(true);
    console.info(values);
    setLoading(false);
  }

  return (
    <div className="w-full p-6 flex flex-row justify-between items-center gap-4 text-black">
      <h1 className="text-2xl font-bold">Contatos</h1>

      <CustomModal open={open} onClose={() => onClose()}>
        <header className="w-full p-6 flex flex-row justify-between items-center gap-4 text-black">
          <h1 className="text-6">{isEdit ? 'Editar' : 'Cadastrar'}</h1>
          <button type="button" onClick={() => onClose()}>
            X
          </button>
        </header>

        <main className="w-full h-full">
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="w-full h-full flex flex-col justify-between gap-4 p-4 border-1 border-none rounded-default"
          >
            <div className="w-full h-full flex flex-col justify-start items-start mt-8 gap-4">
              <CustomInput
                className="w-full"
                placeholder=""
                type="text"
                label="Nome da conexão"
                {...register('name')}
              />
              <Controller
                name="active"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <CustomSwitch
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="w-full flex items-center justify-end p-2 gap-3">
              <CustomButton
                variant="outlined"
                onClick={() => onClose()}
                type="button"
                color="error"
              >
                Cancelar
              </CustomButton>
              <CustomButton variant="outlined" type="submit" color="success">
                Salvar
              </CustomButton>
            </div>
          </form>
        </main>
      </CustomModal>
    </div>
  );
}
