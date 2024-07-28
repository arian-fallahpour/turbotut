import Subscription from "@/models/subscriptionModel";
import User from "@/models/userModel";
import { connectDB } from "@/utils/database";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/",
    newUser: "/courses",
  },
  providers: [
    GitHubProvider({
      async profile(profile) {
        await connectDB();

        const name = profile.name.split(" ");

        // Signup/update user
        const user = await User.signupUpdateUser({
          firstName: name[0],
          lastName: name[1],
          email: profile.email,
          picture: profile.avatar_url,
        });

        // Check if user has premium
        const subscription = await Subscription.findActive(user._id);
        if (subscription) {
          user.subscription = "premium";
        }

        return user;
      },
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      async profile(profile) {
        await connectDB();

        const name = profile.name.split(" ");

        // Signup/update user
        const user = await User.signupUpdateUser({
          firstName: name[0],
          lastName: name[1],
          email: profile.email,
          picture: profile.picture,
        });

        // Check if user has premium
        const subscription = await Subscription.findActive(user._id);
        if (subscription) {
          user.subscription = "premium";
        }

        return user;
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.isBanned) return "/";

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.picture = user.picture;
        token.role = user.role;
        token.subscription = user.subscription;
        token.lastLoggedIn = user.lastLoggedIn;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.role = token.role;
        session.user.picture = token.picture;
        session.user.subscription = token.subscription;

        session.tokenIssuedAt = token.lastLoggedIn;
      }

      if (session) {
        return session;
      }
    },
  },
};
