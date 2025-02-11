'use client';

import TanstackQueryClientProvider from '@/providers/tanstackQuery/QueryClientProvider';
import { ReactNode } from 'node_modules/@types/react';

export default function Providers({ children }: { children: ReactNode }) {
    return <TanstackQueryClientProvider>{children}</TanstackQueryClientProvider>;
}
