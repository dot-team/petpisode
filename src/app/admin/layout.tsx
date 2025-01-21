'use client';

import React from 'react';
import { SidebarProvider, AdminSidebar, AdminHeader } from '@/components';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <SidebarProvider>
                <AdminSidebar />

                <div className="flex-1 flex flex-col">
                    <AdminHeader />
                    <main className="flex-1 overflow-auto">{children}</main>
                </div>
            </SidebarProvider>
        </div>
    );
}
