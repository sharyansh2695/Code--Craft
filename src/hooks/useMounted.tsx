"use client";
import { useEffect, useState } from "react";

const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
<<<<<<< HEAD
export default useMounted;
=======
export default useMounted;
>>>>>>> d2efcd745807296654e57a365c594d0340d88886
