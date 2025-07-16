const usernames = [
  'asad', 'sschief', 'sachief', 'gestapochief', 
  'wermacht chief', 'luftwaffechief', 'doctorschief', 
  'minister', 'party secretary'
];

const serialNumbers = Array.from({ length: 70 }, (_, i) => {
  const random = Math.random().toString(36).substr(2, 3);
  return `${i + 1}${random.substring(0, 1).toUpperCase()}${random.substring(1)}1945`;
});

// Here are 70 hardcoded, sample, plaintext 6-digit PINs. Replace or change them at will!
const pins = [
  '123456','234567','345678','456789','567890','678901','789012','890123','901234','101010',
  '111111','222222','333333','444444','555555','666666','777777','888888','999999','000000',
  '102938','293847','384756','475869','568978','689789','879879','978978','878787','212121',
  '313131','414141','515151','616161','717171','818181','919191','121212','272727','393939',
  '484848','575757','676767','797979','808080','939393','454545','565656','676767','787878',
  '898989','010101','020202','030303','040404','050505','060606','070707','080808','090909',
  '112233','223344','334455','445566','556677','667788','778899','889900','990011','110022'
];

const boxContainer = document.querySelector('.d-flex.flex-wrap');

serialNumbers.forEach((serialNumber, index) => {
  const box = document.createElement('div');
  box.classList.add('box-container', 'me-3', 'mb-3');
  box.innerHTML = `
    <div class="box-title">NIPA-CONFIDENTIAL-${serialNumber}</div>
    <button class="btn btn-sm btn-danger open-btn">Open</button>
  `;

  box.querySelector('.open-btn').addEventListener('click', () => {
    const authModalEl = document.getElementById('authModal');
    const authModal = new bootstrap.Modal(authModalEl);
    authModal.show();

    // Reset form on every open
    const authForm = document.getElementById('authForm');
    authForm.reset();

    // Avoid event stacking!
    authForm.onsubmit = null;

    authForm.onsubmit = (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('username').value.trim();
      const pinInput = document.getElementById('pin').value.trim();

      if (!usernames.includes(usernameInput)) {
        alert('Invalid username');
        return;
      }
      if (pinInput.length !== 6) {
        alert('PIN must be 6 digits');
        return;
      }
      if (pinInput === pins[index]) {
        const fileUrl = `file${index + 1}.pdf`;
        window.open(fileUrl, '_blank');
        authModal.hide();
      } else {
        alert('Invalid PIN');
      }
    };
  });

  boxContainer.appendChild(box);
});
