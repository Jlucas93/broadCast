import { Button } from '@mui/material';

import { CustomModal } from '..';

interface IProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title = 'Confirmar Exclusão',
  message = 'Você tem certeza de que deseja excluir este item?',
}: IProps) {
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-delete-dialog"
      aria-describedby="confirm-delete-description"
    >
      <div className="p-4">
        <h2 id="confirm-delete-dialog" className="text-xl font-semibold mb-2">
          {title}
        </h2>
        <p id="confirm-delete-description" className="mb-4">
          {message}
        </p>
        <div className="flex gap-2 justify-end">
          <Button variant="outlined" onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            color="error"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </CustomModal>
  );
}
