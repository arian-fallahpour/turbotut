import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext({
  isVisible: false,
  setVisibility: () => {},
});

export const LoginProvider = ({ children }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [isVisible, setVisibility] = useState(!!searchParams.get("login"));

  // Remove login query from url if redirected with login query set to true
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (params.get("login")) {
      setVisibility(true);

      params.delete("login");
      const otherQueryParams = params.toString() ? "?" + params.toString() : "";
      router.replace(pathname + otherQueryParams + window.location.hash);
    }
  }, [isVisible, pathname, router, searchParams]);

  const loginContext = {
    isVisible,
    setVisibility,
  };

  return (
    <LoginContext.Provider value={loginContext}>
      {children}
    </LoginContext.Provider>
  );
};
