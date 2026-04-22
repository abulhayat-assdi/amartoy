export interface StoredUser {
  name: string;
  email: string;
  mobile: string;
  password: string;
  dateOfBirth: string;
  gender?: string;
}

const USERS_KEY = "amartoy-users";
const CURRENT_USER_KEY = "amartoy-current-user";
const LOGIN_FLAG_KEY = "amartoy-demo-user";

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeMobile(value: string): string {
  return value.replace(/\s+/g, "").trim();
}

export function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function registerStoredUser(user: StoredUser): { ok: true } | { ok: false; message: string } {
  const users = getStoredUsers();
  const email = normalizeEmail(user.email);
  const mobile = normalizeMobile(user.mobile);

  const duplicateUser = users.find(
    (item) => normalizeEmail(item.email) === email || normalizeMobile(item.mobile) === mobile,
  );

  if (duplicateUser) {
    return {
      ok: false,
      message: "An account already exists with this email or mobile number.",
    };
  }

  const nextUsers = [
    ...users,
    {
      ...user,
      email,
      mobile,
    },
  ];

  window.localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
  window.localStorage.setItem(LOGIN_FLAG_KEY, "1");
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(nextUsers[nextUsers.length - 1]));

  return { ok: true };
}

export function loginStoredUser(
  credential: string,
  password: string,
): { ok: true } | { ok: false; message: string } {
  const users = getStoredUsers();
  const normalizedEmail = normalizeEmail(credential);
  const normalizedMobile = normalizeMobile(credential);

  const matchedUser = users.find((user) => {
    const matchesCredential =
      normalizeEmail(user.email) === normalizedEmail || normalizeMobile(user.mobile) === normalizedMobile;

    return matchesCredential && user.password === password;
  });

  if (!matchedUser) {
    return {
      ok: false,
      message: "No account matched this mobile/email and password.",
    };
  }

  window.localStorage.setItem(LOGIN_FLAG_KEY, "1");
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(matchedUser));

  return { ok: true };
}
