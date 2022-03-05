import { Iuser } from "../types/types";


export const HEAD_URL = 'https://621c7b30768a4e1020ab3244.mockapi.io/api/';

export async function getUsers() {
  const res = await fetch(`${HEAD_URL}users`);
  const data = await res.json();
  return data
}

export async function getProducts(userId: string) {
  const res = await fetch(`${HEAD_URL}products/${userId}`);
  const data = await res.json();
  return data
}

export async function deleteProduct(userId: string) {
  const res = await fetch(`${HEAD_URL}products/${userId}`, {
    method: 'DELETE'
  });
}

export async function deleteUser(userId: string) {
  const res = await fetch(`${HEAD_URL}users/${userId}`, {
    method: 'DELETE',
  });
}

export async function geteUser(userId: string) {
  const res = await fetch(`${HEAD_URL}users/${userId}`);
  const data = await res.json();
  return data
}

export async function changeUser(newName: string, newAge: number, userId: string) {
  const oldData: Iuser = await geteUser(userId);
  oldData.name = newName;
  oldData.age = newAge;

  const res = await fetch(`${HEAD_URL}users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(oldData),
  });
}

export async function getUsersByName(name: string) {
  if (!name) {
    return await getUsers();
  }
  const res = await fetch(`${HEAD_URL}users?search=${name}`);
  const data = await res.json();
  return data
}