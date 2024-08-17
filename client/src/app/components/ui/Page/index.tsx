'use client';

import { ComponentProps, ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

type IPageProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export default function Page({
  className,
  title,
  children,
  ...rest
}: IPageProps) {
  return (
    <div
      className={twMerge(
        'w-full h-full flex flex-col items-start justify-start p-4 bg-primary-light',
        className,
      )}
      {...rest}
    >
      {title ? (
        <div className="w-full flex flex-col justify-center items-center gap-2 mt-2 mb-1 phone:mt-6">
          <div className="flex flex-row justify-center items-center gap-7 relative">
            {/* {hasBackButton && handleTo ? (
              <div className="absolute top-2 left-0">
                <ButtonIcon
                  icon="arrowrotateright"
                  onClick={() => handleTo()}
                />
              </div>
            ) : null} */}
            <p className="font-bold text-lg text-center  text-white">{title}</p>
          </div>
        </div>
      ) : null}

      <div className="w-full px-1 py-2 flex flex-col items-center justify-start overflow-hidden">
        {children}
      </div>
    </div>
  );
}
