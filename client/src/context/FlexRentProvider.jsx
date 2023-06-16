import React, { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export const FlexRentContext = createContext();

export const FlexRentProvider = (props) => {
  const [user, setUser] = useState();
  const [userProperties, setUserProperties] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchUser, setSearchUser] = useState([]);

  useEffect(() => {
    const tokenLocal = window.localStorage.getItem('token');

    setToken(tokenLocal);

    if (tokenLocal) {
      let user_id = jwtDecode(tokenLocal).user.user_id;

      axios
        .get(`http://localhost:4000/users/oneUser/${user_id}`)
        .then((res) => {
          setUser(res.data.resultUser[0]);
          setUserProperties(res.data.resultProperty);
              })
        .catch((err) => console.log(err));
    }
  }, [isLogged]);

  return (
    <FlexRentContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        userProperties,
        setUserProperties,
        token,
        setToken,
        searchResults,
        setSearchResults,
        searchUser,
        setSearchUser,
      }}
    >
      {props.children}
    </FlexRentContext.Provider>
  );
};