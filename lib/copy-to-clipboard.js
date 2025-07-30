function copyMainContent() {
  // Get the main element
  const mainElement = document.querySelector("main");

  // Get the text content
  const content = mainElement.innerHTML;

  // Create a temporary textarea element
  const textarea = document.createElement("textarea");
  textarea.value = content;
  document.body.appendChild(textarea);

  // Select and copy the text
  textarea.select();
  document.execCommand("copy");

  // Remove the temporary textarea
  document.body.removeChild(textarea);
}
