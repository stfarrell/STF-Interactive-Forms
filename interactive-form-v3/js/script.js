console.log('Test!');
//Declare variables + initialize values for job role section
const nameField = document.querySelector('#name');
const otherJobRole = document.querySelector('#other-job-role');
const selectTitle = document.querySelector('#title');
const selectOptions = document.querySelectorAll('#title > option');
nameField.focus();
otherJobRole.style.visibility = 'hidden';

//Declare variables for t-shirt section
const tColor = document.querySelector('#color');
tColor.disabled = true;
const tDesign = document.querySelector('#design');

//Declare variables + initialize values for activity check boxes section
const activities = document.querySelector('#activities');
const activityCost = document.querySelector('#activities-cost');
const actBoxes = document.querySelectorAll(
	'#activities > div > label > input[type="checkbox"]'
);
let totalCost = 0;

//Declare variables + initialize values for job role section
const creditCard = document.querySelector('#credit-card');
const bitcoin = document.querySelector('#bitcoin');
const paypal = document.querySelector('#paypal');
document.querySelector('#payment > option[value="credit-card"').selected =
	'selected';
const payment = document.querySelector('#payment');
bitcoin.classList.add('hidden');
paypal.classList.add('hidden');

//Declare variables for form validation section
const email = document.querySelector('#email');
const form = document.querySelector('form');
const ccNum = document.querySelector('#cc-num');
const hints = document.querySelectorAll('.hint');

//Make 'other' section visible when clicked from dropdown
selectTitle.addEventListener('change', (e) => {
	const currentValue = selectTitle.value;
	if (currentValue === 'other') {
		otherJobRole.style.visibility = 'visible';
	} else {
		otherJobRole.style.visibility = 'hidden';
	}
});

//Display on the t-shirts that belong to the selected design.
tDesign.addEventListener('change', (e) => {
	const currentValue = tDesign.value;
	const punShirts = document.querySelectorAll(
		'#color > option[data-theme="js puns"]'
	);
	const heartShirts = document.querySelectorAll(
		'#color > option[data-theme="heart js"]'
	);

	if (currentValue === 'js puns') {
		tColor.disabled = false;

		for (child of tColor.children) {
			if (child.dataset.theme === 'heart js') {
				child.classList.add('hidden');
			} else {
				child.classList.remove('hidden');
			}
			punShirts[0].selected = 'selected';
		}
	} else {
		for (child of tColor.children) {
			if (child.dataset.theme === 'js puns') {
				child.classList.add('hidden');
			} else {
				child.classList.remove('hidden');
			}
			heartShirts[0].selected = 'selected';
		}
	}
});

//Add up course costs and display on page
activities.addEventListener('change', (e) => {
	totalCost = 0;
	for (box of actBoxes) {
		if (box.checked === true) {
			totalCost += parseInt(box.dataset.cost);

			for (otherBox of actBoxes) {
				if (
					otherBox != box &&
					otherBox.dataset.dayAndTime === box.dataset.dayAndTime
				) {
					console.log('***');
					otherBox.parentElement.classList.add('disabled');
					otherBox.setAttribute('disabled', true);
				}
			}
		} else {
			for (oBox of actBoxes) {
				if (oBox != box && oBox.dataset.dayAndTime === box.dataset.dayAndTime) {
					oBox.parentElement.classList.remove('disabled');
					oBox.removeAttribute('disabled');
				}
			}
		}
	}
	activityCost.innerText = `Total = $${totalCost}`;
	return totalCost;
});

//accessibility
for (box of actBoxes) {
	box.addEventListener('focus', (e) => {
		e.target.parentNode.classList.add('focus');
	});
}
for (box of actBoxes) {
	box.addEventListener('blur', (e) => {
		e.target.parentNode.classList.remove('focus');
	});
}

//Choose payment method
payment.addEventListener('change', (e) => {
	const currentValue = payment.value;
	if (currentValue === 'credit-card') {
		creditCard.classList.remove('hidden');
		bitcoin.classList.add('hidden');
		paypal.classList.add('hidden');
	} else if (currentValue === 'bitcoin') {
		bitcoin.classList.remove('hidden');
		creditCard.classList.add('hidden');
		paypal.classList.add('hidden');
	} else {
		paypal.classList.remove('hidden');
		bitcoin.classList.add('hidden');
		creditCard.classList.add('hidden');
	}
});

