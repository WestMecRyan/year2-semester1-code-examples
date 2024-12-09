import { useEffect, useRef } from "react";
import Intersection from "./components/Intersection.jsx";
import PokemonWrapper from "./components/PokemonWrapper.jsx";
import "./App.css";

function App() {
  const appRef = useRef(null);
  // useEffect runs after the component renders
  useEffect(() => {
    // Create a new IntersectionObserver instance to observe when elements come into or go out of view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Check if the element is currently visible in the viewport
          entry.target.classList.add("show"); // Add the "show" class to visible elements
        } else {
          entry.target.classList.remove("show"); // Remove the "show" class when the element goes out of view
        }
      });
    });

    // Select all elements within appRef that have the class "hidden"
    const hiddenElements = appRef.current.querySelectorAll(".hidden");

    // Start observing each of the hidden elements
    hiddenElements.forEach((el) => observer.observe(el));

    // Clean up the observer when the component is unmounted
    return () => observer.disconnect();
  }, []); // The empty dependency array ensures this effect only runs once, after the component's initial render

  return (
    <div className="App" ref={appRef}>
      <Intersection title="Well hello there" />
      <Intersection title="Choose your Pokemon" content={<PokemonWrapper />} />
    </div>
  );
}

export default App;
