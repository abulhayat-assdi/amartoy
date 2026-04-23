const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "");
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_STORAGE_BUCKET =
  process.env.SUPABASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "amartoy-media";

function getSupabaseAuthHeader(useServiceRole = false) {
  const apiKey = useServiceRole ? SUPABASE_SERVICE_ROLE_KEY : SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !apiKey) {
    return null;
  }

  return {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
  };
}

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && (SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY));
}

export function isSupabaseWriteConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

export async function supabaseRestRequest<T>(path: string, init?: RequestInit, useServiceRole = false): Promise<T> {
  const authHeaders = getSupabaseAuthHeader(useServiceRole);

  if (!SUPABASE_URL || !authHeaders) {
    throw new Error("Supabase environment variables are not configured.");
  }

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Supabase request failed with ${response.status}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

export async function uploadToSupabaseStorage(file: File, folder: string) {
  const authHeaders = getSupabaseAuthHeader(true);

  if (!SUPABASE_URL || !authHeaders || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase storage upload requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  const sanitizedFolder = folder.replace(/^\/+|\/+$/g, "");
  const safeFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-").toLowerCase();
  const filePath = `${sanitizedFolder}/${Date.now()}-${safeFileName}`;
  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${SUPABASE_STORAGE_BUCKET}/${filePath}`;
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      ...authHeaders,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "true",
    },
    body: Buffer.from(await file.arrayBuffer()),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Storage upload failed.");
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_STORAGE_BUCKET}/${filePath}`;
}
