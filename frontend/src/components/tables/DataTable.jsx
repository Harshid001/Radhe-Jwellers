import React from 'react';
import { ChevronLeft, ChevronRight, Search, FileDown } from 'lucide-react';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const DataTable = ({ 
  columns, 
  data, 
  loading, 
  total, 
  page, 
  pages, 
  onPageChange, 
  onSearch, 
  searchPlaceholder = "Search...",
  actions
}) => {
  return (
    <div className="card p-0 overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-6 border-b border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-mutedText" />
          <input 
            type="text" 
            placeholder={searchPlaceholder}
            className="w-full pl-11 pr-4 py-2.5 bg-secondary-bg border-transparent focus:bg-white focus:border-primary-gold rounded-xl text-sm outline-none transition-all"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          {actions}
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary-bg/50">
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-4 text-xs font-bold text-secondary-mutedText uppercase tracking-widest border-b border-border">
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-4 text-xs font-bold text-secondary-mutedText uppercase tracking-widest border-b border-border text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-20 text-center">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-20 text-center text-secondary-mutedText">
                  No records found matching your criteria.
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors border-b border-border/50 last:border-0 group">
                  {columns.map((col, j) => (
                    <td key={j} className="px-6 py-4 text-sm text-secondary-darkText">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                     {/* Action buttons passed from parent */}
                     {row.actions && row.actions(row)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="p-6 border-t border-border flex items-center justify-between">
          <p className="text-sm text-secondary-mutedText">
            Showing <span className="font-bold text-secondary-darkText">{(page - 1) * 10 + 1}</span> to <span className="font-bold text-secondary-darkText">{Math.min(page * 10, total)}</span> of <span className="font-bold text-secondary-darkText">{total}</span> results
          </p>
          <div className="flex items-center space-x-2">
            <button 
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              className="p-2 rounded-lg border border-border hover:bg-gray-50 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                  page === i + 1 
                  ? 'bg-primary-gold text-white shadow-md' 
                  : 'text-secondary-mutedText hover:bg-gray-50 border border-transparent'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              disabled={page === pages}
              onClick={() => onPageChange(page + 1)}
              className="p-2 rounded-lg border border-border hover:bg-gray-50 disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
