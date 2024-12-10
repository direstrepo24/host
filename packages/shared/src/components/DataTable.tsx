import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  showPagination?: boolean;
}

export function DataTable<T extends object>({
  data,
  columns,
  showPagination = true,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full p-8 bg-gray-100">
      {/* Search Filter */}
      <div className="mb-6">
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full max-w-xs p-4 bg-gray-100 rounded-xl shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          placeholder="Search all columns..."
        />
      </div>

      {/* Table */}
      <div className="rounded-xl shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] bg-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-200">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " ↑",
                          desc: " ↓",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-white/40 transition-colors duration-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-sm text-gray-600"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-xl bg-gray-100 shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] text-gray-600 hover:shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-gray-100 shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] text-gray-600 hover:shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-gray-100 shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] text-gray-600 hover:shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-gray-100 shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] text-gray-600 hover:shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <select
              className="px-4 py-2 rounded-xl bg-gray-100 shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
