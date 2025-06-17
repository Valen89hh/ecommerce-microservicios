import React, { useState, useRef, useEffect } from "react"

interface DropdownMenuProps {
  children: React.ReactNode
}

export const DropdownMenu = ({ children }: DropdownMenuProps) => {
  return <div className="relative inline-block">{children}</div>
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode
  onClick?: () => void
}

export const DropdownMenuTrigger = ({ children, onClick }: DropdownMenuTriggerProps) => {
  return (
    <button
      className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

interface DropdownMenuContentProps {
  children: React.ReactNode
}

export const DropdownMenuContent = ({ children }: DropdownMenuContentProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={ref} className="relative">
      <DropdownMenuTrigger onClick={() => setIsOpen(!isOpen)}>
        ☰
      </DropdownMenuTrigger>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  )
}

interface DropdownMenuItemProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const DropdownMenuItem = ({ children, onClick, disabled }: DropdownMenuItemProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left px-4 py-2 text-sm ${
        disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      {children}
    </button>
  )
}
