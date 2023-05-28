import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { XataAdapter } from "@next-auth/xata-adapter";
import { XataClient } from "@/src/xata";
const client = new XataClient();
export const authConfig = {
    adapter: XataAdapter(client),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
};
export default NextAuth(authConfig);