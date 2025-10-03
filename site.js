document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration: 900, once: true, easing: "ease-out" });

  const weddingDate = new Date("2026-01-10T16:00:00");
  const dataConhecimento = new Date("2021-03-21T00:00:00");

  const countdownRefs = {
    dias: document.getElementById("dias"),
    horas: document.getElementById("horas"),
    minutos: document.getElementById("minutos"),
    segundos: document.getElementById("segundos"),
    container: document.getElementById("countdown"),
    barra: document.getElementById("barra-progresso"),
    textoBarra: document.getElementById("progresso-texto"),
  };

  function updateCountdown() {
    if (!countdownRefs.container) return;

    const now = new Date().getTime();
    const distance = weddingDate.getTime() - now;

    if (distance <= 0) {
      ["dias", "horas", "minutos", "segundos"].forEach((key) => {
        if (countdownRefs[key]) countdownRefs[key].textContent = "0";
      });

      if (countdownRefs.textoBarra) {
        countdownRefs.textoBarra.textContent = "É hoje! Bem-vindos ao grande dia";
      }

      if (countdownRefs.barra) {
        countdownRefs.barra.style.width = "100%";
      }

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
    if (countdownRefs.textoBarra) countdownRefs.textoBarra.textContent = `${progresso.toFixed(0)}% até o grande dia`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const heartsContainer = document.querySelector(".hearts-container");
  if (heartsContainer) {
    const heartColors = ["#ff69b4", "#f7b6d7", "#a6c1ee"];
    const spawnHeart = () => {
      const heart = document.createElement("i");
      heart.className = "fas fa-heart heart";
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.opacity = Math.random().toFixed(2);
      heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
      heart.style.animationDuration = `${Math.random() * 4 + 4}s`;
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 7000);
    };

    setInterval(spawnHeart, 600);
  }

  const diasSpan = document.getElementById("dias-juntos");
  if (diasSpan) {
    const hoje = new Date();
    const diasJuntos = Math.floor((hoje - dataConhecimento) / (1000 * 60 * 60 * 24));
    diasSpan.textContent = new Intl.NumberFormat("pt-BR").format(diasJuntos);
  }

  const frasesRotativas = [
    "Amar é transformar rotina em poesia.",
    "Você é meu agora, meu depois e todos os meus sonhos.",
    "Nosso amor floresce em cada detalhe do dia.",
    "Com você, até o silêncio vira música.",
    "Prometemos ser abrigo, riso e infinito um do outro.",
  ];

  const fraseElement = document.getElementById("rotating-phrase");
  if (fraseElement) {
    let fraseAtual = 0;
    fraseElement.textContent = frasesRotativas[fraseAtual];

    setInterval(() => {
      fraseAtual = (fraseAtual + 1) % frasesRotativas.length;
      fraseElement.classList.remove("fadein");
      void fraseElement.offsetWidth;
      fraseElement.textContent = frasesRotativas[fraseAtual];
      fraseElement.classList.add("fadein");
    }, 5000);
  }

  if (document.getElementById("typeit")) {
    new TypeIt("#typeit", {
      speed: 55,
      loop: true,
      breakLines: true,
      deleteSpeed: 25,
      waitUntilVisible: true,
      nextStringDelay: 1700,
    })
      .type("Eu te amo em cada universo em que podemos existir juntos.")
      .pause(1600)
      .delete()
      .type("Entre cafés e códigos, é você quem faz meu coração compilar.")
      .pause(1600)
      .delete()
      .type("Se o mundo desalinhar, encontro você em qualquer linha do tempo.")
      .pause(1600)
      .delete()
      .type("Você é minha casa, meu lugar preferido e meu porto seguro.")
      .pause(1600)
      .delete()
      .type("Te escolheria mil vezes, em qualquer realidade.")
      .pause(1600)
      .delete()
      .go();
  }

  if (document.getElementById("typed-header")) {
    new TypeIt("#typed-header", {
      speed: 45,
      loop: true,
      waitUntilVisible: true,
      cursor: false,
      deleteSpeed: 25,
      nextStringDelay: 1800,
    })
      .type("Um amor escrito nas estrelas e nos nossos sorrisos.")
      .pause(1800)
      .delete()
      .type("Do primeiro olhar ao eterno sim, cada passo valeu a pena.")
      .pause(1800)
      .delete()
      .type("Contando os dias para o nosso para sempre.")
      .pause(1800)
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

  let ytPlayer;
  let musicPlaying = false;

  window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player("youtube-audio", {
      events: {
        onReady: (event) => {
          event.target.setVolume(50);
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
        btnMusic.classList.add("playing");
      }
      musicPlaying = !musicPlaying;
    });
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
          particleCount: 180,
          spread: 90,
          origin: { y: 0.65 },
          colors: ["#ff69b4", "#f7b6d7", "#a6c1ee", "#ffffff"],
        });
      }, 450);
    });
  }

  const navMenu = document.getElementById("mainMenu");
  if (navMenu) {
    document.querySelectorAll('.romantic-navbar .nav-link[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (targetId.length > 1) {
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
});
