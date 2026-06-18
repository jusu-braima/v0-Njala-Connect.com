'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Upload, X, Loader2, ImageIcon, FileIcon } from 'lucide-react'

interface FileUploadProps {
  onUploadComplete: (pathname: string) => void
  onUploadError?: (error: string) => void
  folder?: string
  accept?: string
  maxSize?: number // in MB
  className?: string
  disabled?: boolean
  preview?: boolean
}

export function FileUpload({
  onUploadComplete,
  onUploadError,
  folder = 'uploads',
  accept = 'image/*',
  maxSize = 10,
  className,
  disabled = false,
  preview = true,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (file: File) => {
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      onUploadError?.(`File too large. Maximum size is ${maxSize}MB.`)
      return
    }

    setFileName(file.name)
    setIsUploading(true)

    // Frontend-only: read the file as a local data URL.
    // The real upload will be handled by the external backend.
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.onerror = () => reject(new Error('Failed to read file'))
        reader.readAsDataURL(file)
      })

      if (preview && file.type.startsWith('image/')) {
        setPreviewUrl(dataUrl)
      }

      onUploadComplete(dataUrl)
    } catch (error) {
      onUploadError?.(error instanceof Error ? error.message : 'Failed to read file')
      setPreviewUrl(null)
      setFileName(null)
    } finally {
      setIsUploading(false)
    }
  }, [maxSize, onUploadComplete, onUploadError, preview])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (disabled || isUploading) return
    
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [disabled, handleFile, isUploading])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }, [handleFile])

  const clearFile = useCallback(() => {
    setPreviewUrl(null)
    setFileName(null)
    if (inputRef.current) inputRef.current.value = ''
  }, [])

  return (
    <div className={cn('relative', className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={disabled || isUploading}
        className="sr-only"
        id="file-upload"
      />
      
      {previewUrl || fileName ? (
        <div className="relative rounded-lg border border-border bg-muted/50 p-4">
          <div className="flex items-center gap-3">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="h-16 w-16 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                <FileIcon className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{fileName}</p>
              {isUploading && (
                <p className="text-xs text-muted-foreground">Uploading...</p>
              )}
            </div>
            {!isUploading && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearFile}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ) : (
        <label
          htmlFor="file-upload"
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors cursor-pointer',
            isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50',
            (disabled || isUploading) && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          ) : accept.includes('image') ? (
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Max file size: {maxSize}MB
            </p>
          </div>
        </label>
      )}
    </div>
  )
}
