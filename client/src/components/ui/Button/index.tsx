import React, { forwardRef } from 'react';

import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface IProps extends ButtonProps {
  loading?: boolean;
}

const CustomButton = forwardRef<HTMLButtonElement, IProps>(
  ({ loading, children, ...props }, ref) => {
    return (
      <Button {...props} ref={ref} disabled={loading || props.disabled}>
        {loading ? <CircularProgress size={24} /> : children}
      </Button>
    );
  },
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;
