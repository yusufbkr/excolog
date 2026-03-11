import type { Organization, OrganizationMembership } from "@excolog/database";
import { db } from "@excolog/database";
import { Updateable, sql } from "kysely";
import { jsonObjectFrom } from "kysely/helpers/postgres";
import { v4 as uuidv4 } from "uuid";

export const getOrganizationBySlug = async (slug: string) => {
  return db
    .selectFrom("Organization")
    .selectAll()
    .where("slug", "=", slug)
    .executeTakeFirst();
};

export const getOrganizationPublicBySlug = async (slug: string) => {
  return db
    .selectFrom("Organization")
    .select(["avatarUrl", "name", "slug"])
    .where("slug", "=", slug)
    .executeTakeFirst();
};

export const getOrganizationOwner = async (slug: string) => {
  return db
    .selectFrom("Organization")
    .innerJoin("User", "User.id", "Organization.ownerUserId")
    .select([
      "Organization.id",
      "Organization.slug",
      "Organization.name",
      "Organization.ownerUserId",
      "User.id as ownerId",
      "User.name as ownerName",
      "User.email as ownerEmail",
    ])
    .where("Organization.slug", "=", slug)
    .executeTakeFirst();
};

export const listOrganizationMembers = async (organizationSlug: string) => {
  return db
    .selectFrom("OrganizationMembership")
    .selectAll("OrganizationMembership")
    .select((eb) => [
      jsonObjectFrom(
        eb
          .selectFrom("User")
          .selectAll("User")
          .whereRef("User.id", "=", "OrganizationMembership.userId"),
      ).as("user"),
    ])
    .where("OrganizationMembership.organizationSlug", "=", organizationSlug)
    .execute();
};

export const listUserMemberships = async (userId: string) => {
  return db
    .selectFrom("OrganizationMembership")
    .selectAll()
    .where("userId", "=", userId)
    .execute();
};

export const getOrganizationMembership = async (
  userId: string,
  organizationSlug: string,
) => {
  return db
    .selectFrom("OrganizationMembership")
    .selectAll()
    .where("userId", "=", userId)
    .where("organizationSlug", "=", organizationSlug)
    .executeTakeFirst();
};

type CreateOrganizationMembership = Pick<
  OrganizationMembership,
  "organizationSlug" | "userId"
>;

export const createOrganizationMembership = async (
  membership: CreateOrganizationMembership,
) => {
  return db
    .insertInto("OrganizationMembership")
    .values({
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationSlug: membership.organizationSlug,
      userId: membership.userId,
    })
    .returningAll()
    .executeTakeFirst();
};

export const deleteOrganizationMembership = async (
  userId: string,
  organizationSlug: string,
) => {
  return db
    .deleteFrom("OrganizationMembership")
    .where("userId", "=", userId)
    .where("organizationSlug", "=", organizationSlug)
    .executeTakeFirst();
};

type CreateOrganization = Pick<
  Organization,
  "name" | "slug" | "createdByUserId" | "ownerUserId" | "avatarUrl"
>;

export const createOrganization = async (organization: CreateOrganization) => {
  return db
    .insertInto("Organization")
    .values({
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      name: organization.name,
      slug: organization.slug,
      createdByUserId: organization.createdByUserId,
      ownerUserId: organization.ownerUserId,
      avatarUrl: organization.avatarUrl ?? null,
    })
    .returningAll()
    .executeTakeFirst();
};

type UpdateOrganization = Pick<Organization, "id"> &
  Partial<
    Pick<
      Organization,
      "name" | "slug" | "createdByUserId" | "ownerUserId" | "avatarUrl"
    >
  >;
export const updateOrganization = async (organization: UpdateOrganization) => {
  const values: Updateable<Organization> = {};

  if (organization.name) values.name = organization.name;
  if (organization.slug) values.slug = organization.slug;
  if (organization.createdByUserId) {
    values.createdByUserId = organization.createdByUserId;
  }
  if (organization.ownerUserId) values.ownerUserId = organization.ownerUserId;

  if (organization.avatarUrl !== undefined) {
    values.avatarUrl = organization.avatarUrl;
  }

  return db
    .updateTable("Organization")
    .set(values)
    .where("id", "=", organization.id)
    .returningAll()
    .executeTakeFirst();
};

export const deleteOrganization = async (id: string) => {
  return db.deleteFrom("Organization").where("id", "=", id).executeTakeFirst();
};

export const deleteOrganizationAllData = async (slug: string) => {
  const result = await db.transaction().execute(async (trx) => {
    // 1️⃣ Organization sil (cascade zaten çalışacak)
    await trx.deleteFrom("Organization").where("slug", "=", slug).execute();

    // 2️⃣ Orphan Participant temizliği
    await trx.executeQuery(
      sql`
        DELETE FROM "Participant" p
        WHERE NOT EXISTS (
          SELECT 1
          FROM "ParticipantOrganizationAssignment" poa
          WHERE poa."participantId" = p.id
        )
      `.compile(trx),
    );

    // 3️⃣ Orphan Buyer temizliği
    await trx.executeQuery(
      sql`
        DELETE FROM "Buyer" b
        WHERE NOT EXISTS (
          SELECT 1
          FROM "BuyerOrganizationAssignment" boa
          WHERE boa."buyerId" = b.id
        )
      `.compile(trx),
    );
  });

  return result;
};
