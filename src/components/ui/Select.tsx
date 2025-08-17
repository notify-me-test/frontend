import React from 'react';
import styled from 'styled-components';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  id?: string;
}

const StyledSelect = styled.select`
  display: block;
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  transition: border-color 0.15s ease-in-out;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  &:hover {
    border-color: #007bff;
  }
  
  /* Custom arrow styling */
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 32px;
  
  /* Option styling */
  option {
    padding: 4px 8px;
    font-size: inherit;
  }
  
  ${props => props.className && props.className}
`;

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  className,
  style,
  name,
  id,
  ...rest
}) => {
  return (
    <StyledSelect
      value={String(value || '')}
      onChange={onChange}
      className={`select ${className || ''}`}
      style={style}
      name={name}
      id={id}
      role="combobox"
      {...rest}
    >
      {options.map((option, index) => (
        <option key={index} value={String(option.value)}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
