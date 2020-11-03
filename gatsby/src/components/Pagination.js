import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
  margin: 2rem 0;
  a {
    font-size: 2.3rem;
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

export default function pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;

  return (
    <PaginationStyles>
      {/* disabled actually does not work with links (only BTN) but we can do it with some css */}
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        ← Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, index) => (
        <Link
          className={currentPage === 1 && index === 0 ? 'current' : ''}
          to={`${base}/${index > 0 ? index + 1 : ''}`}
        >
          {index + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next →
      </Link>
    </PaginationStyles>
  );
}
