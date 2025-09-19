import { useState, useEffect } from 'react';
import { database } from './data/database.js';
import { CharacterList } from './list/CharacterList.jsx';
import { CharacterDetail } from './list/CharacterDetail.jsx';


const defaultPage = 'list';
const entryPages = new Set(['detail']);

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
    <div className="flex flex-col gap-10 items-center justify-center m-5">
      <h1 className="text-3xl font-bold">{renderTitle()}</h1>
      {renderComponent()}
    </div>
  )
}
