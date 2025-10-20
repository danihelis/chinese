import { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';


export function Page({title, children}) {

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4">
      <h1 className="text-3xl font-bold mt-4">{title}</h1>
      {children}
    </div>
  );
}
