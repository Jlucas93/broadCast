'use client';

import { useState } from 'react';

import { CustomButton } from '../../components/ui';
import { ConnectionModal } from './ConnectionModal';

export function ConnectionHeader() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full p-6 flex flex-row justify-end items-center gap-4 text-black  ">
      <CustomButton variant="contained" onClick={() => setOpenModal(true)}>
        Cadastrar
      </CustomButton>

      {openModal ? (
        <ConnectionModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          isEdit={false}
        />
      ) : null}
    </div>
  );
}
