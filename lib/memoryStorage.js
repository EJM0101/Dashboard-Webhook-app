// lib/memoryStorage.js
let clients = [];

export function setClients(data) {
  clients = data;
}

export function getClients() {
  return clients;
}