//Form validation section! *The regex for email verification was taken from the internet.
form.addEventListener('submit', (e) => {
	if (nameField.value === '') {
		e.preventDefault();
		nameField.parentNode.classList.remove('valid');
		nameField.parentNode.classList.add('not-valid');
		displayHint('name');
	} else {
		nameField.parentNode.classList.remove('not-valid');
		nameField.parentNode.classList.add('valid');
		hideHint('name');
	}

	if (
		/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) === false
	) {
		e.preventDefault();
		email.parentNode.classList.remove('valid');
		email.parentNode.classList.add('not-valid');
		displayHint('email');
	} else {
		email.parentNode.classList.remove('not-valid');
		email.parentNode.classList.add('valid');
		hideHint('email');
	}

	if (totalCost === 0) {
		e.preventDefault();
		activityCost.parentNode.classList.remove('valid');
		activityCost.parentNode.classList.add('not-valid');
		displayHint('activities');
	} else {
		activityCost.parentNode.classList.remove('not-valid');
		activityCost.parentNode.classList.add('valid');
		hideHint('activities');
	}

	if (payment.value === 'credit-card') {
		if (
			ccNum.value.length < 13 ||
			ccNum.value.length > 16 ||
			ccNum.value.includes(' ', '-')
		) {
			e.preventDefault();
			ccNum.parentNode.classList.remove('valid');
			ccNum.parentNode.classList.add('not-valid');
			displayHint('cc');
		} else {
			ccNum.parentNode.classList.remove('not-valid');
			ccNum.parentNode.classList.add('valid');
			hideHint('cc');
		}

		if (document.querySelector('#zip').value.length != 5) {
			e.preventDefault();
			zip.parentNode.classList.remove('valid');
			zip.parentNode.classList.add('not-valid');
			displayHint('zip');
		} else {
			zip.parentNode.classList.remove('not-valid');
			zip.parentNode.classList.add('valid');
			hideHint('zip');
		}

		if (document.querySelector('#cvv').value.length != 3) {
			e.preventDefault();
			cvv.parentNode.classList.remove('valid');
			cvv.parentNode.classList.add('not-valid');
			displayHint('cvv');
		} else {
			cvv.parentNode.classList.remove('not-valid');
			cvv.parentNode.classList.add('valid');
			hideHint('cvv');
		}
	}
});

//display or hide the hint element
function displayHint(section) {
	hints.forEach((hint) => {
		if (hint.classList.contains(section + '-hint')) {
			hint.style.display = 'block';
		}
	});
}

function hideHint(section) {
	hints.forEach((hint) => {
		if (hint.classList.contains(section + '-hint')) {
			hint.style.display = 'none';
		}
	});
}

//live changes for name field and email field
nameField.addEventListener('keyup', (e) => {
	if (nameField.value === '') {
		nameField.parentNode.classList.remove('valid');
		nameField.parentNode.classList.add('not-valid');
		displayHint('name');
	} else {
		nameField.parentNode.classList.remove('not-valid');
		nameField.parentNode.classList.add('valid');
		hideHint('name');
	}
});

const emailHint = document.querySelector('#email-hint');
email.addEventListener('keyup', (e) => {
	if (email.value === '') {
		email.parentNode.classList.remove('valid');
		email.parentNode.classList.add('not-valid');
		displayHint('email');
		emailHint.innerText = 'e-mail cannot be blank';
	} else if (email.value.includes('@') === false) {
		email.parentNode.classList.remove('valid');
		email.parentNode.classList.add('not-valid');
		displayHint('email');
		emailHint.innerText = "Don't forget the @ symbol!";
	} else if (
		/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) === false
	) {
		email.parentNode.classList.remove('valid');
		email.parentNode.classList.add('not-valid');
		displayHint('email');
		emailHint.innerText = 'Make sure the email ends in .com .gov .org or .edu';
	} else {
		email.parentNode.classList.remove('not-valid');
		email.parentNode.classList.add('valid');
		hideHint('email');
	}
});
