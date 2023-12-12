export function handleThemeToggle<T>(darkMode: T) {
  const rootElem = document.querySelector("#root");
  darkMode
    ? rootElem?.classList.add("dark")
    : rootElem?.classList.remove("dark");
}
