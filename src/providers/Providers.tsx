'use client';

import { ReactNode } from 'react';
import TanstackQueryClientProvider from '@/providers/tanstackQuery/QueryClientProvider';

export default function Providers({ children }: { children: ReactNode }) {
    return <TanstackQueryClientProvider>{children}</TanstackQueryClientProvider>;
}
