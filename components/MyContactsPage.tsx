import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const MyContactsPage = () => {
    const { data: session, status } = useSession();
    const [contacts, setContacts] = useState<any[]>([])
    const [loading, setLoading] = useState(true);
    const fetchContacts = async () => {
        const { data } = await axios.get(`/api/get-my-contacts`);
        setContacts(data.data);
        setLoading(false);
    }
    useEffect(() => {
        if (session) {
            fetchContacts()
        }
    }, [session])

    const handleToggleNotification = async (id: string, curr: boolean) => {
        try {
            await axios.post("/api/toggle-notifications", { id, curr });
            fetchContacts();
        } catch (err) {
            console.log(err);
        }
    };
    const handleDeleteContact = async (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this contact?");
        if (!confirm) {
            return;
        }
        try {
            await axios.post("/api/delete-contact", { id });
            fetchContacts();
        } catch (err) {
            console.log(err);
        }
    }
    const daysLeft = (date: Date) => {
        const today = new Date();
        const birthday = new Date(date);
        const thisYear = today.getFullYear();
        birthday.setFullYear(thisYear);
        if (birthday < today) {
            birthday.setFullYear(thisYear + 1);
        }
        const diff = birthday.getTime() - today.getTime();
        return Math.ceil(diff / (1000 * 3600 * 24));
    }
    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    Hang tight while we load your contacts...
                </div>

            ) : (
                <>
                    <h1 className="text-3xl font-bold text-center text-base-content py-4">
                        {contacts.length === 0 ? "You have no contacts yet." : "My Contacts"}
                    </h1>
                    {contacts.length === 0 ? (
                        <div className="flex justify-center flex-col pt-4 items-center">
                            <Link href="/add-contact" className="btn btn-outline btn-wide mt-2">
                                Add a New Contact
                            </Link>
                        </div>
                    ) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:md:sm:px-12 px-1">
                        {contacts.map((contact, index) => (
                            <div className="card w-96 glass" key={index}>
                                <figure>
                                    <img src={`https://images.unsplash.com/photo-1623638308715-49498b199bcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80`} alt="Celebration!" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {contact.name}
                                    </h2>
                                    <p>
                                        {daysLeft(contact.birthday) === 366 ? `Today is ${contact.name}'s Birthday!` : `${daysLeft(contact.birthday)} days till ${contact.name}'s birthday!`}
                                        <br />
                                        {daysLeft(contact.anniversary) === 366 ? `Today is ${contact.name}'s anniversary!` : `${daysLeft(contact.anniversary)} days till their anniversary!`}
                                    </p>
                                    <div className="card-actions">
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">
                                                    Notifications
                                                </span>
                                                <input type="checkbox"
                                                    onChange={() => handleToggleNotification(contact.id, contact.notifications)}
                                                    checked={contact.notifications}
                                                    className="checkbox ml-2" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="card-actions flex justify-start">
                                        <button className="btn btn-ghost" onClick={() => handleDeleteContact(contact.id)}>
                                            Delete
                                        </button>
                                        <Link href={`/user/event/${contact.id}`}>
                                            <button className="btn btn-ghost">
                                                AI GIFT RECOMMENDATION
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>)}

                </>)}
        </div>
    );
}

export default MyContactsPage;