import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Footer from "./components/Footer";
import Explore from "./components/Explore";
import Watchlist from "./components/Watchlist";
import "./App.css";
import styled from "styled-components";

function App() {
  return (
    <AppContainer>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <main>
              <Login />
            </main>
          </Route>
          <Route path="/home">
            <main>
              <Home />
            </main>
          </Route>
          <Route path="/search">
            <main>
              <Explore />
            </main>
          </Route>
          <Route path="/watchlist">
            <main>
              <Watchlist />
            </main>
          </Route>
          <Route path="/detail/:id">
            <main>
              <Detail />
            </main>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #090b13;
  display: flex;
  flex-direction: column;

  &:before {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: fixed;
    inset: 0;
    opacity: 1;
    z-index: 0;
  }

  main {
    flex: 1;
    min-height: calc(
      100vh - 70px - 200px
    ); /* header height and footer height */
    padding-bottom: 60px; /* Add space between content and footer */
  }
`;

export default App;
