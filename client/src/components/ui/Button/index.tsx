import React, { forwardRef } from "react";

import Button, { ButtonProps } from "@mui/material/Button";

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <Button {...props} ref={ref} />;
  },
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
