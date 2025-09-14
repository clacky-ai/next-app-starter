# Code Templates

This directory contains reusable code templates for rapid AI Agent-driven development.

## Usage

Replace template variables with actual values:

- `{{ENTITY}}` → PascalCase entity name (e.g., "Book", "User", "Product")
- `{{ENTITY_PLURAL}}` → camelCase plural form (e.g., "books", "users", "products")
- `{{ENTITY_SINGULAR}}` → kebab-case singular form (e.g., "book", "user", "product")
- `{{ENTITY_TITLE}}` → Display title (e.g., "Books", "Users", "Products")

## Template Files

### 1. `schema-template.ts`
Database schema definition with drizzle-zod integration.
**Location**: `lib/db/schema.ts`

### 2. `server-actions-template.ts`
Server actions for CRUD operations with validation.
**Location**: `app/(dashboard)/[entity]/actions.ts`

### 3. `api-routes-template.ts`
RESTful API routes with Next.js 15 support.
**Location**: `app/api/[entity]/route.ts` and `app/api/[entity]/[id]/route.ts`

### 4. `page-component-template.tsx`
List page component with data fetching.
**Location**: `app/(dashboard)/[entity]/page.tsx`

### 5. `form-component-template.tsx`
Form component with server action integration.
**Location**: `components/[entity]/[entity]-form.tsx`

## Implementation Order

1. **Schema Definition** (schema-template.ts)
2. **Run Migrations**: `pnpm run db:generate && pnpm run db:migrate`
3. **Server Actions** (server-actions-template.ts)
4. **API Routes** (api-routes-template.ts) - Optional
5. **UI Components** (page-component-template.tsx, form-component-template.tsx)
6. **Validation**: `pnpm run build`

## Example Usage

For a "Book" entity:

```bash
# Replace variables in templates
{{ENTITY}} → Book
{{ENTITY_PLURAL}} → books
{{ENTITY_SINGULAR}} → book
{{ENTITY_TITLE}} → Books
```

Then follow the implementation order above.
