import React from "react";
import styled from "styled-components";
import { Colors } from "../../../types/baseTypes";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 20px 0;
`;

const PageButton = styled.button<{ isActive: boolean }>`
  padding: 8px 12px;
  margin: 0 4px;
  background-color: ${(props) => (props.isActive ? `${Colors.primaryBackground}` : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : `${Colors.primaryBackground}`)};
  border: 1px solid ${Colors.primaryBackground};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-weight: bold;

  &:hover {
    background-color: ${Colors.primaryBackground};
    color: #fff;
  }
`;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationContainer>
      {pageNumbers.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          isActive={pageNumber === currentPage}
        >
          {pageNumber}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
