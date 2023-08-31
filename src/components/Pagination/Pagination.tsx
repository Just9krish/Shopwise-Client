import { Dispatch, SetStateAction } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { PRODUCT_PER_PAGE } from "../../constant";

type PaginationProps = {
  page: number;
  totalProducts: number;
  setPage: Dispatch<SetStateAction<number>>;
  handlePage: (page: number) => void;
};

export default function Pagination({
  page,
  setPage,
  handlePage,
  totalProducts,
}: PaginationProps) {
  const totalPage = Math.ceil(totalProducts / PRODUCT_PER_PAGE);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={(e) => handlePage(page < totalPage ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * PRODUCT_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * PRODUCT_PER_PAGE < totalProducts
                ? page * PRODUCT_PER_PAGE
                : totalProducts}
            </span>{" "}
            of <span className="font-medium">{totalProducts}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <BsChevronLeft className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({
              length: totalPage,
            }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePage(idx + 1)}
                onKeyDown={() => handlePage(idx + 1)}
                aria-current="page"
                className={`relative cursor-pointer z-10 inline-flex items-center ${
                  idx + 1 === page
                    ? "bg-orange-500 text-white"
                    : "text-gray-400"
                }  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {idx + 1}
              </button>
            ))}

            <div
              onClick={(e) => handlePage(page < totalPage ? page + 1 : page)}
              className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <BsChevronRight className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}