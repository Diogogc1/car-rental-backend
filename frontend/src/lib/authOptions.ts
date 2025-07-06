// Seu arquivo de configuração do NextAuth (ex: lib/auth.ts ou app/api/auth/[...nextauth]/auth.ts)

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend next-auth types to include 'id' on User and Session
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    accessToken: string;
  }
  interface Session {
    user?: User;
    isExpired?: boolean;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
  }
}

interface JWTPayload {
  sub: string;
  username: string;
  iat: number;
  exp: number;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!res.ok) {
            console.error(
              `Falha na autenticação: ${res.status} ${res.statusText}`
            );
            return null;
          }

          const user = (await res.json()) as { access_token: string };

          if (user) {
            const payload: JWTPayload = JSON.parse(
              atob(user.access_token.split(".")[1])
            );
            return {
              id: payload.sub,
              name: payload.username,
              email: credentials.email,
              accessToken: user.access_token,
            };
          }
        } catch (e) {
          console.error("Erro na autorização: ", e);
          return null;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }

      return token;
    },

    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.accessToken = token.accessToken as string;
        const payload: JWTPayload = JSON.parse(
          atob(session.user.accessToken.split(".")[1])
        );
        session.isExpired = Date.now() >= payload.exp * 1000;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
  },
};
