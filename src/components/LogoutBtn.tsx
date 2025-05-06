'use client'
import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { ReactElement } from 'react';

const LogoutBtn = ({className}: {className: string}) => {
  return (
    <Button
      onClick={() => {
        signOut();
      }}
      variant={"ghost"}
      className={cn("flex", className)}
    >
      <LogOut />
      <h1>Logout</h1>
    </Button>
  );
}

export default LogoutBtn