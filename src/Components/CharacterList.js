import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://rickandmortyapi.com/api/character');
      setCharacters(result.data.results);
    };

    fetchData();
  }, []);

  const handleShowEpisodes = (character) => {
    if (selectedCharacter === character) {
      setSelectedCharacter(null);
    } else {
      setSelectedCharacter(character);
    }
  };

  return (
    <div className="character-list">
      {characters.map((character) => (
        <div key={character.id} className="character-card">
          <h2>{character.name}</h2>
          <p><span className="bold">Status:</span> {character.status}</p>
          <p><span className="bold">Species:</span> {character.species}</p>
          <div className="character-detail">
            <img src={character.image} alt={character.name} />
            <p><span className="bold">Origin:</span> {character.origin.name}</p>
            <p><span className="bold">Location:</span> {character.location.name}</p>
            {selectedCharacter === character && (
              <div className="episode-list">
                <p><span className="bold">Episodes:</span></p>
                <ul>
                  {character.episode.map((episode, index) => (
                    <li key={index}>
                      <a href={episode} target="_blank" rel="noopener noreferrer">
                        Episode {episode.slice(episode.lastIndexOf('/') + 1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={() => handleShowEpisodes(character)}>
              {selectedCharacter === character ? 'Ocultar Capítulos' : 'Mostrar Capítulos'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CharacterList;
