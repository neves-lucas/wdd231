const articlesContainer = document.querySelector("#articles");

async function initArticles() {
  try {
    const articles = await fetchArticlesData();
    renderArticles(articles);
    setUpModal();
    setUpArticlesButton(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}

async function fetchArticlesData() {
  const response = await fetch('data/articles.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

function renderArticles(articles) {
  articlesContainer.innerHTML = "";
  articles.forEach(article => {
    const card = document.createElement('section');
    card.classList.add("card");
    card.innerHTML = `
      <h3>${article.articleTitle}</h3>
      <p>${article.articleContent}</p>
      <img src="${article.articleImage}" alt="${article.articleAltImage}" loading="lazy" />
      <a href="${article.articleLink}" target="_blank">
        <button>Read More</button>
      </a>
      <button class="open-modal" data-title="${article.articleTitle}" data-content="${article.articleContent}" data-image="${article.articleImage}" data-alt="${article.articleAltImage}">More Details</button>
    `;
    articlesContainer.appendChild(card);
  });
  // Attach modal event only once to the container.
  articlesContainer.addEventListener('click', handleModalOpen);
}

function setUpArticlesButton(articles) {
  const articlesButton = document.querySelector("#articlesButton");
  if (articlesButton) {
    articlesButton.addEventListener('click', () => {
      renderArticles(articles);
    });
  }
}

function setUpModal() {
  let modal = document.getElementById("article-modal");
  if (!modal) {
    modal = document.createElement('div');
    modal.id = "article-modal";
    modal.classList.add("modal");
    modal.style.display = "none";
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3 id="modal-title"></h3>
        <img id="modal-image" src="" alt="">
        <p id="modal-content"></p>
      </div>
    `;
    document.body.appendChild(modal);

    // Close modal when close button is clicked
    modal.querySelector(".close-modal").addEventListener('click', () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
}

function handleModalOpen(event) {
  if (event.target.classList.contains('open-modal')) {
    const modal = document.getElementById("article-modal");
    const title = event.target.getAttribute('data-title');
    const content = event.target.getAttribute('data-content');
    const image = event.target.getAttribute('data-image');
    const alt = event.target.getAttribute('data-alt');

    modal.querySelector("#modal-title").textContent = title;
    modal.querySelector("#modal-content").textContent = content;
    const modalImage = modal.querySelector("#modal-image");
    modalImage.setAttribute("src", image);
    modalImage.setAttribute("alt", alt);
    modal.style.display = "flex";
  }
}

export { initArticles };