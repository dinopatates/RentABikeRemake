export default function NavBar() {
  return (
    <nav className="bg-gray-800 h-16 w-full">
      <ul className="flex flex-row gap-6 items-center justify-around h-full">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/vehicles">Vehicles</a>
        </li>
        <li>
          <a href="/details">Details</a>
        </li>
        <li>
          <a href="/about-us">About Us</a>
        </li>
        <li>
          <a href="/contact">Contact Us</a>
        </li>
      </ul>
    </nav>
  );
}