# WYNN Task – Registration Form

This project is a task submission for WYNN. It features a fully functional **registration form** built with **React (Vite + TypeScript)**, using modern tools and best practices.

## ✨ Tech Stack

- **React** (Vite)
- **TypeScript**
- **React Hook Form** – for form state management and validation
- **SCSS** – for styling
- **Mock API** – using mock data to simulate backend integration
- **Testing** - Testing-library/react + Vitest

## 📝 Features

- Responsive registration form UI
- Field validation using `react-hook-form`
- SCSS for modular styling
- Form submission simulates API interaction using mock data
- Clean and accessible component structure

## 📂 Project Structure

src/
├── tests/ # Test files (Register.spec 4 tasks)
├── components/ # Reusable UI components
├── hooks/ # Custom hooks (if any)
├── mock/ # Mock API data and utilities
├── styles/ # SCSS files
└── main.tsx # main entry point

### 🔧 Start project

```bash
yarn install
```

OR

```bash
docker build -t wynn-registration-form .

docker run -d -p 5173:80 wynn-registration-form
```

OR

```bash
URL
```

### 🔧 Run tests

```bash
yarn test
```
