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

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-5469d4?style=for-the-badge&logo=stripe&logoColor=ffffff)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Amazon S3](https://img.shields.io/badge/Amazon%20S3-FF9900?style=for-the-badge&logo=amazons3&logoColor=white)
![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

</header>

## Website

The TurboTut website is accessible by visiting the following url: https://www.turbotut.com/

<img width="1470" height="802" alt="Screenshot 2025-12-01 at 10 06 48 PM" src="https://github.com/user-attachments/assets/43dcef5f-e117-464b-8bca-a320230ac4b3" />

## Youtube Channel

TurboTut's website is not the only place that you can learn from us! We have a dedicated Youtube channel with over **3,000,000** views and more than **2,900** subscribers!

Check us out at: https://www.youtube.com/@user-fl5xn8dw4k

## Technologies Used

| Technology                                                                                                      | Description                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)   | Utilized to create reusable components and smoothly handle front-end actions.                                                        |
| ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)            | Connects the backend to the front-end by enabling server-side rendering and image optimization for the web app.                      |
| ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)         | Handled the back-end architecture of the application, allowing for connectivity with other external APIs such as MongoDB and Stripe. |
| ![Stripe](https://img.shields.io/badge/Stripe-5469d4?style=for-the-badge&logo=stripe&logoColor=ffffff)          | The Stripe API was used to implement subscription payments into the application, as well as track user spending.                     |
| ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) | Documents and user data were stored using MongoDB and created a basis for the logic of the subscription payments model system.       |
| ![Amazon S3](https://img.shields.io/badge/Amazon%20S3-FF9900?style=for-the-badge&logo=amazons3&logoColor=white) | User profile pictuers and course content (JSON) were stored and tracked in S3 buckets.                                               |
| ![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)         | ChatGPT was used to generate the course content faster by abiding to the JSON format the application reads off of.                   |
| ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)          | Python was used to generate the animated math/physics videos.                                                                         |
| Oauth                                                                                                           | Oauth was used to create a fast and easily login experience for users.                                                               |


## Technical Architecture

### 📚 Content Management 📚

All lessons are managed through a content management system (CMS) using **ReactJS**, with data stored in **AWS S3** as JSON files and tracked using a **MongoDB** database.

### 🔑 User Authentication 🔑

TurboTut uses **OAuth** for secure login. This allowed for a fast, and secure login experience using common login providers such as Google and GitHub.

### 👤 Role-based Access 👤

- Guests and Non-premium users can view free lectures and view/manage their profile.
- Premium users can view paid lectures, managed their payment methods and choose to cancel/continue their subscription
- Admins can access additional features like viewing and editing lectures, managing database documents via a custom dashboard, and more.
  ents, offering users a seamless and secure payment experience.

### 📄 Document Storage 📄

Documents for users, subscriptions, orders, courses, course chapters, course lectures and more are stored in the non-relational **MongoDB** database.

## Admin Features

- **Lecture Management**: View and edit all lesson content.
- **Database Interaction**: Admins can view and update database documents directly from the admin dashboard.
- **Role Management**: Manage user roles and access levels.
- **Subscription Control**: Full access to user subscription details and payment history via Stripe integration.

Admin dashboard: 
<img width="1470" height="800" alt="Screenshot 2025-12-01 at 10 04 02 PM" src="https://github.com/user-attachments/assets/12f9eaf0-3546-45ba-80bd-a0ae4131933c" />

## How to Buy a Subscription

1. Sign up for an account using **OAuth** (Google or GitHub).
2. Choose your subscription plan through **Stripe**.
3. Start learning with our comprehensive lessons and chapter tests.
4. If you're an admin, access the dashboard to manage content, users, and subscriptions.

## Deployment

First fork the project by clicking on the Fork button,
then, in the directory you wish your project to be cloned in, do the following:

```
git clone https://github.com/[Your Username}/turbotut
cd ./turbotut
npm run dev
```

Now you should have the development version running on your computer at http://localhost:3000!
