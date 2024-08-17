import React from 'react';

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectComponentProps {
  options: SelectOption[];
  value: string | number | (string | number)[];
  onChange: (
    event: SelectChangeEvent<string | number | (string | number)[]>,
  ) => void;
  label?: string;
  multiple?: boolean;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  label,
  multiple = false,
}: SelectComponentProps) {
  return (
    <FormControl fullWidth>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        multiple={multiple}
        value={value}
        onChange={onChange}
        label={label}
        displayEmpty
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
