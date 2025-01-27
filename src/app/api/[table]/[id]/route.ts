import {
    deleteDataByIdFromServer,
    fetchDataByIdFromServer,
    updateDataByIdFromServer,
} from '@/services/supabaseServerCrud';
import { TableName } from '@/types/supabaseCrudTypes';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { table: TableName; id: string } },
) {
    const { table, id } = params;
    const { searchParams } = new URL(request.url);
    const column = searchParams.get('column');

    try {
        if (!column) throw new Error('column이 필요합니다');

        const data = await fetchDataByIdFromServer(table, column, id);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { table: TableName; id: string } },
) {
    const { table, id } = params;
    const { searchParams } = new URL(request.url);
    const column = searchParams.get('column');
    const payload = await request.json();

    try {
        if (!column) throw new Error('column이 필요합니다');

        const data = await updateDataByIdFromServer(table, column, id, payload);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { table: TableName; id: string } },
) {
    const { table, id } = params;
    const { searchParams } = new URL(request.url);
    const column = searchParams.get('column');

    try {
        if (!column) throw new Error('column이 필요합니다');

        const data = await deleteDataByIdFromServer(table, column, id);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
