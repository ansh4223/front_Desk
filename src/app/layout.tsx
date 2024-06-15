'use client';
import Image from 'next/image';
import './globals.css';
import { useState } from 'react';
import { FaBars, FaGlobe } from 'react-icons/fa';
import { BiCube } from 'react-icons/bi';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { GoArrowSwitch, GoInbox } from 'react-icons/go';
import { CgSandClock, CgProfile } from 'react-icons/cg';
import { SlCalender } from 'react-icons/sl';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import { RiDashboardLine } from 'react-icons/ri';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
    return formattedTime;
  };

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return now.toLocaleDateString('en-US', options);
  };

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <div className={`h-full bg-gray-100 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-56'}`}>
            <div className="p-4 flex items-center justify-between border-b border-gray-300">
              <div className="flex items-center">
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-700 focus:outline-none">
                  <Image src='/logo.JPG' alt="Logo" width={32} height={32} className="mr-2" />
                </button>
                {!isCollapsed && <span className="text-lg font-semibold">Front-Desk</span>}
              </div>
              <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-700 focus:outline-none">
              {!isCollapsed && <FaBars />}
              </button>
            </div>
            <div className="flex-grow p-4">
              <nav>
                <ul>
                  <li className="mb-4">
                    <div className="flex items-center justify-between bg-white p-2 rounded-lg">
                      {!isCollapsed && <span className="text-sm">Location Name</span>}
                      <GoArrowSwitch className="text-gray-500 inline-block" />
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="bg-gray-300 p-2 rounded-lg">
                      {!isCollapsed && (
                        <span className="text-sm">
                          {getCurrentTime()} {getCurrentDate()}
                        </span>
                      )}
                      <div className="flex items-center">
                        <FaGlobe className="text-gray-500 inline-block mr-2" />
                        {!isCollapsed && <span className="text-sm">UTC+5:30 (Kolkata, India)</span>}
                      </div>
                    </div>
                  </li>
                  <li className="mb-4 flex items-center">
                    <GoInbox className="mr-2" />
                    {!isCollapsed && <a href="#" className="text-gray-700 hover:text-gray-900">Orders</a>}
                  </li>
                  <li className="mb-4 flex items-center">
                    <BiCube className="mr-2" />
                    {!isCollapsed && <a href="#" className="text-gray-700 hover:text-gray-900">Subscriptions</a>}
                  </li>
                  <li className="mb-4 flex items-center">
                    <SlCalender className="mr-2" />
                    {!isCollapsed && <a href="#" className="text-gray-700 hover:text-gray-900">Calendar</a>}
                  </li>
                  <li className="mb-4 flex items-center bg-white p-2 rounded-lg">
                    <CgSandClock className="mr-2" />
                    {!isCollapsed && <a href="#" className="text-gray-700 hover:text-gray-900">Waitlist</a>}
                  </li>
                </ul>
              </nav>
            </div>
            <div className="p-2 border-t border-gray-300 flex justify-between">
              <div className="flex items-center">
              {!isCollapsed && <RiDashboardLine className="inline-block mr-1" />}
                {!isCollapsed && <span className="text-sm mr-8 justify-around">Dashboard</span>}
              </div>
              <BsBoxArrowUpRight className="inline-block" />
            </div>
            <div className="p-2 border-t bg-white border-gray-300 border-y-2 border-x-2">
              
                <CgProfile className="mr-2 inline-block" />
                {!isCollapsed && (
                  <>
                    <span className="text-sm">Admin name</span>
                    <br />
                    <a href="mailto:adminname@mail.com" className="text-sm text-gray-500">adminname@mail.com</a>
                  </>
                )}
              
            </div>
            <div className="p-1 border-t border-gray-300">
              
                <RxQuestionMarkCircled className="mr-2 inline-block" />
                {!isCollapsed && (
                  <>
                    <span className="text-sm">Help center</span>
                    <br />
                    <span className="text-sm text-gray-500">@2024 Omnify.Inc</span>
                  </>
                )}
              
            </div>
          </div>
          <div className="flex-grow h-full bg-white p-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
