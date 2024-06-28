import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CharacterDetail = ({ character }) => {
  const [episodes, setEpisodes] = useState([]);
  const [origin, setOrigin] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchEpisodes = async () => {
      const episodePromises = character.episode.map(url => axios.get(url));
      const episodeResponses = await Promise.all(episodePromises);
      setEpisodes(episodeResponses.map(response => response.data.name));
    };

    fetchEpisodes();

    const fetchLocationAndOrigin = async () => {
      const originResponse = await axios.get(character.origin.url);
      setOrigin(originResponse.data.name);

      const locationResponse = await axios.get(character.location.url);
      setLocation(locationResponse.data.name);
    };

    fetchLocationAndOrigin();
  }, [character]);

  return (
    <div className="character-detail">
      <img src={character.image} alt={character.name} />
      <p>Origin: {origin}</p>
      <p>Location: {location}</p>
      <h3>Episodes:</h3>
      <ul>
        {episodes.map((episode, index) => (
          <li key={index}>{episode}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetail;
