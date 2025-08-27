import React from "react";
import styled from "styled-components";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
  style?: React.CSSProperties;
}

const StyledButton = styled.button<ButtonProps>`
  background: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-family: inherit;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }

  ${(props) => props.className && props.className}
`;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  className,
  style,
  ...rest
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`button ${className || ""}`}
      style={style}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
