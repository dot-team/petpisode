import { NextResponse } from 'next/server';
import { createDataFromServer, fetchAllDataFromServer } from '@/services/supabaseServerCrud';
import { TableName } from '@/types/supabaseCrudTypes';

export async function GET(_request: Request, { params }: { params: { table: TableName } }) {
    const { table } = params;

    try {
        const data = await fetchAllDataFromServer(table);

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: { params: { table: TableName } }) {
    const { table } = params;
    const payload = await request.json();

    try {
        const data = await createDataFromServer(table, payload);

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
