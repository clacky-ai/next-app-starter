# AGENTS.md - AI Agent Development Guide

**Priority Rules**: See `.clackyrules` for mandatory AI Agent requirements and constraints.
**Primary Reference**: Use `AI-REFERENCE.md` for quick implementation patterns and `templates/` directory for code templates.

## AI Agent CRUD Creation Workflow

### Quick Start Commands
```bash
# Standard execution sequence - run in order
pnpm run db:generate && pnpm run db:migrate && pnpm run db:status && pnpm run build
```

### Core Principles
1. **Schema First**: Always define database schema before any other code
2. **Type Safety**: Use drizzle-zod auto-generated schemas throughout
3. **CLI Validation**: Execute CLI commands to validate each step
4. **Soft Deletes**: Implement soft deletes by default with `deletedAt`

## CLI Commands Reference

| Command | Purpose | AI Agent Use | Output |
|---------|---------|--------------|---------|
| `pnpm run db:generate` | Generate migration files | ✅ Required | File paths |
| `pnpm run db:migrate` | Apply migrations | ✅ Required | Execution results |
| `pnpm run db:status` | Check database state | ✅ Validation | JSON status |
| `pnpm run build` | Type checking | ✅ Validation | Build results |
| `pnpm run db:seed` | Populate test data | ✅ Optional | Seed results |
| `pnpm run db:studio` | Visual interface | ❌ Human only | Interactive UI |
| `pnpm run dev` | Development server | ❌ Long-running | Server process |

## Development Environment

- **Node.js**: Latest LTS version recommended
- **Package Manager**: pnpm (recommended for performance and disk space efficiency)
- **Database**: PostgreSQL required (configure via `POSTGRES_URL` environment variable)
- **Environment**: Use `pnpm run db:setup` to generate `.env` file with required variables

## Code Style and Architecture

### TypeScript Configuration
- **Strict Mode**: Enabled with full type safety
- **Path Aliases**: Use `@/*` for imports from project root
- **Target**: ESNext with modern JavaScript features
- **JSX**: React 19 with preserve mode

### Code Patterns
- **Server Actions**: Use `'use server'` directive for database operations
- **Validation**: Drizzle-zod integration for automatic schema validation
- **Database**: Drizzle ORM with PostgreSQL, type-safe queries
- **Authentication**: JWT tokens in HTTP-only cookies
- **Styling**: Tailwind CSS with utility-first approach
- **Components**: shadcn/ui components with Radix UI primitives
- **Data Flow**: Schema-first approach with consistent types across frontend/backend

### File Organization
```
next-app-starter/
├── app/                          # Next.js 15 App Router
│   ├── (login)/                  # Authentication route group
│   │   ├── actions.ts            # Server actions for auth (sign-in, sign-up, etc.)
│   │   ├── login.tsx             # Shared login component
│   │   ├── sign-in/
│   │   │   └── page.tsx          # Sign-in page
│   │   └── sign-up/
│   │       └── page.tsx          # Sign-up page
│   ├── api/                      # API Routes
│   │   ├── user/
│   │   │   └── route.ts          # Current user endpoint
│   │   └── users/                # Users CRUD API
│   │       ├── route.ts          # List/Create users
│   │       └── [id]/
│   │           └── route.ts      # Get/Update/Delete user by ID
│   ├── globals.css               # Global styles and CSS variables
│   ├── layout.tsx                # Root layout with theme provider
│   ├── not-found.tsx             # 404 error page
│   ├── page.tsx                  # Home page
│   └── favicon.ico               # Application icon
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui base components
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── radio-group.tsx
│   ├── header.tsx                # Application header
│   └── theme-controls.tsx        # Theme switching controls
├── contexts/                     # React Context providers
│   └── theme-context.tsx         # Theme management context
├── lib/                          # Core business logic
│   ├── auth/                     # Authentication system
│   │   ├── middleware.ts         # Validation middleware for server actions
│   │   └── session.ts            # JWT session management
│   ├── db/                       # Database layer
│   │   ├── drizzle.ts           # Database connection
│   │   ├── schema.ts            # Drizzle schema with drizzle-zod integration
│   │   ├── queries.ts           # Database query functions
│   │   ├── seed.ts              # Database seeding script
│   │   ├── setup.ts             # Database setup script
│   │   └── migrations/          # Database migration files
│   │       ├── 0000_petite_odin.sql
│   │       └── meta/
│   │           ├── _journal.json
│   │           └── 0000_snapshot.json
│   ├── config.ts                 # Application configuration
│   └── utils.ts                  # Shared utility functions
├── components.json               # shadcn/ui configuration
├── drizzle.config.ts            # Drizzle ORM configuration
├── middleware.ts                 # Next.js middleware for route protection
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── postcss.config.mjs           # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── AGENTS.md                    # AI Agent development guidelines
└── README.md                    # Project documentation
```

