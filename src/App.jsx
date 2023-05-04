import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
//import { Pagination } from "./Pagination/Pagination";
import { Card } from "./Card/Card";
import { Main } from "./Main/Main";
import { useEffect, useState } from "react";
//import { data } from "./Data/Data.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
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
// const newData = getUnicData(data);

// function App() {
//   const [input, setInput] = useState("");

//   const [data, setData] = useState([]);

//   const [currentPage, setCurrentPage] = useState(1)
//   const [emojiPerPage] = useState(12)

//   const lastEmojiIndex = currentPage * emojiPerPage;
//   const firstEmojiIndex = lastEmojiIndex - emojiPerPage;
//   const currentEmoji = data.slice(firstEmojiIndex, lastEmojiIndex)
//   const paginate = (pageNumber) => setCurrentPage(pageNumber)

//   const inputHandler = (evt) => {
//     setInput(evt.target.value)
//      let filtred = newData.filter(
//        (card) =>
//          card.title.toLowerCase().includes(input) ||
//          card.keywords.toLowerCase().includes(input)
//      );
//     console.log(filtred)
//     setData(filtred)
//   };

//   return (
//     <>
//       <Header handler={inputHandler} value={input} />
//       <Main>
//         {currentEmoji.map((el) => (
//           <Card el={el} key={uuidv4()} />
//         ))}
//       </Main>
//       <Pagination emojiPerPage={emojiPerPage} totalEmoji={data.length} paginate={paginate} />
//       <Footer />
//     </>
//   );

function App() {
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);

  const [, setLoading] = useState(false);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [emojiPerPage] = useState(12);
  // const lastEmojiIndex = currentPage * emojiPerPage;
  // const firstEmojiIndex = lastEmojiIndex - emojiPerPage;
  // const currentEmoji = newPosts.slice(firstEmojiIndex, lastEmojiIndex)
  // const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const [input, setInput] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const res = await axios.get("https://emoji.ymatuhin.workers.dev/");
      setNewPosts(getUnicData(res.data));
    };
    fetchPosts();
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtred = newPosts.filter(
      (card) =>
        card.title.toLowerCase().includes(input) ||
        card.keywords.toLowerCase().includes(input)
    );
    setPosts(filtred);
  }, [input]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header setInput={setInput} value={input} />
      <Main>
        {posts.map((el) => (
          <Card el={el} key={uuidv4()} />
        ))}
      </Main>
      {/* <Pagination
        emojiPerPage={emojiPerPage}
        totalEmoji={posts.length}
        paginate={paginate}
      /> */}
      <Footer />
    </>
  );
}

export default App;
