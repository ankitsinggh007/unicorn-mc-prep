# React Machine-Coding Collection

A collection of 15 React implementations covering common frontend interactions, component state, API integration, forms, and browser behavior.

Each implementation is maintained as a separate React + Vite application. The repository focuses on solving practical UI problems, with attention to state updates, component responsibilities, edge cases, and user interactions.

## Implementations

| Project | What it covers |
|---|---|
| [Debounced Search](./Debounce/) | Custom debounce utility, API requests, request cancellation with AbortController, and loading/error states |
| [Search & Autocomplete](./Search-Debounce-Autocomplete/) | Debounced search input, API-backed user lookup, and suggestions |
| [Fetch & Pagination](./Fetch-pagination/) | API integration, client-side filtering, sorting, pagination, and a reusable fetch hook |
| [Infinite Scroll](./inifinte-scroll/) | IntersectionObserver, paginated API requests, load-more states, and retry handling |
| [Multi-Step Form Wizard](./Form-Wizard/) | Step navigation, field validation, form state, and guarded progression |
| [Form Validation](./Form-Validation/) | Controlled inputs, validation rules, field errors, and submit handling |
| [File Upload](./File-Upload/) | Multiple file selection, file-type and size validation, image previews, and object URL cleanup |
| [File Explorer](./File-Explorer/) | Recursive components, nested folder expansion, and file selection |
| [Modal Overlay](./Modal-Overlay/) | Route-driven modal, keyboard interactions, Escape handling, and focus management |
| [OTP Input](./OTP/) | Multi-field OTP entry, keyboard navigation, paste handling, and completion callbacks |
| [Product Page](./Product-Page/) | Product search, category filtering, and derived UI state |
| [Todo Manager](./todo%20manager/) | Adding, editing, completing, and deleting tasks with localStorage persistence |
| [Star Rating](./Star-Rating/) | Interactive ratings with hover preview and controlled values |
| [Tabs](./tab-component/) | Tab selection and conditional content rendering |
| [Food Menu](./food-menu/) | API-backed menu display, category filtering, and cart interactions |

## Engineering Highlights

A few implementations worth exploring in more detail:

### API handling and asynchronous UI

The [Debounced Search](./Debounce/) and [Fetch & Pagination](./Fetch-pagination/) projects cover request lifecycle management, cancellation, loading states, and error handling.

The [Infinite Scroll](./inifinte-scroll/) implementation uses IntersectionObserver to load additional results as the user scrolls.

### Forms and component state

The [Multi-Step Form Wizard](./Form-Wizard/) manages form values, validation errors, and progression between steps.

The [OTP Input](./OTP/) handles individual input fields, focus movement, keyboard behavior, and pasted codes.

### Browser APIs and interaction behavior

The [File Upload](./File-Upload/) implementation validates selected files, creates image previews using object URLs, and revokes those URLs during cleanup.

The [Modal Overlay](./Modal-Overlay/) handles URL-driven modal state, Escape-key dismissal, and focus restoration.

## Running a Project Locally

Each project has its own `package.json` and dependencies. There is no single root application to start.

Clone the repository:

```bash
git clone https://github.com/ankitsinggh007/unicorn-mc-prep.git
cd unicorn-mc-prep
```

Choose an implementation. For example:

```bash
cd Debounce
npm install
npm run dev
```

Open the local URL displayed by Vite.

To explore another implementation, return to the repository root, enter its folder, and install its dependencies separately.

Some implementations fetch data from public APIs, so those features require an internet connection.

## Tech Stack

- React
- JavaScript (ES6+)
- Vite
- HTML and CSS
- Tailwind CSS in selected implementations
- React Router in selected implementations
- Browser APIs including Fetch, AbortController, IntersectionObserver, and localStorage

## Repository Notes

These are independent frontend implementations rather than a single integrated application. They vary in scope and complexity, and some are still being refined.

The purpose of the collection is to make the underlying React logic and implementation decisions easy to inspect.

## Author

**Ankit Singh**

[GitHub](https://github.com/ankitsinggh007) · [LinkedIn](https://www.linkedin.com/in/ankit-singh-k/) · [Portfolio](https://ankit-portfolio-5e7c.vercel.app/)
