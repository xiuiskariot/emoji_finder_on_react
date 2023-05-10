import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Pagination } from "./Pagination/Pagination";
import { PerPage } from "./PerPage/PerPage";
import { Card } from "./Card/Card";
import { Main } from "./Main/Main";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Spinner } from "./Spinner/Spinner";

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
  const [filtredCards, setFiltredCards] = useState([]);
  const [cards, setCards] = useState([]);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [emojiPerPage, setEmojiPerPage] = useState(12);
  const lastEmojiIndex = currentPage * emojiPerPage;
  const firstEmojiIndex = lastEmojiIndex - emojiPerPage;
  const currentEmoji = filtredCards.slice(firstEmojiIndex, lastEmojiIndex);

  const [input, setInput] = useState("");

  const [arr, setArr] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchCards = async () => {
      const res = await axios.get("https://emoji.ymatuhin.workers.dev/");
      setCards(getUnicData(res.data));
      setFiltredCards(getUnicData(res.data));
    };
    fetchCards();
  }, []);

  useEffect(() => {
    let filtred = cards.filter(
      (card) =>
        card.title.toLowerCase().includes(input) ||
        card.keywords.toLowerCase().includes(input)
    );
    setFiltredCards(filtred);
    setCurrentPage(1);
  }, [input]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setArr(newArr);
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filtredCards.length / emojiPerPage); i++) {
    pageNumbers.push(i);
  }

  let newArr = [...pageNumbers];

  let dostInitial = " ...";
  let dotsLeft = "...";
  let dotsEnd = "... ";
  let dotsRight = " ... ";

  if (pageNumbers.length > 3) {
    if (currentPage >= 1 && currentPage <= 3) {
      newArr = [1, 2, 3, 4, dotsEnd, pageNumbers.length];
    } else if (currentPage === 4) {
      const sliced = pageNumbers.slice(0, 5);
      newArr = [...sliced, dostInitial, pageNumbers.length];
    } else if (currentPage > 4 && currentPage < pageNumbers.length - 2) {
      const sliced1 = pageNumbers.slice(currentPage - 2, currentPage);
      const sliced2 = pageNumbers.slice(currentPage, currentPage + 1);
      newArr = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        pageNumbers.length,
      ];
    } else if (currentPage > pageNumbers.length - 3) {
      const sliced3 = pageNumbers.slice(pageNumbers.length - 4);
      newArr = [1, dostInitial, ...sliced3];
    } else if (currentPage === dostInitial) {
      setCurrentPage(newArr[3] - 3);
    } else if (currentPage === dotsEnd) {
      setCurrentPage(newArr[newArr.length - 3] + 1);
    } else if (currentPage === dotsLeft) {
      setCurrentPage(arr[3] - 2);
    } else if (currentPage === dotsRight) {
      setCurrentPage(arr[3] + 2);
    }
  }

  return (
    <>
      <Header setInput={setInput} value={input} />
      {loading ? (
        <Main>
          {currentEmoji.map((el) => (
            <Card el={el} key={uuidv4()} />
          ))}
        </Main>
      ) : (
        <Spinner />
      )}

      <Footer>
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          arr={newArr}
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
