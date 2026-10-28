export function pagePath(first, spread = false) {
  return spread ? `/${first}-${first + 1}` : `/${first}`;
}
