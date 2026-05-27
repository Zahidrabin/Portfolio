/**
 * PORTFOLIO CLIENT ARCHITECTURE ENGINE
 * Handles:
 * - Portfolio workspace expansion slide routines
 * - Automated tab channel swapping with full aria hooks
 * - Smooth anchor positioning resets
 */
(function () {
  'use strict';

  // Core UI Node references
  const toggleBtn       = document.getElementById('toggle-projects-btn');
  const closeBtn        = document.getElementById('close-projects-btn');
  const projectsSection = document.getElementById('projects-section');
  const tabBtns         = document.querySelectorAll('.tab-btn');
  const tabPanels       = document.querySelectorAll('.tab-panel');

  /**
   * OPENS PROJECTS SHOWCASE DISPLAY
   * Alters section state flags and transitions viewpoint focus down smoothly
   */
  function openProjects() {
    projectsSection.classList.add('open');
    projectsSection.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    
    // Tiny processing window cushion to ensure browser transition triggers before anchor alignment kicks in
    setTimeout(() => {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  /**
   * CLOSES PROJECTS SHOWCASE DISPLAY
   * Collapses workspace grid panel and returns hardware layout pointer focus to core CTA element
   */
  function closeProjects() {
    projectsSection.classList.remove('open');
    projectsSection.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.focus(); // Good practice for maintaining screen-reader focus paths
  }

  // Binds visibility tracking listeners to layout operations buttons
  if (toggleBtn) toggleBtn.addEventListener('click', openProjects);
  if (closeBtn) closeBtn.addEventListener('click', closeProjects);

  /**
   * CATEGORY TAB CONTROLLER INTERFACE
   * Swaps visibility properties across grid items when category buttons are clicked
   */
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      // Step A: Strip active flags from all category button channels
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      
      // Step B: Apply structural priority highlights to selected option
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Step C: Iterate panels array; display target match while hiding adjacent channels
      tabPanels.forEach(panel => {
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('hidden', '');
        }
      });
    });
  });
})();