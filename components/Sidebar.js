import React from 'react'
import { useSession } from 'next-auth/client'
import {
    ChevronDownIcon,
    ShoppingBagIcon,
    UserGroupIcon,
} from '@heroicons/react/outline'
import {
    CalendarIcon,
    ClockIcon,
    DesktopComputerIcon,
    UsersIcon,
} from '@heroicons/react/solid'
import SidebarRow from '../components/SidebarRow'
const Sidebar = () => {
    const [session, loading] = useSession()
    return (
        <div className='p-2 mt-5 max-w-[600px] xl:min-w-[300px]'>
            <SidebarRow /* src={'https://i1.sndcdn.com/avatars-000130000038-ro6g90-t240x240.jpg'} */ Icon={UsersIcon} title='Friends' />
            <SidebarRow Icon={UserGroupIcon} title='Groups' />
            <SidebarRow Icon={ShoppingBagIcon} title='MarketPlace' />
            <SidebarRow Icon={DesktopComputerIcon} title='Watch' />
            <SidebarRow Icon={CalendarIcon} title='Events' />
            <SidebarRow Icon={ClockIcon} title='Memories' />
            <SidebarRow Icon={ChevronDownIcon} title='See More' />
        </div>
    )
}

export default Sidebar
