const articlesButton = document.querySelector("#articlesButton");
const articlesContainer = document.querySelector("#articles");

const articles = [
  {
    articleTitle: "How to Start Running: A Beginner's Guide",
    articleContent: "Running is a simple and effective way to improve your fitness, boost your mood, and increase your energy levels. In this article, we'll show you how to get started, avoid common mistakes, and stay motivated on your running journey.",
    articleImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    articleAltImage: "Man ready to run on a race track",
    articleLink: "https://www.runnersworld.com/uk/training/beginners/a772727/how-to-start-running-today/"
  },
  {
    articleTitle: "The Power of Meditation: A Beginner's Guide",
    articleContent: "Meditation is a powerful practice that can reduce stress, improve focus, and enhance your overall well-being. Learn how to start meditating, create a daily routine, and experience the life-changing benefits of this ancient tradition.",
    articleImage: "https://images.unsplash.com/photo-1611566620327-5e879d9b0955?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    articleAltImage: "Woman meditating  next to a table",
    articleLink: "https://health.usnews.com/wellness/mind/articles/how-to-meditate-for-beginners"
  },
  {
    articleTitle: "5 Easy and Healthy Meal Prep Ideas",
    articleContent: "Meal prepping is a great way to save time, money, and stress while eating nutritious and delicious meals. Discover five simple meal prep ideas that will help you stay on track with your health and fitness goals.",
    articleImage: "https://images.unsplash.com/photo-1559058789-672da06263d8?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    articleAltImage: "A piece of salmon with vegetables on a table",
    articleLink: "https://www.loveandlemons.com/healthy-meal-prep-ideas/"
  },
];

createArticleCard(articles);

articlesButton.addEventListener('click', () => {
  createArticleCard(articles);
});

function createArticleCard(articles) {
  document.querySelector('#articles').innerHTML = "";
  articles.forEach(article => {
    const card = document.createElement('section');
    const title = document.createElement('h3');
    const content = document.createElement('p');
    const img = document.createElement('img');
    const link = document.createElement('a');

    title.innerHTML = `${article.articleTitle}`;
    content.innerHTML = `${article.articleContent}`;
    link.innerHTML = `<button>Read More</button>`
    link.setAttribute("href", article.articleLink);
    link.setAttribute("target", "_blank");
    img.setAttribute("src", article.articleImage);
    img.setAttribute("alt", article.articleAltImage);
    img.setAttribute("loading", "lazy");

    card.appendChild(title);
    card.appendChild(content);
    card.appendChild(img);
    card.appendChild(link);
    card.setAttribute("class", "card");

    articlesContainer.appendChild(card);
  })
}