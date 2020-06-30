import L from 'https://code4sabae.github.io/leaflet-mjs/leaflet.mjs'

class MapGSI extends HTMLElement {
  constructor () {
    super();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://code4sabae.github.io/leaflet-mjs/leaflet.css";
    this.appendChild(link);

    const div = document.createElement("div");
    this.appendChild(div);
    div.style.width = this.getAttribute("width") || "100%";
    div.style.height = this.getAttribute("height") || "60vh";

    const map = L.map(div);
    // set 国土地理院地図 https://maps.gsi.go.jp/development/ichiran.html
    L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>"',
      maxZoom: 18,
    }).addTo(map);

    const iconlayer = L.layerGroup();
    iconlayer.addTo(map);

    const lls = [];
    for (const item of this.children) {
      if (item.tagName !== "MAP-GSI-ICON") continue;
      console.log(item, item.tagName);
      console.log(typeof item.getAttribute("name"));
      const ll = item.getAttribute("ll").split(",");
      const title = item.getAttribute("name");
      const marker = L.marker(ll, { title });
      marker.bindPopup(title);
      iconlayer.addLayer(marker);
      lls.push(ll);
    }
    if (lls.length) {
      map.fitBounds(lls);
    }
  }
}

customElements.define('map-gsi', MapGSI);
