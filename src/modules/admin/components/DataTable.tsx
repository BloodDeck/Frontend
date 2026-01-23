import React from 'react';

interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
    align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    onRowClick?: (row: T) => void;
    actions?: (row: T) => React.ReactNode;
}

function DataTable<T extends { id: string | number }>({ columns, data, onRowClick, actions }: DataTableProps<T>) {
    return (
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
                <table className="hidden md:table w-full text-left text-sm">
                    <thead>
                        <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                            {columns.map((col, index) => (
                                <th key={index} className={`px-6 py-4 font-medium text-${col.align || 'left'} ${col.className || ''}`}>
                                    {col.header}
                                </th>
                            ))}
                            {actions && <th className="px-6 py-4 font-medium text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data.map((row) => (
                            <tr
                                key={row.id}
                                onClick={() => onRowClick && onRowClick(row)}
                                className={`hover:bg-white/5 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                            >
                                {columns.map((col, index) => {
                                    const content = typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor];
                                    return (
                                        <td key={index} className={`px-6 py-4 text-gray-300 ${col.align === 'right' ? 'text-right' : ''} ${col.className || ''}`}>
                                            {content as React.ReactNode}
                                        </td>
                                    );
                                })}
                                {actions && (
                                    <td className="px-6 py-4 text-right">
                                        {actions(row)}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Mobile Card View */}
                <div className="md:hidden flex flex-col divide-y divide-white/5">
                    {data.map((row) => (
                        <div key={row.id} className="p-4 flex flex-col gap-3" onClick={() => onRowClick && onRowClick(row)}>
                            {columns.map((col, index) => {
                                const content = typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor];
                                return (
                                    <div key={index} className="flex justify-between items-start gap-4">
                                        <span className="text-xs text-gray-500 font-medium uppercase shrink-0 mt-0.5">{col.header}</span>
                                        <div className="text-sm text-gray-200 text-right break-words max-w-[70%]">
                                            {content as React.ReactNode}
                                        </div>
                                    </div>
                                );
                            })}
                            {actions && (
                                <div className="flex justify-end pt-2 border-t border-white/5 mt-2">
                                    {actions(row)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4 sm:gap-0">
                <span>Showing {data.length} entries</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 disabled:opacity-50 transition-colors">Previous</button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded shadow-lg shadow-blue-900/20">1</button>
                    <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors">2</button>
                    <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors">Next</button>
                </div>
            </div>
        </div>
    );
}

export default DataTable;
