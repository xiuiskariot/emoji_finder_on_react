import s from "./Card.module.css";

export const Card = ({ el}) => {

  return (
  
        <div className={s.emoji_card}>
          <p className={s.symbol}>{el.symbol}</p>
          <p className={s.title}>{el.title}</p>
          <p className={s.keywords}>{el.keywords}</p>
        </div>

  );
}
