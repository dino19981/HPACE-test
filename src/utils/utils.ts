import { Iuser, sortedTypes } from "../types/types";

export function getUsersPerPage(currentPage: number, pagination: number, users: Iuser[]) {
  if (pagination === 100) {
    return users
  }
  const start = (currentPage - 1) * pagination;
  const resultUsers = users.slice(start, start + pagination);
  return resultUsers;
}

export function getSortedUsers(selectedType: string, users: Iuser[]): Iuser[] {
  const newUsers = [...users];
  if (selectedType === sortedTypes.top) {
    newUsers.sort((a, b) => b.age - a.age);
    return newUsers;
  }
  if (selectedType === sortedTypes.bottom) {
    newUsers.sort((a, b) => a.age - b.age);
    return newUsers;
  } else {
    return users;
  }
}