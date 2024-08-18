'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { z } from 'zod';

import { CustomModal, CustomButton, CustomInput } from '@/components/ui';
import { IContact } from '@/interfaces';
import { createContact, updateContact } from '@/services/contact.service';
import { zodResolver } from '@hookform/resolvers/zod';

interface IProps {
  open: boolean;
  onClose: () => void;
  contact?: IContact;
  refetch: () => void;
}

const formschema = z.object({
  id: z.string().or(z.undefined()),
  email: z.string().or(z.undefined()),
  name: z.string(),
  phone: z.string(),
});

type HandleUpdateFormData = z.infer<typeof formschema>;

export default function ContactModal({
  open,
  onClose,
  contact,
  refetch,
}: IProps) {
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register } = useForm<HandleUpdateFormData>({
    resolver: zodResolver(formschema),

    defaultValues: contact
      ? {
          id: contact.id,
          email: contact?.email || '',
          name: contact.name,
          phone: contact.phone,
        }
      : {
          email: '',
          name: '',
          phone: '',
        },
  });

  async function formSubmit(values: HandleUpdateFormData) {
    setLoading(true);

    if (contact && contact.id) {
      const { success, message } = await updateContact(contact.id, values);

      if (success) {
        refetch();
        toast.success('Contato salvo com sucesso!');
        onClose();

        setLoading(false);
        return;
      }

      toast.error((message as string) || 'Erro ao atualizar contato');

      setLoading(false);
      return;
    }

    const { success, message } = await createContact(values);

    if (success) {
      refetch();
      toast.success('Contato salvo com sucesso!');

      onClose();

      return;
    }

    toast.error((message as string) || 'Erro ao criar contato');

    setLoading(false);
  }

  return (
    <div className="w-full p-6 flex flex-row justify-between items-center gap-4 text-black">
      <CustomModal open={open} onClose={() => onClose()}>
        <header className="w-full p-6 flex flex-row justify-between items-center gap-4 text-black">
          <h1 className="text-6">
            {contact && contact.id ? 'Editar' : 'Cadastrar'}
          </h1>
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
                {...register('email')}
              />

              <CustomInput
                className="w-full"
                placeholder="(00) 00000-0000"
                type="text"
                label="Telefone"
                required
                {...register('phone')}
              />
            </div>

            <div className="w-full flex items-center justify-end p-2 gap-3">
              <CustomButton
                variant="outlined"
                onClick={() => onClose()}
                type="button"
                color="error"
                loading={loading}
              >
                Cancelar
              </CustomButton>
              <CustomButton
                variant="outlined"
                type="submit"
                color="success"
                loading={loading}
              >
                Salvar
              </CustomButton>
            </div>
          </form>
        </main>
      </CustomModal>
    </div>
  );
}
