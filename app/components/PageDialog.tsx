import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { MouseEventHandler, ReactNode, useEffect, useRef } from "react";
import { useScrollLock } from "~/scrollLockContext";

interface PageCardProps {
  children: ReactNode
}

export function PageDialog({ 
  children
}: PageCardProps) {
  const { setScrollLock } = useScrollLock();

  useEffect(() => {
    setScrollLock(true);

    return () => {
      setScrollLock(false);
    }
  }, []);

  const navigate = useNavigate();

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // remove open attribute from dialog element, then open as modal
    // This is so initially the dialog is rendered as open (before JS executes), but then is closed and re-opened 
    // as a modal to get accessibility features
    dialogRef.current?.removeAttribute('open');
    dialogRef.current?.showModal();

    return () => {
      dialogRef.current?.close();
    }
  }, []);

  const handleDialogCancel = (e: React.MouseEvent<HTMLDialogElement>) => {
    e.preventDefault();
    navigate('/', { preventScrollReset: true });
  }

  const handleContentClick: MouseEventHandler<HTMLDialogElement> = (e) => {
    // Close dialog if user clicks outside of content
    if (e.target === e.currentTarget) {
      navigate('/', { preventScrollReset: true })
    }
  }

  return <>
    {/* Background */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black bg-opacity-40 z-10"
    />
    
    {/* Dialog */}
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
}