import { useState } from 'react';
import { database } from './data/database.js';
import { CharacterList } from './list/CharacterList.jsx';

export default function App() {

  return (
    <div className="p-5">
      <CharacterList database={database}/>
    </div>
  )
}
