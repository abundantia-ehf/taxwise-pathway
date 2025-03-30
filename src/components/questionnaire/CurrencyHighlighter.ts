
/**
 * A utility to highlight currency icons as they pass through the center of the screen
 */
export function initializeCurrencyHighlighter() {
  // Function to check if an element is in the center zone (middle 10% of screen)
  const isInCenterZone = (element: Element): boolean => {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const elementCenter = rect.left + rect.width / 2;
    const windowWidth = window.innerWidth;
    const centerStart = windowWidth * 0.45; // 45% from left
    const centerEnd = windowWidth * 0.55; // 55% from left (10% zone in the middle)
    
    return elementCenter >= centerStart && elementCenter <= centerEnd;
  };
  
  // Function to highlight icons in the center
  const highlightCenterIcons = () => {
    const iconContainers = document.querySelectorAll('.icon-highlight');
    
    iconContainers.forEach(container => {
      if (isInCenterZone(container)) {
        container.classList.add('center-highlight');
      } else {
        container.classList.remove('center-highlight');
      }
    });
  };
  
  // Set up event listeners
  window.addEventListener('scroll', highlightCenterIcons);
  
  // Check periodically for animation movements
  const interval = setInterval(highlightCenterIcons, 100);
  
  // Initial check
  highlightCenterIcons();
  
  // Return a cleanup function that directly removes the listeners
  return () => {
    window.removeEventListener('scroll', highlightCenterIcons);
    clearInterval(interval);
  };
}
