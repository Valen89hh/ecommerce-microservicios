import { ChevronLeft, ChevronRight } from "lucide-react";
import SmallText from "../../../components/texts/SmallText";
import { usePagination } from "../hooks/usePagination";

const Pagination = () => {
  const {
    currentPage,
    paginationRange,
    startItem,
    endItem,
    totalPages,
    goToPage,
  } = usePagination({
    totalItems: 42,
    pageSize: 20,
  });

  return (
    <div className="w-full flex items-center justify-between">
      <SmallText>
        Showing {startItem} to {endItem} of 42 results
      </SmallText>

      <ul className="flex items-center gap-1">
        <li>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="cursor-pointer w-8 h-8 inline-flex items-center justify-center hover:bg-background hover:dark:bg-dark-background rounded-xs border bg-card dark:bg-dark-card border-border dark:border-dark-border disabled:opacity-50"
          >
            <ChevronLeft size={20} className="text-muted dark:text-dark-muted" />
          </button>
        </li>

        {paginationRange.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <button
                className="w-8 h-8 inline-flex items-center justify-center rounded-xs border bg-card dark:bg-dark-card border-border dark:border-dark-border cursor-default"
              >
                <SmallText className="text-muted dark:text-dark-muted leading-0">...</SmallText>
              </button>
            ) : (
              <button
                onClick={() => goToPage(Number(page))}
                className={`w-8 h-8 inline-flex items-center justify-center rounded-xs border
                ${
                  page === currentPage
                    ? "bg-primary dark:bg-dark-primary border-primary dark:border-dark-primary"
                    : "bg-card dark:bg-dark-card border-border dark:border-dark-border hover:bg-background hover:dark:bg-dark-background"
                }`}
              >
                <SmallText
                  className={`leading-0 ${
                    page === currentPage ? "text-white" : "text-muted dark:text-dark-muted"
                  }`}
                >
                  {page}
                </SmallText>
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="cursor-pointer w-8 h-8 inline-flex items-center justify-center hover:bg-background hover:dark:bg-dark-background rounded-xs border bg-card dark:bg-dark-card border-border dark:border-dark-border disabled:opacity-50"
          >
            <ChevronRight size={20} className="text-muted dark:text-dark-muted" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
