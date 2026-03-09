"use client";

import { Pagination } from "flowbite-react";

type AppPaginationProps = {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export default function AppPagination({
  currentPage,
  pageCount,
  onPageChange,
}: AppPaginationProps) {
  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={(e) => {
        onPageChange(e);
      }}
      totalPages={pageCount}
      layout="pagination"
      showIcons={true}
      className="text-blue-500 mb-5"
    />
  );
}
