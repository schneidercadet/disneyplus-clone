import React from 'react'
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { selectWatchlist } from "../features/movie/movieSlice";

const Watchlist = () => {
  const [activeTab, setActiveTab] = useState("movies");
  const watchlist = useSelector(selectWatchlist);

  console.log('Current watchlist:', watchlist); // Debug log

  return (
    <Container>
      <h4>Watchlist</h4>
      <TabContainer>
        <Tab 
          active={activeTab === "movies"} 
          onClick={() => setActiveTab("movies")}
        >
          My Movies & Series
        </Tab>
        <Tab 
          active={activeTab === "upcoming"} 
          onClick={() => setActiveTab("upcoming")}
        >
          My Live & Upcoming
        </Tab>
        <Tab 
          active={activeTab === "replays"} 
          onClick={() => setActiveTab("replays")}
        >
          My Replays
        </Tab>
      </TabContainer>

      <Content>
        {(!watchlist || watchlist.length === 0) ? (
          <EmptyState>
            <h2>Your watchlist is empty</h2>
            <p>Your watchlist is empty. Content you add to your watchlist will appear here.</p>
          </EmptyState>
        ) : (
          <Wrap>
            {watchlist.map((movie) => (
              <MovieCard key={movie.id}>
                <Link to={'/detail/' + movie.id}>
                  <img src={movie.cardImg} alt={movie.title} />
                </Link>
              </MovieCard>
            ))}
          </Wrap>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 12px;
  padding: 0 calc(3.5vw + 5px);
  
  h4 {
    font-size: 50px;
    padding: 12px 0;
    color: rgb(249, 249, 249);
    text-align: center;
    margin-bottom: 20px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 32px;
  gap: 20px;
`;

const Tab = styled.button`
  background: ${props => props.active ? 'rgb(249, 249, 249)' : 'rgb(86, 101, 108)'};
  border: none;
  border-radius: 4px;
  color: ${props => props.active ? 'rgb(15, 16, 16)' : 'rgb(249, 249, 249)'};
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  padding: 8px 16px;
  transition: all 0.2s ease 0s;

  &:hover {
    background: ${props => !props.active && 'rgb(249, 249, 249)'};
    color: ${props => !props.active && 'rgb(15, 16, 16)'};
  }
`;

const Content = styled.div`
  margin-top: 30px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 0;
  
  h2 {
    font-size: 32px;
    margin-bottom: 12px;
    color: rgb(249, 249, 249);
  }
  
  p {
    color: rgba(249, 249, 249, 0.6);
    font-size: 18px;
  }
`;

const Wrap = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const MovieCard = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  background: linear-gradient(rgb(48, 50, 62), rgb(30, 31, 42));

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    outline: 4px solid rgba(249, 249, 249, 0.8);
  }
`;

export default Watchlist;