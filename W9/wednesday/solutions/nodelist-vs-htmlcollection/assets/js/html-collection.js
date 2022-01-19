export default () => {
  const bodyChildElements = Array.from(document.body.children); // HTMLCollection [div]
  // console.log(bodyChildElements);

  const div = bodyChildElements[0];

  const divChildElements = div.children; // HTMLCollection [span]
  const helloWorld = div.innerText; // Hello World! Yes!    <-- NOT Hello World!
  const span = divChildElements[0]; // <span>Yes!</span>
  // debugger
};