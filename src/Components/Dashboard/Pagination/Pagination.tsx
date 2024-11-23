import { Dispatch, SetStateAction } from "react";
import ReactPaginate from "react-paginate";

export default function PaginatedItems({
  itemsPerPage,
  total,
  setPage,
}: {
  itemsPerPage: number;
  total: number;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const pageCount = total / itemsPerPage;

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-end m-0"
        pageLinkClassName="mx-2 text-black px-3 rounded-full py-1 rounded-circle"
        activeLinkClassName="bg-primary-400  text-white"
      />
    </>
  );
}
