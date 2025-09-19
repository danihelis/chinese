import { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { database } from './data/database.js';
import { CharacterList } from './list/CharacterList.jsx';
import { CharacterDetail } from './list/CharacterDetail.jsx';

const defaultPage = 'list';
const entryPages = new Set(['detail']);


function NavBar({handlePage}) {
  const menu = [
    ['Home', defaultPage],
    ['List of characters', 'list'],
  ];

  // 学习中文
  return (
    <div className="bg-black text-white w-full p-2 px-4 flex items-center sticky top-0">
      <span className="font-mashan text-2xl">学</span>
      <span className="font-bold ml-2">Learning Chinese</span>
      <span className="flex-1" />
      <div className="flow-auto text-right">
        <Menu>
          <MenuButton className="cursor-pointer bg-gray-600 rounded-md p-2 px-3">
            ☰
          </MenuButton>
          <MenuItems transition anchor="bottom end" className="bg-gray-600 p-2 rounded-sm flex flex-col mt-1 transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0">
            {menu.map(([label, page]) => (
              <MenuItem key={label}>
                <button
                  className="text-left text-white cursor-pointer rounded-sm hover:bg-gray-400 hover:text-black p-1 px-2"
                  onClick={() => handlePage(page)}
                >
                  {label}
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}


export default function App() {
  const [page, setPage] = useState(null);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const handlePopState = (event) => {
      const query = new URLSearchParams(window.location.search);
      handlePage(query.get('p') || defaultPage,
        database.get(query.get('c')), false);
    };
    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handlePage = (page, entry, pushState = true) => {
    if (pushState) {
      let url = `?p=${page}`;
      if (entry) url += `&c=${entry.key}`;
      window.history.pushState({}, '', url);
    }
    if (entryPages.has(page) && !entry) page = defaultPage;
    setPage(page);
    setEntry(entry);
  };

  const renderTitle = () => {
    switch (page) {
      case 'list': return 'List of Characters';
      case 'detail': return 'Character';
      default: 'No page';
    }
  }

  const renderComponent = () => {
    switch (page) {
      case 'list':
        return <CharacterList handlePage={handlePage} />;
      case 'detail':
        return <CharacterDetail entry={entry} handlePage={handlePage} />;
      default:
        return <p>No content</p>;
    }
  }

  return (
    <div>
      <NavBar handlePage={handlePage} />
      <div className="flex flex-col gap-10 items-center justify-center m-5 mt-10">
        <h1 className="text-3xl font-bold">{renderTitle()}</h1>
        {renderComponent()}
      </div>
    </div>
  )
}
