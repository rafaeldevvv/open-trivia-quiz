const alertContainer = document.querySelector(".alert-container");

let timeoutId = null;
export default function reportError(errorMessage) {
  alertContainer.textContent = errorMessage;
  fadeIn(alertContainer);
  
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    fadeOut(alertContainer, () => (alertContainer.textContent = ""));
  }, 5000);
}

export function fadeIn(element) {
  element.animate(
    [
      { opacity: 0, top: "-40px" },
      { opacity: 1, top: "20px" },
    ],
    {
      duration: 500,
      iterations: 1,
      fill: "both",
    }
  );
}

export function fadeOut(element, callback) {
  const fadeOut = element.animate(
    [
      { opacity: 1, top: "20px" },
      { opacity: 0, top: "-20px" },
    ],
    {
      duration: 500,
      iterations: 1,
      fill: "both",
    }
  );
  fadeOut.onfinish = callback;
}
