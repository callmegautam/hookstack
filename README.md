# HookStack

A growing collection of **practical, production-ready React hooks** built with modern React and Node.js in mind.

No magic. No hidden behavior. Just sharp, composable hooks you actually reuse.

> ⚠️ **Active development**  
> `hookstack` is under constant improvement. New hooks and enhancements are added regularly. APIs aim to be stable, but minor refinements may happen as the library evolves.

---

## Why hookstack?

Most hook libraries fall into one of two traps:

- too small to be useful
- too opinionated to be safe

**hookstack** stays in the middle.

- Focused, reusable hooks
- No unnecessary dependencies
- SSR-safe by default
- Typed with TypeScript
- Works with modern React (18+)
- Built for real-world apps, not demos

If a hook starts behaving like a framework feature, it doesn’t belong here.

---

## Installation

```bash
npm install hookstack
# or
pnpm add hookstack
# or
yarn add hookstack
```

---

## Usage

All hooks are exported from the root package.

```ts
import { useToggle, useLocalStorage, useFetch } from 'hookstack';
```

No deep imports. No internal paths.

---

## Available Hooks

- **useToggle**  
  Manage boolean state with clear `on`, `off`, and `toggle` helpers.

- **useLocalStorage**  
  Persist state in `localStorage` with SSR safety and JSON handling.

- **useCookie**  
  Read, write, and remove browser cookies with explicit options.

- **useCopyToClipboard**  
  Copy text to the clipboard with status tracking and safe fallbacks.

- **useFetch**  
 Perform simple, abort-safe HTTP requests with manual or automatic execution.
<!--
- **useEvent**  
  Create stable event callbacks that always access the latest state.

- **useInterval**  
  Run intervals in React without stale closures or cleanup bugs.

- **useDebouncedValue**  
  Debounce rapidly changing values like input or filters.

- **useMediaQuery**  
  Reactively match CSS media queries in JavaScript.

- **useClickOutside**  
  Detect clicks outside a target element for dismissible UI. -->

## Design Principles

- **Primitives first**
  Hooks should do one thing well.

- **No fake abstractions**
  If a hook hides important behavior, it’s wrong.

- **SSR-safe by default**
  Hooks should not crash during server rendering.

- **Escape hatches included**
  Manual control beats clever automation.

---

## Non-goals

`hookstack` deliberately does **not** include:

- `useAuth`
- `useForm`
- `useAxios`
- `useQuery` replacements
- App-specific hooks

Those belong in your application, not a shared library.

---

## Roadmap (high level)

Planned and in-progress hooks include:

- `useEvent`
- `useInterval`
- `useDebouncedValue`
- `useMediaQuery`
- `useClickOutside`
- `usePrevious`
- `useDisclosure`

The library is **actively evolving**, with careful API additions over time.

---

## Contributing

Contributions are welcome, but discipline matters.

- Hooks must be reusable
- No app-specific assumptions
- Simplicity over cleverness

Open an issue before large changes.

---

## License

MIT © Gautam Suthar
