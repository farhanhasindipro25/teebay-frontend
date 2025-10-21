# 🧾 Part_4_documentation.md

## Teebay – Technical Documentation

This document provides a brief technical overview of how each part of the **Teebay** application was implemented.  
Teebay is a full-stack product renting and buying/selling platform built using **ReactJS**, **MantineUI**, and **GraphQL**.

---

## ⚙️ Tech Stack Overview

| Layer           | Technology                       | Purpose                                               |
| --------------- | -------------------------------- | ----------------------------------------------------- |
| **Frontend**    | React + Apollo Client            | UI rendering, GraphQL queries/mutations, Apollo cache |
| **Backend**     | NestJS (GraphQL + Apollo Server) | API, resolvers, business logic                        |
| **ORM**         | Prisma                           | Database modeling and migrations                      |
| **Database**    | PostgreSQL                       | Persistent storage                                    |
| **Environment** | dotenv + Docker                  | Config management and containerization                |
| **Validation**  | class-validator                  | Input validation                                      |

---

---

## ⚙️Codebase Architecture

## ⚙️ Codebase Architecture

- `src` folder contains the main codebase.
- `apps` folder contains the different pages of the project.
- `components` folder contains reusable global components used throughout the codebase.
- `constants` folder contains constant variables and structures.
- `hooks` folder contains custom React hooks for reusable logic.
- `layouts` folder contains layout components and page structure wrappers.
- `providers` folder contains providers such as ApolloProvider, ThemeProvider, RouterProvider, etc.
- `services` folder contains service modules for API communication and business logic.
- `mutations` folder contains GraphQL mutation definitions.
- `queries` folder contains GraphQL query definitions.
- `utils` folder contains utility functions and helper methods.
- `validators` folder contains form validation schemas and validation logic.

---

## 🧩 PART 1 – Login and Registration

### Features

-   User registration with `name`, `email`, `password`, `phone`, and `address`.
-   Simple login via email/password matching.
-   Protected routes.

### Implementation

-   **Form Handling:** Implemented with MantineForms.
-   **Validation:** Client-side validation done by yup.
-   **GraphQL Integration:** Apollo Client for storing user information.
-   **Error Handling:** User-friendly error messages displayed for duplicate emails, invalid credentials, or network failures.

### Corner Cases

-   Duplicate registration attempts with error feedback.
-   Invalid email format or weak passwords rejected.

---

## 🧱 PART 2 – Product Management

### Features

-   View all products in a stack layout.
-   Create new products with multiple category selection.
-   Edit existing products (owner only).
-   Delete products (owner only, if not bought or rented).
-   View detailed product information.

### Implementation

-   **Form Components:** Reusable multi-step ProductForm done by Mantine Stepper.
-   **Category Selection:** Multi-select dropdown using MantineUI.
-   **Validation:** Validation done by yup.
-   **Authorization:** Client-side checks to ensure only product owners can edit or delete.
-   **Optimistic Updates:** Apollo cache updates or refetches for immediate UI feedback before server confirmation.

### Corner Cases

-   Unauthorized edit/delete attempts blocked with error messages.
-   Cannot delete products that are bought or rented.
-   Empty state displays when user has no products.
-   Loading skeletons during data fetch for better UX.
-   Price validation ensures positive numbers only.

---

## 💰 PART 3 – Rent and Buy/Sell

### Features

-   Browse available products created by all users.
-   Buy products with confirmation dialog.
-   Rent products with date range selection.
-   View transaction history categorized as bought, sold, borrowed, and lent.
-   Filter and search through transactions via Mantine Tabs.

### Implementation

-   **Date Picker:** Mantine Dates for rental date selection with validation.
-   **Confirmation Dialogs:** Modal dialogs for buy and rent actions to prevent accidental transactions.
-   **Transaction Display:** Tab-based interface separating bought, sold, borrowed, and lent items.
-   **Real-time Updates:** Apollo cache invalidation after successful transactions to reflect updated product availability.
-   **Date Validation:** Past dates disabled for rent start date, end date must be after start date.


### Corner Cases

-   Cannot buy or rent own products.
-   Cannot rent products that are already rented or bought.
-   Rent start date cannot be in the past.
-   Rent end date must be after start date with validation feedback.
-   Confirmation required before finalizing purchase or rental.

---

## 🧠 Design Decisions

-   **Component-Based Architecture:** Modular components organized by feature (auth, products, transactions) for maintainability.
-   **Apollo Client for Data Management:** Centralized GraphQL queries and mutations with normalized caching.
-   **MantineForms:** Efficient form state management with minimal re-renders.
-   **MantineUI Design System:** Consistent UI components and theming across the application.
-   **Custom Hooks:** Reusable logic extracted into custom hooks (useCurrentUser).
-   **Error Boundaries:** Component-level error handling for graceful failure recovery.
-   **Route Protection:** Protectedlayout and isPrivate flag for protected routes with automatic redirect to login.
-   **Code Splitting:** Route-based lazy loading for optimized bundle size.

---

## Installation

```bash
$ npm install
```

## Running the app

```bash
# build command
$ npm run build

# development mode
$ npm run dev
```

## **THANK YOU**
