import { useEffect, useState } from "react";
import { handleThemeToggle } from "../utils/themeToggle";

type LocalStorageProps<T> = {
  key: string;
  initialValue: T;
};

function handleThemeChange<T>(key: string, value: T) {
  if (key === "darkMode") {
    handleThemeToggle<T>(value);
  }
}

export function useLocalStorage<T>({
  key,
  initialValue,
}: LocalStorageProps<T>) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const savedData = localStorage.getItem(key) as string;
    return savedData ? JSON.parse(savedData) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));

    handleThemeChange(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
