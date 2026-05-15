"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Menu,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { SidebarNav } from "./sidebar-nav";
import { AppBreadcrumb } from "@/components/app-breadcrumb";

function SidebarFooter({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="px-3 pb-4">
      <Separator className="mb-3" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              "text-sidebar-foreground/70"
            )}
          >
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                AD
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium text-sidebar-foreground">
                  Admin
                </span>
                <span className="text-xs text-muted-foreground">
                  admin@example.com
                </span>
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5">
        {collapsed ? (
          <Link
            href="/dashboard"
            className="flex h-8 w-8 mx-auto items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm"
          >
            N
          </Link>
        ) : (
          <>
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                N
              </div>
              <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
                NextCMS
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-sidebar-foreground/50 hover:text-sidebar-foreground"
              onClick={() => setCollapsed(true)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {collapsed && (
        <div className="flex justify-center pb-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-sidebar-foreground/50 hover:text-sidebar-foreground"
            onClick={() => setCollapsed(false)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        <SidebarNav collapsed={collapsed} />
      </div>

      {/* Footer */}
      <SidebarFooter collapsed={collapsed} />
    </aside>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-sidebar">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              N
            </div>
            <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
              NextCMS
            </span>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-2">
            <SidebarNav collapsed={false} />
          </div>

          {/* Footer */}
          <SidebarFooter collapsed={false} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <MobileSidebar />
      <div className="flex-1 px-4">
        <AppBreadcrumb />
      </div>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-4.5 w-4.5" />
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
          3
        </span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                AD
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>Admin</span>
              <span className="text-xs font-normal text-muted-foreground">
                admin@example.com
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}