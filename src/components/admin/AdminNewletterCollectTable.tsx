import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/common/Table/Table';
import React from 'react';

interface TableProps {
    header: string[];
    data: { [key: string]: string; news_id: string }[];
    side: 'left' | 'right';
    onCheckboxChange: (news_id: string, isChecked: boolean) => void;
    selectedIds: Set<string>;
}

function AdminNewletterCollectTable({
    header,
    data,
    side,
    onCheckboxChange,
    selectedIds,
}: TableProps) {
    const columnsForBasicTable = ['title', 'date']; // 기존 테이블에서 사용할 컬럼
    const columnsForExtendedTable = ['title', 'date', 'category', 'species'];

    return (
        <>
            <div className="w-full mt-4">
                <Table className="w-full table-fixed">
                    <TableHeader className="sticky top-0 bg-white shadow-sm">
                        <TableRow>
                            <TableHead className="w-6" />
                            {header.map((title, _) => (
                                <TableHead className="text-center" key={title}>
                                    {title}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                </Table>
            </div>

            <div className="max-h-72 overflow-y-auto w-full">
                <Table className="w-full table-fixed">
                    <TableBody>
                        {data.map(row => (
                            <TableRow key={row.news_id}>
                                <TableCell className="text-center w-6">
                                    <input
                                        key={row.news_id}
                                        type="checkbox"
                                        checked={selectedIds.has(row.news_id)}
                                        onChange={e =>
                                            onCheckboxChange(row.news_id, e.target.checked)
                                        }
                                    />
                                </TableCell>

                                {(side === 'left'
                                    ? columnsForBasicTable
                                    : columnsForExtendedTable
                                ).map((key, _) => (
                                    <TableCell
                                        key={row.news_id + key}
                                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={row[key]}
                                    >
                                        {key === 'title' ? (
                                            <a
                                                href={row.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline"
                                            >
                                                {row[key]}
                                            </a>
                                        ) : (
                                            row[key]
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

export default AdminNewletterCollectTable;
