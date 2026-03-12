import { useEffect } from "react";
import { useRefreshMutation } from "@/features/auth";

export function AppInit() {
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const init = async () => {
      try {
        await refresh().unwrap();
      } catch {
        // користувач не залогінений
      }
    };

    void init();
  }, [refresh]);

  return null;
}