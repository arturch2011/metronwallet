'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'

// Define the interface for user data
interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export function TelegramInfo() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true after the first render to prevent SSR mismatches
    setIsClient(true);
    if (typeof window !== "undefined") {
      const user = WebApp.initDataUnsafe?.user;
      if (user) {
        setUserData(user as UserData);
      }
    }
  }, [])

  if (!isClient) {
    // Render nothing on the server to prevent SSR mismatches
    return null;
  }

  return (
    <div className="p-4">
      {userData ? (
        <>
          <h1 className="text-2xl font-bold mb-4">User Data</h1>
          <ul>
            <li>ID: {userData.id}</li>
            <li>First Name: {userData.first_name}</li>
            <li>Last Name: {userData.last_name || 'N/A'}</li>
            <li>Username: {userData.username || 'N/A'}</li>
            <li>Language Code: {userData.language_code}</li>
            <li>Is Premium: {userData.is_premium ? 'Yes' : 'No'}</li>
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
