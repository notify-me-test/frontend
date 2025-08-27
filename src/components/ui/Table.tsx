import React from "react";
import styled from "styled-components";

export interface TableProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isHeader?: boolean;
}

const StyledTable = styled.table<TableProps>`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  ${(props) => props.className && props.className}
`;

const StyledTh = styled.th<TableCellProps>`
  background: #f8f9fa;
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;

  ${(props) => props.className && props.className}
`;

const StyledTd = styled.td<TableCellProps>`
  padding: 12px;
  border: 1px solid #ddd;

  ${(props) => props.className && props.className}
`;

const StyledTr = styled.tr<TableRowProps>`
  ${(props) => props.className && props.className}
`;

const StyledThead = styled.thead<TableHeaderProps>`
  ${(props) => props.className && props.className}
`;

const StyledTbody = styled.tbody<TableBodyProps>`
  ${(props) => props.className && props.className}
`;

const Table: React.FC<TableProps> = ({
  children,
  className,
  style,
  id,
  ...rest
}) => {
  return (
    <StyledTable
      className={`table ${className || ""}`}
      style={style}
      id={id}
      {...rest}
    >
      {children}
    </StyledTable>
  );
};

const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <StyledThead
      className={`table__header ${className || ""}`}
      style={style}
      {...rest}
    >
      {children}
    </StyledThead>
  );
};

const TableBody: React.FC<TableBodyProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <StyledTbody
      className={`table__body ${className || ""}`}
      style={style}
      {...rest}
    >
      {children}
    </StyledTbody>
  );
};

const TableRow: React.FC<TableRowProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <StyledTr
      className={`table__row ${className || ""}`}
      style={style}
      {...rest}
    >
      {children}
    </StyledTr>
  );
};

const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  style,
  isHeader = false,
  ...rest
}) => {
  if (isHeader) {
    return (
      <StyledTh
        className={`table__cell table__cell--header ${className || ""}`}
        style={style}
        {...rest}
      >
        {children}
      </StyledTh>
    );
  }

  return (
    <StyledTd
      className={`table__cell ${className || ""}`}
      style={style}
      {...rest}
    >
      {children}
    </StyledTd>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
export default Table;
