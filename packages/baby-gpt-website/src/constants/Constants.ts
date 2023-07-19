export const ROLES: string[] = [
  "Dad",
  "Mom",
  "Older Sibling",
  "Younger Sibling",
  "Grandparent",
  "Uncle",
  "Aunt",
  "Teacher",
  "Nanny/Babysitter",
  "Family Friend",
];

export const AGE_GROUPS: string[] = [
  "newborn",
  "3 m - 1 yr",
  "1 yr - 3 yr",
  "3 yr - 5 yr",
  "5 yr - 12 yr",
  "12 yr - 14 yr",
  "14 yr - 16 yr",
  "16 yr - 18 yr",
];

export const DOMAIN =
  process.env.DEV_API_URL ?? `https://${window.location.hostname}`;
