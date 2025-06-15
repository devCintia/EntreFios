const urlParams = new URLSearchParams(window.location.search);
const bolsaId = urlParams.get("id");

fetch('./src/dados/bolsas.json')
  .then(res => res.json())
  .then(bolsas => {
    const bolsa = bolsas[bolsaId];

    if (!bolsa) {
      document.querySelector("main").innerHTML = "<p>Produto não encontrado.</p>";
      return;
    }

    document.getElementById("nome").textContent = bolsa.nome;
    document.getElementById("imagem-principal").src = bolsa.imagens[0];
    document.getElementById("imagem-principal").alt = bolsa.nome;
    document.getElementById("preco").textContent = bolsa.preco;
    document.getElementById("descricao").textContent = bolsa.descricao;
    document.getElementById("link").href = bolsa.link;

    // Miniaturas
    const galeria = document.getElementById("galeria");
    const imagemPrincipal = document.getElementById("imagem-principal");
    const videoPrincipal = document.getElementById("video-principal");

    bolsa.imagens.forEach(imagem => {
      if (imagem.endsWith(".mp4")) {
      const video = document.createElement("video");
      video.src = imagem;
      video.controls = true;
      video.width = 80; 
      video.play();
      video.addEventListener("click", () => {
        imagemPrincipal.style.display = "none";
          videoPrincipal.style.display = "block";
          videoPrincipal.src = imagem;
          videoPrincipal.play();
    });
      galeria.appendChild(video);
    } else {
      const mini = document.createElement("img");
      mini.src = imagem;
      mini.classList.add("miniatura");
      mini.addEventListener("click", () => {
        videoPrincipal.pause();
          videoPrincipal.style.display = "none";
          imagemPrincipal.style.display = "block";
          imagemPrincipal.src = imagem;        
    });
      galeria.appendChild(mini);
  }});

    // Relacionados
    const relacionados = document.getElementById("relacionados");
    bolsa.relacionados.forEach(id => {
      const r = bolsas[id];
      if (r) {
        const item = document.createElement("a");
        item.href = `detalhe.html?id=${id}`;
        item.innerHTML = `
          <img src="${r.imagens[0]}" alt="${r.nome}" />
          <p>${r.nome}</p>
        `;
        item.classList.add("relacionado");
        relacionados.appendChild(item);
      }
    });

  });
