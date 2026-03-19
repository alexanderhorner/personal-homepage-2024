import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { type MouseEventHandler, type ReactNode, useEffect, useRef } from 'react'
import { useScrollLock } from '~/scrollLockContext'

interface PageCardProps {
  children: ReactNode
}

export function PageDialog({ children }: PageCardProps) {
  const { setScrollLock } = useScrollLock()
  const navigate = useNavigate()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    setScrollLock(true)

    return () => {
      setScrollLock(false)
    }
  }, [setScrollLock])

  useEffect(() => {
    const dialog = dialogRef.current

    // remove open attribute from dialog element, then open as modal
    // This is so initially the dialog is rendered as open (before JS executes), but then is closed and re-opened
    // as a modal to get accessibility features
    dialog?.removeAttribute('open')
    dialog?.showModal()

    return () => {
      dialog?.close()
    }
  }, [])

  const handleDialogCancel = (event: React.MouseEvent<HTMLDialogElement>) => {
    event.preventDefault()
    navigate({ to: '/', resetScroll: false })
  }

  const handleContentClick: MouseEventHandler<HTMLDialogElement> = (event) => {
    if (event.target === event.currentTarget) {
      navigate({ to: '/', resetScroll: false })
    }
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      <motion.dialog
        open
        ref={dialogRef}
        onCancel={handleDialogCancel}
        onClick={handleContentClick}
        layoutScroll
        className="fixed inset-0 overflow-auto overscroll-contain backdrop:hidden m-0 max-w-none max-h-none bg-transparent h-auto w-auto z-20"
      >
        {children}
      </motion.dialog>
    </>
  )
}
