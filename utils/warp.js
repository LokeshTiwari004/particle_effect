export default function warp() {
    const warpButton = document.createElement('button')
    warpButton.id = 'warpButton'
    warpButton.innerHTML = "Warp"
    warpButton.addEventListener("click", () => {
      this.particleArray.forEach((particle) => particle.warp());
    });
    this.controls.appendChild(warpButton)
    return warpButton
  }