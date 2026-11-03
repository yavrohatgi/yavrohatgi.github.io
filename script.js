// Project data
const projectData = [
  {
    id: 1,
    title: "Sign Detection Gloves",
    repo: "https://github.com/yavrohatgi/SignSpeak",
    technologies: [
      "Machine Learning",
      "Python",
      "C++",
      "TensorFlow",
      "Inertial Measurement Unit (IMU)",
      "BeagleBone Black"
    ],
    description:
      "Smart gloves designed to recognize sign language gestures using machine learning and IMU sensors, developed under the guidance of <a href='https://www.umass.edu/engineering/about/directory/hossein-pishro-nik' target='_blank'>Professor Hossein Pishro-Nik</a>.",
    achievements: [
      "Captured high-frequency motion signals from 6-axis IMU sensors on each finger to enable fine-grained gesture input",
      "Processed motion data into discrete-time series timestamped via MCU clock to recognize sequential hand signs",
      "Reached 92% real-time classification accuracy by training a lightweight model with TensorFlow Lite"
    ]
  },
  {
    id: 2,
    title: "AI Assisted Approach to Math Tutoring",
    technologies: ["LangChain", "Prompt Engineering", "Hugging Face"],
    description:
      "Research project under <a href='https://www.umass.edu/engineering/about/directory/lixin-gao' target='_blank'>Professor Lixin Gao</a> focused on enhancing mathematical reasoning capabilities in large language models.",
    achievements: [
      "Achieved 90% accuracy on 5k+ math problems by integrating N-shot prompting, Chain-of-Thought reasoning, and symbolic reasoning using Wolfram Alpha to improve multi-step reasoning",
      "Deployed a RAG system that helped improve BLEU by 11.6% for lecture-style question generation",
      "Discovered that 18% of generated problems were unsolvable, revealing internal failures in LLM reasoning"
    ]
  },
  {
    id: 3,
    title: "Compact LLM Architecture",
    technologies: ["Machine Learning", "JAX"],
    description:
      "Efficient implementation of language prediction models using JAX for optimized computation.",
    achievements: [
      "Built sequence prediction models (constant, linear, MLP, double-layer) to evaluate accuracy and architecture tradeoffs",
      "Reduced loss by 66% by fine-tuning double MLP networks with SGD and improved text clarity",
      "Evaluated model depth, width, and learning rates to identify configurations that optimized speed and accuracy"
    ]
  },
  {
    id: 4,
    title: "Thread Library & Disk Scheduler",
    technologies: ["Operating Systems", "C++", "Multi-Threading"],
    description:
      "Low-level implementation of threading and disk scheduling systems in C++.",
    achievements: [
      "Developed a thread library for multiple threads with ucontext, FIFO scheduling, Mesa-style condition variables, and interrupts",
      "Built a disk scheduler using SSTF, synchronizing multiple threads with monitors while managing a bounded queue of 1000 requests"
    ]
  },
  {
    id: 5,
    title: "Token Manager and Holder Contracts",
    technologies: ["Solidity", "Ethereum Smart Contracts"],
    description:
      "Ethereum smart contracts for secure token management with ERC223 compliance.",
    achievements: [
      "Architected ERC223-compliant contracts to mint, melt, and transfer 100K+ tokens, ensuring secure token management",
      "Established token sales and remittance processes, facilitating 1,000+ secure on-chain transactions with zero security breaches"
    ]
  },
  {
    id: 6,
    title: "Mixed Reality Research",
    timeline: "Sept 2023 – Dec 2023",
    technologies: ["C", "C++", "Unity", "HoloLens 2", "MRTK"],
    description:
      "Research project exploring collaborative interaction patterns in Mixed Reality environments using HoloLens 2 at the Embedded Systems Lab",
    achievements: [
      "Implemented shared object movements with multiple users using HoloLens 2 in Unity via MRTK with 7% improved accuracy",
      "Recording these movements to enable in-depth analysis to enhance understanding of user interaction patterns"
    ]
  },
  {
    id: 7,
    title: "Secure Communication System",
    timeline: "Sept 2023 – Dec 2023",
    technologies: [
      "Python",
      "DE1-SoC",
      "Quartus Prime",
      "RSA",
      "DES",
      "LFSR-based PRNG",
      "Ring Oscillator-based TRNG"
    ],
    description:
      "FPGA-based implementation of cryptographic systems with true random number generation for enhanced security.",
    achievements: [
      "Designed and implemented a secure communication system using RSA and DES encryption on DE1-SoC boards",
      "Implemented LFSR-based PRNG and Ring Oscillator-based TRNG for true randomness for enhanced security"
    ]
  },
  {
    id: 8,
    title: "CPU Simulation and Cache Optimization",
    timeline: "Sept 2023 – Dec 2023",
    technologies: ["RISC-V Assembly", "Ripes", "Cache Architecture", "Performance Optimization"],
    description:
      "Architectural simulation focusing on cache optimization for RISC-V based processors to improve system performance.",
    achievements: [
      "Developed a CPU simulation incorporating an ALU, registers, and data memory for data manipulation",
      "Engineered enhancements in cache architecture using Ripes, achieving a significant increase in cache hit rate which led to a measurable improvement in system performance and throughput"
    ]
  }
];

