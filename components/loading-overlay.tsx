"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { DatabaseIcon, Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isLoading: boolean;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: "spinner" | "ring-icon";
}

export function LoadingOverlay({
  isLoading,
  title = "Memuat data",
  description = "Mohon tunggu, jangan tutup halaman ini.",
  icon = <DatabaseIcon className="h-5 w-5 text-primary" />,
  variant = "ring-icon",
}: LoadingOverlayProps) {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      aria-live="polite"
      className={cn(
        "fixed inset-0 z-9999",
        "flex items-center justify-center",
        "bg-background/70 backdrop-blur-[2px]",
        "pointer-events-auto"
      )}
    >
      {/* Card */}
      <div
        className={cn(
          "flex flex-col items-center gap-4",
          "bg-card border border-border",
          "rounded-xl px-10 py-8",
          "min-w-[220px] max-w-[300px]",
          "animate-in fade-in zoom-in-95 duration-200"
        )}
      >
        {/* Spinner area */}
        {variant === "spinner" ? (
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        ) : (
          <div className="relative flex h-14 w-14 items-center justify-center">
            <div
              className={cn(
                "absolute inset-0 rounded-full",
                "border-[3px] border-border",
                "border-t-primary animate-spin"
              )}
              style={{ animationDuration: "0.9s" }}
            />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              {icon}
            </div>
          </div>
        )}

        {/* Teks */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}