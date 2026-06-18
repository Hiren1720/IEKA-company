export function getLocalStorageData(key: string): any | null {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }  catch (error) {
    console.error("Error getting localStorage data:", error);
    return null;
  }
}

export function setLocalStorageData(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage data:", error);
  }
}

export function removeLocalStorageData(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing localStorage data:", error);
  }
}

export function maskEmail(email: string) {
  const [username, domain] = email.split("@");

  if (!username || !domain) return email;

  const visiblePart = username.slice(0, 4);
  const maskedPart = "*".repeat(
    Math.max(username.length - 4, 0)
  );

  return `${visiblePart}${maskedPart}@${domain}`;
};