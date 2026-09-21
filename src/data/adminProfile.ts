export type AdminProfile = {
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin';
};

const PROFILE_KEY = 'cmm-admin-profile';
export const ADMIN_PROFILE_UPDATED_EVENT = 'cmm-admin-profile-updated';

export const defaultAdminProfile: AdminProfile = {
  name: 'Admin',
  email: 'admin@creativemindsmedia.com',
  role: 'Super Admin',
};

export const getAdminProfile = (): AdminProfile => {
  try {
    const stored = localStorage.getItem(PROFILE_KEY);
    return stored ? { ...defaultAdminProfile, ...JSON.parse(stored) } : defaultAdminProfile;
  } catch {
    return defaultAdminProfile;
  }
};

export const saveAdminProfile = (profile: AdminProfile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event(ADMIN_PROFILE_UPDATED_EVENT));
};

export const getProfileInitials = (name: string) => name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'AD';
