<header>
  <p align="center">
    <img src="./public/logo.svg" width="100" alt="TurboTut Logo"/>
  </p>

  <h1 align="center">TurboTut</h1>

  <p align="center">
    <a href="https://www.turbotut.com/">Home</a>
    •
    <a href="https://www.turbotut.com/courses">Courses</a>
    • 
    <a href="https://www.turbotut.com/pricing">Pricing</a>
  </p>

  <p align="center">
  TurboTut is an online education platform designed to help high school students learn subjects faster and more effectively. Our focus is on delivering high-quality lessons in Grade 12 Physics and Grade 12 Calculus, making sure students have the knowledge and skills to excel.
  </p>
</header>

## Website

The TurboTut website is accessible by visiting the following url: https://www.turbotut.com/

## Youtube Channel

TurboTut's website is not the only place that you can learn from us! We have a dedicated Youtube channel with over **3,000,000** views and more than **2,900** subscribers!

Check us out at: https://www.youtube.com/@user-fl5xn8dw4k

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
