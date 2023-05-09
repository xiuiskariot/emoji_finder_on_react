import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Pagination } from "./Pagination/Pagination";
import {PerPage} from "./PerPage/PerPage"
import { Card } from "./Card/Card";
import { Main } from "./Main/Main";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";


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



function App() {
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);

  const [, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [emojiPerPage, setEmojiPerPage] = useState(12);
  const lastEmojiIndex = currentPage * emojiPerPage;
  const firstEmojiIndex = lastEmojiIndex - emojiPerPage;
  const currentEmoji = posts.slice(firstEmojiIndex, lastEmojiIndex)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const [input, setInput] = useState("");


  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const res = await axios.get("https://emoji.ymatuhin.workers.dev/");
      setNewPosts(getUnicData(res.data));
      setPosts(getUnicData(res.data));
    };
    fetchPosts();

  }, []);

  useEffect(() => {
    let filtred = newPosts.filter(
      (card) =>
        card.title.toLowerCase().includes(input) ||
        card.keywords.toLowerCase().includes(input)
    );
    setPosts(filtred);
    setCurrentPage(1)
   
  }, [input]); // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <>
      <Header setInput={setInput} value={input} />
      <Main>
        {currentEmoji.map((el) => (
          <Card el={el} key={uuidv4()} />
        ))}
      </Main>

      <Footer>
        <Pagination
          emojiPerPage={emojiPerPage}
          totalEmoji={posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <PerPage
          setCurrentPage={setCurrentPage}
          setEmojiPerPage={setEmojiPerPage}
        />
      </Footer>
    </>
  );
}

export default App;
