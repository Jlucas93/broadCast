import { ButtonHTMLAttributes, useId, ReactNode } from 'react';

interface IButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function ButtonIconSidebar({
  children,
  ...rest
}: IButtonIconProps) {
  const id = useId();

  return (
    <>
      <button
        type="button"
        data-tooltip-id={id}
        className={`flex items-center justify-center rounded-lg text-black 'bg-primary-light'
         transition-colors`}
        {...rest}
      >
        {children}
      </button>
    </>
  );
}
