"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Boxes, Gauge, GitCommitHorizontal, Settings, Truck, Warehouse, Wrench } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar"

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/products", label: "Products", icon: Boxes },
]

const operationsLinks = [
    { href: "/receipts", label: "Receipts", icon: Warehouse },
    { href: "/deliveries", label: "Delivery Orders", icon: Truck },
    { href: "/transfers", label: "Internal Transfers", icon: GitCommitHorizontal },
    { href: "/adjustments", label: "Inventory Adjustments", icon: Wrench },
]

export function DashboardNav() {
  const pathname = usePathname()

  const isOperationsActive = operationsLinks.some(link => pathname.startsWith(link.href))

  return (
    <SidebarMenu>
        {navLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
                <SidebarMenuButton asChild isActive={pathname === link.href}>
                    <Link href={link.href}>
                        <link.icon />
                        <span>{link.label}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        ))}

        <SidebarMenuItem>
            <Collapsible>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={isOperationsActive}>
                        <Truck />
                        <span>Operations</span>
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {operationsLinks.map((link) => (
                            <SidebarMenuSubItem key={link.href}>
                                <SidebarMenuSubButton asChild isActive={pathname === link.href}>
                                    <Link href={link.href}>
                                        <link.icon />
                                        <span>{link.label}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>

        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/settings")}>
                <Link href="/settings">
                    <Settings />
                    <span>Settings</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
  )
}
