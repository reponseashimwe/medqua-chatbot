# Healthcare Chatbot - Frontend

Modern Next.js frontend for the Healthcare Chatbot application.

## Features

-   💬 Real-time chat interface with conversation history
-   🎨 Beautiful, responsive UI with Tailwind CSS
-   📱 Mobile-friendly design
-   🔄 Multiple chat threads support
-   ⚡ Fast and optimized with Next.js App Router

## Setup

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Create a `.env.local` file based on `.env.local.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
web/
├── app/
│   ├── components/      # React components
│   │   ├── ChatInterface.tsx
│   │   ├── MessageBubble.tsx
│   │   └── Sidebar.tsx
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── public/              # Static assets
├── next.config.js       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── package.json         # Dependencies
```

## Environment Variables

| Variable              | Description          | Default                     |
| --------------------- | -------------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8000/api` |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Set the root directory to `web`
4. Add environment variables
5. Deploy!

### Other Platforms

For Render, Netlify, or other platforms:

1. Set build command: `npm run build`
2. Set start command: `npm start`
3. Set root directory: `web`
4. Configure environment variables

## Technologies

-   **Next.js 14** - React framework with App Router
-   **TypeScript** - Type safety
-   **Tailwind CSS** - Utility-first CSS framework
-   **React Hooks** - State management
