// // Initialize seat status array
// const seatStatus = [];

// function initializeSeats() {
//   const seatGrid = document.getElementById("seatGrid");

//   for (let rowChar = 'A'.charCodeAt(0); rowChar <= 'J'.charCodeAt(0); rowChar++) {
//     const row = String.fromCharCode(rowChar);
//     const rowElement = document.createElement("div");
//     rowElement.className = "grid grid-cols-5 gap-2";

//     for (let seatNum = 1; seatNum <= 4; seatNum++) {
//       const seatId = row + seatNum;
//       const seatElement = document.createElement("div");
//       seatElement.className = "seat bg-gray-200 p-1 m-2";
//       seatElement.innerHTML = `<button id="${seatId}">${seatId}</button>`;
//       rowElement.appendChild(seatElement);

//       seatStatus.push({
//         id: seatId,
//         selected: false
//       });
//     }

//     seatGrid.appendChild(rowElement);
//   }
// }

// function selectSeat(seatId) {
//   const seatIndex = seatStatus.findIndex(seat => seat.id === seatId);

//   if (seatIndex !== -1 && !seatStatus[seatIndex].selected) {
//     seatStatus[seatIndex].selected = true;
//     const seatElement = document.getElementById(seatId);
//     if (seatElement) {
//       seatElement.style.backgroundColor = "green"; // Change seat color
//     }

//     return 500; // Seat price
//   } else {
//     return 0; // Seat already selected or not found
//   }
// }

// // Example usage:
// initializeSeats();

// // Add click event listeners to seat buttons
// // const seatGrid = document.getElementById("seatGrid");
// // seatGrid.addEventListener("click", function (event) {
// //   if (event.target.tagName === "BUTTON") {
// //     const seatId = event.target.id;
// //     const totalPrice = selectSeat(seatId);
// //     console.log("Total Price: $" + totalPrice);
// //   }
// // });




const seatStatus = [];

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
        console.log("Total Price: $" + totalPrice);
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
    seatStatus[seatIndex].selected = true;
    const seatElement = document.getElementById(seatId);
    if (seatElement) {
      seatElement.style.backgroundColor = "green"; // Change seat color
    }

    return 550; // Seat price
  } else {
    return 0; // Seat already selected or not found
  }
}

// Example usage:
initializeSeats();


// Show the total price: 

function updateTotalPrice(price) {
    const totalPriceElement = document.getElementById("totalPrice");
    if (totalPriceElement) {
      const currentTotal = parseInt(totalPriceElement.innerText.split(" ")[1]); // Extract numeric part
      const newTotal = currentTotal + price;
      totalPriceElement.innerText = "BTD " + newTotal;
    }
  }