// -----------------------------
// MAIN SCRIPT STARTS HERE
// -----------------------------

document.addEventListener("DOMContentLoaded", function () {
  // ---------- SMALL HELPERS ----------
  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) {
      /* private browsing / storage disabled */
    }
  }

  // ---------- LOADING SCREEN ----------
  // Waits for the page to genuinely finish loading (fonts, the portrait) rather
  // than counting through a scripted fake progress bar. A hard cap means a slow
  // asset can never trap the visitor behind the overlay.
  const loadingScreen = document.getElementById("loadingScreen");
  const MIN_VISIBLE_MS = 400; // long enough that the animation doesn't just flicker
  const MAX_WAIT_MS = 3000;
  const startedAt = Date.now();
  let dismissed = false;

  document.body.classList.add("loading-active");

  function hideLoader() {
    if (dismissed) return;
    dismissed = true;
    document.body.classList.remove("loading-active");
    loadingScreen.classList.add("is-done");
    setTimeout(function () {
      loadingScreen.style.display = "none";
    }, 600);
  }

  function finishLoading() {
    setTimeout(hideLoader, Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedAt)));
  }

  if (document.readyState === "complete") finishLoading();
  else window.addEventListener("load", finishLoading);
  setTimeout(hideLoader, MAX_WAIT_MS);

  // ---------- REVEAL ON SCROLL ----------
  // Replaces AOS. The hiding styles are gated behind .reveal-ready, which is only
  // added here, so if this script fails the content stays visible instead of blank.
  const revealEls = document.querySelectorAll("[data-aos]");
  if (revealEls.length && "IntersectionObserver" in window) {
    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.style.transitionDelay = (parseInt(el.dataset.aosDelay, 10) || 0) + "ms";
          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---------- TYPED HEADLINE ----------
  if (window.Typed) {
    new Typed("#typing-text", {
      strings: ["agentic AI.  ", "browser automation.  ", "machine learning.  "],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 500,
      loop: true
    });
  }

  // ---------- THEME ----------
  // The icon shown is driven by CSS off body.light-theme, so there's nothing to
  // swap here. index.html already applied the stored theme before first paint.
  const themeToggle = document.getElementById("themeToggle");

  function toggleTheme() {
    const isLight = document.body.classList.toggle("light-theme");
    store("theme", isLight ? "light" : "dark");
  }

  themeToggle.addEventListener("click", toggleTheme);

  // ---------- PROJECT FILTERS ----------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      const filter = btn.dataset.filter;
      projectCards.forEach(function (card) {
        const show = filter === "all" || card.dataset.category.includes(filter);
        card.hidden = !show;
      });
    });
  });

  // ---------- PROJECT MODAL ----------
  const projectModal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  let lastFocused = null;

  function openProject(projectId) {
    const project = projectData.find(function (p) {
      return p.id === projectId;
    });
    if (!project) return;

    lastFocused = document.activeElement;
    modalTitle.textContent = project.title;

    let content =
      '<div class="modal-section"><h4>Technologies</h4><div class="modal-tech-tags">' +
      project.technologies
        .map(function (tech) {
          return '<div class="modal-tech-tag">' + tech + "</div>";
        })
        .join("") +
      "</div></div>";

    content +=
      '<div class="modal-section"><h4>Description</h4><p>' + project.description + "</p></div>";

    content +=
      '<div class="modal-section"><h4>Key Achievements</h4><ul class="modal-list">' +
      project.achievements
        .map(function (a) {
          return "<li>" + a + "</li>";
        })
        .join("") +
      "</ul></div>";

    if (project.repo) {
      content +=
        '<a class="btn btn-ghost modal-repo" target="_blank" rel="noopener noreferrer" href="' +
        project.repo +
        '"><svg class="icon" aria-hidden="true"><use href="#i-github"></use></svg> View source on GitHub</a>';
    }

    modalContent.innerHTML = content;
    projectModal.classList.add("active");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    projectModal.classList.remove("active");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  projectCards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      // let the "Code" link do its own thing instead of opening the modal
      if (e.target.closest("a")) return;
      openProject(parseInt(card.dataset.projectId, 10));
    });
  });

  modalClose.addEventListener("click", closeModal);
  projectModal.addEventListener("click", function (e) {
    if (e.target === projectModal) closeModal();
  });

  // ---------- COMMAND PALETTE ----------
  const palette = document.getElementById("palette");
  const paletteInput = document.getElementById("paletteInput");
  const paletteList = document.getElementById("paletteList");
  const paletteTrigger = document.getElementById("paletteTrigger");

  function goTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const commands = [
    { label: "About", kind: "Section", run: function () { goTo("about"); } },
    { label: "Experience", kind: "Section", run: function () { goTo("experience"); } },
    { label: "Projects", kind: "Section", run: function () { goTo("projects"); } },
    { label: "Skills", kind: "Section", run: function () { goTo("skills"); } },
    { label: "Contact", kind: "Section", run: function () { goTo("contact"); } }
  ]
    .concat(
      projectData.map(function (p) {
        return {
          label: p.title,
          kind: "Project",
          run: function () {
            goTo("projects");
            openProject(p.id);
          }
        };
      })
    )
    .concat([
      { label: "Resume (PDF)", kind: "Link", run: function () { window.open("/resume.pdf", "_blank", "noopener"); } },
      { label: "GitHub", kind: "Link", run: function () { window.open("https://github.com/yavrohatgi", "_blank", "noopener"); } },
      { label: "LinkedIn", kind: "Link", run: function () { window.open("https://www.linkedin.com/in/yav-rohatgi/", "_blank", "noopener"); } },
      { label: "Email me", kind: "Link", run: function () { window.location.href = "mailto:yavrohatgi03@gmail.com"; } },
      { label: "Toggle theme", kind: "Action", run: toggleTheme }
    ]);

  let matches = [];
  let activeIndex = 0;

  // Substring hits rank highest and rank earlier positions first; otherwise fall
  // back to a subsequence match so "sgn glv" still finds the gloves project.
  function score(query, text) {
    if (!query) return 1;
    const q = query.toLowerCase();
    const t = text.toLowerCase();
    const at = t.indexOf(q);
    if (at !== -1) return 1000 - at;
    let qi = 0;
    for (let i = 0; i < t.length && qi < q.length; i++) {
      if (t[i] === q[qi]) qi++;
    }
    return qi === q.length ? 1 : 0;
  }

  function renderPalette() {
    const query = paletteInput.value.trim();
    matches = commands
      .map(function (c) {
        return { cmd: c, s: score(query, c.label) };
      })
      .filter(function (r) {
        return r.s > 0;
      })
      .sort(function (a, b) {
        return b.s - a.s;
      })
      .map(function (r) {
        return r.cmd;
      });

    if (activeIndex >= matches.length) activeIndex = 0;

    if (!matches.length) {
      paletteList.innerHTML = '<li class="palette-empty">No matches</li>';
      return;
    }

    paletteList.innerHTML = matches
      .map(function (c, i) {
        return (
          '<li class="palette-item' +
          (i === activeIndex ? " is-active" : "") +
          '" role="option" data-index="' +
          i +
          '"><span>' +
          c.label +
          '</span><span class="palette-kind">' +
          c.kind +
          "</span></li>"
        );
      })
      .join("");
  }

  function openPalette() {
    palette.hidden = false;
    paletteInput.value = "";
    activeIndex = 0;
    renderPalette();
    document.body.style.overflow = "hidden";
    paletteInput.focus();
  }

  function closePalette() {
    palette.hidden = true;
    if (!projectModal.classList.contains("active")) document.body.style.overflow = "";
  }

  function runActive() {
    const cmd = matches[activeIndex];
    if (!cmd) return;
    closePalette();
    cmd.run();
  }

  paletteTrigger.addEventListener("click", openPalette);
  paletteInput.addEventListener("input", function () {
    activeIndex = 0;
    renderPalette();
  });

  paletteList.addEventListener("click", function (e) {
    const item = e.target.closest(".palette-item");
    if (!item) return;
    activeIndex = parseInt(item.dataset.index, 10);
    runActive();
  });

  palette.addEventListener("click", function (e) {
    if (e.target === palette) closePalette();
  });

  paletteInput.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % Math.max(matches.length, 1);
      renderPalette();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + matches.length) % Math.max(matches.length, 1);
      renderPalette();
    } else if (e.key === "Enter") {
      e.preventDefault();
      runActive();
    }
  });

  // ---------- GLOBAL KEYS ----------
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      palette.hidden ? openPalette() : closePalette();
      return;
    }
    if (e.key === "Escape") {
      if (!palette.hidden) closePalette();
      else if (projectModal.classList.contains("active")) closeModal();
    }
  });

  // ---------- BACK TO TOP + SCROLL PROGRESS ----------
  const backToTopBtn = document.getElementById("backToTop");
  const scrollProgress = document.getElementById("scrollProgress");

  function onScroll() {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = (height > 0 ? (scrollTop / height) * 100 : 0) + "%";
    backToTopBtn.classList.toggle("visible", scrollTop > 300);
    document.querySelector(".navbar").classList.toggle("scrolled", scrollTop > 50);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---------- ACTIVE NAV PILL ----------
  // Highlights the nav link for whichever section currently owns the viewport.
  const navAnchors = document.querySelectorAll(".nav-links a[data-nav]");
  if (navAnchors.length && "IntersectionObserver" in window) {
    const sectionById = {};
    navAnchors.forEach(function (a) {
      const el = document.getElementById(a.dataset.nav);
      if (el) sectionById[a.dataset.nav] = el;
    });

    function setCurrent(id) {
      navAnchors.forEach(function (a) {
        a.classList.toggle("is-current", a.dataset.nav === id);
      });
    }

    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    Object.keys(sectionById).forEach(function (id) {
      sectionObserver.observe(sectionById[id]);
    });
  }

  // ---------- MOBILE NAV ----------
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.setAttribute("aria-expanded", "false");
  navToggle.addEventListener("click", function () {
    const open = navLinks.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // ---------- CONTACT FORM ----------
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");

  function setStatus(message, kind) {
    formStatus.textContent = message;
    formStatus.className = "form-status" + (kind ? " is-" + kind : "");
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      setStatus("Please fill in every field before sending.", "error");
      return;
    }

    submitBtn.disabled = true;
    setStatus("Sending…", "pending");

    fetch(contactForm.getAttribute("action"), {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        contactForm.reset();
        setStatus("Thanks — your message is on its way. I'll get back to you soon.", "success");
      })
      .catch(function () {
        setStatus("Something went wrong. Email yavrohatgi03@gmail.com instead?", "error");
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  });

  // ---------- SMOOTH SCROLL ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      navLinks.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
});
