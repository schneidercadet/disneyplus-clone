import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import ReactPlayer from "react-player";
import db from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, removeFromWatchlist, selectWatchlist } from "../features/movie/movieSlice";

const Detail = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [detailData, setDetailData] = useState({});
  const [showVideo, setShowVideo] = useState(false);
  const [videoType, setVideoType] = useState("movie"); // "movie" or "trailer"
  const dispatch = useDispatch();
  const watchlist = useSelector(selectWatchlist);
  const isInWatchlist = watchlist.some(item => item.id === id);

  useEffect(() => {
    const fetchMovie = () => {
      const docRef = db.collection("movies").doc(id);
      const unsubscribe = docRef.onSnapshot(
        (doc) => {
          if (doc.exists) {
            setDetailData(doc.data());
          } else {
            console.log("no such document in firebase ");
          }
        },
        (error) => {
          console.log("Error getting document:", error);
        }
      );

      return unsubscribe;
    };

    const unsubscribe = fetchMovie();
    return () => {
      unsubscribe();
    };
  }, [id]);

  const getYoutubeId = (url) => {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  const handlePlay = (type) => {
    setVideoType(type);
    setShowVideo(true);
    // Request fullscreen after a short delay to ensure video element is mounted
    setTimeout(() => {
      const videoContainer = document.querySelector(".video-container");
      if (videoContainer && videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      }
    }, 100);
  };

  const handleBack = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setShowVideo(false);
    history.goBack();
  };

  const handleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(id));
    } else {
      dispatch(addToWatchlist(detailData));
    }
  };

  return (
    <Container>
      {showVideo ? (
        <VideoContainer className="video-container">
          <BackButton onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="white"/>
            </svg>
            <span>Back</span>
          </BackButton>
          {videoType === "trailer" ? (
            <LiteYouTubeContainer>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${getYoutubeId(
                  detailData.trailerUrl
                )}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=0`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
                frameBorder="0"
                loading="lazy"
              />
            </LiteYouTubeContainer>
          ) : (
            <PlayerWrapper>
              <ReactPlayer
                className="react-player"
                url={detailData.movieUrl}
                width="100%"
                height="100%"
                playing={true}
                controls={true}
                config={{
                  youtube: {
                    playerVars: {
                      modestbranding: 1,
                      controls: 1,
                      autoplay: 1,
                    },
                  },
                }}
              />
            </PlayerWrapper>
          )}
        </VideoContainer>
      ) : (
        <>
          <Background>
            <img alt={detailData.title} src={detailData.backgroundImg} />
          </Background>

          <ImageTitle>
            <img alt={detailData.title} src={detailData.titleImg} />
          </ImageTitle>
          <ContentMeta>
            <Controls>
              <Player onClick={() => handlePlay("movie")}>
                <img src="/images/play-icon-black.png" alt="" />
                <span>Play</span>
              </Player>
              <Trailer onClick={() => handlePlay("trailer")}>
                <img src="/images/play-icon-white.png" alt="" />
                <span>Trailer</span>
              </Trailer>
              <AddList onClick={handleWatchlist}>
                {isInWatchlist ? (
                  <span>✓ ADDED</span>
                ) : (
                  <>
                    <span>+</span>
                    <span>ADD TO WATCHLIST</span>
                  </>
                )}
              </AddList>
              <GroupWatch>
                <div>
                  <img src="/images/group-icon.png" alt="" />
                </div>
              </GroupWatch>
            </Controls>
            <SubTitle>{detailData.subTitle}</SubTitle>
            <Description>{detailData.description}</Description>
          </ContentMeta>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh-250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  z-index: 1500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LiteYouTubeContainer = styled.div`
  width: 100%;
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const BackButton = styled.button`
  position: fixed;
  top: 32px;
  left: 32px;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 24px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-family: Avenir-Roman, sans-serif;
  font-size: 14px;
  letter-spacing: 1.1px;

  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }

  span {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    padding-right: 20px;
    
    svg {
      transform: translateX(-2px);
    }
    
    span {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb (249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const AddList = styled.button`
  margin-right: 16px;
  height: 56px;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
  border-radius: 4px;
  cursor: pointer;
  padding: 0px 24px;
  font-size: 15px;
  letter-spacing: 1.8px;
  text-transform: uppercase;

  span {
    margin-right: 8px;
  }

  &:hover {
    background: rgba(249, 249, 249, 0.1);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;
  }
`;

const GroupWatch = styled.div`
  height: 44px;
  width: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: white;

  div {
    height: 40px;
    width: 40px;
    background: rgb(0, 0, 0);
    border-radius: 50%;

    img {
      width: 100%;
    }
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;
