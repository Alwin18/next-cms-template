"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function AppBreadcrumb() {
  const pathname = usePathname();
  
  // Remove trailing slash and split into segments
  const segments = pathname.split("/").filter((segment) => segment !== "");
  
  if (segments.length === 0) {
    return null;
  }

  // Format a segment (e.g., "user" -> "User", "add" -> "Tambah")
  const formatSegment = (segment: string) => {
    // Custom mapping based on user's example
    const mapping: Record<string, string> = {
      dashboard: "Dashboard",
      users: "User", // Mapping "users" to "User" as per user's example
      add: "Tambah", // Mapping "add" to "Tambah" as per user's example
      edit: "Edit",
      create: "Tambah",
    };

    if (mapping[segment.toLowerCase()]) {
      return mapping[segment.toLowerCase()];
    }

    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          
          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{formatSegment(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
