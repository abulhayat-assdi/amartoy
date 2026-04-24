import { isSupabaseConfigured, isSupabaseWriteConfigured, supabaseRestRequest } from "@/lib/supabase-rest";
import type { LoginPageContent } from "@/types/loginpage";

const LOGIN_SETTINGS_SLUG = "login-page-settings";

export const DEFAULT_LOGIN_PAGE: LoginPageContent = {
  title: "Welcome Back!",
  subtitle: "Sign in to your AmarToy account to track orders and more.",
  emailLabel: "Phone Number or Email",
  emailPlaceholder: "Enter mobile number or email",
  passwordLabel: "Password",
  passwordPlaceholder: "Enter your password",
  submitButtonText: "Sign In",
  forgotPasswordText: "Forgot Password?",
  registerPromptText: "New here?",
  registerLinkText: "Create an Account",
};

export async function getLoginPageContent(): Promise<LoginPageContent> {
  if (!isSupabaseConfigured()) return DEFAULT_LOGIN_PAGE;

  try {
    const rows = await supabaseRestRequest<any[]>(
      `/rest/v1/homepage_content?select=content,updated_at&slug=eq.${LOGIN_SETTINGS_SLUG}&limit=1`,
    );

    const row = rows[0];
    if (!row?.content) return DEFAULT_LOGIN_PAGE;

    return {
      title: row.content.title || DEFAULT_LOGIN_PAGE.title,
      subtitle: row.content.subtitle || DEFAULT_LOGIN_PAGE.subtitle,
      emailLabel: row.content.emailLabel || DEFAULT_LOGIN_PAGE.emailLabel,
      emailPlaceholder: row.content.emailPlaceholder || DEFAULT_LOGIN_PAGE.emailPlaceholder,
      passwordLabel: row.content.passwordLabel || DEFAULT_LOGIN_PAGE.passwordLabel,
      passwordPlaceholder: row.content.passwordPlaceholder || DEFAULT_LOGIN_PAGE.passwordPlaceholder,
      submitButtonText: row.content.submitButtonText || DEFAULT_LOGIN_PAGE.submitButtonText,
      forgotPasswordText: row.content.forgotPasswordText || DEFAULT_LOGIN_PAGE.forgotPasswordText,
      registerPromptText: row.content.registerPromptText || DEFAULT_LOGIN_PAGE.registerPromptText,
      registerLinkText: row.content.registerLinkText || DEFAULT_LOGIN_PAGE.registerLinkText,
      updatedAt: row.updated_at,
    };
  } catch {
    return DEFAULT_LOGIN_PAGE;
  }
}

export async function saveLoginPageContent(content: LoginPageContent) {
  if (!isSupabaseWriteConfigured()) {
    throw new Error("Saving Login Settings requires Supabase service role configuration.");
  }

  const payload = {
    slug: LOGIN_SETTINGS_SLUG,
    content,
    updated_at: new Date().toISOString(),
  };

  await supabaseRestRequest(
    "/rest/v1/homepage_content",
    {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(payload),
    },
    true,
  );

  return payload;
}