### Key File Patterns

#### Server Actions Location
- **Authentication**: `app/(login)/actions.ts` - All auth-related server actions
- **Feature Actions**: Place feature-specific actions in their respective route groups
- **Shared Actions**: Create `app/actions/` for cross-feature actions

#### API Route Structure
- **Resource-based**: `/api/users/` for user operations
- **Nested Resources**: `/api/users/[id]/` for specific user operations
- **Current User**: `/api/user/` for current authenticated user

#### Database Files
- **Schema**: `lib/db/schema.ts` - Single source of truth for data models
- **Queries**: `lib/db/queries.ts` - Reusable database query functions
- **Migrations**: `lib/db/migrations/` - Version-controlled schema changes

## Critical Next.js 15 Requirements

### Dynamic Route Parameters
**⚠️ BREAKING CHANGE**: In Next.js 15, `params` is now a Promise and MUST be awaited.

```typescript
// ✅ Correct Pattern
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;  // Always await params first
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;  // Always await params first
  return <div>Page: {slug}</div>;
}
```

### Server Actions with Drizzle-Zod
```typescript
export const createUser = validatedActionWithUser(
  insertUserSchema,
  async (data, formData, user) => {
    // data is already validated and typed
    const [created] = await db.insert(users).values(data).returning();
    return { success: 'User created successfully', user: created };
  }
);
```

## Database Operations

### Schema-First Development with Drizzle-Zod

**⚠️ CRITICAL**: Always define the data model first in `lib/db/schema.ts` before writing any other code.

#### Key Principles
- **Schema First**: Define database schema before any business logic
- **Auto-Generation**: Use `createInsertSchema` and `createSelectSchema` for validation
- **Omit Auto-Fields**: Always omit auto-generated fields (id, createdAt, updatedAt) from insert schemas
- **Soft Deletes**: Always implement `deletedAt` timestamp
- **Type Safety**: Auto-infer types from drizzle schema

**Template**: See `templates/schema-template.ts` for complete schema definition pattern.

### CRUD Operations with Drizzle ORM

**⚠️ ALWAYS**: Validate input data using drizzle-zod schemas before database operations.

#### Essential Patterns
- **Create**: Use `insertSchema.parse()` for validation, then `db.insert().values().returning()`
- **Read**: Always filter `isNull(table.deletedAt)` for active records
- **Update**: Use `updateSchema.parse()`, always set `updatedAt: new Date()`
- **Delete**: Prefer soft delete with `set({ deletedAt: new Date() })`
- **Transactions**: Use `db.transaction()` for multi-table operations

**Templates**: See `templates/` directory for complete CRUD implementation patterns.

### Migration Workflow
1. Modify schema in `lib/db/schema.ts`
2. Generate migration: `pnpm run db:generate`  
3. Apply migration: `pnpm run db:migrate`
4. Update seed data if needed: `pnpm run db:seed`

## Authentication System

- JWT tokens in HTTP-only cookies with 24-hour expiration
- Use `validatedActionWithUser` for authenticated server actions
- Middleware automatically protects routes requiring authentication
- Activity logging for all auth events

## UI Development

- Use shadcn/ui components as base (`components/ui/`)
- Built-in dark/light theme support with CSS variables
- Form handling through server actions with automatic validation

## Environment Variables

Required variables (auto-generated by `pnpm run db:setup`):
```env
POSTGRES_URL=postgresql://...
AUTH_SECRET=random-256-bit-secret
```

## Development Guidelines

### File Creation Patterns

