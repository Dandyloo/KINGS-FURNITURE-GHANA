/* ============================================================
   KINGS FURNITURE GHANA — Single Article Page
   article.js
   Reads ?id=news-001 from the URL, finds that article in
   news.json, and renders it.
   ============================================================ */

(async () => {
  const container = document.getElementById("article-container");
  if (!container) return;

  /* Get the article id from the URL */
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id");

  if (!articleId) {
    window.location.href = "./news.html";
    return;
  }

  /* Fetch all articles */
  let articles = [];
  try {
    const res = await fetch("../data/news.json");
    if (!res.ok) throw new Error("Failed");
    const data = await res.json();
    articles = data.articles || [];
  } catch (err) {
    console.warn("Could not load article:", err);
    container.innerHTML = `<p style="text-align:center; padding:var(--space-20) 0;">Unable to load this article. <a href="./news.html">Back to news</a></p>`;
    return;
  }

  /* Find the one we want */
  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    container.innerHTML = `<p style="text-align:center; padding:var(--space-20) 0;">Article not found. <a href="./news.html">Back to news</a></p>`;
    return;
  }

  /* Update the page title for SEO/browser tab */
  document.title = `${article.title} — Kings Furniture Ghana`;

  /* Build the body HTML from the body array */
  const bodyHTML = (article.body || [])
    .map((block) => {
      if (block.type === "heading") {
        return `<h2 class="article__subheading">${block.text}</h2>`;
      }
      return `<p class="article__paragraph">${block.text}</p>`;
    })
    .join("");

  /* Build the gallery HTML only if the article has one */
  let galleryHTML = "";
  if (article.gallery && article.gallery.length > 0) {
    const items = article.gallery
      .map(
        (img) => `
      <figure class="article__gallery-item">
        <img src="${img.src}" alt="${img.caption || article.title}" loading="lazy" />
        ${img.caption ? `<figcaption>${img.caption}</figcaption>` : ""}
      </figure>
    `,
      )
      .join("");
    galleryHTML = `
      <div class="article__gallery">
        <h2 class="article__subheading">Event Gallery</h2>
        <div class="article__gallery-grid">${items}</div>
      </div>
    `;
  }

  /* Render */
  container.innerHTML = `
    <div class="article__hero">
      <img src="${article.image}" alt="${article.title}" class="article__hero-img" fetchpriority="high" />
      <div class="article__hero-overlay"></div>
    </div>

    <div class="container">
      <div class="article__wrap">
        <a href="./news.html" class="article__back">← Back to News</a>

        <div class="article__meta">
          <span class="article__category">${article.category}</span>
          <span class="article__date">${article.dateFormatted}</span>
        </div>

        <h1 class="article__title">${article.title}</h1>

        ${article.author ? `<p class="article__author">By ${article.author}</p>` : ""}

        <div class="article__body">
          ${bodyHTML}
        </div>

        ${galleryHTML}

        <div class="article__footer">
          <a href="./news.html" class="btn btn--secondary">← All articles</a>
          <a href="https://wa.me/233503676484?text=Hello%20Kings%20Furniture%2C%20I%27d%20like%20to%20enquire%20about%20your%20furniture." target="_blank" rel="noopener noreferrer" class="btn btn--primary">Enquire on WhatsApp</a>
        </div>
      </div>
    </div>
  `;
})();
