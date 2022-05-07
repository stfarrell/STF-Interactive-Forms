console.log('Test!');

const nameField = document.querySelector('#name');
nameField.focus();

const otherJobRole = document.querySelector('#other-job-role');
otherJobRole.style.visibility = 'hidden';

const selectTitle = document.querySelector('#title');

const selectOptions = document.querySelectorAll('#title > option');

selectTitle.addEventListener('change', (e) => {
	const currentValue = selectTitle.value;
	if (currentValue === 'other') {
		otherJobRole.style.visibility = 'visible';
	}
});

const tColor = document.querySelector('#color');
tColor.disabled = true;

const tDesign = document.querySelector('#design');
tDesign.addEventListener('change', (e) => {
	const currentValue = tDesign.value;
	const punShirts = document.querySelectorAll(
		'#color > option[data-theme="js puns"]'
	);
	const heartShirts = document.querySelectorAll(
		'#color > option[data-theme="heart js"]'
	);
	console.log(punShirts, heartShirts);

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

const activities = document.querySelector('#activities');
const activityCost = document.querySelector('#activities-cost');
activities.addEventListener('change', (e) => {
	let totalCost = 0;

	const actBoxes = document.querySelectorAll(
		'#activities > div > label > input[type="checkbox"]'
	);

	for (box of actBoxes) {
		console.log(box);
		if (box.checked === true) {
			totalCost += parseInt(box.dataset.cost);
		}
	}
	console.log(totalCost);
	activityCost.innerText = `Total = $${totalCost}`;
});
