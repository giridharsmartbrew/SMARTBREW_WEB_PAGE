/**
 * Throttle function - limits how often a function can be called
 * 
 * @param fn The function to throttle
 * @param delay Time in milliseconds between allowed function calls
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return function(...args: Parameters<T>) {
    const now = Date.now();
    
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Debounce function - delays function execution until after wait milliseconds
 * have elapsed since the last time the function was called
 * 
 * @param fn The function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, wait);
  };
} 