# Web / Frontend Reference

## Default Stack Recommendations (2025)

| Layer | Strong Default | Alternatives |
|-------|---------------|--------------|
| Framework | Next.js (App Router) | Remix, SvelteKit, Astro (content-heavy) |
| Language | TypeScript | — (JS only for tiny scripts) |
| Styling | Tailwind CSS | CSS Modules, vanilla-extract |
| Component library | shadcn/ui (copy-paste) | Radix UI, Headless UI |
| State (client) | Zustand or Jotai | Redux Toolkit (large teams only) |
| State (server) | TanStack Query | SWR |
| Forms | React Hook Form + Zod | Conform (for server actions) |
| Testing | Vitest + Testing Library + Playwright | — |
| Bundler | Vite (for non-Next projects) | — |

## Architecture Patterns

### App Router (Next.js 13+)
- Co-locate components with routes under `app/`
- Server Components by default; `"use client"` only at leaf nodes
- Use Route Groups `(marketing)` / `(app)` for layout separation
- API Routes → prefer Server Actions for mutations

### Folder Structure (Next.js)
```
src/
├── app/                  # Routes + layouts
│   ├── (marketing)/      # Public pages
│   └── (dashboard)/      # Authed app
├── components/
│   ├── ui/               # shadcn copies
│   └── [feature]/        # Feature components
├── lib/                  # Utilities, clients
├── hooks/                # Custom React hooks
├── types/                # Shared TS types
└── server/               # Server-only code (DB, auth)
```

## Common Pitfalls
- **Over-client-componenting**: Wrapping everything in `"use client"` kills RSC benefits
- **Missing loading.tsx / error.tsx**: Always add these per route segment
- **Images without next/image**: Causes LCP issues
- **Skipping TS strict mode**: Set `"strict": true` from day one
- **No env validation**: Use `zod` + `@t3-oss/env-nextjs` to validate env vars at build time
- **Untyped API responses**: Always define Zod schemas for external API responses

## Auth Patterns
- **Best default**: Auth.js v5 (NextAuth) or Clerk (if budget allows for managed solution)
- Protect routes via middleware.ts — not per-page checks
- Store session in httpOnly cookies, not localStorage

## Performance Checklist
- [ ] `next/image` for all images
- [ ] `next/font` for custom fonts
- [ ] Dynamic imports for heavy components
- [ ] Route-level code splitting (automatic in App Router)
- [ ] Edge middleware for auth (avoid cold starts on protected routes)

## Security Surface
- CSP headers via `next.config.js`
- Input sanitization (DOMPurify for user-rendered HTML)
- CSRF: handled by SameSite cookies + Server Actions
- Dependency audit: `npm audit` + Snyk
