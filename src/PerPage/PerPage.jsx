import s from "./PerPage.module.css"

export const PerPage = ({setEmojiPerPage, setCurrentPage}) => {
  return (
    <select className={s.select}
      onChange={(evt) => {
        setEmojiPerPage(evt.target.value)
        setCurrentPage(1)
      }
      }
    >
      <option className={s.option} value={12}>12</option>
      <option className={s.option} value={24}>24</option>
      <option className={s.option} value={48}>48</option>

    </select>
  );
}
