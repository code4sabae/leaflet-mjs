class QRCode extends HTMLElement {
  constructor () {
    super();
    const img = new Image();
    img.src = "https://chart.apis.google.com/chart?chs=140x140&cht=qr&chl=" + encodeURIComponent(document.location);
    this.append(img);
  }
}

customElements.define('qr-code', QRCode);
