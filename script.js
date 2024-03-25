document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll("td:not(.given-number)");
  const numberControls = document.querySelectorAll(".number-control");
  const candidateSwitch = document.getElementById("candidate-switch");

  let selectedCell = null;

  // Function to handle cell click
  function handleCellClick(cell) {
    if (selectedCell) {
      selectedCell.classList.remove("selected");
    }
    selectedCell = cell;
    selectedCell.classList.add("selected");
  }

  // Function to handle number control click
  function handleNumberControlClick(number) {
    if (!selectedCell) return;

    if (candidateSwitch.checked) {
      const candidatesSpan = selectedCell.querySelector(".candidates");
      const candidates = candidatesSpan.textContent.split("").map(Number);
      const index = candidates.indexOf(number);

      if (index !== -1) {
        candidates.splice(index, 1);
      } else {
        candidates.push(number);
        candidates.sort((a, b) => a - b);
      }

      candidatesSpan.textContent = candidates.join("");
    } else {
      selectedCell.querySelector(".value").textContent = number;
    }
  }

  // Event listeners for cell clicks
  cells.forEach((cell) => {
    cell.addEventListener("click", function () {
      handleCellClick(cell);
    });
  });

  // Event listener for number control clicks
  numberControls.forEach((control, index) => {
    control.addEventListener("click", function () {
      handleNumberControlClick(index + 1);
    });
  });

  // Event listener for candidate switch change
  candidateSwitch.addEventListener("change", function () {
    if (selectedCell) {
      selectedCell.classList.remove("selected");
      selectedCell = null;
    }
  });
});
