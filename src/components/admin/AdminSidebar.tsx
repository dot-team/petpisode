import {
    LayoutDashboard,
    User,
    Newspaper,
    BookOpen,
    Speech,
    TriangleAlert,
    Settings,
    ChevronDown,
    ChevronRight,
} from 'lucide-react';
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    Collapsible,
    SidebarMenuItem,
    CollapsibleTrigger,
    SidebarMenuButton,
    CollapsibleContent,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from '../ui';

// Menu items.
const items = [
    {
        title: '대시보드',
        url: '#',
        icon: LayoutDashboard,
    },
    {
        title: '회원',
        url: '#',
        icon: User,
    },
    {
        title: '뉴스레터',
        url: '#',
        icon: Newspaper,
        subItems: [
            { title: '목록', url: '#' },
            { title: '수집', url: '#' },
            { title: '게시 및 발송', url: '#' },
        ],
    },
    {
        title: '사연 제보',
        url: '#',
        icon: BookOpen,
    },
    {
        title: '커뮤니티',
        url: '#',
        icon: Speech,
    },
    {
        title: '신고',
        url: '#',
        icon: TriangleAlert,
    },
    {
        title: '설정',
        url: '#',
        icon: Settings,
    },
];

export default function AdminSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>Petpisode</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map(item => (
                                <Collapsible
                                    key={item.title}
                                    defaultOpen={item.title === '뉴스레터'}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton asChild>
                                                <a href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                    {item.subItems ? (
                                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                                    ) : (
                                                        <ChevronRight className="ml-auto" />
                                                    )}
                                                </a>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        {item.subItems && (
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.subItems.map(subItem => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton
                                                                href={subItem.url}
                                                            >
                                                                {subItem.title}
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        )}
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
