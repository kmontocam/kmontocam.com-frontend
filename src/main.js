import 'htmx-ext-path-params';
import 'htmx-ext-ws';

/**
 * @param {string} label
 */
function toggleCollapsedMenu(label) {
  const checkbox = document.getElementById(label);
  checkbox.checked = false;

  const changeEvent = new Event('change');
  checkbox.dispatchEvent(changeEvent);
}

/**
 * @param {string} language
 */
function changeDomLanguage(language) {
  document.documentElement.lang = language;
}

window.toggleCollapsedMenu = toggleCollapsedMenu;
window.changeDomLanguage = changeDomLanguage;
