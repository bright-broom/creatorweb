"use client"

import { useState } from "react"
import type { ImageProps } from "next/image"
import Image from "next/image"
import { PlaceholderImage } from "./placeholder-image"

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackIconType?: "photo" | "document" | "video" | "music" | "user" | "default"
  fallbackText?: string
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fallbackIconType = "photo",
  fallbackText,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState<boolean>(false)

  if (error || !src) {
    return (
      <PlaceholderImage
        width={typeof width === "number" ? width : 300}
        height={typeof height === "number" ? height : 200}
        iconType={fallbackIconType}
        text={fallbackText || alt}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setError(true)}
      {...props}
    />
  )
} 