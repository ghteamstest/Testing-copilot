# Turborepo Next.js Monorepo

A modern monorepo built with Turborepo and Next.js, designed for scalable web application development with shared packages and optimized build pipelines.

## Purpose

This monorepo provides a foundation for building multiple Next.js applications with shared components, utilities, and configurations. It leverages Turborepo's intelligent build system to ensure fast, efficient development and deployment workflows.

## Tech Stack

- **Turborepo** - High-performance build system for JavaScript and TypeScript monorepos
- **Next.js** - Full-stack React framework for production-ready web applications
- **React** - Component-based UI library
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

## Repository Structure

This monorepo is organized with a clear separation between applications and shared packages:

```
./
├── apps/                    # Next.js applications
│   ├── web/                 # Main web application
│   ├── admin/               # Admin dashboard application  
│   └── docs/                # Documentation site
├── packages/                # Shared packages and libraries
│   ├── ui/                  # Shared UI components
│   ├── utils/               # Utility functions and helpers
│   ├── config/              # Shared configurations (ESLint, Tailwind, etc.)
│   └── database/            # Database schemas and utilities
├── package.json             # Root package configuration
├── turbo.json              # Turborepo configuration
└── tsconfig.json           # TypeScript configuration
```

## Applications

### Web App (`apps/web`)
The main customer-facing Next.js application featuring:
- Server-side rendering (SSR) and static site generation (SSG)
- API routes for backend functionality
- Responsive design with Tailwind CSS
- Shared UI components from the design system

### Admin Dashboard (`apps/admin`)  
Administrative interface for content and user management:
- Authentication and authorization
- Data management interfaces
- Analytics and reporting features
- Role-based access control

### Documentation (`apps/docs`)
Comprehensive documentation site built with Next.js:
- Component documentation with live examples
- API reference and guides
- Deployment and contribution guidelines

## Shared Packages

### UI Package (`packages/ui`)
Reusable React components and design system:
- Button, Input, Modal, and other common components
- Consistent styling and theming
- Storybook integration for component development
- TypeScript definitions for type safety

### Utils Package (`packages/utils`)
Common utilities and helper functions:
- Date formatting and manipulation
- Validation schemas and functions
- API client configurations
- Constants and type definitions

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/turborepo-nextjs-monorepo.git
cd turborepo-nextjs-monorepo
```

2. Install dependencies:
```bash
npm install
```

### Development

Start all applications in development mode:
```bash
npm run dev
```

Start a specific application:
```bash
npm run dev --filter=web
npm run dev --filter=admin
npm run dev --filter=docs
```

### Building

Build all applications:
```bash
npm run build
```

Build a specific application:
```bash
npm run build --filter=web
```

### Testing

Run tests across all packages:
```bash
npm run test
```

Run tests for a specific package:
```bash
npm run test --filter=ui
```

## Scripts

Available scripts in the monorepo:

- `dev` - Start all apps in development mode
- `build` - Build all apps for production
- `test` - Run all tests
- `lint` - Run ESLint across all packages
- `format` - Format code with Prettier
- `clean` - Clean all build artifacts
- `type-check` - Run TypeScript type checking

## Turborepo Features

This setup leverages Turborepo's powerful features:

- **Remote Caching** - Share build artifacts across team and CI
- **Parallel Execution** - Run tasks across packages simultaneously  
- **Incremental Builds** - Only rebuild what's changed
- **Task Pipeline** - Define dependencies between build tasks
- **Workspace Filtering** - Target specific apps or packages

## Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Contributing

We welcome contributions to improve this monorepo setup:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the established patterns
4. Ensure all tests pass (`npm run test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Guidelines

- Follow the existing code style and patterns
- Add tests for new functionality
- Update documentation as needed
- Use conventional commit messages
- Ensure TypeScript types are properly defined

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.