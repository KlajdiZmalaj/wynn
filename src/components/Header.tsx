import Logo from "../assets/logo.svg";

export default function Header() {
  const headerList = ["Rooms & Suites", "Wynn Rewards", "Offers", "Dining", "Entertainment", "Meetings & Events"];
  return (
    <header className="headerContainer">
      <img src={Logo} />
      <nav className="lists">
        {headerList.map((el) => (
          <div key={el}>{el}</div>
        ))}
      </nav>
    </header>
  );
}
