'use client'
import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

const LogoutBtn = () => {
  return (
    <Button
      onClick={() => {
        signOut()
      }}
      variant={"ghost"}
      className="flex"
    >
      <LogOut />
      <h1>Logout</h1>
    </Button>
  );
}

export default LogoutBtn