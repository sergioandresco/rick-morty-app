# 👽 Rick and Morty Characters app

![Rick-and-Morty-Characters-app-banner](https://microsistem.s3.us-east-2.amazonaws.com/rick-morty-banner.png)

> **Frontend application built for the Blossom technical interview**
> 🧑🏻‍💻 _Designed and developed with passion by Sergio Cobos._

[![Vercel](https://vercelbadge.vercel.app/api/sergioandresco/rick-morty-app)](https://rick-morty-app-kappa.vercel.app/)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🌐 Demo Live

👉 [https://rick-morty-app-kappa.vercel.app/](https://rick-morty-app-kappa.vercel.app/)

---

## 🎯 About the App

**Rick and Morty Characters app** is a frontend web platform that lets users explore, filter, favorite, and comment on characters from the Rick and Morty universe. Built using the Rick and Morty GraphQL API, the app provides a modern, dynamic experience focused on user interaction and clean design.

---

## 🧪 How to Use the App

To access all the data provided by the Rick and Morty API, you must first log in using GitHub, Google, Microsoft, or any other email provider. Once logged in, you'll be redirected to your personal dashboard, where you can:

- Browse all characters
- Filter by status, gender, and species
- Mark characters as favorites
- Soft-delete characters from your view
- Leave personal comments for each character

---

## 🔍 Working with the Rick and Morty API

This project uses the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) via the `graphql` and `graphql-request` libraries to fetch specific data for each view using tailored queries.

Since this is a frontend-only application without a real backend, **Zustand** is used to simulate a database. User data such as favorites, deleted characters, and comments are persisted using the browser's **localStorage**.

Additionally, **Clerk** is implemented for secure authentication and protected routes, allowing access to character data only after successful login.

---

## 🔌 API Usage

This project integrates the Rick and Morty GraphQL API to retrieve and manage character data in real time. The application uses multiple dynamic queries to support core features such as:

- 🔄 Paginated character listing for efficient data loading
- 🎯 Advanced filtering by status, species, and gender
- 🔍 Detailed character view, including origin and location information
- ⭐ Favorites functionality, storing selected characters locally
- 🗑️ Soft-deletion support for UI-only removal of characters

Here’s an example of a character detail query:

```graphql
const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      origin {
        name
      }
      location {
        name
      }
    }
  }
`;
```

---

## 🌍 Routing with React Router DOM

Routing is a key feature in this application. The structure is managed in `App.tsx` with both fixed and nested routes. It includes:

- Route protection
- Lazy loading for performance optimization
- Dynamic routing for character details

---

## 🚀 Features

-	🔎 Search and filter characters by status, species, or gender
-	⭐ Mark characters as favorites
-	💬 Leave comments on your favorite characters
-	🗑️ Soft-delete characters from your personal list
-	🔐 Access your personal dashboard after login
-	⚡ Smooth performance and a responsive layout

---

## 🔐 Authentication

To use the full functionality of the app, users must log in using Clerk, which supports GitHub, Google, Microsoft, and email-based authentication. Once authenticated, users are redirected to their own dashboard where they can interact with the characters list.

---

## 🛠️ Tech Stack

- ⚛️ React 18
- ⚡ Vite
- 🎨 Tailwind CSS
- 🧩 Shadcn UI (Radix-based component library)
- 🧬 GraphQL + graphql-request
- 🧭 React Router DOM
- 🧠 Zustand (for state management)
- 🔐 Clerk (authentication)
- 🚀 Vercel

---

### Requirements

- **Node.js** (Latest LTS version recommended) — [Download here](https://nodejs.org/)

---

## Procedure once the repository has been cloned

#### Clone the repository

    git clone https://github.com/sergioandresco/rick-morty-app.git

#### Install dependencies

    npm i

#### Run develop server

    npm run dev

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.