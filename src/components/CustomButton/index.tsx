import React, { FC } from 'react';

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
  background?: string;
  textClassName?: string;
  textColor?: string;
  icon?: string;
  iconClassName?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const CustomButton: FC<CustomButtonProps> = ({
  children,
  className = '',
  textClassName = '',
  icon,
  iconClassName = '',
  type = 'button',
  onClick,
}) => {
  return (
    <button
      className={`flex justify-center items-center gap-x-[0.625rem] p-2 bg-slate-100 rounded-lg px-4 py-2 border-2 border-fg-default text-fg-default shadow-2xl ${className} `}
      type={type}
      onClick={onClick}
    >
      {icon && <img src={icon} className={iconClassName} alt="Remitano" />}
      <p className={`${textClassName} font-bold`}>{children}</p>
    </button>
  );
};

export default CustomButton;
