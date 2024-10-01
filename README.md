This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# turbotut

**TurboTut** is an online education platform designed to help high school students learn subjects faster and more effectively. Our focus is on delivering high-quality lessons in **Grade 12 Physics** and **Grade 12 Calculus**, making sure students have the knowledge and skills to excel.

## Features

### Learning Experience
- **Comprehensive Lessons**: TurboTut provides essential lessons that cover all the key concepts required for Grade 12 Physics and Calculus.
- **Interactive Questions**: Each lesson includes carefully crafted questions to help students grasp the material more deeply.
- **Chapter Tests**: At the end of each chapter, students take a test with **critical thinking problems** to assess their understanding and application of the content.

### Technical Architecture
- **Content Management**: All lessons are managed through a content management system (CMS), with data stored in **AWS S3** as JSON files and tracked using a **MongoDB** database.
- **User Authentication**: TurboTut uses **OAuth** for secure login. Users are assigned a role of either "User" or "Admin."
- **Role-based Access**:
  - **Users** can take lessons, track progress, and manage subscriptions.
  - **Admins** can access additional features like viewing and editing lectures, managing database documents via a custom dashboard, and more.
- **Admin Dashboard**: Admins use a secure **REST API** to safely view and edit data stored in the database, providing full control over content and user management.
- **Subscription Management**: TurboTut integrates with **Stripe** for subscription payments, offering users a seamless and secure payment experience.

## Admin Features
- **Lecture Management**: View and edit all lesson content.
- **Database Interaction**: Admins can view and update database documents directly from the admin dashboard.
- **Role Management**: Manage user roles and access levels.
- **Subscription Control**: Full access to user subscription details and payment history via Stripe integration.

## Technologies Used
- **AWS S3**: For content storage.
- **MongoDB**: Database for tracking content and user data.
- **OAuth**: Secure user authentication.
- **Stripe**: Subscription payment processing.
- **REST API**: Secure interaction between frontend and backend services.

## How to Get Started
1. Sign up for an account using **OAuth** (Google, Facebook, etc.).
2. Choose your subscription plan through **Stripe**.
3. Start learning with our comprehensive lessons and chapter tests.
4. If you're an admin, access the dashboard to manage content, users, and subscriptions.
