document.addEventListener("DOMContentLoaded", function () {
    AOS.init();
  
    const weddingDate = new Date("2026-01-10T00:00:00");
    const dataConhecimento = new Date("2021-03-21T00:00:00");
  
    // Contagem regressiva e progresso
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;
  
      const dias = Math.floor(distance / (1000 * 60 * 60 * 24));
      const horas = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((distance % (1000 * 60)) / 1000);
  
      if (distance < 0) {
        document.getElementById("countdown").innerHTML = "É hoje! 💍";
        return;
      }
  
      document.getElementById("dias").textContent = dias;
      document.getElementById("horas").textContent = horas;
      document.getElementById("minutos").textContent = minutos;
      document.getElementById("segundos").textContent = segundos;
  
      // Barra de progresso
      const total = weddingDate.getTime() - dataConhecimento.getTime();
      const passado = now - dataConhecimento.getTime();
      const progresso = Math.min((passado / total) * 100, 100);
      const barra = document.getElementById("barra-progresso");
      const texto = document.getElementById("progresso-texto");
      if (barra && texto) {
        barra.style.width = progresso.toFixed(2) + "%";
        texto.textContent = progresso.toFixed(0) + "% até o grande dia!";
      }
    }
  
    updateCountdown();
    setInterval(updateCountdown, 1000);
  
    // Corações flutuando
    const heartsContainer = document.querySelector(".hearts-container");
    function createHeart() {
      const heart = document.createElement("div");
      heart.innerHTML = '<i class="fas fa-heart heart"></i>';
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 3 + 2 + "s";
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }
    setInterval(createHeart, 400);
  
    // Dias desde que se conheceram
    const hoje = new Date();
    const diasJuntos = Math.floor((hoje - dataConhecimento) / (1000 * 60 * 60 * 24));
    const diasSpan = document.getElementById("dias-juntos");
    if (diasSpan) diasSpan.textContent = diasJuntos;
  
    // Frases rotativas com fade
    const frases = [
      "Amar é encontrar no outro a felicidade. 💖",
      "Você é o meu hoje e todos os meus amanhãs. 💑",
      "Nosso amor é a melhor história que já vivi. ✨",
      "Com você, até o silêncio é poesia. 🌹",
      "Te amarei até o infinito... e além! 🚀"
    ];
    let fraseAtual = 0;
    const fraseElement = document.getElementById("rotating-phrase");
    if (fraseElement) {
      fraseElement.textContent = frases[fraseAtual];
      setInterval(() => {
        fraseAtual = (fraseAtual + 1) % frases.length;
        fraseElement.classList.remove("fadein");
        void fraseElement.offsetWidth;
        fraseElement.textContent = frases[fraseAtual];
        fraseElement.classList.add("fadein");
      }, 5000);
    }
  
    new TypeIt("#typeit", {
        speed: 50,
        loop: true,
        breakLines: true,
        deleteSpeed: 20,
        waitUntilVisible: true,
        nextStringDelay: 1500
      })
        .type("Eu te amo 3000. 💔 – Tony Stark")
        .pause(1500).delete()
        .type("Você me completa. 💕 – Batman (Bruce Wayne)")
        .pause(1500).delete()
        .type("Prefiro um mundo com você do que qualquer outro sem. 🌍 – Capitão América")
        .pause(1500).delete()
        .type("Mesmo com os poderes de um deus, meu coração é seu. ⚡ – Thor")
        .pause(1500).delete()
        .type("Você é a única coisa que dá sentido a tudo. ❤️ – Homem-Aranha")
        .pause(1500).delete()
        .type("Se o universo nos separasse mil vezes, eu te encontraria em todas. ✨ – Wanda Maximoff")
        .pause(1500).delete()
        .type("Você é a minha casa, meu lar, meu universo. 🌌 – Superman")
        .pause(1500).delete()
        .type("Até no multiverso, te escolheria de novo. 🔁 – Doutor Estranho")
        .pause(1500).delete()
        .type("Meu coração acelera mais do que meus superpoderes quando te vejo. 💓 – Flash")
        .pause(1500).delete()
        .type("Tudo o que fiz... foi por você. 🛡️ – Capitão América")
        .pause(1500).delete()
        .type("Eu te amo em todos os universos. 💫 – Doutor Estranho")
        .pause(1500).delete()
        .type("Você é minha constante em todos os tempos. ⏳ – Loki")
        .pause(1500).delete()
        .type("Mesmo se eu esquecer tudo, sei que vou me apaixonar por você de novo. 🧠❤️ – Wanda")
        .pause(1500).delete()
        .type("Sempre estive aqui por você... porque te amo. 💌 – Mary Jane Watson")
        .pause(1500).delete()
        .type("Meu amor por você é mais forte que qualquer kryptonita. 🟢❤️ – Superman")
        .pause(1500).delete()
        .type("Mesmo que o mundo acabe, eu ainda vou te amar. 🌍💖 – Mulher-Maravilha")
        .pause(1500).delete()
        .type("Você é minha maior missão... e minha maior escolha. 🎯 – Viúva Negra")
        .pause(1500).delete()
        .type("A melhor parte de mim... é você. 💕 – Steve Rogers")
        .pause(1500).delete()
        .go();
      
  
    // Cartões: clique para virar
    document.querySelectorAll(".promise-card").forEach((card) => {
      const inner = card.querySelector(".card-inner");
      card.addEventListener("click", () => {
        inner.classList.toggle("flipped");
      });
    });
  
    // Botão voltar ao topo
    const btnTop = document.getElementById("btn-top");
    if (btnTop) {
      btnTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  
    // Música YouTube
    let ytPlayer;
    let musicPlaying = false;
    window.onYouTubeIframeAPIReady = function () {
      ytPlayer = new YT.Player("youtube-audio", {
        events: {
          onReady: (event) => {
            event.target.setVolume(50);
          }
        }
      });
    };
  
    const btnMusic = document.getElementById("btn-music");
    if (btnMusic) {
      btnMusic.addEventListener("click", () => {
        if (!ytPlayer) return;
        if (musicPlaying) {
          ytPlayer.pauseVideo();
        } else {
          ytPlayer.playVideo();
        }
        musicPlaying = !musicPlaying;
      });
    }
  
    // Modal de mensagem com confetes
    const btnMessage = document.getElementById("btn-love-message");
    if (btnMessage) {
      btnMessage.addEventListener("click", () => {
        const modal = new bootstrap.Modal(document.getElementById("loveModal"));
        modal.show();
  
        // Disparo de confetes ao abrir o modal
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
          });
        }, 400);
      });
    }

    if (document.getElementById("typed-header")) {
        new TypeIt("#typed-header", {
          speed: 45,
          loop: true,
          waitUntilVisible: true,
          breakLines: false,
          deleteSpeed: 25,
        })
          .type("Te amo mais que mil cafés e códigos. ☕💻")
          .pause(1500)
          .delete()
          .type("Você é meu bug favorito no universo. 💘")
          .pause(1500)
          .delete()
          .type("Com você, até o infinito fica pequeno. 🪐❤️")
          .pause(1500)
          .delete()
          .type("Eu te amo mil milhões. — Tony Stark ✨")
          .pause(1500)
          .go();
      }
      
  });
  