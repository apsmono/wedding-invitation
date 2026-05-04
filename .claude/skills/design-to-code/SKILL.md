---
name: design-to-code
description: >
  Convert visual designs into production-ready React/TSX components with CSS Modules, full interactivity, and realistic state management. Use this skill whenever the user uploads a screenshot, mockup, wireframe, Figma export, or any image of a UI and asks to convert it to code — even if they phrase it casually like "turn this into code", "build this", "implement this design", or "make this real". Also triggers when the user pastes a design URL, describes a layout they want coded up, or shares any visual reference alongside a coding request. Prioritizes pixel-perfect fidelity, semantic HTML, accessible markup, and working state — not just a static shell.
---

# Design-to-Code Skill

Convert any visual design artifact into a production-ready React/TSX component with CSS Modules and full interactivity.

---

## Step 1 — Analyze the Design

Before writing a single line of code, study the image carefully. Work through this checklist mentally:

### Layout Analysis
- Identify the layout system: grid, flexbox columns, sidebar+main, card grid, etc.
- Note spacing rhythm — is it 4px, 8px, or some other base unit?
- Identify breakpoints if responsive behavior is visible or implied
- Spot any sticky/fixed elements (headers, sidebars, floating buttons)

### Component Decomposition
- Break the design into a component tree (e.g. `<Page> → <Sidebar> + <MainContent> → <CardList> → <Card>`)
- Note which pieces are repeated (map candidates) vs. unique
- Identify the root component you'll produce vs. subcomponents to inline or stub

### Visual Tokens
Extract these values directly from the image:
| Token | What to look for |
|---|---|
| Colors | Background, surface, border, text, accent, error, success |
| Typography | Font size hierarchy (px estimates), weight, line-height, letter-spacing |
| Spacing | Padding/margin values by eyeballing against component sizes |
| Border radius | Subtle (2–4px), medium (8px), pill (9999px) |
| Shadows | None / subtle / elevated |
| Icons | Identify icon style (outline, filled, rounded) — use lucide-react by default |

### Interactivity Inventory
List every interactive element:
- Buttons → what do they trigger?
- Inputs / selects / toggles → what state do they control?
- Tabs / accordions → which panel is active?
- Modals / drawers / tooltips → what opens them?
- Lists → sortable, filterable, selectable?
- Forms → validation needed?

---

## Step 2 — Plan the State

Design realistic, idiomatic React state before writing JSX.

### State Placement Rules
- Co-locate state as close to where it's used as possible
- Lift only when two siblings need to share it
- Use `useReducer` for forms with 3+ fields or complex transitions
- Use `useState` for everything else (toggles, selections, pagination)

### Common Patterns by UI Type
| UI Element | State Shape |
|---|---|
| Tabs | `activeTab: string` |
| Modal/drawer | `isOpen: boolean` |
| Form | `{ fieldName: value, … }` + `errors: Record<string, string>` |
| Table/list | `items: T[]`, `sortKey`, `sortDir`, `filterQuery` |
| Toggle/switch | `isEnabled: boolean` |
| Multi-select | `selected: Set<string>` or `selectedIds: string[]` |
| Accordion | `openItems: Set<string>` (multi) or `openItem: string \| null` (single) |
| Pagination | `page: number`, `pageSize: number` |
| Async data | `data`, `isLoading`, `error` — or use a `status: 'idle' \| 'loading' \| 'success' \| 'error'` enum |

---

## Step 3 — Write the Code

### File Output Convention
Produce a **single `.tsx` file** by default. If the component warrants subcomponents, define them in the same file above the main export (no separate files unless the user asks).

Embed CSS Modules **inline as a `<style>` tag** when producing a single file for preview, or use the `styles` object pattern with a separate `.module.css` when producing a real project file. Ask the user which they prefer if unclear.

### Component Template

