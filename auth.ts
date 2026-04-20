import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { User } from '@/app/lib/models'; // Import your Mongoose Model
import { dbConnect } from '@/app/lib/dbConnect';
import bcrypt from 'bcrypt';



async function getUser(email: string) {
  try {
    await dbConnect();
    // Using Mongoose to find the user by email
    const user = await User.findOne({ email }).lean();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          
          if (!user) return null;

          // Compare the provided password with the hashed password in MongoDB
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user as any;
        }

        
        return null;
      },
    }),
  ],
});