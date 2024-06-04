import React from "react";
import Logo from "../logo/Logo";
import Container from "../container/Container";
import UserMenu from "./userMenu/UserMenu";

const Navbar = () => {
  return (
    <>
      <header className="absolute top-0 left-0 w-full z-10">
        <Container>
          <nav className="py-4 bg-transparent">
            <section className="flex flex-row justify-between items-center">
              <Logo />
              <div className="hidden lg:block">
                <UserMenu />
              </div>
            </section>
          </nav>
        </Container>
      </header>

      <footer className="lg:hidden fixed bottom-0 left-0 w-full z-10 bg-white">
        <Container>
          <nav className="py-4">
            <section className="flex flex-row">
              <div className="flex-1"></div>
              <UserMenu />
              <div className="flex-1"></div>
            </section>
          </nav>
        </Container>
      </footer>
    </>
  );
};

export default Navbar;
