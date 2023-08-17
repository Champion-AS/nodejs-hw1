// const fs = require("fs/promises");
// const  nanoid  = require("nanoid");
// const path = require("path");

import fs from "fs/promises";
import { nanoid } from "nanoid";

import  path  from "path";

const contactsPath = path.join("./db", "contacts.json");


export async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

export async function getContactById(contactsId) {
  const contacts = await listContacts();
  const result = await contacts.find(({ id }) => id === contactsId);
  if (!result) return null;
  return result;
}

export async function removeContact(contactsId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactsId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContacts;
}
// module.exports = { listContacts, getContactById, removeContact, addContact };

// export default  { listContacts, getContactById, removeContact, addContact };