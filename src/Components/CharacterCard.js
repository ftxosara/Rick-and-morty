import React, { useState } from 'react';
import CharacterDetail from './CharacterDetails';

const CharacterCard = ({ character }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="character-card">
      <h2>{character.name}</h2>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && <CharacterDetail character={character} />}
    </div>
  );
};

export default CharacterCard;
