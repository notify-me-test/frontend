import React from "react";
import styled from "styled-components";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const StyledCard = styled.div<CardProps>`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: inherit;

  ${(props) => props.className && props.className}
`;

const Card: React.FC<CardProps> = ({
  children,
  className,
  style,
  id,
  ...rest
}) => {
  return (
    <StyledCard
      className={`card ${className || ""}`}
      style={style}
      id={id}
      {...rest}
    >
      {children}
    </StyledCard>
  );
};

export default Card;
