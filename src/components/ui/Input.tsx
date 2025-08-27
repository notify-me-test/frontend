import React from "react";
import styled from "styled-components";

export interface InputProps {
  type?: "text" | "number";
  value?: string | number;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  id?: string;
}

const StyledInput = styled.input<InputProps>`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
  transition: border-color 0.15s ease-in-out;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &:disabled {
    background-color: #e9ecef;
    cursor: not-allowed;
    opacity: 0.65;
  }

  ${(props) => props.className && props.className}
`;

const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  placeholder,
  onChange,
  onBlur,
  disabled = false,
  className,
  style,
  name,
  id,
  ...rest
}) => {
  return (
    <StyledInput
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      className={`input ${className || ""}`}
      style={style}
      name={name}
      id={id}
      {...rest}
    />
  );
};

export default Input;
