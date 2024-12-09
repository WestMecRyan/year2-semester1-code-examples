import { useEffect, useState } from "react";

const UseEffectRenderer = () => {
    console.log('UseEffectRenderer Rendered');
  const [name, setName] = useState("");
  const [renderCount, setRenderCount] = useState(0);
  const [buttonCount, setButtonCount] = useState(0);
  useEffect(() => {
    // you can call the parameter anything including
    // prevRenderCount
    setRenderCount((currentRenderCount) => currentRenderCount + 1);
    console.log("count increased");
  }, []);
  // useEffect(() => {
  //   setRenderCount((currentRenderCount) => currentRenderCount + 1);
  //   console.log("count increased");
  // }, [name]); // Runs when 'name' changes

  const handleChange = (e) => {
    setName(e.target.value);
    setRenderCount((currentRenderCount) => currentRenderCount + 1);
  };
  const handleButtonClick = () => {
    setButtonCount((prevCount) => prevCount + 1);

    setRenderCount((currentRenderCount) => currentRenderCount + 1);
  };
  return (
    <>
      {/* <input value={name} onChange={(e) => setName(e.target.value)} /> */}
      <input value={name} onChange={handleChange} />
      <div>My name is {name}</div>
      <div>I rendered {renderCount} times</div>
      <button onClick={handleButtonClick}>Click me</button>
      <div>Button clicked {buttonCount} times</div>
      <hr></hr>
    </>
  );
};
export default UseEffectRenderer;
