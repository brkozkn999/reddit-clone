import React from 'react'
import prisma from '../lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import SettingsForm from '../components/settings-form';
import { unstable_noStore as noStore } from "next/cache";


async function getData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            email: true,
            firstName: true,
            lastName: true,
            userName: true
        }
    });

    return data;
}

async function SettingsPage() {
    noStore();
    /* TODO: add inputs for all informations */
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user)
        return redirect("/api/auth/login")

    const data = await getData(user?.id);
    return (
        <div className='max-w-[1000px] mx-auto flex flex-col mt-4'>
            <SettingsForm email={data?.email as string} firstname={data?.firstName as string} lastname={data?.lastName as string} username={data?.userName} />
        </div>
    )
}

export default SettingsPage