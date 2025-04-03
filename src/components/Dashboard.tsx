// src/components/Dashboard.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import "../styles/AnimatedBg.css";
import { AnimatedBg } from "./AnimatedBg";

type Participant = {
  id: string;
  character: string;
  tag: string;
  score: number;
};

const Dashboard: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch participants from the backend
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get("http://localhost:3000/scores");
        setParticipants(response.data);
      } catch (err) {
        setError("Failed to fetch participants.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  // Filter participants based on search query
  const filteredParticipants = participants.filter(
    (participant) =>
      participant.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.character.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const characterIcons = import.meta.glob("/src/assets/images/*.png", { eager: true });

  const getCharacterIcon = (character: string) => {
    const fileName = `/src/assets/images/${character}.png`;
    return (characterIcons as Record<string, { default: string }>)[fileName]?.default || "";
  };

  return (
    <div className="dashboard-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by tag or Character..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        // Agregamos un contenedor "card" para la tabla
        <div className="card">
          <table className="participants-table">
            <thead>
              <tr>
                <th>Character</th>
                <th></th>
                <th>Tag</th>
                <th>High Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((participant) => (
                <tr key={participant.id}>
                  <td>{participant.character}</td>
                  <td>
                  <img
                    src={getCharacterIcon(participant.character)}
                    alt={participant.character}
                    className="character-icon"
                  />
                  </td>
                  <td>{participant.tag}</td>
                  <td>{participant.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
