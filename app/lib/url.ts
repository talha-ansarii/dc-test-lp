// app/lib/url.ts
export function buildSignupUrl(base: string, roleId?: string) {
  if (!base || base.startsWith("[")) return "#"; // guard invalid placeholders
  try {
    const url = new URL(base);
    if (roleId) url.searchParams.set("role", roleId);
    return url.toString();
  } catch {
    // relative route
    return roleId ? `${base}?role=${encodeURIComponent(roleId)}` : base;
  }
}
