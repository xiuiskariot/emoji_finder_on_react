import s from "./Header.module.css"

export const Header = ({ handler, value}) => {
  return (
    <header className={s}>
      <h1 className={s}>Emoji Finder</h1>
      <p className={s}>Find emoji by keywords</p>
      <form className={s}>
        <input onChange={handler} type="search" placeholder="Search..." value={value } />
      </form>
    </header>
  );
}
