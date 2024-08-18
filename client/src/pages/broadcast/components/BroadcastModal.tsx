'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { z } from 'zod';

import {
  CustomModal,
  CustomButton,
  CustomInput,
  CustomSelect,
} from '@/components/ui';
import { IBroadcast } from '@/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SelectChangeEvent,
  Switch,
  FormControlLabel,
  TextField,
} from '@mui/material';

interface IProps {
  open: boolean;
  onClose: () => void;
  isEdit: boolean;
  broadcast?: IBroadcast;
}

const data = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Alice Johnson' },
];

const connections = [
  { id: '1', name: 'Conexão 1', active: true },
  { id: '2', name: 'Conexão 2', active: true },
  { id: '3', name: 'Conexão 3', active: false },
  { id: '4', name: 'Conexão 4', active: false },
  { id: '5', name: 'Conexão 5', active: false },
];

const formschema = z.object({
  id: z.string().or(z.undefined()),
  name: z.string(),
  status: z.string(),
  sendDate: z.string().optional(),
  sendTime: z.string().optional(),
  contactsIDs: z.array(z.string()),
  connectionID: z.string(),
});

type HandleUpdateFormData = z.infer<typeof formschema>;

export function BroadcastModal({ open, onClose, isEdit, broadcast }: IProps) {
  const [, setLoading] = useState(false);

  const { handleSubmit, register, control, watch, setValue } =
    useForm<HandleUpdateFormData>({
      resolver: zodResolver(formschema),
      defaultValues: async () => {
        console.info(broadcast);
        if (isEdit && broadcast) {
          return {
            id: broadcast.id,
            name: broadcast.name,
            connectionID: broadcast.connectionID,
            contactsIDs: broadcast.contactsIDs,
            status: broadcast.status,
            sendDate: broadcast.sendDate,
            sendTime: broadcast.sendTime,
          };
        }
        return {
          name: '',
          connectionID: '',
          contactsIDs: [],
          status: 'send',
          sendDate: '',
          sendTime: '',
        };
      },
    });

  const status = watch('status');

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
                label="Nome da transmissão"
                {...register('name')}
              />

              <Controller
                name="contactsIDs"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    multiple
                    value={field.value || []}
                    onChange={(
                      event: SelectChangeEvent<
                        string | number | (string | number)[]
                      >,
                    ) => field.onChange(event.target.value)}
                    options={data.map((contact) => ({
                      value: contact.id,
                      label: contact.name,
                    }))}
                    label="Selecionar Contatos"
                  />
                )}
              />

              <Controller
                name="connectionID"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    value={field.value || ''}
                    onChange={(
                      event: SelectChangeEvent<
                        string | number | (string | number)[]
                      >,
                    ) => {
                      const selectedConnection = connections.find(
                        (conn) => conn.id === event.target.value,
                      );
                      field.onChange(selectedConnection || null);
                    }}
                    options={connections.map((connection) => ({
                      value: connection.id,
                      label: connection.name,
                    }))}
                    label="Selecionar Conexão"
                  />
                )}
              />

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
                  label={status === 'schedule' ? 'Agendar' : 'Enviar'}
                />
              </div>

              {status === 'schedule' && (
                <>
                  <TextField
                    label="Data de envio"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register('sendDate')}
                    fullWidth
                    className="mt-4"
                  />
                  <TextField
                    label="Hora de envio"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    {...register('sendTime')}
                    fullWidth
                    className="mt-4"
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
