"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { z } from "zod";

import { CustomModal, CustomButton, CustomInput } from "@/components/ui";
import { IContact } from "@/interfaces";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";

interface IProps {
  open: boolean;
  onClose: () => void;
  isEdit: boolean;
  contact?: IContact;
}

const formschema = z.object({
  email: z.string().or(z.undefined()),
  name: z.string(),
  phone: z.string(),
});

type HandleUpdateFormData = z.infer<typeof formschema>;

export function ContactModal({ open, onClose, isEdit, contact }: IProps) {
  const [, setLoading] = useState(false);

  const { handleSubmit, register } = useForm<HandleUpdateFormData>({
    resolver: zodResolver(formschema),

    defaultValues: async () => {
      if (isEdit && contact) {
        return {
          email: contact?.email || "",
          name: contact.name,
          phone: contact.phone,
        };
      }
      return {
        email: "",
        name: "",
        phone: "",
      };
    },
  });

  async function formSubmit(values: HandleUpdateFormData) {
    setLoading(true);
    console.info(values);
    try {
      if (isEdit) {
        await api.put(`/contacts/${contact?.id}`, values);
      } else {
        await api.post("/auth/singup", values);
      }
      toast.success("Contato salvo com sucesso!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao fazer cadastro");
    }
    setLoading(false);
  }

  return (
    <div className="w-full p-6 flex flex-row justify-between items-center gap-4 text-black">
      <h1 className="text-2xl font-bold">Contatos</h1>

      <CustomModal open={open} onClose={() => onClose()}>
        <header className="w-full p-6 flex flex-row justify-between items-center gap-4 text-black">
          <h1 className="text-6">{isEdit ? "Editar" : "Cadastrar"}</h1>
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
                {...register("name")}
              />

              <CustomInput
                className="w-full"
                placeholder=""
                type="text"
                label="E-mail"
                {...register("phone")}
              />

              <CustomInput
                className="w-full"
                placeholder="(00) 00000-0000"
                type="text"
                label="Telefone"
                required
                {...register("email")}
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
