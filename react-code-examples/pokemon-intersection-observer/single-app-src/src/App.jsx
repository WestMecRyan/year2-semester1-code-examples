import React, { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const hiddenElements = appRef.current.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App" ref={appRef}>
      <section className="hidden">
        <h1>Hello!</h1>
      </section>
      <section className="hidden">
        <h2>Hi Class!</h2>
        <p>Welcome to Mr. Morales Coding Class</p>
      </section>
      <section className="hidden">
        <h2>Let's learn how to animate on scroll</h2>
        <p>
          <pre>That will make our sites. Look really cool.</pre>
        </p>
      </section>
      <section className="hidden">
        <h2>Choose your Pokemon</h2>
        <div className="img-wrapper">
          <img
            src="/assets/001.png"
            alt="bulbasaur"
            className="pokemon-png hidden"
          />
          <img
            src="/assets/004.png"
            alt="charmander"
            className="pokemon-png hidden"
          />
          <img
            src="/assets/007.png"
            alt="squirtle"
            className="pokemon-png hidden"
          />
        </div>
      </section>
    </div>
  );
}

export default App;
