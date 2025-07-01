import { useMemo, useState, useEffect } from "react";

export function usePagination({
  totalItems,
  pageSize = 10,
  siblingCount = 1,
  initialPage = 1,
  controlledPage,
  onPageChange,
}: {
  totalItems: number;
  pageSize?: number;
  siblingCount?: number;
  initialPage?: number;
  controlledPage?: number; // <- nuevo
  onPageChange?: (page: number) => void; // <- nuevo
}) {
  const isControlled = controlledPage !== undefined;

  const [internalPage, setInternalPage] = useState(initialPage);
  const currentPage = isControlled ? controlledPage : internalPage;

  const totalPages = Math.ceil(totalItems / pageSize);

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    const range: (number | string)[] = [];

    if (!showLeftDots && showRightDots) {
      const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
      range.push(...leftRange, '...', totalPages);
    } else if (showLeftDots && !showRightDots) {
      const rightRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1
      );
      range.push(1, '...', ...rightRange);
    } else if (showLeftDots && showRightDots) {
      range.push(1, '...');
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        range.push(i);
      }
      range.push('...', totalPages);
    }

    return range;
  }, [currentPage, siblingCount, totalPages]);

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalItems);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    if (isControlled) {
      onPageChange?.(page);
    } else {
      setInternalPage(page);
    }
  };

  // Sync internal state with external changes (optional for fallback mode)
  useEffect(() => {
    if (!isControlled && initialPage !== internalPage) {
      setInternalPage(initialPage);
    }
  }, [initialPage]);

  return {
    currentPage,
    totalPages,
    paginationRange,
    startItem,
    endItem,
    goToPage,
  };
}
