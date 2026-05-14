# iyf-s10-week-09-Kimiti4
# Week 9: React Advanced – Effects, Routing & API Integration

## Author
- **Name:** Dennis kibathi
- **Date:** April 21, 2026

## Project Description
An advanced React application that transforms CommunityHub into a multi-page, API-driven platform. Covers `useEffect` for side effects, data fetching patterns, React Router for navigation, custom hooks for reusability, and professional styling with CSS Modules/Tailwind. Features a complete frontend with dynamic routing, real API integration, loading/error states, and a reusable component library.

## Technologies Used
- React 18 (Functional Components + Hooks)
- React Router DOM v6 (Client-side routing)
- Vite (Build tool & dev server)
- JavaScript (ES6+)
- CSS Modules / Tailwind CSS (Styling)
- JSONPlaceholder API (Mock backend)
- Custom Hooks (`useFetch`, `useLocalStorage`, `useToggle`, `useForm`)

## Features
### Lesson 17: Effects, Data Fetching & Routing
- ✅ `useEffect` hook: mount, update, cleanup patterns
- ✅ Data fetching with loading/error states
- ✅ Custom `useFetch` hook for reusable API calls
- ✅ React Router setup with nested routes
- ✅ Dynamic routes with `:params` (PostDetail)
- ✅ Programmatic navigation with `useNavigate`
- ✅ Active link styling with `NavLink`

### Lesson 18: React Patterns & Styling
- ✅ Custom hooks: `useLocalStorage`, `useToggle`, `useForm`
- ✅ CSS Modules for scoped, collision-free styles
- ✅ Tailwind CSS utility-first styling setup
- ✅ Reusable component library (Button, Input, Card, Modal, Avatar)
- ✅ Professional loading spinners & error messages
- ✅ Form validation with touched/error states

### Mini-Project: Complete CommunityHub Frontend
#### 🗺️ Multi-Page Routing
| Page | Route | Features |
|------|-------|----------|
| Home | `/` | Welcome message, recent posts preview, CTA |
| Posts | `/posts` | Full post list, search/filter, pagination ready |
| Post Detail | `/posts/:id` | Single post view, back navigation, API fetch |
| Create Post | `/create` | Form with validation, local state submission |
| About | `/about` | Static content, team info, project overview |

#### 🔄 API Integration
- Fetch posts from JSONPlaceholder API
- Handle loading states with animated spinner
- Display user-friendly error messages with retry
- Debounced search for real-time filtering
- Optimistic UI updates for likes

#### 🎨 Component Library (`src/components/shared/`)
- **Button**: Variants (primary, secondary, outline, danger, ghost), sizes, loading state, fullWidth
- **Input**: Label, error handling, validation states, required indicator
- **Card**: Reusable wrapper with title, variant support, hover effects
- **Modal**: Overlay, close on escape/backdrop, focus trapping ready
- **Avatar**: Initials fallback, size variants, online status indicator
- **LoadingSpinner**: Customizable size, text, animation
- **ErrorMessage**: Icon, message, optional retry callback

#### ⚙️ Advanced Patterns
- Centralized state management with context-ready structure
- Form handling with `useForm` custom hook (validation, touched, reset)
- Theme persistence with `useLocalStorage`
- Modal toggle with `useToggle`
- Responsive design with mobile-first CSS

## How to Run
### Option 1: Development Mode
```bash
# 1. Clone the repository
git clone https://github.com/Kimiti4/iyf-s10-week-09-Kimiti4.git
cd iyf-s10-week-09-Kimiti4

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# → Visit http://localhost:5173
