import {
    deleteDataByIdFromServer,
    fetchDataByIdFromServer,
    updateDataByIdFromServer,
} from '@/services/supabaseServerCrud';
import { TableColumn, TableName } from '@/types/supabaseCrudTypes';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { table: TableName; id: string } },
) {
    const { table, id } = await params;
    const { searchParams } = new URL(request.url);
    const column = searchParams.get('column') as TableColumn<typeof table>;

    try {
        const data = await fetchDataByIdFromServer(table, column, id);

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { table: TableName; id: string } },
) {
    const { table, id } = await params;
    const { searchParams } = new URL(request.url);
    const column = searchParams.get('column') as TableColumn<typeof table>;
    const payload = await request.json();

    try {
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
    const { table, id } = await params;
    const { searchParams } = new URL(request.url);
    const column = searchParams.get('column') as TableColumn<typeof table>;

    try {
        await deleteDataByIdFromServer(table, column, id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
