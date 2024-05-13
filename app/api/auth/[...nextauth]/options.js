import { connectDB, signupUpdateUser } from "@/utils/database";
import GitHubProvider from "next-auth/providers/github";

export const options = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/?login=true",
    signOut: "/?logout=true",
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

        return user;
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token._id = user._id;
        token.name = user.name;
        token.image = user.picture;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.image = token.image;
      }

      if (session) return session;
    },
  },
};
