/**
 * Route map for the Hap master application.
 *
 * Every URL of the product resolves to a screen inside the single application
 * served from /hap. These lists are the shared source of truth used both by the
 * TanStack routes (for not-found handling) and by the application's own router.
 */

/** Canonical admin screens, relative to /admin. "" is the Overview tab. */
export const ADMIN_SCREENS = [
  "menu",
  "menu/qr",
  "promote",
  "promote/new",
  "insights",
  "settings",
  "settings/restaurant",
  "settings/appearance",
  "settings/team",
  "settings/billing",
] as const;

/** Old URLs kept alive: they resolve to a canonical screen instead of 404. */
export const ADMIN_LEGACY_SCREENS: Record<string, string> = {
  home: "",
  promotions: "promote",
  analytics: "insights",
  qr: "menu/qr",
  design: "settings/appearance",
  appearance: "settings/appearance",
  staff: "settings/team",
  billing: "settings/billing",
  more: "settings",
};

export const SUPER_SCREENS = ["restaurants", "users", "plans", "settings"] as const;

export const RESTAURANT_SLUGS = ["sofra", "bella", "marina", "kinema", "garden"] as const;

export const RESTAURANT_NAMES: Record<string, string> = {
  sofra: "Sofra",
  bella: "Bella Napoli",
  marina: "Marina",
  kinema: "Kinema Bistro",
  garden: "Garden 21",
};

export type AdminScreen = (typeof ADMIN_SCREENS)[number];
export type SuperScreen = (typeof SUPER_SCREENS)[number];

/** Resolves a screen (canonical or legacy) to its canonical form, or null. */
export function resolveAdminScreen(value: string): string | null {
  const screen = value.replace(/^\/+/, "").replace(/\/+$/, "");
  if (screen === "") return "";
  if ((ADMIN_SCREENS as readonly string[]).includes(screen)) return screen;
  return ADMIN_LEGACY_SCREENS[screen] ?? null;
}

export function isAdminScreen(value: string): boolean {
  return resolveAdminScreen(value) !== null;
}


export function isSuperScreen(value: string): value is SuperScreen {
  return (SUPER_SCREENS as readonly string[]).includes(value);
}

export function isRestaurantSlug(value: string): boolean {
  return (RESTAURANT_SLUGS as readonly string[]).includes(value);
}

/** The restaurant used when a URL has no tenant of its own. */
export const DEFAULT_RESTAURANT_SLUG = "sofra";

/** Titles and descriptions per admin screen, shared by the admin route trees. */
export const ADMIN_TITLES: Record<string, [string, string]> = {
  menu: ["Menu — Hap Admin", "Add dishes, categories, photos and prices for your digital menu."],
  "menu/qr": ["Menu QR — Hap Admin", "Download and share the QR code that opens your menu."],
  promote: ["Promote — Hap Admin", "Feature a dish or take over a category, tastefully."],
  "promote/new": ["New promotion — Hap Admin", "Start a new promotion for a dish or a category."],
  insights: ["Insights — Hap Admin", "Scans, most viewed dishes and guest languages."],
  settings: ["Settings — Hap Admin", "Restaurant details, appearance, team and billing."],
  "settings/restaurant": ["Restaurant details — Hap Admin", "Profile, opening hours and menu currency."],
  "settings/appearance": ["Appearance — Hap Admin", "Template, colour and background of your public menu."],
  "settings/team": ["Team — Hap Admin", "Team roles and access for your restaurant."],
  "settings/billing": ["Billing — Hap Admin", "Your plan, subscription and access."],
};
