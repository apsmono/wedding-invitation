# Backend / API Reference

## Default Stack Recommendations (2025)

| Layer | Strong Default | Alternatives |
|-------|---------------|--------------|
| Runtime | Node.js (LTS) | Bun (cutting edge), Deno |
| Framework | Fastify | Express (legacy/simple), Hono (edge) |
| Language | TypeScript | — |
| ORM | Drizzle | Prisma (great DX, heavier), Kysely |
| Database | PostgreSQL | MySQL/MariaDB, SQLite (small scale) |
| Cache | Redis (Upstash for serverless) | — |
| Queue | BullMQ (Redis-backed) | Inngest (managed), Trigger.dev |
| Auth | JWT (stateless) + refresh tokens | Session cookies for web-first APIs |
| Validation | Zod | Typebox (faster), Valibot |
| Testing | Vitest + Supertest | Jest |
| Containerization | Docker + docker-compose | — |

## API Design Patterns

### REST
- Version via URL prefix: `/api/v1/`
- Resource-based, plural nouns: `/users`, `/orders/:id`
- Use HTTP methods semantically (GET/POST/PUT/PATCH/DELETE)
- Return consistent error envelope: `{ error: { code, message, details } }`
- Pagination: cursor-based preferred over offset for large datasets

### GraphQL (when appropriate)
- Use only when clients have highly variable data needs
- Apollo Server or Pothos (type-safe schema builder)
- DataLoader for N+1 prevention — mandatory

### tRPC (full-stack TypeScript)
- Best when frontend and backend share a monorepo
- End-to-end type safety without codegen
- Pairs well with Next.js

## Folder Structure (Fastify / domain-driven)
```
src/
├── modules/
│   ├── users/
│   │   ├── users.router.ts
│   │   ├── users.service.ts
│   │   ├── users.schema.ts    # Zod schemas
│   │   └── users.test.ts
│   └── orders/
├── lib/
│   ├── db.ts                  # Drizzle client
│   ├── redis.ts
│   └── logger.ts
├── plugins/                   # Fastify plugins (auth, cors, etc.)
├── config/                    # Env validation (Zod)
└── server.ts
```

## Database Patterns
- **Migrations**: Always use migration files (not sync/push) in production
- **Connection pooling**: PgBouncer or Neon/Supabase built-in pooler
- **Soft deletes**: `deleted_at` timestamp over hard deletes where audit matters
- **Indexes**: Add on all FK columns and common query filters from day one
- **Read replicas**: Plan for them; avoid writes mixed with reads in service layer

## Common Pitfalls
- **No request validation**: Validate at the boundary (route handler), not deep in service
- **Blocking the event loop**: CPU work → worker threads; never in main thread
- **Unhandled promise rejections**: Always attach `.catch()` or use `async/await` + try/catch
- **Secrets in env without validation**: Use Zod schema for all `process.env` access
- **Missing rate limiting**: Add `@fastify/rate-limit` from day one, even on internal APIs
- **No structured logging**: Use `pino` — never `console.log` in production code
- **God services**: Keep service methods focused; split by domain not by CRUD

## Security Checklist
- [ ] Helmet / security headers plugin
- [ ] Rate limiting per route
- [ ] Input validation on every endpoint
- [ ] SQL via parameterized queries only (ORM handles this)
- [ ] Auth middleware applied globally, allowlist public routes
- [ ] Secrets in env, never hardcoded
- [ ] `npm audit` + Snyk in CI

## Scalability Signals
- Stateless services (sessions in Redis, not in-process) → horizontal scale ready
- Background jobs in queues, not inline in request handlers
- Health check endpoint (`/health`) for load balancers
- Graceful shutdown handling (SIGTERM → drain connections)
