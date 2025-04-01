import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AnimatedBg } from "./AnimatedBg";

type Participant = {
  id: string;
  tag: string;
  score: number;
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2rem;
    color: #333;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff1a1a;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

const SearchBar = styled.div`
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #007bff;
    color: white;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  @media (max-width: 768px) {
    th,
    td {
      padding: 8px;
    }
  }

  @media (max-width: 480px) {
    th,
    td {
      padding: 6px;
      font-size: 0.875rem;
    }
  }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  text-align: center;
  margin: 20px 0;
`;

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

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Filter participants based on search query
  const filteredParticipants = participants.filter(
    (participant) =>
      participant.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatedBg>
      <Container>
        <Header>
          <h1>Dashboard</h1>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Header>
        <SearchBar>
          <input
            type="text"
            placeholder="Search by tag or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>tag</th>
                <th>High Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((participant) => (
                <tr key={participant.id}>
                  <td>{participant.id}</td>
                  <td>{participant.tag}</td>
                  <td>{participant.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </AnimatedBg>
  );
};

export default Dashboard;
