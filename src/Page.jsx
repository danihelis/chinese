import { useState, useEffect, useRef } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';


export function Page({title, children}) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      // ref.current.scrollIntoView({block: "start", behavior: "auto"});
    }
  }, []);

  return (
    <div className="flex-grow flex flex-col gap-4 items-center p-4 overflow-y-auto h-full">
      <h1 ref={ref} className="text-3xl font-bold p-4">{title}</h1>
      <div className="">
        {children}
      </div>
    </div>
  );
}
