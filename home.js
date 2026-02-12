// -------------------------
// Mobile nav toggle
// -------------------------
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a link (mobile)
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// -------------------------
// Reviews carousel
// -------------------------
const reviews = [
  {
    text: "“One thing I am able to do now, that I could not do before, is actually believe I can code.”",
    name: "Middle School Student",
    sub: "Classroom Pilot Program",
  },
  {
    text: "“The puzzles felt like a game, but I still learned real logic. It didn’t feel like homework.”",
    name: "Student",
    sub: "After-school Coding Club",
  },
  {
    text: "“Clear progression, strong engagement. Students stayed focused longer than usual lessons.”",
    name: "Teacher",
    sub: "Secondary School",
  },
  {
    text: "“The story hooks them. They ask to replay levels just to optimize their code.”",
    name: "Facilitator",
    sub: "Enrichment Program",
  },
];

let reviewIndex = 0;

const reviewText = document.getElementById("reviewText");
const reviewName = document.getElementById("reviewName");
const reviewSub = document.getElementById("reviewSub");
const dotButtons = document.querySelectorAll('.dots .dot');

function setActiveDot(i){
  dotButtons.forEach(d => d.classList.remove("is-active"));
  const current = document.querySelector(`.dots .dot[data-dot="${i}"]`);
  if (current) current.classList.add("is-active");
}

function renderReview(i){
  const r = reviews[i];
  if (!r) return;
  reviewText.textContent = r.text;
  reviewName.textContent = r.name;
  reviewSub.textContent = r.sub;
  setActiveDot(i);
}

const reviewsCarousel = document.querySelector('[data-carousel="reviews"]');
if (reviewsCarousel) {
  const prevBtn = reviewsCarousel.querySelector("[data-prev]");
  const nextBtn = reviewsCarousel.querySelector("[data-next]");

  prevBtn?.addEventListener("click", () => {
    reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
    renderReview(reviewIndex);
  });

  nextBtn?.addEventListener("click", () => {
    reviewIndex = (reviewIndex + 1) % reviews.length;
    renderReview(reviewIndex);
  });

  dotButtons.forEach(d => {
    d.addEventListener("click", () => {
      reviewIndex = Number(d.dataset.dot);
      renderReview(reviewIndex);
    });
  });

  renderReview(reviewIndex);
}

// -------------------------
// Updates carousel (date slider)
// -------------------------
const updates = [
  {
    date: "Feb 15, 2026",
    title: "Friend Referral Program",
    text: "We launched a referral flow that lets creators reward players for inviting friends to their experience.",
  },
  {
    date: "May 11, 2026",
    title: "New Level Builder Tools",
    text: "Creators can now prototype puzzle layouts faster with snap-to-grid placement and test runs.",
  },
  {
    date: "Jun 02, 2026",
    title: "Progress Saving Improvements",
    text: "Smoother checkpoints and clearer completion states across maps—less friction, more play.",
  },
  {
    date: "Jul 18, 2026",
    title: "Classroom Analytics (Beta)",
    text: "Teachers can view completion trends and where learners get stuck—without distracting the player.",
  },
];

let updateIndex = 0;
const updateDate = document.getElementById("updateDate");
const updateTitle = document.getElementById("updateTitle");
const updateText = document.getElementById("updateText");
const updateBar = document.getElementById("updateBar");

function renderUpdate(i){
  const u = updates[i];
  if (!u) return;

  updateDate.textContent = u.date;
  updateTitle.textContent = u.title;
  updateText.textContent = u.text;

  // progress bar reflects position
  const pct = ((i + 1) / updates.length) * 100;
  updateBar.style.width = `${pct}%`;
}

const updatesPanel = document.querySelector('[data-carousel="updates"]');
if (updatesPanel) {
  const prevBtn = updatesPanel.querySelector("[data-prev]");
  const nextBtn = updatesPanel.querySelector("[data-next]");

  prevBtn?.addEventListener("click", () => {
    updateIndex = (updateIndex - 1 + updates.length) % updates.length;
    renderUpdate(updateIndex);
  });

  nextBtn?.addEventListener("click", () => {
    updateIndex = (updateIndex + 1) % updates.length;
    renderUpdate(updateIndex);
  });

  renderUpdate(updateIndex);
}

// -------------------------
// Footer year
// -------------------------
document.getElementById("year").textContent = new Date().getFullYear();
