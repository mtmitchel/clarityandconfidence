# Clarity and Confidence

A thoughtful and comprehensive resource website designed to empower women and mothers considering divorce. This application provides essential knowledge, tools, and guidance to help make informed decisions during this significant life transition.

## Features

- 🧠 **Comprehensive Knowledge Base** - Essential information on financial, legal, and emotional aspects of divorce
- � **Financial Planning Tools** - Understanding assets, budgeting, and financial independence
- ⚖️ **Legal Guidance** - Overview of legal processes, rights, and considerations
- 👶 **Children & Family** - Resources for navigating divorce with children's wellbeing in mind
- 🏠 **Local Support** - Tools to find local resources and support networks
- 💪 **Resilience Building** - Emotional support and personal empowerment resources
- 🔒 Quick escape functionality for privacy
- 📱 Mobile-responsive design for access anywhere
- 🎨 Modern, accessible UI with intuitive navigation
- 💾 Local storage to save progress through sections

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/clarity-and-confidence.git
cd clarity-and-confidence
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Building for Production

```bash
pnpm build
# or
npm run build
```

## Deployment to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Update the repository name in `vite.config.ts` base path
3. Deploy:
```bash
pnpm deploy
# or
npm run deploy
```

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons

## Project Structure

```
src/
├── components/          # React components
│   ├── sections/       # Main content sections
│   └── ui/            # Reusable UI components
├── hooks/             # Custom React hooks
└── lib/               # Utility functions
```

## Contributing

This project aims to provide helpful resources for those in need. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Important Notice

This application is designed to be a supportive resource. If you or someone you know is in immediate danger, please contact emergency services or your local domestic violence hotline immediately.

## License

This project is open source and available under the [MIT License](LICENSE).

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
