// client.js (adjusted)
async function streamJson() {
  const outputBox = document.getElementById("output-box");
  outputBox.textContent = "";
  let response = await fetch("/json");

  if (!response.body) {
    console.error("ReadableStream not supported in this browser.");
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      console.log("Stream complete");
      break;
    }
    const chunk = decoder.decode(value, { stream: true });
    outputBox.textContent += chunk;
  }
  console.log("Finished streaming JSON");
}
