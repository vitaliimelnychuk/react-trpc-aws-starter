import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cx(...args: ClassValue[]): string {
  return twMerge(clsx(args));
}
