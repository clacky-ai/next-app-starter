# AI Agent Quick Reference

**⚠️ MANDATORY**: Read `.clackyrules` first for non-negotiable requirements and constraints.

## 🚀 Essential Command Sequence

```bash
# Standard execution sequence - run in order
pnpm run db:generate && pnpm run db:migrate && pnpm run db:status && pnpm run build
```

## 📋 Template Variables

Replace these placeholders when using templates:

- `{{ENTITY}}` → Entity name in PascalCase (e.g., "Book", "User", "Product")
- `{{ENTITY_PLURAL}}` → Plural form in camelCase (e.g., "books", "users", "products")
- `{{ENTITY_SINGULAR}}` → Singular form in kebab-case (e.g., "book", "user", "product")
- `{{ENTITY_TITLE}}` → Display title (e.g., "Books", "Users", "Products")

## ⚡ Core Workflow Pattern

### 1. Schema Definition (ALWAYS FIRST)
**Location**: `lib/db/schema.ts`
```typescript
export const {{ENTITY_PLURAL}} = pgTable('{{ENTITY_PLURAL}}', {
  id: serial('id').primaryKey(),
  // Add fields here
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'), // Soft delete support
});

export const insert{{ENTITY}}Schema = createInsertSchema({{ENTITY_PLURAL}}).omit({
  id: true, createdAt: true, updatedAt: true,
});
```

### 2. CLI Commands (REQUIRED SEQUENCE)
```bash
pnpm run db:generate  # Returns: migration file paths
pnpm run db:migrate   # Returns: execution status  
pnpm run db:status    # Returns: JSON status
pnpm run build        # Returns: build results
```

### 3. Server Actions
**Location**: `app/(dashboard)/{{ENTITY_PLURAL}}/actions.ts`
```typescript
'use server';
import { validatedActionWithUser } from '@/lib/auth/middleware';

export const create{{ENTITY}} = validatedActionWithUser(
  insert{{ENTITY}}Schema,
  async (data, formData, user) => {
    // Implementation
  }
);
```

### 4. API Routes
**Location**: `app/api/{{ENTITY_PLURAL}}/route.ts`
```typescript
export async function GET(request: NextRequest) {
  // List/Read operations
}
export async function POST(request: NextRequest) {
  // Create operations with insert{{ENTITY}}Schema.parse(body)
}
```

### 5. Frontend Pages
**Location**: `app/(dashboard)/{{ENTITY_PLURAL}}/page.tsx`
```typescript
export default async function {{ENTITY}}Page() {
  const items = await db.select().from({{ENTITY_PLURAL}})
    .where(isNull({{ENTITY_PLURAL}}.deletedAt));
  return <div>{/* UI */}</div>;
}
```

## 🛠️ CLI Commands Reference

| Command | AI Agent Use | Output Format | Purpose |
|---------|--------------|---------------|---------|
| `pnpm run db:generate` | ✅ Required | File paths | Generate migration files |
| `pnpm run db:migrate` | ✅ Required | Execution results | Apply migrations |
| `pnpm run db:status` | ✅ Validation | JSON status | Check database state |
| `pnpm run build` | ✅ Validation | Build results | Type checking |
| `pnpm run db:seed` | ✅ Optional | Seed results | Populate test data |
| `pnpm run db:studio` | ❌ Human only | Interactive UI | Visual interface |
| `pnpm run dev` | ❌ Long-running | Server process | Development server |

## 🔥 Critical Requirements

### 1. Next.js 15 Params (BREAKING CHANGE)
```typescript
// ❌ OLD WAY - Will cause errors
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id; // ERROR
}

// ✅ NEW WAY - Always await params
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // CORRECT
}
```

### 2. Schema-First Development
- ALWAYS define schema in `lib/db/schema.ts` BEFORE any other code
- Use `createInsertSchema` and `createSelectSchema` for validation
- Omit auto-generated fields (id, createdAt, updatedAt) from insert schemas

### 3. Soft Deletes (Default Pattern)
```typescript
// Soft delete (recommended)
await db.update({{ENTITY_PLURAL}})
  .set({ deletedAt: new Date() })
  .where(eq({{ENTITY_PLURAL}}.id, id));

// Always filter out deleted records
await db.select().from({{ENTITY_PLURAL}})
  .where(isNull({{ENTITY_PLURAL}}.deletedAt));
```

### 4. Validation Pattern
```typescript
// Server Actions
export const action = validatedActionWithUser(
  insert{{ENTITY}}Schema,
  async (data, formData, user) => {
    // data is already validated
  }
);

// API Routes
const validatedData = insert{{ENTITY}}Schema.parse(body);
```

## 📁 File Structure (Core Paths)

```
lib/db/schema.ts                    # Database schema definitions
app/(dashboard)/[entity]/actions.ts # Server actions
app/api/[entity]/route.ts           # API endpoints
app/(dashboard)/[entity]/page.tsx   # List pages
components/[entity]/[entity]-form.tsx # Form components
```

## 🚨 Error Patterns to Avoid

1. **Direct params access without await** (Next.js 15)
2. **Missing schema validation** before database operations
3. **Hard deletes** without business justification
4. **Forgetting soft delete filters** in queries
5. **Not running CLI commands in sequence**

## 🎯 Quick Implementation Template

```json
{
  "action": "create_crud_entity",
  "entity_name": "{{ENTITY_NAME}}",
  "fields": [
    {"name": "title", "type": "varchar(255)", "required": true},
    {"name": "content", "type": "text", "required": false}
  ],
  "steps": [
    "1. Define schema in lib/db/schema.ts",
    "2. Run: pnpm run db:generate && pnpm run db:migrate", 
    "3. Create server actions in app/(dashboard)/{{ENTITY_PLURAL}}/actions.ts",
    "4. Create API routes in app/api/{{ENTITY_PLURAL}}/route.ts",
    "5. Create UI components and pages",
    "6. Validate: pnpm run build"
  ]
}
```

## 📚 Reference Links

- **Full Templates**: See `templates/` directory
- **Complete Patterns**: See `AGENTS.md` for detailed examples
- **Tech Stack**: See `README.md` for dependency versions
