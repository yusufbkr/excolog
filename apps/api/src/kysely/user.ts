import type { User } from "@excolog/database";
import { Updateable } from "kysely";
import { v4 as uuidv4 } from "uuid";
import { db } from "@excolog/database";

export const getUser = async (id: string) => {
  return db
    .selectFrom("User")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();
};

export const getUserByEmail = async (email: string) => {
  return db
    .selectFrom("User")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();
};

export const listUsers = async (limit?: number, offset?: number) => {
  let query = db.selectFrom("User").selectAll();

  if (typeof limit === "number") {
    query = query.limit(limit);
  }

  if (typeof offset === "number") {
    query = query.offset(offset);
  }

  return query.orderBy("createdAt", "desc").execute();
};

const USER_LIST_SEARCH_LIMIT = 50;

export const listUsersSearch = async (search?: string) => {
  let query = db
    .selectFrom("User")
    .select(["id", "name", "username", "avatarUrl"])
    .orderBy("name", "asc")
    .limit(USER_LIST_SEARCH_LIMIT);

  if (search?.trim()) {
    const term = `%${search.trim()}%`;
    query = query.where((eb) =>
      eb.or([eb("name", "ilike", term), eb("username", "ilike", term)]),
    );
  }

  return query.execute();
};

type CreateUser = Pick<
  User,
  | "name"
  | "username"
  | "email"
  | "avatarUrl"
  | "address"
  | "city"
  | "country"
  | "postalCode"
> & {
  isSuperAdmin?: boolean;
  language?: string;
};

export const createUser = async (user: CreateUser) => {
  return db
    .insertInto("User")
    .values({
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      name: user.name ?? null,
      username: user.username ?? null,
      email: user.email ?? null,
      isSuperAdmin: user.isSuperAdmin ?? false,
      language: user.language ?? "tr",
      avatarUrl: user.avatarUrl ?? null,
      address: user.address ?? null,
      city: user.city ?? null,
      country: user.country ?? null,
      postalCode: user.postalCode ?? null,
    })
    .returningAll()
    .executeTakeFirst();
};

type UpdateUser = Pick<
  User,
  | "id"
  | "name"
  | "username"
  | "avatarUrl"
  | "address"
  | "city"
  | "country"
  | "postalCode"
> & {
  language?: string;
};

export const updateUser = async (user: UpdateUser) => {
  const values: Updateable<User> = {
    updatedAt: new Date(),
  };

  if (user.name !== undefined) values.name = user.name ?? null;
  if (user.username !== undefined) values.username = user.username ?? null;
  if (user.language) values.language = user.language;
  if (user.avatarUrl !== undefined) values.avatarUrl = user.avatarUrl ?? null;
  if (user.address) values.address = user.address;
  if (user.city) values.city = user.city;
  if (user.country) values.country = user.country;
  if (user.postalCode) values.postalCode = user.postalCode;

  return db
    .updateTable("User")
    .set(values)
    .where("id", "=", user.id)
    .returningAll()
    .executeTakeFirst();
};

export const deleteUser = async (id: string) => {
  return db.deleteFrom("User").where("id", "=", id).executeTakeFirst();
};
