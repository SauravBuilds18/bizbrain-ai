export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("bizbrain_user"));
}

export function getStorageKey(key) {
  const user = getCurrentUser();

  if (!user) return `bizbrain_guest_${key}`;

  return `bizbrain_${user.email}_${key}`;
}

export function loadData(key, defaultValue = []) {
  const storageKey = getStorageKey(key);

  return JSON.parse(
    localStorage.getItem(storageKey) ||
      JSON.stringify(defaultValue)
  );
}

export function saveData(key, data) {
  const storageKey = getStorageKey(key);

  localStorage.setItem(
    storageKey,
    JSON.stringify(data)
  );
}