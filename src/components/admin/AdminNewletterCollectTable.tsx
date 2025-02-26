import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/common/Table/Table';
import { PreNewsItem } from '@/hooks/usePreNewsItem';
import React from 'react';

interface TableProps {
    header: string[];
    data: PreNewsItem[];
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
    const columnsForBasicTable = ['title', 'pubDate']; // 기존 테이블에서 사용할 컬럼
    const columnsForExtendedTable = ['title', 'pubDate', 'category', 'species'];
    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월(0부터 시작) 보정
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}.${month}.${day}. ${hours}:${minutes}`;
    };

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
                            <TableRow key={row.pre_news_id}>
                                <TableCell className="text-center w-6">
                                    <input
                                        key={row.pre_news_id}
                                        type="checkbox"
                                        checked={selectedIds.has(row.pre_news_id)}
                                        onChange={e =>
                                            onCheckboxChange(row.pre_news_id, e.target.checked)
                                        }
                                    />
                                </TableCell>

                                {(side === 'left'
                                    ? columnsForBasicTable
                                    : columnsForExtendedTable
                                ).map(key => {
                                    const typedKey = key as keyof PreNewsItem;
                                    let cellContent;
                                    let titleContent;

                                    if (key === 'title') {
                                        cellContent = (
                                            <a
                                                href={row.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline"
                                            >
                                                {row[typedKey]}
                                            </a>
                                        );
                                        titleContent = String(row[typedKey]);
                                    } else if (key === 'pubDate') {
                                        const formattedDate = formatDate(row[typedKey]);
                                        cellContent = formattedDate;
                                        titleContent = formattedDate;
                                    } else {
                                        cellContent = String(row[typedKey]);
                                        titleContent = cellContent;
                                    }
                                    return (
                                        <TableCell
                                            key={row.pre_news_id + key}
                                            className="overflow-hidden text-ellipsis whitespace-nowrap"
                                            title={titleContent}
                                        >
                                            {cellContent}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

export default AdminNewletterCollectTable;
