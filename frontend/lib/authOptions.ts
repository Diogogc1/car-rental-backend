// Seu arquivo de configuração do NextAuth (ex: lib/auth.ts ou app/api/auth/[...nextauth]/auth.ts)

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend next-auth types to include 'id' on User and Session
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { id: string }; // id é obrigatório na sessão
  }
  interface User extends DefaultUser {
    id: string; // id é obrigatório no usuário
  }
}

// Estendendo o tipo do token JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
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
        // Validação inicial para garantir que as credenciais existem
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // A chamada fetch acontece no lado do servidor, então usamos a URL completa.
          // É crucial ter a variável de ambiente NEXTAUTH_URL configurada.
          const res = await fetch(`${process.env.NEXTAUTH_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          console.log("\n\n DEU CERTO AAAAAAAAAAAAAAAAAAAAAAAAAA \n\n");

          if (!res.ok) {
            // Se a resposta da API não for 'ok' (ex: status 401), não retorne o usuário.
            console.error(
              `Falha na autenticação: ${res.status} ${res.statusText}`
            );
            return null;
          }

          const user = await res.json();

          // Se a API retornar os dados do usuário, o NextAuth criará uma sessão.
          if (user) {
            return user; // O objeto `user` retornado aqui será passado para o callback `jwt`.
          }
        } catch (e) {
          console.error("Erro na autorização: ", e);
          return null;
        }

        // Retorna null por padrão se algo der errado
        return null;
      },
    }),
  ],

  // Callbacks são essenciais para controlar o que acontece com o token e a sessão.
  callbacks: {
    // O callback 'jwt' é chamado sempre que um JSON Web Token é criado ou atualizado.
    jwt: async ({ token, user }) => {
      // O `user` só está disponível no primeiro login.
      // Adicionamos o ID do usuário ao token.
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // O callback 'session' é chamado sempre que uma sessão é verificada.
    session: async ({ session, token }) => {
      // Adicionamos o ID que está no token para o objeto da sessão.
      // Agora você poderá acessar `session.user.id` no lado do cliente.
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  // É uma boa prática definir a estratégia de sessão e as páginas de login.
  session: {
    strategy: "jwt", // Use JSON Web Tokens para sessões
  },
};
