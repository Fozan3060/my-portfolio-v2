'use client';

import React, { ReactNode } from 'react';

type ButtonProps = {
  label?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children?: ReactNode
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  icon,
  className = '',
  type = 'button',
  disabled = false,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
      disabled={disabled}
    >
      {icon}
      {label || children}
    </button>
  );
};

export default Button;
