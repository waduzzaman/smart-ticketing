


// Initialize seat status array
const seatStatus = [];
const selectedSeatsByPerson = new Map();
let promoCodeApplied = false;

function initializeSeats() {
  const seatGrid = document.getElementById("seatGrid");

  // Iterate through each row
  for (let rowChar = 'A'.charCodeAt(0); rowChar <= 'J'.charCodeAt(0); rowChar++) {
    const row = String.fromCharCode(rowChar);

    // Iterate through each seat in the row
    for (let seatNum = 1; seatNum <= 4; seatNum++) {
      const seatId = row + seatNum;

      // Add click event listener to each seat button
      const seatElement = document.getElementById(seatId);
      seatElement.addEventListener("click", function () {
        const totalPrice = selectSeat(seatId);
        updateTotalPrice(totalPrice);
        updateGrandTotal();
      });

      // Initialize seat status
      seatStatus.push({
        id: seatId,
        selected: false
      });
    }
  }
}

function selectSeat(seatId) {
  const seatIndex = seatStatus.findIndex(seat => seat.id === seatId);

  if (seatIndex !== -1 && !seatStatus[seatIndex].selected) {
    const personId = 'person'; //
    const selectedSeats = selectedSeatsByPerson.get(personId) || [];

    if (selectedSeats.length < 4) {
      seatStatus[seatIndex].selected = true;
      setBackgroundColorById(seatId);
      selectedSeats.push(seatId);
      selectedSeatsByPerson.set(personId, selectedSeats);

      updateSelectedCount(); // Update the count of selected seats

      // Enable the "Apply Promo Code" button if 4 seats are selected
      const applyPromoButton = document.getElementById("applyPromoButton");
      if (applyPromoButton && selectedSeats.length === 4) {
        applyPromoButton.disabled = false;
      }

      return calculateSeatPrice(seatId); // Calculate seat price
    } else {
      alert("You can't select more than 4 seats.");
      return 0; // Person has already selected 4 seats
    }
  } else {
    return 0; // Seat already selected or not found
  }
}

function setBackgroundColorById(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add('bg-green-500');
    element.classList.add('text-white');
  }
}

function updateTotalPrice(price) {
  const totalPriceElement = document.getElementById("totalPrice");
  if (totalPriceElement) {
    const currentTotal = parseFloat(totalPriceElement.innerText);
    const newTotal = currentTotal + price;
    totalPriceElement.innerText = newTotal.toFixed(2);
  }
}

function updateSelectedCount() {
  const totalSelectedElement = document.getElementById("totalSelected");
  if (totalSelectedElement) {
    const selectedSeatsCount = Array.from(selectedSeatsByPerson.values())
      .reduce((count, seats) => count + seats.length, 0);
    totalSelectedElement.innerText = "" + (selectedSeatsCount > 0 ? " " + selectedSeatsCount : "");
    setBackgroundColorById("totalSelected");
  }
}

function calculateSeatPrice(seatId) {
  
  return 550;
}

function applyPromoCode() {
  const promoInput = document.getElementById("promocode");
  if (promoInput) {
    const promoCode = promoInput.value.toUpperCase();
    if (promoCode === "NEW15" && !promoCodeApplied) {
      applyNew15Code();
    } else if (promoCode === "COUPLE20" && !promoCodeApplied) {
      applyCouple20Code();
    } else {
      alert("Invalid or already applied promo code.");
    }
  }
}

function applyNew15Code() {
  const totalPriceElement = document.getElementById("totalPrice");
  if (totalPriceElement) {
    const currentTotal = parseFloat(totalPriceElement.innerText);
    const discountedTotal = currentTotal * 0.85; // Apply a 15% discount
    totalPriceElement.innerText = discountedTotal.toFixed(2);
    promoCodeApplied = true;
    alert("Promo code applied successfully!");
    updateGrandTotal(); // Update the grand total after applying promo code
  }
}

function applyCouple20Code() {
  const totalPriceElement = document.getElementById("totalPrice");
  if (totalPriceElement) {
    const currentTotal = parseFloat(totalPriceElement.innerText);
    const discountedTotal = currentTotal * 0.8; // Apply a 20% discount
    totalPriceElement.innerText = discountedTotal.toFixed(2);
    promoCodeApplied = true;
    alert("Promo code applied successfully!");
    updateGrandTotal(); // Update the grand total after applying promo code
  }
}

function updateGrandTotal() {
  const grandTotalElement = document.getElementById("grand-total");
  const totalPriceElement = document.getElementById("totalPrice");

  if (grandTotalElement && totalPriceElement) {
    const totalPrice = parseFloat(totalPriceElement.innerText);
    grandTotalElement.innerText = totalPrice.toFixed(2);
  }
}



initializeSeats();


// Models funtions: 

function showModal(event) {
  event.preventDefault(); // Prevents the form from submitting in the traditional way
  showElementById("modalContainer");
}

function hideElementById(elementId) {
  const element = document.getElementById(elementId);
  element.classList.add('hidden');
}

function showElementById(elementId) {
  const element = document.getElementById(elementId);
  element.classList.remove('hidden');
}

// Add event listeners to form inputs to enable/disable the Next button
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const nextButton = document.getElementById("nextButton");

function checkFormValidity() {
  nextButton.disabled = !(nameInput.checkValidity() && phoneInput.checkValidity() && emailInput.checkValidity());
}

nameInput.addEventListener("input", checkFormValidity);
phoneInput.addEventListener("input", checkFormValidity);
emailInput.addEventListener("input", checkFormValidity);

