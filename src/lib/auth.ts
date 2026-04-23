export interface StoredUser {
  name: string;
  email: string;
  mobile: string;
  password: string;
  dateOfBirth: string;
  gender?: string;
}

export interface StoredOrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface StoredOrder {
  id: string;
  date: string;
  orderedAt: string;
  email: string;
  phone: string;
  customerName: string;
  division: string;
  district: string;
  paymentMethod: string;
  address: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  items: StoredOrderItem[];
  note: string;
}

const USERS_KEY = "amartoy-users";
const CURRENT_USER_KEY = "amartoy-current-user";
const LOGIN_FLAG_KEY = "amartoy-demo-user";
const ORDERS_KEY = "amartoy-user-orders";

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeMobile(value: string): string {
  return value.replace(/\s+/g, "").trim();
}

function getOrderOwnerKey(user: Pick<StoredUser, "email" | "mobile">): string {
  const email = normalizeEmail(user.email);
  if (email) {
    return `email:${email}`;
  }

  return `mobile:${normalizeMobile(user.mobile)}`;
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

export function getCurrentStoredUser(): StoredUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(CURRENT_USER_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as StoredUser;
    return parsed?.name ? parsed : null;
  } catch {
    return null;
  }
}

export function isStoredUserLoggedIn(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(LOGIN_FLAG_KEY) === "1" && Boolean(getCurrentStoredUser());
}

export function logoutStoredUser() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(LOGIN_FLAG_KEY);
  window.localStorage.removeItem(CURRENT_USER_KEY);
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

export function getStoredOrdersForCurrentUser(): StoredOrder[] {
  if (typeof window === "undefined") {
    return [];
  }

  const currentUser = getCurrentStoredUser();
  if (!currentUser) {
    return [];
  }

  const raw = window.localStorage.getItem(ORDERS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, StoredOrder[]>;
    const ownerKey = getOrderOwnerKey(currentUser);
    const orders = parsed?.[ownerKey];
    return Array.isArray(orders) ? orders : [];
  } catch {
    return [];
  }
}

export function saveOrderForCurrentUser(order: StoredOrder) {
  if (typeof window === "undefined") {
    return;
  }

  const currentUser = getCurrentStoredUser();
  if (!currentUser) {
    return;
  }

  let allOrders: Record<string, StoredOrder[]> = {};
  const raw = window.localStorage.getItem(ORDERS_KEY);

  if (raw) {
    try {
      allOrders = JSON.parse(raw) as Record<string, StoredOrder[]>;
    } catch {
      allOrders = {};
    }
  }

  const ownerKey = getOrderOwnerKey(currentUser);
  const existingOrders = Array.isArray(allOrders[ownerKey]) ? allOrders[ownerKey] : [];
  allOrders[ownerKey] = [order, ...existingOrders];

  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(allOrders));
}
