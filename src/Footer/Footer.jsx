import s from "./Footer.module.css"

export const Footer = ({children}) => {
  return (
    <footer className={s.footer}>
      <div className={s.container}>{children}</div>
    </footer>
  );
}
