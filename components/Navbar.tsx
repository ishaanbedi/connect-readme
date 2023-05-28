import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import {
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell,
} from '@novu/notification-center';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsTwitter, BsGithub } from 'react-icons/bs';
function NavBar() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                </div>
                <Link href="/" className="btn btn-ghost normal-case text-xl">
                    Special Dayz
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
            </div>
            <div className="navbar-end">
                {loading ? (
                    <span>
                        <AiOutlineLoading3Quarters className="animate-spin" />
                    </span>
                ) : session ? (
                    <div className='flex items-center justify-center'>
                        <NovuProvider subscriberId={session.user!.email as string} applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_IDENTIFIER as string}>
                            <PopoverNotificationCenter colorScheme={'dark'}>
                                {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
                            </PopoverNotificationCenter>
                        </NovuProvider>
                        <Link href={"https://www.twitter.com/ishnbedi"} target="_blank" rel="noopener noreferrer">
                            <BsTwitter className="text-2xl ml-4" />
                        </Link>
                        <Link href={"https://www.github.com/ishaanbedi/specialdayz"} target="_blank" rel="noopener noreferrer">
                            <BsGithub className="text-2xl ml-4" />
                        </Link>
                        <div className="dropdown dropdown-end  ml-2">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-8 rounded-full">
                                    <img src={
                                        session.user!.image ? session.user!.image : `https://ui-avatars.com/api/?name=${session.user!.name}`
                                    } />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                <li><button className='btn btn-outline' onClick={() => { signOut() }}>Logout</button></li>
                                <Link href={`/user/ai`}>
                                    <li>
                                        <button className='btn btn-outline mt-2'>
                                            AI Dashboard
                                        </button>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => signIn()} className="btn btn-ghost">Sign in</button>
                )}
            </div>
        </div>
    );
}

export default NavBar;
