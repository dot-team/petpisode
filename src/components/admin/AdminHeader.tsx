import { SidebarTrigger } from '@/components/layout/Sidebar/Sidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/common';

import BreadcrumbWithCustomSeparator from './BreadcrumbWithCustomSeparator';

export default function AdminHeader() {
    return (
        <header className="border-b bg-sidebar">
            <div className="flex items-center h-16 gap-4 px-4">
                <div className="flex items-center flex-1 gap-2">
                    <SidebarTrigger />
                    <BreadcrumbWithCustomSeparator />
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>MR</AvatarFallback>
                        </Avatar>
                        <div className="hidden md:block">
                            <div className="text-sm font-medium">Moni Roy</div>
                            <div className="text-xs text-muted-foreground">Admin</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
