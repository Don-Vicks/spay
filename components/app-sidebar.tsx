import {GroupIcon, ChevronUp, Home, Search, Settings, User2, Book, CheckCheck} from "lucide-react"

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {getUser, signOut} from "@/actions/get-user";
import Link from "next/link";
import Form from "next/form";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Address Book",
        url: "/dashboard/addresses",
        icon: Book,
    },
    {
        title: "Payrolls",
        url: "/dashboard/payroll",
        icon: GroupIcon,
    },
    {
        title: "Payments",
        url: "/dashboard/payments",
        icon: CheckCheck,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export async function AppSidebar() {
    const user = await getUser();
    return (
        <Sidebar variant={'floating'} collapsible={'icon'}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Solara Pay</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> {user?.email}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="#">Home</a>
                                </SidebarMenuButton>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Form action={async () => {
                                        'use server'
                                        await signOut();
                                    }}>
                                        <button type="submit">Sign out</button>
                                    </Form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
