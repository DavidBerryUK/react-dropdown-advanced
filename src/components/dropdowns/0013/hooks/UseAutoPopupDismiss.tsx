import { useEffect, useCallback } from "react";

const useAutoPopupDismiss = (containerRef: React.RefObject<HTMLDivElement>, inputRef: React.RefObject<HTMLInputElement>, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  // Memoize the click and focus event handlers using useCallback
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node) && inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    },
    [containerRef, inputRef, setIsOpen],
  );

  const handleFocusOutside = useCallback(
    (e: FocusEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node) && inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    },
    [containerRef, inputRef, setIsOpen],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("focusin", handleFocusOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusin", handleFocusOutside);
    };
  }, [handleClickOutside, handleFocusOutside]); // Depend on the memoized callbacks
};

export default useAutoPopupDismiss;
