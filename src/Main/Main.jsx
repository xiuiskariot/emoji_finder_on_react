import s from "./Main.module.css"

export function Main({ children}) {
  return (
    <main>
        <div className={s.container}>
          <div className={s.grid}>
            {children}
          </div>
        </div>
    </main>
  )
}