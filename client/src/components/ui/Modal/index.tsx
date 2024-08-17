import { ReactNode } from "react";

import { Dialog, DialogProps } from "@mui/material";

interface IProps extends DialogProps {
  children: ReactNode;
}

export default function CustomModal({ children, ...rest }: IProps) {
  return (
    <Dialog
      {...rest}
      PaperProps={{
        sx: {
          borderRadius: "0.375rem",
          overflow: "hidden",
          maxWidth: "95vw",
          minWidth: "30vw",
          height: "auto",
          zIndex: 1300,
        },
      }}
      className="bg-primary-light"
    >
      {children}
    </Dialog>
  );
}
