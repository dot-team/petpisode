import { ChevronDown, ChevronRight } from 'lucide-react';
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarMenuButton,
} from '@/components/layout';
import { ADMIN_NAV_LIST } from '@/constants';

export default function AdminSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>Petpisode</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {ADMIN_NAV_LIST.map(item => (
                                <Collapsible
                                    key={item.text}
                                    defaultOpen={item.text === '뉴스레터'}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton asChild>
                                                <a href={item.link}>
                                                    {item.icon && <item.icon />}
                                                    <span>{item.text}</span>
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
                                                        <SidebarMenuSubItem key={subItem.text}>
                                                            <SidebarMenuSubButton
                                                                href={subItem.link}
                                                            >
                                                                {subItem.text}
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
