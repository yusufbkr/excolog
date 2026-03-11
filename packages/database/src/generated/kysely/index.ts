import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { CurrencyCode, TransactionStatus, Direction, CalculationType, Effect, ShareStatus, ShareRole } from "./enums";

export type Actor = {
    id: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    organizationSlug: string;
    createdByUserId: string | null;
    referenceNo: string | null;
    type: string;
    name: string;
    isActive: Generated<boolean>;
    metadata: Generated<unknown>;
    tags: Generated<string[]>;
};
export type ExchangeRate = {
    id: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    currency: CurrencyCode;
    rate: number;
    source: Generated<string | null>;
};
export type Organization = {
    id: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    name: string;
    slug: string;
    createdByUserId: string;
    ownerUserId: string;
    avatarUrl: string | null;
};
export type OrganizationMembership = {
    id: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    organizationSlug: string;
    userId: string;
};
export type Record = {
    id: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    organizationSlug: string;
    ownerUserId: string;
    createdByUserId: string | null;
    parentId: string | null;
    recordGroupId: string | null;
    referenceNo: string | null;
    type: string;
    name: string;
    isActive: Generated<boolean>;
    metadata: Generated<unknown>;
    tags: Generated<string[]>;
};
export type RecordGroup = {
    id: string;
    organizationId: string;
    definitionKey: string;
    customLabel: string | null;
    workspaceNodeId: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type RecordShare = {
    id: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    recordId: string;
    sharedByUserId: string;
    sharedWithUserId: string;
    role: Generated<ShareRole>;
    status: Generated<ShareStatus>;
};
export type Transaction = {
    id: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    organizationSlug: string;
    createdByUserId: string | null;
    referenceNo: string | null;
    transactionDate: Generated<Timestamp>;
    status: Generated<TransactionStatus>;
    description: string | null;
    currency: CurrencyCode;
    exchangeRateSnapshot: number | null;
    isRecurring: Generated<boolean>;
    startDate: Timestamp | null;
    endDate: Timestamp | null;
    frequency: string | null;
    recurringTemplateId: string | null;
    metadata: Generated<unknown>;
    tags: Generated<string[]>;
};
export type TransactionLine = {
    id: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    transactionId: string;
    actorId: string | null;
    recordId: string | null;
    amount: string | null;
    direction: Generated<Direction>;
    calculationType: Generated<CalculationType>;
    effect: Generated<Effect>;
    metadata: Generated<unknown>;
};
export type User = {
    id: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    name: string | null;
    email: string | null;
    isSuperAdmin: Generated<boolean>;
    language: Generated<string>;
    avatarUrl: string | null;
    address: string | null;
    city: string | null;
    country: string | null;
    postalCode: string | null;
    username: string | null;
};
export type WorkspaceNode = {
    id: string;
    organizationId: string;
    type: string;
    refId: string;
    posX: number;
    posY: number;
    createdAt: Generated<Timestamp>;
};
export type DB = {
    Actor: Actor;
    ExchangeRate: ExchangeRate;
    Organization: Organization;
    OrganizationMembership: OrganizationMembership;
    Record: Record;
    RecordGroup: RecordGroup;
    RecordShare: RecordShare;
    Transaction: Transaction;
    TransactionLine: TransactionLine;
    User: User;
    WorkspaceNode: WorkspaceNode;
};
