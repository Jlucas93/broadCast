'use client';
import { useState } from 'react';
import { CustomButton } from '../../components/ui';
import { ConactModal } from './ConactModal';

export function HederContact() {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {};

  const handleConfirm = () => {
    console.log('Confirmed!');
  };

  return (
    <div className="w-full p-6 flex flex-row justify-end items-center gap-4 text-black  ">
      <CustomButton variant="contained" onClick={() => setOpenModal(true)}>
        Cadastrar
      </CustomButton>

      {openModal ? (
        <ConactModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          isEdit
        />
      ) : null}
    </div>
  );
}
