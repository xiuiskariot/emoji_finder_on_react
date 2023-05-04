import s from "./Header.module.css"

export const Header = ({ setInput, value}) => {
  return (
    <header className={s}>
      <h1 className={s}>Emoji Finder</h1>
      <p className={s}>Find emoji by keywords</p>
      <form className={s}>
        <input onChange={(evt) => setInput(evt.target.value)} type="search" placeholder="Search..." value={value } />
      </form>
    </header>
  );
}
