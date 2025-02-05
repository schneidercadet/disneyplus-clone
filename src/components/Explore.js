import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import db from "../firebase";
import { X } from "lucide-react";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = db.collection("movies").onSnapshot((snapshot) => {
      const moviesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(moviesList);
    });

    return () => unsubscribe();
  }, []);

  const collections = [
    {
      id: 1,
      title: "",
      image: "images/hululogo.jpg",
      color: "rgb(15, 181, 190)",
    },
    {
      id: 2,
      title: "",
      image: "/images/scale-2.webp",
      gradient: "linear-gradient(315deg, #7839c5, #4f26cc)",
    },
    {
      id: 3,
      title: "",
      image: "/images/scale-3.webp",
      color: "#8b0000",
    },
    {
      id: 4,
      title: "",
      image: "/images/scale-4.webp",
      color: "#8b4513",
    },
    {
      id: 5,
      title: "",
      image: "/images/scale-5.webp",
      color: "#2f4f4f",
    },
    {
      id: 6,
      title: "",
      image: "/images/scale-6.webp",
      color: "#cd853f",
    },
    {
      id: 7,
      title: "",
      image: "/images/scale-7.webp",
      color: "#ff69b4",
    },
    {
      id: 8,
      title: "",
      image: "/images/scale-8.webp",
      color: "#000000",
    },
    {
      id: 9,
      title: "",
      image: "/images/scale-9.webp",
      color: "#ff0000",
    },
    {
      id: 10,
      title: "",
      image: "/images/scale-10.webp",
      color: "#ff0000",
    },
    {
      id: 11,
      title: "",
      image: "/images/scale-11.webp",
      color: "#ffd700",
    },
    {
      id: 12,
      title: "",
      image: "/images/scale-12.webp",
      color: "#ffa500",
    },
    {
      id: 13,
      title: "",
      image: "/images/scale-13.webp",
      color: "#4169e1",
    },
    {
      id: 14,
      title: "",
      image: "/images/scale-14.webp",
      color: "#da70d6",
    },
    {
      id: 15,
      title: "",
      image: "/images/scale-15.webp",
      gradient: "linear-gradient(315deg, #0059ff, #000000)",
    },
    {
      id: 16,
      title: "",
      image: "/images/scale-16.webp",
      color: "#4b0082",
    },
    {
      id: 17,
      title: "",
      image: "/images/scale-17.webp",
      color: "#00ff00",
    },
    {
      id: 18,
      title: "",
      image: "/images/scale-18.webp",
      color: "#00bfff",
    },
    {
      id: 19,
      title: "",
      image: "/images/scale.webp",
      color: "#9932cc",
    },
    {
      id: 20,
      title: "",
      image: "/images/all-collection.webp",
      color: "#192133",
      isAllCollections: true,
    },
  ];

  const filteredContent = searchTerm.trim()
    ? movies.filter(
        (movie) =>
          movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.subTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : collections;

  return (
    <Container>
      <SearchContainer>
        <SearchInput>
          <input
            type="text"
            placeholder=" Search by title, genre, team, or league"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")}>
              <X size={48} />
            </button>
          )}
        </SearchInput>
      </SearchContainer>
      <ContentMeta>
        <h4>Explore</h4>
        <Content>
          {!searchTerm.trim()
            ? filteredContent.map((collection) => (
                <Wrap
                  key={collection.id}
                  onClick={() => history.push(`/collection/${collection.id}`)}
                  style={{
                    backgroundImage: `url(${collection.image})`,
                    backgroundSize: collection.isAllCollections
                      ? "80% auto"
                      : "cover",
                    backgroundPosition: "center",
                    backgroundColor: collection.isAllCollections
                      ? "#192133"
                      : "transparent",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <Title>{collection.title}</Title>
                  <Overlay />
                </Wrap>
              ))
            : filteredContent.map((movie) => (
                <div key={movie.id}>
                  <Wrap onClick={() => history.push(`/detail/${movie.id}`)}>
                    <img src={movie.cardImg} alt={movie.title} />
                  </Wrap>
                  <Metadata>
                    <h5>{movie.title}</h5>
                    <p>{movie.subTitle}</p>
                  </Metadata>
                </div>
              ))}
          {searchTerm.trim() && filteredContent.length === 0 && (
            <NoResults>No matches found for "{searchTerm}"</NoResults>
          )}
        </Content>
      </ContentMeta>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 26px;
  display: block;
  background-color: #090b13;
`;

const ContentMeta = styled.div`
  max-width: 95vw;
  margin: 0 auto;
  padding: 120px 0px 30px;
  position: relative;

  h4 {
    color: rgb(249, 249, 249);
    font-size: 44px;
    font-weight: 500;
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: repeat(4, 1fr);
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  background: linear-gradient(rgb(26, 29, 41), rgb(0, 102, 0));

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
    outline-offset: 4px;
    outline: 4px solid rgba(249, 249, 249, 0.8);
  }
`;

const SearchContainer = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgb(56, 57, 59), rgb(9, 11, 19));
  z-index: 2;
`;

const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  input {
    width: 100%;
    height: 80px;
    padding: 0 48px;
    border: none;
    background: rgb(75, 78, 90);
    color: #f9f9f9;
    font-size: 30px;
    backdrop-filter: blur(8px);

    &::placeholder {
      color: rgba(249, 249, 249, 0.6);
    }

    &:focus {
      outline: none;
      background: rgb(100, 102, 113);
      transition: all 0.2s ease 0s;
    }
  }

  button {
    position: absolute;
    right: 40px;
    background: none;
    border: none;
    color: #f9f9f9;
    cursor: pointer;
    padding: 0;
    font-size: 30px;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }
`;

const NoResults = styled.div`
  color: rgb(249, 249, 249);
  font-size: 20px;
  text-align: center;
  grid-column: 1 / -1;
  padding: 40px;
`;

const Title = styled.h3`
  color: rgb(249, 249, 249);
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  z-index: 2;
  width: 100%;
  padding: 0 20px;
  letter-spacing: 1.8px;
  text-transform: uppercase;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0px;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 250ms ease-in-out;
`;

const Metadata = styled.div`
  padding: 10px 0;
  color: rgb(249, 249, 249);

  h5 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  }

  p {
    margin: 5px 0 0;
    font-size: 14px;
    color: rgba(249, 249, 249, 0.8);
  }
`;

export default Explore;
