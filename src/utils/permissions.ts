import { UserRole } from "@/context/AuthContext";

export const hasPermission = (
  requiredRoles: UserRole[] = [],
  userRoles: UserRole[] = []
) => {
  if (!requiredRoles.length || !userRoles.length) return false;
  return requiredRoles.some((r) => userRoles.includes(r));
};
