import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from './ui/sidebar';
import { BreadcrumbWithCustomSeparator } from './BreadcrumbWithCustomSeparator';

export function AdminHeader() {
    return (
        <header className="border-b bg-sidebar">
            <div className="flex h-16 items-center px-4 gap-4">
                <div className="flex items-center gap-2 flex-1">
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
