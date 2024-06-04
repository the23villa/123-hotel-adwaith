import React from "react";
import Logo from "../logo/Logo";
import Container from "../container/Container";
import UserMenu from "./userMenu/UserMenu";

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-10">
      <Container>
        <nav className="py-4 bg-transparent">
          <section className="flex flex-row justify-between items-center">
            <Logo />
            <UserMenu />
          </section>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
