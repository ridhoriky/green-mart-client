# GreenMart - Precision Agriculture & Sustainable Marketplace

GreenMart is a premium, modern, and responsive frontend client built using Next.js 16+, Tailwind CSS v4, and TypeScript. It is decoupled from local data storage and operates strictly as a frontend interface communicating with a Golang-based marketplace backend.

---

## 🚀 Key Features

- **Decoupled Architecture**: Pure client-side frontend that connects directly to the Golang marketplace APIs. No local database configuration, migration scripts, or local syncing overhead.
- **Premium Design System**: Fully responsive mobile-first design with smooth transitions, customized color palettes, modern typography, and curated layouts tailored for organic marketplace branding.
- **Robust Authentication**: Fully integrated sign-in, sign-up, email verification, and password reset flows powered by TanStack Query hooks, Zustand state management, and React Hook Form.
- **Multi-language Support (i18n)**: Fully translated into English (`en`) and Indonesian (`id`) using `next-intl` with automated missing translation checks.
- **Modern Tooling & Quality Assurance**:
  - **Linter**: Oxlint with the Ultracite preset (providing rapid, type-aware linting).
  - **Formatter**: Oxfmt for uniform styling rules.
  - **Unit Testing**: Vitest and browser mode.
  - **E2E/Integration Testing**: Playwright test suites verifying static page navigation, multi-language switching, and visual regression.
  - **SEO & Metadata**: Optimized with JSON-LD, Sitemap.xml, and dynamic open-graph configurations.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Data Fetching & Caching**: TanStack React Query v5
- **Form Validation**: React Hook Form + Zod
- **Localization**: next-intl
- **Testing**: Vitest & Playwright

---

## 📦 Getting Started

### Prerequisites
- Node.js 24+ and npm

### Installation
Clone this repository and install dependencies:
```bash
npm install
```

### Running Locally
To launch the project locally in development mode:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. 

*Note: Ensure your Golang backend is running on `http://localhost:8080` (or the configured `NEXT_PUBLIC_API_URL`) to allow seamless API requests and user authentication.*

---

## 💻 Available Scripts

Below are the primary commands configured in this project:

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server on port 3000 |
| `npm run build` | Builds an optimized production version of the application |
| `npm run start` | Runs the production-built Next.js server locally |
| `npm run lint` | Runs rapid code style and lint checks with Oxlint/Ultracite |
| `npm run lint:fix` | Automatically resolves fixable lint/formatting issues |
| `npm run check:types` | Runs static type safety check across all files |
| `npm run check:i18n` | Validates missing, unused, or invalid localized keys |
| `npm run test` | Runs unit tests using Vitest |
| `npm run test:e2e` | Runs E2E and integration tests using Playwright |

---

## 📁 Project Structure

```text
.
├── public/                         # Public static assets (images, icons)
├── src/
│   ├── app/                        # Next.js Pages (App Router with i18n locales)
│   ├── components/                 # Global UI, layout, and shared components
│   ├── features/                   # Feature-based business logic (e.g. auth hooks, forms)
│   ├── libs/                       # Configuration wrappers (Arcjet, environment, i18n)
│   ├── locales/                    # English (en.json) and Indonesian (id.json) messages
│   ├── styles/                     # Global CSS stylesheets
│   ├── types/                      # Global TypeScript definitions
│   ├── utils/                      # Common helpers and App Config
│   └── validations/                # Schemas and validation logic
├── tests/
│   ├── e2e/                        # Playwright integration & E2E tests
│   └── integration/                # Integration tests
├── next.config.ts                  # Next.js configurations
├── package.json                    # Dependencies, scripts, and package metadata
├── playwright.config.ts            # Playwright testing configuration
├── tsconfig.json                   # TypeScript configuration
└── vitest.config.ts                # Vitest configuration
```

---

## 📝 Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for code history. Commit messages must use one of the following prefixes:
- `feat`: New feature or page
- `fix`: Bug fix
- `docs`: Documentation updates
- `style`: Formatting changes
- `refactor`: Restructuring code with no behavior changes
- `test`: Adding or editing tests
- `chore`: Maintenance (dependencies, configurations, etc.)
