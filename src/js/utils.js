/* ============================================================
   APS MAJESTE — URL helper for base-path-aware links
   Vite sets import.meta.env.BASE_URL from the --base flag.
   For project sites (user.github.io/repo/) this is "/repo/".
   For root deployments it is "/".
   ============================================================ */

export function url(path) {
  const base = import.meta.env.BASE_URL || '/';
  return base.replace(/\/$/, '') + path;
}
