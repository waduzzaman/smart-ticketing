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
      const personId = 'person'; // You can use a unique identifier for each person
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
      element.classList.add('bg-orange-400');
    }
  }

  function updateTotalPrice(price) {
    const totalPriceElement = document.getElementById("totalPrice");
    if (totalPriceElement) {
      const currentTotal = parseInt(totalPriceElement.innerText);
      const newTotal = currentTotal + price;
      totalPriceElement.innerText = newTotal;
    }
  }

  function updateSelectedCount() {
    const totalSelectedElement = document.getElementById("totalSelected");
    if (totalSelectedElement) {
      const selectedSeatsCount = Array.from(selectedSeatsByPerson.values())
        .reduce((count, seats) => count + seats.length, 0);
      totalSelectedElement.innerText = "Seats" + (selectedSeatsCount > 0 ? " " + selectedSeatsCount : "");
      setBackgroundColorById("totalSelected");
    }
  }

  function calculateSeatPrice(seatId) {
    // You can implement your seat pricing logic here
    // For now, returning a fixed price of 500
    return 500;
  }

  function applyPromoCode() {
    const promoInput = document.getElementById("promocode");
    if (promoInput) {
      const promoCode = promoInput.value.toUpperCase();
      if (promoCode === "NEW15" && !promoCodeApplied) {
        const totalPriceElement = document.getElementById("totalPrice");
        if (totalPriceElement) {
          const currentTotal = parseInt(totalPriceElement.innerText);
          const discountedTotal = currentTotal * 0.85; // Apply a 15% discount
          totalPriceElement.innerText = discountedTotal;
          promoCodeApplied = true;
          alert("Promo code applied successfully!");
          updateGrandTotal(); // Update the grand total after applying promo code
        }
      } else {
        alert("Invalid or already applied promo code.");
      }
    }
  }

  function updateGrandTotal() {
    const grandTotalElement = document.getElementById("grand-total");
    const totalPriceElement = document.getElementById("totalPrice");

    if (grandTotalElement && totalPriceElement) {
      const totalPrice = parseInt(totalPriceElement.innerText);
      grandTotalElement.innerText = totalPrice;
    }
  }

  // Example usage:
  initializeSeats();