**Route Groups**: `(dashboard)` for protected areas, `(login)` for auth, `(public)` for public pages
**API Structure**: RESTful with `/api/[entity]/route.ts` and `/api/[entity]/[id]/route.ts`
**Components**: Feature-based organization in `components/[entity]/` directories

**Templates**: See `templates/` directory for complete file structure patterns.

## Common Patterns

### Adding New Features (Schema-First Approach)

**⚠️ CRITICAL ORDER**: Follow this exact sequence:

1. **Define Schema First** in `lib/db/schema.ts`
2. **Generate and Run Migration**: `pnpm run db:generate && pnpm run db:migrate`
3. **Create Server Actions** using drizzle-zod schemas
4. **Build API Routes** (if needed) with schema validation
5. **Create UI Components** using existing patterns
6. **Validate**: `pnpm run build`

**Templates**: See `AI-REFERENCE.md` for quick implementation guide and `templates/` for code patterns.

### Frontend Page Routing Patterns

- **Route Groups**: `(auth)` for authentication, `(dashboard)` for protected routes, `(public)` for public pages
- **Dynamic Routes**: Always await params in Next.js 15: `const { id } = await params`
- **Form Components**: Use server actions with automatic validation

**Templates**: See `templates/page-component-template.tsx` and `templates/form-component-template.tsx`

### API Route Structure with Drizzle-Zod

**⚠️ CRITICAL**: Always validate request body using drizzle-zod schemas before database operations.

- **GET**: List operations with pagination and filtering
- **POST**: Create operations with `insertSchema.parse(body)`
- **PUT**: Update operations with `insertSchema.partial().parse(body)`
- **DELETE**: Soft delete operations with `deletedAt` timestamp

**Template**: See `templates/api-routes-template.ts` for complete API route patterns.

### Project-Specific Conventions

#### Naming Conventions
- **Files**: kebab-case (`user-profile.tsx`)
- **Components**: PascalCase (`UserProfile`)
- **Functions**: camelCase (`getUserById`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_BASE_URL`)

#### Import Organization
1. React/Next.js imports
2. Third-party libraries  
3. Internal imports (absolute paths with `@/`)
4. Relative imports

#### Error Handling Patterns
- **API Routes**: Return structured errors with proper HTTP status codes
- **Server Actions**: Return `{ success: string }` or `{ error: string }` objects
- **Validation**: Use Zod error handling for schema validation failures

#### Database Query Patterns
- Use transactions for multi-table operations
- Use soft deletes by default with `deletedAt` timestamp
- Always filter `isNull(table.deletedAt)` for active records

## Code Templates

**All code templates moved to `templates/` directory:**

- `templates/schema-template.ts` - Database schema definition
- `templates/server-actions-template.ts` - Server actions with validation
- `templates/api-routes-template.ts` - RESTful API routes
- `templates/page-component-template.tsx` - List page components  
- `templates/form-component-template.tsx` - Form components

### CLI Command Sequence
```bash
pnpm run db:generate    # Generate migrations (returns file paths)
pnpm run db:migrate     # Apply migrations (returns execution results)
pnpm run db:status      # Get database status (returns JSON)
pnpm run build          # Type checking and build validation
```

### Template Variables Reference
- `{{ENTITY}}` → PascalCase (Book, User, Product)
- `{{ENTITY_PLURAL}}` → camelCase (books, users, products)
- `{{ENTITY_SINGULAR}}` → kebab-case (book, user, product)
- `{{ENTITY_TITLE}}` → Display title (Books, Users, Products)

## Project Context (Essential Only)

### Tech Stack
- Next.js 15 + React 19 + TypeScript
- PostgreSQL + Drizzle ORM + drizzle-zod
- JWT auth + Tailwind CSS + shadcn/ui

### Key Patterns
- Schema-first development with drizzle-zod validation
- Server actions with `validatedActionWithUser`
- Soft deletes with `deletedAt` timestamp
- Next.js 15: Always await params (`const { id } = await params`)

### File Structure (Core Paths)
```
lib/db/schema.ts                    # Database schema definitions
app/(dashboard)/[entity]/actions.ts # Server actions
app/api/[entity]/route.ts           # API endpoints
app/(dashboard)/[entity]/page.tsx   # List pages
components/[entity]/[entity]-form.tsx # Form components
```
