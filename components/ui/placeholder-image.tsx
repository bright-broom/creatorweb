"use client"

import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface PlaceholderImageProps extends HTMLAttributes<HTMLDivElement> {
  width?: number
  height?: number
  iconType?: "photo" | "document" | "video" | "music" | "user" | "default"
  text?: string
  className?: string
}

export function PlaceholderImage({
  width = 300,
  height = 200,
  iconType = "default",
  text,
  className,
  ...props
}: PlaceholderImageProps) {
  const getIconPath = () => {
    switch (iconType) {
      case "photo":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12" role="img" aria-label="写真のプレースホルダー">
            <title>写真のプレースホルダー</title>
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        )
      case "document":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12" role="img" aria-label="文書のプレースホルダー">
            <title>文書のプレースホルダー</title>
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <line x1="10" x2="8" y1="9" y2="9" />
          </svg>
        )
      case "video":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12" role="img" aria-label="動画のプレースホルダー">
            <title>動画のプレースホルダー</title>
            <path d="m22 8-6 4 6 4V8Z" />
            <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
          </svg>
        )
      case "music":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12" role="img" aria-label="音楽のプレースホルダー">
            <title>音楽のプレースホルダー</title>
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )
      case "user":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12" role="img" aria-label="ユーザーのプレースホルダー">
            <title>ユーザーのプレースホルダー</title>
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 1 0-16 0" />
          </svg>
        )
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12" role="img" aria-label="デフォルトのプレースホルダー">
            <title>デフォルトのプレースホルダー</title>
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <path d="M3 15h18" />
            <path d="m9 10 3-3 3 3" />
          </svg>
        )
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-muted text-muted-foreground rounded-md overflow-hidden",
        className
      )}
      style={{ width, height }}
      {...props}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        {getIconPath()}
        {text && <p className="text-sm font-medium">{text}</p>}
      </div>
    </div>
  )
} 