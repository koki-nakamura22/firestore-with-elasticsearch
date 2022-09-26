import type { NextPage } from "next";

import SearchButton from "./components/atoms/searchButton";

const Home: NextPage = () => {
  return (
    <SearchButton
      caption="test"
      onClick={function () {
        console.info(111);
      }}
      className="testButton"
    />
  );
};

export default Home;
