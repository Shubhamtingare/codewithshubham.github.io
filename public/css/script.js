const textElement = document.getElementById("text1");
const textToAnimate = textElement.innerHTML;
const initialText = textToAnimate;
let charIndex = 0;
let isTyping = true;

function animateText() {
  if (isTyping) {
    textElement.innerHTML = initialText.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex <= textToAnimate.length) {
      setTimeout(animateText, 100); // Wait for 2 seconds before erasing
    } else {
      isTyping = false;
      setTimeout(animateText, 2000); // Typing speed (adjust as needed)
    }
  } else {
    textElement.innerHTML = initialText.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex >= 0) {
      setTimeout(animateText, 50); // Start typing again
    } else {
      isTyping = true;
      setTimeout(animateText, 100); // Erasing speed (adjust as needed)
    }
  }
}

animateText();
