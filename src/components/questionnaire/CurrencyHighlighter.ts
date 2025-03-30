
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
  
  // Set up the observer and event listeners
  const setupObservers = () => {
    // For scrolling animation
    window.addEventListener('scroll', highlightCenterIcons);
    
    // Also check periodically for animation movements
    const interval = setInterval(highlightCenterIcons, 100);
    
    // Clean up function
    return () => {
      window.removeEventListener('scroll', highlightCenterIcons);
      clearInterval(interval);
    };
  };
  
  // Initialize when the component is mounted
  document.addEventListener('DOMContentLoaded', setupObservers);
  
  // Also initialize immediately for cases where DOMContentLoaded already fired
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setupObservers();
  }
  
  return setupObservers;
}
