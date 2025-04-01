import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #007bff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const MenuItem = styled.li`
  margin-left: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 10px;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const LogoutButton = styled(Button)`
  background-color: #ff4d4d;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Nav>
      <Container>
        <Logo>Hungeon Game</Logo>
        <Menu>
          <MenuItem>
            <Button onClick={() => navigate("/about-us")}>About Us</Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => navigate("/profile")}>Profile</Button>
          </MenuItem>
          <MenuItem>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </MenuItem>
        </Menu>
      </Container>
    </Nav>
  );
};

export default Navbar;
