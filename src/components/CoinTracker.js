import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dropdown, DropdownButton } from "react-bootstrap";
import arrow from "../images/arrow.png";

const Container = styled.div`
  position: absolute;
  background-image: linear-gradient(19deg, #a3d9e5 0%, #4039b6 100%);
  width: 100%;
  font-family: "Poppins", sans-serif;
  min-height: 100vh;

  h1 {
    background: white;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bolder;
    font-size: 45px;
  }

  h4 {
    color: white;
  }

  .flex {
    display: flex;
    object-fit: contain;
    align-items: center;
  }

  .arrow_img {
    width: 30px;
    height: 30px;
    transform: rotate(90deg);
    transition: all 0.8s ease-in-out;
  }

  .arrow_img:hover {
    transform: rotate(450deg) scale(1.2);
  }
  table {
    width: 100%;
    padding: 2%;
    border-radius: 25px;
  }

  th {
    ${"" /* background-color: #3b5ba9; */}
    color: white;
    height: 30px;
    background: linear-gradient(45deg, #3b5ba9, #7050d8fa);
  }

  td {
    position: relative;
    width: 100px;
    height: 30px;
    box-shadow: rgba(0, 0, , 0.15) 1.95px 1.95px 2.6px;
    color: #7050d8fa;
    background: linear-gradient(45deg, #ffffff, #d2c3d2a1);
    z-index: 1;
  }

  tr {
    transition: all 0.1s ease-in;
  }

  tr:hover {
    background: linear-gradient(45deg, #3b5ba9, #7050d8fa);
  }

  table tr th:first-child {
    border-top-left-radius: 15px;
  }

  table tr th:nth-child(7) {
    border-top-right-radius: 15px;
  }

  .container {
    background: white;
    width: 90%;
    overflow-x: auto;
    height: fit-content;
    margin: 5%;
    border-radius: 25px;
  }

  .image_coin {
    width: 30px;
  }

  .flex_col {
    display: flex;
    flex-direction: column;
    background: white;
    width: 80px;
    margin: -20% 20%;
  }

  h5 {
    margin: 0;
  }

  h5:hover {
    background: #7a61e2;
    color: white;
  }

  .flex_contain {
    display: flex;
    justify-content: space-between;
    margin: 2%;
  }

  .searchBar {
    border-radius: 20px;
    height: 30px;
    outline: none;
    border: none;
    margin-right: 50%;
  }

  input[type="text"]::placeholder {
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    color: black;
  }

  .notFound {
    font-size: 30px;
    padding: 20px;
  }
`;

function CoinTracker() {
  const [coins, setCoins] = useState([]);
  const [perPage, setPerPage] = useState(50);
  const [currency, setCurrency] = useState("USD");
  const [currencySybmol, setCurrencySybmol] = useState("$");
  const [dropMenu, setDropMenu] = useState(false);
  const [dropMenu2, setDropMenu2] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);
  const [searchCoins, setSearchCoins] = useState([]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000 && num < 1000000000) {
      return num / 1000000 + "M"; // convert to M for number from > 1 million
    } else if (num < 1000000000000 && num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    } else if (num >= 1000000000000) {
      return (num / 1000000000000).toFixed(1) + "T";
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCoins(data);
      });
  }, [perPage, currency]);

  //Filter out the coins based on the User Input (searchTerm)
  useEffect(() => {
    setSearchCoins(
      coins.filter((coin) => {
        console.log(coin);
        return coin.id.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [searchTerm]);

  function CoinsPerPage(e) {
    e.preventDefault();
    setPerPage(e.target.innerHTML);
    setDropMenu(!dropMenu);
  }

  function currenySet(e) {
    e.preventDefault();
    switch (e.target.innerHTML) {
      case "(₹) INR":
        setCurrency("INR");
        setCurrencySybmol("₹");
        break;
      case "($) USD":
        setCurrency("USD");
        setCurrencySybmol("$");
        break;
      case "(€) EUR":
        setCurrency("EUR");
        setCurrencySybmol("€");
        break;
      default:
        break;
    }
    setDropMenu2(!dropMenu2);
  }

  return (
    <Container>
      <h1>Coin Tracker</h1>

      <div className="flex_contain">
        <div className="drop_contain">
          <div className="flex" onClick={() => setDropMenu(!dropMenu)}>
            <h4>No of Coins</h4>
            <img className="arrow_img" src={arrow} alt="" />
          </div>
          {dropMenu && (
            <div className="flex_col">
              <h5 onClick={(e) => CoinsPerPage(e)}>10</h5>
              <h5 onClick={(e) => CoinsPerPage(e)}>20</h5>
              <h5 onClick={(e) => CoinsPerPage(e)}>50</h5>
              <h5 onClick={(e) => CoinsPerPage(e)}>100</h5>
              <h5 onClick={(e) => CoinsPerPage(e)}>200</h5>
              <h5 onClick={(e) => CoinsPerPage(e)}>250</h5>
            </div>
          )}
        </div>
        <div className="drop_contain2">
          <div className="flex" onClick={() => setDropMenu2(!dropMenu2)}>
            <h4>Currency</h4>
            <img className="arrow_img" src={arrow} alt="" />
          </div>
          {dropMenu2 && (
            <div className="flex_col">
              <h5 onClick={(e) => currenySet(e)}>(₹) INR</h5>
              <h5 onClick={(e) => currenySet(e)}>($) USD</h5>
              <h5 onClick={(e) => currenySet(e)}>(€) EUR</h5>
            </div>
          )}
        </div>
      </div>
      <input
        className="searchBar"
        type="text"
        placeholder="🔍 Search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div className="container">
        <table cellSpacing="0" cellPadding="5">
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Image</th>
            <th>Price</th>
            <th>24H %</th>
            <th>Market Cap</th>
          </tr>
          {searchTerm.length === 0 &&
            coins.map((coin) => (
              <tr>
                <td>{coin.market_cap_rank}</td>
                <td>{capitalizeFirstLetter(coin.id)}</td>
                <td>{coin.symbol}</td>
                <td>
                  <img className="image_coin" src={coin.image} alt="" />
                </td>
                <td>
                  {currencySybmol}
                  {coin.current_price}
                </td>
                {coin.price_change_percentage_24h >= 0 ? (
                  <td style={{ color: "green" }}>
                    {coin.price_change_percentage_24h}
                  </td>
                ) : (
                  <td style={{ color: "red" }}>
                    {coin.price_change_percentage_24h}
                  </td>
                )}
                {/* <td>{coin.price_change_percentage_24h>=0?}</td> */}
                <td>{numFormatter(coin.market_cap)}</td>
              </tr>
            ))}

          {searchTerm.length > 0 &&
            searchCoins.length > 0 &&
            searchCoins.map((coin) => (
              <tr>
                <td>{coin.market_cap_rank}</td>
                <td>{capitalizeFirstLetter(coin.id)}</td>
                <td>{coin.symbol}</td>
                <td>
                  <img className="image_coin" src={coin.image} alt="" />
                </td>
                <td>{coin.current_price}</td>
                <td>{coin.high_24h}</td>
                <td>{numFormatter(coin.market_cap)}</td>
              </tr>
            ))}
        </table>
        {searchTerm && searchCoins.length === 0 && (
          <div className="notFound">
            {/* <h1 style={{ textAlign: "center", paddingTop: "5%" }}> */}
            No Coin with the word {searchTerm} found{" "}
          </div>
        )}
      </div>
    </Container>
  );
}

export default CoinTracker;
