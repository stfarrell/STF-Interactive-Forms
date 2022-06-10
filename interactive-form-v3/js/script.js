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

//Make 'other' section visible when clicked from dropdown
selectTitle.addEventListener('change', (e) => {
	const currentValue = selectTitle.value;
	if (currentValue === 'other') {
		otherJobRole.style.visibility = 'visible';
	}
});

//Display on the tshirts that belong to the selected design.
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
		}
	}
	activityCost.innerText = `Total = $${totalCost}`;
	return totalCost;
});

//accessibility
for (box of actBoxes) {
	box.addEventListener('focus', (e) => {
		console.log('*************', e.target.parentNode);
		e.target.parentNode.classList.add('focus');
	});
}
for (box of actBoxes) {
	box.addEventListener('blur', (e) => {
		console.log('*************', e.target.parentNode);
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
		// nameField.parentNode.lastElementChild.style.display === 'visible';
	} else if (
		/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) === false
	) {
		e.preventDefault();
		alert('You have entered an invalid email address.');
	} else if (totalCost === 0) {
		e.preventDefault();
		alert('You must choose at least 1 activity');
	} else if (payment.value === 'credit-card') {
		if (
			ccNum.value.length < 13 ||
			ccNum.value.length > 16 ||
			ccNum.value.includes(' ', '-') ||
			document.querySelector('#zip').value.length != 5 ||
			document.querySelector('#cvv').value.length != 3
		) {
			e.preventDefault();
			alert('Something went wrong');
		}
	}
});
