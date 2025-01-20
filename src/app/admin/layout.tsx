'use client';

import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminHeader } from '@/components/AdminHeader';

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
