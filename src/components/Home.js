import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    if (userName) {
      const unsubscribe = db.collection("movies").onSnapshot((snapshot) => {
        const tempRecommends = [];
        const tempNewDisneys = [];
        const tempOriginals = [];
        const tempTrending = [];

        snapshot.docs.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };
          switch (data.type) {
            case "recommend":
              tempRecommends.push(data);
              break;
            case "new":
              tempNewDisneys.push(data);
              break;
            case "original":
              tempOriginals.push(data);
              break;
            case "trending":
              tempTrending.push(data);
              break;
            default:
              break;
          }
        });

        dispatch(
          setMovies({
            recommend: tempRecommends,
            newDisney: tempNewDisneys,
            original: tempOriginals,
            trending: tempTrending,
          })
        );
      });

      return () => unsubscribe();
    }
  }, [userName, dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
