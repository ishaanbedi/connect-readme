import MyContactsPage from "@/components/MyContactsPage";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
const MyContacts = () => {
    const { data: session, status } = useSession()
    const router = useRouter();
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [session]);
    return (
        <div>
            <Head>
                <title>My Contacts | Special Dayz</title>
            </Head>
            <MyContactsPage />
        </div>
    );
}
export default MyContacts;