export function JsonParse<T>(value: string | null): {
  success: boolean;
  data?: T;
} {
  try {
    if (!value) return { success: false };
    return { success: true, data: JSON.parse(value) as T };
  } catch {
    return { success: false };
  }
}