```tsx
import { useState, useCallback } from 'react'
import styles from './ComponentName.module.css'

// ─── Types ──────────────────────────────────────────────────────────────────

interface Item {
  id: string
  label: string
}

interface ComponentNameProps {
  initialItems?: Item[]
}

// ─── Subcomponents (if needed) ───────────────────────────────────────────────

function ItemCard({ item, onSelect }: { item: Item; onSelect: (id: string) => void }) {
  return (
    <div className={styles.card} onClick={() => onSelect(item.id)}>
      {item.label}
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ComponentName({ initialItems = [] }: ComponentNameProps) {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = useCallback((id: string) => {
    setSelectedId(prev => (prev === id ? null : id))
  }, [])

  return (
    <div className={styles.root}>
      {items.map(item => (
        <ItemCard
          key={item.id}
          item={item}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )
}
```

### CSS Modules Template

```css
/* ComponentName.module.css */

.root {
  /* Layout */
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;

  /* Tokens */
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.card {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
  cursor: pointer;
  transition: background-color 150ms ease, box-shadow 150ms ease;
}

.card:hover {
  background-color: #f3f4f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.card:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

---

## Step 4 — Fidelity Checklist

Before delivering, verify every item:

### Visual Fidelity
- [ ] Colors match the design (check backgrounds, borders, text, accents)
- [ ] Typography hierarchy matches (size, weight, color per level)
- [ ] Spacing feels right — neither too tight nor too loose
- [ ] Border radii match the design's style
- [ ] Shadows and elevations are present where visible
- [ ] Icons are the right style and size
- [ ] Images/avatars are stubbed with realistic placeholders (not broken `<img>` tags)

### Interaction Fidelity
- [ ] Every clickable element has a cursor and hover/active state
- [ ] Every form input has a focus style
- [ ] State transitions are smooth (use CSS `transition` not jarring jumps)
- [ ] Loading states are implemented if the design shows them
- [ ] Empty states are handled if the design shows them
- [ ] Error states are handled for forms

### Code Quality
- [ ] TypeScript interfaces defined for all props and data shapes
- [ ] No `any` types
- [ ] No inline `style={{}}` on repeated elements (use CSS Modules)
- [ ] `key` props on all mapped elements use stable IDs, not array indices
- [ ] Event handlers are named `handleX`, not anonymous arrow functions in JSX
- [ ] Accessible: buttons use `<button>`, links use `<a>`, form fields have labels

### Realistic Data
- [ ] Seed the component with enough mock data to show the design properly (3–5 items in a list, filled-in form fields, etc.)
- [ ] Avoid "Lorem ipsum" for labels — use realistic domain-appropriate text

---

## Step 5 — Communicate Assumptions

After delivering the code, briefly note:
1. **Design decisions made** — any color, spacing, or behavior you inferred
2. **Stubs / placeholders** — e.g. "API call replaced with mock data", "icons approximated"
3. **What's not yet wired** — e.g. "form submission handler is a `console.log` stub"
4. **Variants / follow-ups** — offer to add dark mode, responsive breakpoints, animation, or accessibility improvements

Keep this section short — bullet points, not paragraphs.

---

## Input Type Handling

| Input Type | Approach |
|---|---|
| **Screenshot (high-fidelity)** | Extract exact colors with eyedropper precision; match font sizes by comparing relative proportions |
| **Wireframe (low-fidelity)** | Infer visual polish — apply standard spacing, a coherent color palette, and readable typography |
| **Figma / design tool export** | Treat as high-fidelity; note any auto-layout hints visible in the export |
| **Partial / cropped design** | Build what's visible; ask if the surrounding context (nav, page layout) is needed |
| **Multiple screens** | Ask which screen to start with, or build a tabbed preview that shows all |

---

## Quick Reference: Icon Imports

Default to `lucide-react` for all icons:

```tsx
import { Search, X, ChevronDown, ChevronRight, Plus, Trash2, Edit2,
         Check, AlertCircle, Info, User, Settings, Home, ArrowLeft } from 'lucide-react'

// Usage
<Search size={16} strokeWidth={1.5} className={styles.icon} />
```

If the design clearly uses a different icon set (Material, Heroicons), note it and adapt.

---

## Quick Reference: Common CSS Patterns

```css
/* Truncate text */
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* Visually hide but keep accessible */
.srOnly { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

/* Overlay/backdrop */
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 100; }

/* Center with flex */
.center { display: flex; align-items: center; justify-content: center; }

/* Responsive grid */
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
```
