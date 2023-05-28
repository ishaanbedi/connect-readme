import AddContactPage from "@/components/AddContactPage";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
const AddContact = () => {
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
                <title>Add Contact | Special Dayz</title>
            </Head>
            <AddContactPage />
        </div>
    );
}
export default AddContact;