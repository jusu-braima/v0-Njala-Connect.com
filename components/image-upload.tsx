'use client'

import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageUploadProps {
  value?: string
  onChange: (value: string | undefined) => void
  className?: string
  disabled?: boolean
}

export function ImageUpload({ value, onChange, className, disabled }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleFile(file)
    }
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }, [])

  const handleFile = (file: File) => {
    setIsLoading(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      onChange(e.target?.result as string)
      setIsLoading(false)
    }
    reader.onerror = () => {
      setIsLoading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = useCallback(() => {
    onChange(undefined)
  }, [onChange])

  if (value) {
    return (
      <div className={cn('relative rounded-lg overflow-hidden border border-border', className)}>
        <img 
          src={value} 
          alt="Upload preview" 
          className="w-full h-48 object-cover"
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8"
          onClick={handleRemove}
          disabled={disabled}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Remove image</span>
        </Button>
      </div>
    )
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 transition-colors',
        isDragging 
          ? 'border-primary bg-primary/5' 
          : 'border-border hover:border-primary/50',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
      ) : (
        <>
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
            <ImageIcon className="h-7 w-7 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Drag and drop an image here
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              or click to browse files
            </p>
          </div>
          <Button type="button" variant="outline" size="sm" disabled={disabled}>
            <Upload className="h-4 w-4 mr-2" />
            Choose File
          </Button>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
        disabled={disabled || isLoading}
      />
    </div>
  )
}
