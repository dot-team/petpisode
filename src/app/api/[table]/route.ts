import { NextRequest, NextResponse } from 'next/server';
import {
    createDataFromServer,
    createMultipleDataFromServer,
    deleteAllDataFromServer,
    fetchAllDataFromServer,
} from '@/services/supabaseServerCrud';
import { TableName } from '@/types/supabaseCrudTypes';

export async function GET(_request: Request, { params }: { params: { table: TableName } }) {
    const { table } = await params;

    try {
        const data = await fetchAllDataFromServer(table);

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: { params: { table: TableName } }) {
    const { table } = await params;
    const payload = await request.json();

    try {
        let data;
        if (payload.length > 1) {
            data = await createMultipleDataFromServer(table, payload);
        } else {
            data = await createDataFromServer(table, payload);
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: { table: string } }) {
    const { table } = await context.params;

    try {
        await deleteAllDataFromServer(table as TableName);
        return new NextResponse(null, { status: 204 });
    } catch (err) {
        console.error('삭제 중 오류 발생:', err);
        return new NextResponse(JSON.stringify({ error: (err as Error).message }), { status: 500 });
    }
}
