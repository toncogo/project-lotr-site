const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupDesc = document.getElementById("popup-desc");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".marker").forEach(marker => {
  marker.addEventListener("click", () => {
    const key = marker.dataset.location;
    const loc = locations[key];
    popupImg.src = loc.img;
    popupTitle.textContent = loc.title;
    popupDesc.textContent = loc.desc;
    popup.classList.remove("hidden");
  });
});

closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

// Button ZoomIn && ZoomOut
let scale = 1;
const mapContainer = document.querySelector(".map-container");

document.getElementById("zoom-in").addEventListener("click", () => {
  scale = Math.min(2.5, scale + 0.2);
  updateZoom();
});

document.getElementById("zoom-out").addEventListener("click", () => {
  scale = Math.max(0.5, scale - 0.2);
  updateZoom();
});

function updateZoom() {
  mapContainer.style.transform = `scale(${scale})`;
  mapContainer.style.transformOrigin = "center center";
}

const miniMap = document.getElementById("mini-map");
const miniImg = miniMap.querySelector("img");

  miniMap.addEventListener("click", (e) => {
  const rect = miniMap.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Convertendo coordenadas do minimapa para o mapa principal
  const percentX = x / rect.width;
  const percentY = y / rect.height;

  const wrapperWidth = wrapper.offsetWidth;
  const wrapperHeight = wrapper.offsetHeight;

  const mapWidth = mapContainer.offsetWidth * scale;
  const mapHeight = mapContainer.offsetHeight * scale;

  const targetX = percentX * mapWidth - wrapperWidth / 2;
  const targetY = percentY * mapHeight - wrapperHeight / 2;

  wrapper.scrollTo({
    left: targetX,
    top: targetY,
    behavior: "smooth"
  });

  setTimeout(updateMiniViewbox, 300); // Ajusta a caixinha depois da rolagem
});

