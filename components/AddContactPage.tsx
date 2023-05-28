import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { GrCircleInformation } from 'react-icons/gr'
import { useRouter } from "next/router";
const AddContactPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [anniversary, setAnniversary] = useState("");
  const [interests, setInterests] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!name) {
      alert("Please enter a name");
      setLoading(false);
      return;
    }
    if (!interests) {
      alert(`Please enter interests of ${name}`);
      setLoading(false);
      return;
    }
    try {
      const contact = {
        name,
        birthday,
        anniversary,
        interests,
        notifications,
        email: session?.user?.email,
      };
      await axios.post("/api/save-new-contact", contact);
      alert("Contact saved successfully!");
      setName("");
      setBirthday("");
      setAnniversary("");
      setInterests("");
      setNotifications(true);
      router.push("/my-contacts");
    } catch (error) {
    }
    setLoading(false);
  };
  return (
    <div className="container mx-auto h-screen pt-12 lg:md:sm:px-0 px-2">
      <h1 className="text-3xl font-bold text-center text-base-content py-4">
        Add a new contact
      </h1>
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <form className="bg-neutral-content shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => {
            handleFormSubmit(e);
          }}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full input input-bordered input-primary"
                id="name"
                type="text"
                placeholder="Eg. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="birthday"
              >
                Birthday
              </label>
              <input
                className="w-full input input-bordered input-primary"
                type="date"
                id="birthday"
                name="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />

            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="anniversary"
              >
                Anniversary
              </label>
              <input
                className="w-full input input-bordered input-primary"
                id="anniversary"
                type="date"
                value={anniversary}
                onChange={(e) => setAnniversary(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="text-gray-700 text-sm font-bold mb-2 flex items-center"
                htmlFor="interests"
              >
                Interests
                <span className="tooltip pl-1 tooltip-right" data-tip="Our AI will use this to suggest gifts for your loved ones.">
                  <GrCircleInformation data-tip="hello" className="inline-block cursor-pointer" />
                </span>
              </label>
              <input
                className="w-full input input-bordered input-primary"
                id="interests"
                type="text"
                placeholder="Eg. Reading, Writing, Travelling"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="text-sm text-gray-700">
                    Enable notifications for this contact:
                  </span>
                  <input
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)} type="checkbox" className="toggle" />
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button className="btn w-full" type="submit" disabled={loading}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
};

export default AddContactPage;
