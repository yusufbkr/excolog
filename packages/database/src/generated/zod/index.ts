import { z } from 'zod';
import { Prisma } from '../client/index.js';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.NullTypes.DbNull;
  if (v === 'JsonNull') return Prisma.NullTypes.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.string(), z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.any() }),
    z.record(z.string(), z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','email','isSuperAdmin','language','avatarUrl','address','city','country','postalCode','username']);

export const OrganizationScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','slug','createdByUserId','ownerUserId','avatarUrl']);

export const OrganizationMembershipScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','organizationSlug','userId']);

export const ActorScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','organizationSlug','createdByUserId','referenceNo','type','name','isActive','metadata','tags']);

export const RecordScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','organizationSlug','ownerUserId','createdByUserId','parentId','recordGroupId','referenceNo','type','name','isActive','metadata','tags']);

export const RecordShareScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','recordId','sharedByUserId','sharedWithUserId','role','status']);

export const TransactionScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','organizationSlug','createdByUserId','referenceNo','transactionDate','status','description','currency','exchangeRateSnapshot','isRecurring','startDate','endDate','frequency','recurringTemplateId','metadata','tags']);

export const TransactionLineScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','transactionId','actorId','recordId','amount','direction','calculationType','effect','metadata']);

export const ExchangeRateScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','currency','rate','source']);

export const RecordGroupScalarFieldEnumSchema = z.enum(['id','organizationId','definitionKey','customLabel','workspaceNodeId','createdAt','updatedAt']);

export const WorkspaceNodeScalarFieldEnumSchema = z.enum(['id','organizationId','type','refId','posX','posY','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const CurrencyCodeSchema = z.enum(['TRY','EUR','USD','GBP']);

export type CurrencyCodeType = `${z.infer<typeof CurrencyCodeSchema>}`

export const TransactionStatusSchema = z.enum(['DRAFT','PENDING','COMPLETED','CANCELLED']);

export type TransactionStatusType = `${z.infer<typeof TransactionStatusSchema>}`

export const DirectionSchema = z.enum(['INCOME','EXPENSE','NEUTRAL']);

export type DirectionType = `${z.infer<typeof DirectionSchema>}`

export const CalculationTypeSchema = z.enum(['FIXED','PERCENTAGE']);

export type CalculationTypeType = `${z.infer<typeof CalculationTypeSchema>}`

export const EffectSchema = z.enum(['ADD','SUBTRACT']);

export type EffectType = `${z.infer<typeof EffectSchema>}`

export const ShareStatusSchema = z.enum(['PENDING','ACCEPTED','REJECTED','SPAM']);

export type ShareStatusType = `${z.infer<typeof ShareStatusSchema>}`

export const ShareRoleSchema = z.enum(['VIEWER','EDITOR']);

export type ShareRoleType = `${z.infer<typeof ShareRoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  isSuperAdmin: z.boolean(),
  language: z.string(),
  avatarUrl: z.string().nullable(),
  address: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  postalCode: z.string().nullable(),
  username: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////

export const OrganizationSchema = z.object({
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  slug: z.string(),
  createdByUserId: z.string(),
  ownerUserId: z.string(),
  avatarUrl: z.string().nullable(),
})

export type Organization = z.infer<typeof OrganizationSchema>

/////////////////////////////////////////
// ORGANIZATION MEMBERSHIP SCHEMA
/////////////////////////////////////////

export const OrganizationMembershipSchema = z.object({
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  organizationSlug: z.string(),
  userId: z.string(),
})

export type OrganizationMembership = z.infer<typeof OrganizationMembershipSchema>

/////////////////////////////////////////
// ACTOR SCHEMA
/////////////////////////////////////////

export const ActorSchema = z.object({
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  organizationSlug: z.string(),
  createdByUserId: z.string().nullable(),
  referenceNo: z.string().nullable(),
  type: z.string(),
  name: z.string(),
  isActive: z.boolean(),
  metadata: JsonValueSchema,
  tags: z.string().array(),
})

export type Actor = z.infer<typeof ActorSchema>

/////////////////////////////////////////
// RECORD SCHEMA
/////////////////////////////////////////

export const RecordSchema = z.object({
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  organizationSlug: z.string(),
  ownerUserId: z.string(),
  createdByUserId: z.string().nullable(),
  parentId: z.string().nullable(),
  recordGroupId: z.string().nullable(),
  referenceNo: z.string().nullable(),
  type: z.string(),
  name: z.string(),
  isActive: z.boolean(),
  metadata: JsonValueSchema,
  tags: z.string().array(),
})

export type Record = z.infer<typeof RecordSchema>

/////////////////////////////////////////
// RECORD SHARE SCHEMA
/////////////////////////////////////////

export const RecordShareSchema = z.object({
  role: ShareRoleSchema,
  status: ShareStatusSchema,
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  recordId: z.string(),
  sharedByUserId: z.string(),
  sharedWithUserId: z.string(),
})

export type RecordShare = z.infer<typeof RecordShareSchema>

/////////////////////////////////////////
// TRANSACTION SCHEMA
/////////////////////////////////////////

export const TransactionSchema = z.object({
  status: TransactionStatusSchema,
  currency: CurrencyCodeSchema,
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  organizationSlug: z.string(),
  createdByUserId: z.string().nullable(),
  referenceNo: z.string().nullable(),
  transactionDate: z.coerce.date(),
  description: z.string().nullable(),
  exchangeRateSnapshot: z.number().nullable(),
  isRecurring: z.boolean(),
  startDate: z.coerce.date().nullable(),
  endDate: z.coerce.date().nullable(),
  frequency: z.string().nullable(),
  recurringTemplateId: z.string().nullable(),
  metadata: JsonValueSchema,
  tags: z.string().array(),
})

export type Transaction = z.infer<typeof TransactionSchema>

/////////////////////////////////////////
// TRANSACTION LINE SCHEMA
/////////////////////////////////////////

export const TransactionLineSchema = z.object({
  direction: DirectionSchema,
  calculationType: CalculationTypeSchema,
  effect: EffectSchema,
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  transactionId: z.string(),
  actorId: z.string().nullable(),
  recordId: z.string().nullable(),
  amount: z.bigint().nullable(),
  metadata: JsonValueSchema,
})

export type TransactionLine = z.infer<typeof TransactionLineSchema>

/////////////////////////////////////////
// EXCHANGE RATE SCHEMA
/////////////////////////////////////////

export const ExchangeRateSchema = z.object({
  currency: CurrencyCodeSchema,
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  rate: z.number(),
  source: z.string().nullable(),
})

export type ExchangeRate = z.infer<typeof ExchangeRateSchema>

/////////////////////////////////////////
// RECORD GROUP SCHEMA
/////////////////////////////////////////

export const RecordGroupSchema = z.object({
  id: z.cuid(),
  organizationId: z.string(),
  definitionKey: z.string(),
  customLabel: z.string().nullable(),
  workspaceNodeId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type RecordGroup = z.infer<typeof RecordGroupSchema>

/////////////////////////////////////////
// WORKSPACE NODE SCHEMA
/////////////////////////////////////////

export const WorkspaceNodeSchema = z.object({
  id: z.cuid(),
  organizationId: z.string(),
  type: z.string(),
  refId: z.string(),
  posX: z.number(),
  posY: z.number(),
  createdAt: z.coerce.date(),
})

export type WorkspaceNode = z.infer<typeof WorkspaceNodeSchema>
