import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 991;

const useWidthHeight = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width: size.width,
    height: size.height,
    isMobile: size.width <= MOBILE_BREAKPOINT,
    isTablet: size.width > MOBILE_BREAKPOINT && size.width < 1200,
    isDesktop: size.width >= 1200,
  };
};

export default useWidthHeight;