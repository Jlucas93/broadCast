// src/components/SwitchComponent.tsx
import React from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

interface SwitchComponentProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export default function CustomSwitch({
  checked,
  onChange,
  label,
}: SwitchComponentProps) {
  return (
    <div className="flex items-center">
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={onChange} color="primary" />
        }
        label={label || "Ativar"}
      />
    </div>
  );
}
