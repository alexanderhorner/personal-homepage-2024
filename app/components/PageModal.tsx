import { useNavigate } from "@remix-run/react";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";
import { useScrollLock } from "~/scrollLockContext";

interface PageCardProps {
  children: ReactNode
}

export function PageModal({ 
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

  return <>
    {/* Background */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black bg-opacity-40"
    />
    
    {/* Dialog */}
    <motion.dialog 
      open
      ref={dialogRef}
      onCancel={handleDialogCancel}
      onClick={() => navigate('/', { preventScrollReset: true })}
      layoutScroll
      className="fixed inset-0 overflow-auto overscroll-contain backdrop:hidden m-0 max-w-none max-h-none bg-transparent h-auto w-auto"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-fit mx-auto">
        {children}
      </div>
      
    </motion.dialog>
  </>
}