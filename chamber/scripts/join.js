document.addEventListener("DOMContentLoaded", () => {
  // Set the timestamp field to the current date and time in ISO format
  const timestampField = document.getElementById("timestamp");
  timestampField.value = new Date().toISOString();

  //  Modals references
  const modals = {
      npModal: document.getElementById("npModal"),
      bronzeModal: document.getElementById("bronzeModal"),
      silverModal: document.getElementById("silverModal"),
      goldModal: document.getElementById("goldModal"),
  };

  //  Buttons references
  const buttons = {
      npButton: document.getElementById("npButton"),
      bronzeButton: document.getElementById("bronzeButton"),
      silverButton: document.getElementById("silverButton"),
      goldButton: document.getElementById("goldButton"),
  };

  // Modal content for each membership type
  const modalContent = {
      npModal: {
          title: "Non-Profit Member Advantages",
          content: "Stay informed about local gatherings, enjoy free resources, and take advantage of extra perks.",
      },
      bronzeModal: {
          title: "Bronze Member Advantages",
          content: "Gain discounted services, expand your network, and join exclusive events.",
      },
      silverModal: {
          title: "Silver Member Advantages",
          content: "Get all Bronze benefits plus premium resources and advanced marketing support.",
      },
      goldModal: {
          title: "Gold Member Advantages",
          content: "Enjoy comprehensive premium support, priority services, and access to elite events.",
      },
  };

  /**
   * Displays a modal with the given title and content
   * @param {HTMLElement} modal 
   * @param {Object} details 
   */
  function displayModal(modal, { title, content }) {
      modal.innerHTML = `
          <div class="modal-content">
              <button class="close-button" aria-label="Close">&times;</button>
              <h3>${title}</h3>
              <p>${content}</p>
          </div>
      `;
      modal.showModal();

      // Close modal when the close button is clicked
      modal.querySelector(".close-button").addEventListener("click", () => {
          modal.close();
      });
  }

  // Attach event listeners to buttons to open corresponding modals
  Object.keys(buttons).forEach((key) => {
      buttons[key].addEventListener("click", () => {
          const modalKey = key.replace("Button", "Modal");
          displayModal(modals[modalKey], modalContent[modalKey]);
      });
  });

  // Select all words that will be animated
  const words = document.querySelectorAll(".word");

  // Wrap each letter of a word in a span for animation
  words.forEach((word) => {
      word.innerHTML = [...word.textContent]
          .map((letter) => `<span class="letter">${letter}</span>`)
          .join("");
  });

  let currentWordIndex = 0;
  const maxWordIndex = words.length - 1;

  // Set initial word visibility
  words[currentWordIndex].style.opacity = "1";

  /* Rotates the text animation between words */
  function rotateText() {
      const currentWord = words[currentWordIndex];
      const nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

      // Animate current word out
      Array.from(currentWord.children).forEach((letter, i) => {
          setTimeout(() => (letter.className = "letter out"), i * 80);
      });

      // Prepare next word animation
      nextWord.style.opacity = "1";
      Array.from(nextWord.children).forEach((letter, i) => {
          letter.className = "letter behind";
          setTimeout(() => (letter.className = "letter in"), 340 + i * 80);
      });

      // Update index for next transition
      currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
  }

  // Start text rotation with an interval of 4 seconds
  setInterval(rotateText, 4000);
  rotateText();
});