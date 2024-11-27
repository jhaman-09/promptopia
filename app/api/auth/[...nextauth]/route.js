import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
  ],

  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
      },
      

      async signIn({ account, profile, user, credentials }) {
          try {
              await connectDB();

              const userExits = await User.findOne({ email: profile.email });

              // if use not exits, create a new document and save user in MongoDB
              if (!userExits) {
                  await User.create({
                      email: profile.email,
                      username: profile.name.replace(" ", "").toLowerCase(),
                      image: profile.picture
                  });
              }


              return true;
          } catch (error) {
              console.log("Error checking if user exits: ", error.message);
              return false
            
          }
      }
  },
});


export {handler as GET, handler as POST}