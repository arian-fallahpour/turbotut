import Subscription from "@/models/subscriptionModel";
import { connectDB, signupUpdateUser } from "@/utils/database";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/?login=true",
    signOut: "/",
    newUser: "/courses",
  },
  providers: [
    GitHubProvider({
      async profile(profile) {
        await connectDB();

        const name = profile.name.split(" ");

        // Signup/update user
        const user = await signupUpdateUser({
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
        const user = await signupUpdateUser({
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
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.image = user.picture;
        token.role = user.role;
        token.subscription = user.subscription;
      }

      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user._id = token._id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.role = token.role;
        session.user.image = token.image;
        session.user.subscription = token.subscription;
      }

      if (session) return session;
    },
  },
};
