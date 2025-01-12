import { useEffect } from "react";

const useScrollMonitor = (container: React.RefObject<HTMLDivElement>, onScroll: (offset: number) => void) => {
  /*****************************************************************/
  /* Handle Scroll Container
  /*****************************************************************/
  useEffect(() => {
    const handleScroll = () => {
      if (container) {
        const scrollTop = container.current!.scrollTop;
        onScroll(scrollTop);
      }
    };

    if (container.current) {
      container.current!.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container.current) {
        container.current!.removeEventListener("scroll", handleScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useScrollMonitor;
