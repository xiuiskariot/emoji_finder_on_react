import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Pagination } from "./Pagination/Pagination";
import { Card } from "./Card/Card";
import { Main } from "./Main/Main";
import { useState } from "react";
import { data } from "./Data/Data.js";
import { v4 as uuidv4 } from "uuid";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

function getUnicData(data) {
  const unicData = [];
  data.forEach((card) => {
    unicData.push({
      ...card,
      keywords: [...new Set(card.keywords.split(" "))].join(" "),
    });
  });
  return unicData;
}
const newData = getUnicData(data);




function App() {
  const [input, setInput] = useState("");

  const [data, setData] = useState(newData);

  const [currentPage, setCurrentPage] = useState(1)
  const [emojiPerPage] = useState(12)

  const lastEmojiIndex = currentPage * emojiPerPage;
  const firstEmojiIndex = lastEmojiIndex - emojiPerPage;
  const currentEmoji = data.slice(firstEmojiIndex, lastEmojiIndex)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const inputHandler = (evt) => {
    setInput(evt.target.value.trim())
      
  };

  
  // const getFilteredData = () => {
  //   let filtered = data.filter(
  //       (card) =>
  //         card.title.toLowerCase().includes(input) ||
  //         card.keywords.toLowerCase().includes(input)
  //     );
  //   return setData(filtered);
  // }
  // getFilteredData()

  return (
    <>
      <Header handler={inputHandler} value={input} />
      <Main>
        {currentEmoji
          .filter(
            (card) =>
              card.title.toLowerCase().includes(input) ||
              card.keywords.toLowerCase().includes(input)
          )
          .map((el) => (
            <Card el={el} key={uuidv4()} />
          ))}
      </Main>
      <Pagination
        emojiPerPage={emojiPerPage}
        totalEmoji={data.length}
        paginate={paginate}
      />
      <Footer />
    </>
  );
}

export default App;
