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
      className={`flex justify-center items-center gap-x-[0.625rem] p-2 rounded-lg ${className} custom-button`}
      type={type}
      onClick={onClick}
    >
      {icon && <img src={icon} className={iconClassName} alt="Legend Group" />}
      <p
        className={`${textClassName} font-bold`}
      >
        {children}
      </p>
    </button>
  );
};

export default CustomButton;
