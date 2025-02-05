import { useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history.push("/home");
      }
    });
  }, [userName]);

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          history.push("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>
      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <NavLink to="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </NavLink>
            <NavLink to="/search">
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </NavLink>
            <NavLink to="/watchlist">
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </NavLink>
            <NavLink to="/originals" className="desktop-only">
              <img src="/images/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </NavLink>
            <NavLink to="/movies" className="desktop-only">
              <img src="/images/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </NavLink>
            <NavLink to="/series" className="desktop-only">
              <img src="/images/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </NavLink>
            <MobileMenu>
              <DropdownToggle onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img src="/images/threedots-icon.png" alt="Menu" />
              </DropdownToggle>
              {dropdownOpen && (
                <DropdownContent>
                  <NavLink to="/originals">
                    <img src="/images/original-icon.svg" alt="ORIGINALS" />
                    <span>Originals</span>
                  </NavLink>
                  <NavLink to="/movies">
                    <img src="/images/movie-icon.svg" alt="MOVIES" />
                    <span>Movies</span>
                  </NavLink>
                  <NavLink to="/series">
                    <img src="/images/series-icon.svg" alt="SERIES" />
                    <span>Series</span>
                  </NavLink>
                </DropdownContent>
              )}
            </MobileMenu>
          </NavMenu>

          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown onClick={handleAuth}>Sign out</DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;

  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }

  @media (max-width: 1024px) {
    width: 70px;
  }

  @media (max-width: 768px) {
    width: 55px;
    margin-top: 2px;
  }

  @media (max-width: 480px) {
    width: 45px;
    margin-top: 0;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    a {
      span {
        display: none;
      }
    }
    .desktop-only {
      display: none;
    }
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: relative;
  padding: 0 12px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const DropdownToggle = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: #040714;
  border-radius: 4px;
  border: 1px solid rgba(151, 151, 151, 0.34);
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 8px;
  width: 160px;

  a {
    display: flex;
    align-items: center;
    padding: 8px;
    color: #f9f9f9;
    text-decoration: none;

    img {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }

    span {
      display: block !important;
      font-size: 12px;
      letter-spacing: 0.8px;
      text-transform: uppercase;
    }

    &:hover {
      background: rgba(249, 249, 249, 0.1);
    }
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  color: #f9f9f9;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }

  &.desktop-only {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export default Header;
