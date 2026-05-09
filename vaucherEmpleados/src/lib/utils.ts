import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}





export function formatDisplayName(fullName?: string): string {
  if (!fullName?.trim()) return "Usuario";

  const parts = fullName.trim().split(/\s+/);

  const display = [parts[0], parts[2] ?? parts[1]]
    .filter(Boolean)
    .map(n => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
    .join(" ");

  return display;
}