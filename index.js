console.log('Hello World!');
/*
HTML, CSS, and JavaScript
DOM manipulation
Hex and RGB colors
Creating a custom toggle button
*/

/*
	JavaScript functions use
	- parseInt()
	- getElementById()
	- replace()
	- toString()
	- contains

*/

// Check to see whether the input from the user is a valid
// hex color

// 1. The user can input a hex color --- #000000 or 000000
// 2. Check the length - should be either 3 or 6 characters

//Create a function that check if the length is valid?

const isValidHex = (hex) => {
	if(!hex)  return false;

	const strippedHex = hex.replace('#', '');
	return strippedHex.length === 3 || strippedHex.length ===6;

} 

/* Checking
console.log(isValidHex("#000000")); //true
console.log(isValidHex("#0000000")); //false
console.log(isValidHex("#ffffff")); //true
console.log(isValidHex("#fff")); //true
console.log(isValidHex("#ac")); //false*/

// Get a reference to hexInput and inputColor DOM elements
// Create a keyup event handler for hexInput
// Check if hex color is valid
// If hex is valid, update the backgroud color of inputColor

const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const sliderText = document.getElementById('sliderText');
const slider = document.getElementById('slider');

// lightenText, darkenText, toggleBtn
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

// Click event listener to toggle btn

toggleBtn.addEventListener('click', () =>{
	if(toggleBtn.classList.contains('toggled')){
		toggleBtn.classList.remove('toggled');
		lightenText.classList.remove('unselected');
		darkenText.classList.add('unselected');
	} else {
		toggleBtn.classList.add('toggled');
		lightenText.classList.add('unselected');
		darkenText.classList.remove('unselected');
	}

	reset();
})


hexInput.addEventListener('keyup', () =>{
	const hex =hexInput.value;
	if(!isValidHex(hex)) return;

	const strippedHex =hex.replace('#', '');

	inputColor.style.backgroundColor = '#' + strippedHex;

	reset();
})

// Create a function to convert Hex to RGB
// This should work with 3 or 6 character hex values
// Hint - use parseInt("", 16) to convert a hex value to a decimal value
// Should return an object with 3 properties -r,g, and b
// Test your function with a few different use cases

/*
	00 00 00
	r  g  b
*/

const convertHexToRGB = (hex) => {
	if(!isValidHex(hex)) return null;

	let strippedHex =hex.replace('#', '');

	if(strippedHex.length ===3){
		strippedHex = strippedHex [0] + strippedHex[0] + strippedHex[1] +strippedHex[1] + strippedHex[2] + strippedHex[2];
	}

	// console.log(strippedHex);

	const r = parseInt(strippedHex.substring(0,2), 16);
	const g = parseInt(strippedHex.substring(2,4), 16);
	const b = parseInt(strippedHex.substring(4,6), 16);

	return {r,g,b}

}

// console.log(convertHexToRGB("ffe"));

// Create the function convertRGB to Hex
// Take in 3 parameter - r, g, and b
// for each (r,g,b) - create a hex that is two character long
// return hex value starting with hashtag
// example - r.toString(16)

const convertRGBToHex = (r,g,b) =>{

	const firstPair = ("0" + r.toString(16)).slice(-2);
	const secondPair = ("0" + g.toString(16)).slice(-2);
	const thirdPair = ("0" + b.toString(16)).slice(-2);

	const hex = "#" + firstPair +secondPair + thirdPair;
	return hex;

}

// console.log(convertRGBToHex(255,255,255));
// console.log(convertRGBToHex(0,255,255));

// Get a reference to the slider and sliderText DOM elements
// Create an input event listener for slider element
// Display the value of the slider


// Create the alterColor function which accepts hex value and percentage
// Convert the hex value to RGB
// Increase each r,g,b value by appropriate amount (percentage of 255)
// Use the new r,g,b values to convert to hex value
// Return the hex value

const alterColor = (hex, percentage) => {
	const {r,g,b} = convertHexToRGB(hex);

	const amount = Math.floor((percentage/100) * 255);

	const newR = increaseWithin0To255(r, amount);
	const newG = increaseWithin0To255(g, amount);
	const newB = increaseWithin0To255(b, amount);
	// console.log(newR, newG, newB);
	return convertRGBToHex(newR, newG, newB);

}

const increaseWithin0To255 = (hex, amount) => {
	// const newHex = hex + amount;
	// if(newHex > 255) return 255;
	// if(newHex < 0) return 0;
	// return newHex;

	return Math.min(255,Math.max(0, hex + amount));
}

console.log(alterColor('fff', 10));

slider.addEventListener('input', () => {
	// Check if hex is valid
	if(!isValidHex(hexInput.value)) return;

	// console.log(slider.value);
	// use template literals ``
	sliderText.textContent = `${slider.value}%`;

	// Calculate the appropriate value for the color alteration 
	// Between positive and  negative

	const valueAddition = 
	toggleBtn.classList.contains('toggled') ?
	-slider.value 
	: slider.value;


	// Get the altered hex value
	// update the altered color

	const alteredHex = alterColor(hexInput.value, valueAddition);
	alteredColor.style.backgroundColor = alteredHex;
	alteredColorText.innerText = `Altered Color ${alteredHex}`;
	
})

// Set slider value to 0 and slider text to 0%
// Set altered color to original input color
// Reset alteredColorText to original input
// Call reset in toggleBtn click handler
// Call reset in hexInput kkeyup handler

const reset = () =>{
	slider.value = 0;
	sliderText.innerText =`0%`;

	alteredColor.style.backgroundColor = hexInput.value;
	alteredColorText.innerText = `Altered Color ${hexInput.value}`;
}