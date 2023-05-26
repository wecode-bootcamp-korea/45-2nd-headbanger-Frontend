import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontMix, flexSort } from '../../styles/mixin';

const Header = ({ isLoggedIn, handleLogin, handleLogout }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    const results = searchResults.filter(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <HeaderInfo>
      <Link to={isLoggedIn ? '/mypage' : '/signup'}>
        <SignupBtn>{isLoggedIn ? 'My Page' : 'Sign Up'}</SignupBtn>
      </Link>
      {isLoggedIn ? (
        <LoginBtn onClick={handleLogout}>Log Out</LoginBtn>
      ) : (
        <Link to="/login">
          <LoginBtn>Sign In</LoginBtn>
        </Link>
      )}
      {isSearchOpen ? (
        <>
          <SearchBar
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <SearchBtn onClick={handleSearchSubmit}>Submit</SearchBtn>
        </>
      ) : (
        <SearchBtn onClick={handleSearchClick}>Search</SearchBtn>
      )}
      {searchResults.length > 0 && (
        <SearchResults>
          {searchResults.map((result, index) => (
            <SearchResultItem key={index}>{result}</SearchResultItem>
          ))}
        </SearchResults>
      )}
    </HeaderInfo>
  );
};

export default Header;

const HeaderInfo = styled.div`
  ${flexSort('flex-end', 'center')};
  flex-direction: row;
  gap: 26px;
  height: 17.5px;
  background-color: ${props => props.theme.mainBlack};
  height: 60px;
  padding-right: 100px;
`;

const SignupBtn = styled.button`
  ${fontMix(14, 'white')}
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font-family: inherit;
  text-decoration: none;
  cursor: pointer;
`;

const LoginBtn = styled.button`
  ${fontMix(14, 'white')}
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font-family: inherit;
  text-decoration: none;
  cursor: pointer;
`;

const SearchBtn = styled.button`
  ${fontMix(14, 'white')}
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font-family: inherit;
  text-decoration: none;
  cursor: pointer;
`;

const SearchBar = styled.input`
  ${fontMix(14, 'black')}
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4px;
`;

const SearchResults = styled.ul`
  list-style: none;
  padding: 0;
`;

const SearchResultItem = styled.li`
  ${fontMix(14, 'black')}
  padding: 4px 8px;
  border-bottom: 1px solid #ccc;
`;
