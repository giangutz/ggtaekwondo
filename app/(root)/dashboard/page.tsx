import { getUserById } from '@/lib/actions/user.actions'
import { getUserMetadata } from '@/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
    const user = getUserMetadata();
    let userId;
    if(user) {
        redirect(`/dashboard/${user.userId}`);
    }
}

export default Page;