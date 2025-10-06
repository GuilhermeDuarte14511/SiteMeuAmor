document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration: 900, once: true, easing: "ease-out" });

  const weddingDate = new Date("2026-01-10T18:00:00");
  const dataConhecimento = new Date("2021-03-21T00:00:00");

  const countdownRefs = {
    dias: document.getElementById("dias"),
    horas: document.getElementById("horas"),
    minutos: document.getElementById("minutos"),
    segundos: document.getElementById("segundos"),
    barra: document.getElementById("barra-progresso"),
    textoBarra: document.getElementById("progresso-texto"),
  };

  function updateCountdown() {
    const now = Date.now();
    const distance = weddingDate.getTime() - now;

    if (distance <= 0) {
      ["dias", "horas", "minutos", "segundos"].forEach((key) => {
        if (countdownRefs[key]) countdownRefs[key].textContent = "00";
      });
      if (countdownRefs.textoBarra) countdownRefs.textoBarra.textContent = "\u00C9 hoje! Bem-vindos ao grande dia";
      if (countdownRefs.barra) countdownRefs.barra.style.width = "100%";
      return;
    }

    const dias = Math.floor(distance / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distance % (1000 * 60)) / 1000);

    if (countdownRefs.dias) countdownRefs.dias.textContent = dias.toString().padStart(2, "0");
    if (countdownRefs.horas) countdownRefs.horas.textContent = horas.toString().padStart(2, "0");
    if (countdownRefs.minutos) countdownRefs.minutos.textContent = minutos.toString().padStart(2, "0");
    if (countdownRefs.segundos) countdownRefs.segundos.textContent = segundos.toString().padStart(2, "0");

    const total = weddingDate.getTime() - dataConhecimento.getTime();
    const passado = now - dataConhecimento.getTime();
    const progresso = Math.min((passado / total) * 100, 100);

    if (countdownRefs.barra) countdownRefs.barra.style.width = `${progresso.toFixed(2)}%`;
    if (countdownRefs.textoBarra) countdownRefs.textoBarra.textContent = `${progresso.toFixed(0)}% at\u00E9 o grande dia`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const heartsContainer = document.querySelector(".hearts-container");
  if (heartsContainer) {
    const heartColors = ["#b76e79", "#d89aa2", "#ffffff"];
    const spawnHeart = () => {
      const heart = document.createElement("i");
      heart.className = "fas fa-heart heart";
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.opacity = (Math.random() * 0.8 + 0.2).toFixed(2);
      heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
      heart.style.animationDuration = `${Math.random() * 4 + 4}s`;
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 8000);
    };

    setInterval(spawnHeart, 650);
  }

  const diasSpan = document.getElementById("dias-juntos");
  if (diasSpan) {
    const hoje = new Date();
    const diasJuntos = Math.floor((hoje - dataConhecimento) / (1000 * 60 * 60 * 24));
    diasSpan.textContent = new Intl.NumberFormat("pt-BR").format(diasJuntos);
  }

  const frasesRotativas = [
    "Amar \u00E9 transformar rotina em poesia.",
    "Voc\u00EA \u00E9 meu agora, meu depois e todos os meus sonhos.",
    "Nosso amor floresce em cada detalhe do dia.",
    "Com voc\u00EA, at\u00E9 o sil\u00EAncio vira m\u00FAsica.",
    "Prometemos ser abrigo, riso e infinito um do outro.",
  ];

  const fraseElement = document.getElementById("rotating-phrase");
  if (fraseElement && frasesRotativas.length) {
    let indiceAtual = 0;
    fraseElement.textContent = frasesRotativas[indiceAtual];

    setInterval(() => {
      indiceAtual = (indiceAtual + 1) % frasesRotativas.length;
      fraseElement.classList.remove("fadein");
      void fraseElement.offsetWidth;
      fraseElement.textContent = frasesRotativas[indiceAtual];
      fraseElement.classList.add("fadein");
    }, 5200);
  }

  if (document.getElementById("typed-header")) {
    new TypeIt("#typed-header", {
      speed: 46,
      loop: true,
      waitUntilVisible: true,
      cursor: true,
      deleteSpeed: 25,
      nextStringDelay: 1900,
    })
      .type("Um amor iluminado por rose gold e noites estreladas.")
      .pause(1900)
      .delete()
      .type("Cada detalhe preparado para celebrar o nosso para sempre.")
      .pause(1900)
      .delete()
      .type("Voc\u00EA faz parte da nossa hist\u00F3ria e desse grande dia.")
      .pause(1900)
      .delete()
      .go();
  }

  document.querySelectorAll(".promise-card").forEach((card) => {
    const inner = card.querySelector(".card-inner");
    card.addEventListener("click", () => {
      inner.classList.toggle("flipped");
    });
  });

  const btnTop = document.getElementById("btn-top");
  if (btnTop) {
    btnTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const toggleTopVisibility = () => {
      if (window.scrollY > 280) {
        btnTop.classList.add("is-visible");
      } else {
        btnTop.classList.remove("is-visible");
      }
    };

    window.addEventListener("scroll", toggleTopVisibility, { passive: true });
    toggleTopVisibility();
  }

  const btnMessage = document.getElementById("btn-love-message");
  if (btnMessage) {
    btnMessage.addEventListener("click", () => {
      const modalElement = document.getElementById("loveModal");
      if (!modalElement) return;
      const modal = new bootstrap.Modal(modalElement);
      modal.show();

      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 95,
          origin: { y: 0.65 },
          colors: ["#b76e79", "#d89aa2", "#ffffff", "#f6e7e4"],
        });
      }, 400);
    });
  }

  const navMenu = document.getElementById("mainMenu");
  if (navMenu) {
    document.querySelectorAll('.romantic-navbar .nav-link[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (targetId && targetId.length > 1) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            event.preventDefault();
            const offsetTop = targetEl.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
          }
        }

        const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      });
    });
  }

  let ytPlayer;
  let musicPlaying = false;

  window.onYouTubeIframeAPIReady = function () {
    const iframeElement = document.getElementById("youtube-audio");
    if (!iframeElement) return;

    ytPlayer = new YT.Player("youtube-audio", {
      events: {
        onReady: (event) => {
          event.target.setVolume(65);
          event.target.unMute();
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.ENDED) {
            musicPlaying = false;
            const musicButton = document.getElementById("btn-music");
            if (musicButton) musicButton.classList.remove("playing");
          }
        },
      },
    });
  };

  const btnMusic = document.getElementById("btn-music");
  if (btnMusic) {
    btnMusic.addEventListener("click", () => {
      if (!ytPlayer) return;
      if (musicPlaying) {
        ytPlayer.pauseVideo();
        btnMusic.classList.remove("playing");
      } else {
        ytPlayer.playVideo();
        ytPlayer.unMute();
        btnMusic.classList.add("playing");
      }
      musicPlaying = !musicPlaying;
    });
  }
});




