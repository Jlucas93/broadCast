'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { z } from 'zod';

import {
  CustomModal,
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomMultiSelect,
} from '@/components/ui';
import { IBroadcast } from '@/interfaces';
import { createBroadcast, updateBroadcast } from '@/services/broadcast.service';
import { getActiveConnections } from '@/services/connection.service';
import { getContacts } from '@/services/contact.service';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SelectChangeEvent,
  Switch,
  FormControlLabel,
  TextField,
  CircularProgress,
} from '@mui/material';

interface IProps {
  open: boolean;
  onClose: () => void;
  broadcast?: IBroadcast;
  refetch: () => void;
}

const formschema = z
  .object({
    id: z.string().or(z.undefined()),
    name: z.string().min(1, 'Nome da transmissão é obrigatório'),
    status: z.string(),
    sendDate: z.string().optional(),
    sendTime: z.string().optional(),
    contactsIDs: z
      .array(z.string())
      .nonempty('Selecione pelo menos um contato'),
    connectionID: z.string().min(1, 'Escolha uma conexão'),
  })
  .refine(
    (data) => {
      if (data.status === 'schedule') {
        return data.sendDate && data.sendTime;
      }
      return true;
    },
    {
      message: 'Escolha uma opção de agendamento',
      path: ['sendDate', 'sendTime'],
    },
  );

type HandleUpdateFormData = z.infer<typeof formschema>;

export function BroadcastModal({ open, onClose, broadcast, refetch }: IProps) {
  const [loading, setLoading] = useState(false);

  const [loadingConnections, setLoadingConnections] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);

  const [contacts, setContacts] = useState<{ id: string; name: string }[]>([]);
  const [connections, setConnections] = useState<
    { id: string; name: string }[]
  >([]);

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<HandleUpdateFormData>({
    resolver: zodResolver(formschema),

    defaultValues: broadcast
      ? {
          id: broadcast.id,
          name: broadcast.name,
          connectionID: broadcast.connectionID,
          contactsIDs: broadcast.contactsIDs,
          status: broadcast.status,
          sendDate: broadcast.sendDate || '',
          sendTime: broadcast.sendTime || '',
        }
      : {
          id: '',
          name: '',
          connectionID: '',
          contactsIDs: [],
          status: 'send',
          sendDate: '',
          sendTime: '',
        },
  });

  const status = watch('status');

  async function fetchConnections() {
    setLoadingConnections(true);
    try {
      const { data, success } = await getActiveConnections();

      if (!success) {
        toast.error('Erro ao buscar conexões!');
        return;
      }

      setConnections(data);
      setLoadingConnections(false);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao buscar conexões!');
      setLoadingConnections(false);
    }
  }

  async function fetchContacts() {
    setLoadingContacts(true);
    try {
      const { data, success } = await getContacts();
      if (!success) {
        toast.error('Erro ao buscar contatos!');
        return;
      }
      setContacts(data);
      setLoadingContacts(false);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao buscar contatos!');
      setLoadingContacts(false);
    }
  }

  async function formSubmit(values: HandleUpdateFormData) {
    setLoading(true);
    if (broadcast && broadcast.id) {
      const { success, message } = await updateBroadcast(broadcast.id, values);

      if (success) {
        refetch();
        toast.success('Transmissão salva com sucesso!');
        onClose();
        setLoading(false);
        return;
      }

      toast.error((message as string) || 'Erro ao atualizar transmissão');
      setLoading(false);
      return;
    }

    const { success, message } = await createBroadcast(values);

    if (success) {
      refetch();
      toast.success('Transmissão salva com sucesso!');

      onClose();
      return;
    }

    toast.error((message as string) || 'Erro ao criar transmissão');

    setLoading(false);
  }

  useEffect(() => {
    if (open) {
      fetchConnections();
      fetchContacts();
    }
  }, [open]);

  return (
    <div className="w-full p-6 flex flex-row justify-between items-center gap-4 text-black">
      <CustomModal open={open} onClose={() => onClose()}>
        <header className="w-full p-6 flex flex-row justify-between items-center gap-4 text-black">
          <h1 className="text-6">
            {broadcast && broadcast.id ? 'Editar' : 'Cadastrar'}
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
                placeholder=""
                type="text"
                required
                label="Nome da transmissão"
                {...register('name')}
              />

              {loadingContacts && !contacts.length ? (
                <div className=" w-full flex justify-center items-center">
                  <CircularProgress />
                </div>
              ) : (
                <Controller
                  name="contactsIDs"
                  control={control}
                  render={({ field }) => (
                    <>
                      <CustomMultiSelect
                        value={field.value || []}
                        onChange={(
                          event: SelectChangeEvent<
                            string | number | (string | number)[]
                          >,
                        ) => field.onChange(event.target.value)}
                        options={contacts.map((contact) => ({
                          value: contact.id,
                          label: contact.name,
                        }))}
                        label="Selecionar Contatos"
                      />
                      {errors && errors.contactsIDs ? (
                        <p className="text-dangerBase">
                          {errors.contactsIDs.message}
                        </p>
                      ) : null}
                    </>
                  )}
                />
              )}

              {loadingConnections && !connections.length ? (
                <div className=" w-full flex justify-center items-center">
                  <CircularProgress />
                </div>
              ) : (
                <Controller
                  name="connectionID"
                  control={control}
                  render={({ field }) => (
                    <>
                      <CustomSelect
                        value={field.value || ''}
                        onChange={(
                          event: SelectChangeEvent<
                            string | number | (string | number)[]
                          >,
                        ) => field.onChange(event.target.value)}
                        options={connections.map((connection) => ({
                          value: connection.id,
                          label: connection.name,
                        }))}
                        label="Selecionar Conexão"
                      />
                      {errors && errors.connectionID ? (
                        <p className="text-dangerBase">
                          {errors.connectionID.message}
                        </p>
                      ) : null}
                    </>
                  )}
                />
              )}

              <div className="flex items-center">
                <FormControlLabel
                  control={
                    <Switch
                      checked={status === 'schedule'}
                      onChange={(event) => {
                        const newStatus = event.target.checked
                          ? 'schedule'
                          : 'send';
                        setValue('status', newStatus);
                      }}
                    />
                  }
                  label={status === 'schedule' ? 'Agendar' : 'Enviar agora'}
                />
              </div>

              {status === 'schedule' && (
                <>
                  <TextField
                    label="Data de envio"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    className="mt-4"
                    {...register('sendDate')}
                  />

                  <TextField
                    label="Hora de envio"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    className="mt-4"
                    {...register('sendTime')}
                  />
                </>
              )}
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
