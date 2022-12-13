document.cookie = "max-age=3600";

const btn = document.getElementById("btn");
btn.addEventListener("click", onClick);

let form = document.getElementById("form").elements;
let outputForm = document.getElementById("outputForm").elements;
//console.log(form)

const nameInput = document.getElementById("nameInput");
const surnameInput = document.getElementById("surnameInput");
const profitInput = document.getElementById("profitInput");
const expenseInput = document.getElementById("expenseInput");

const account = {
	name: "",
	surname: "",
	profit: 0,
	expense: 0,
	totalIncome() {
		console.log(this.profit);
	},
	totalExpense() {
		console.log(this.expense);
	},
	accountInfo() {
		console.log("Имя: ", this.name, " Фамилия: ", this.surname);
	},
	addIncome(income) {
		this.profit = income;
		localStorage.setItem("profit", JSON.stringify({ profit: income }));
		form.profitInput.value = account.profit;
	},
	addExpense(expense) {
		this.expense = expense;
		localStorage.setItem("expense", JSON.stringify({ expense: expense }));
        form.expenseInput.value = account.expense;

	},
	accountBalance() {
		console.log(this.profit - this.expense);
	},
};

nameInput.addEventListener("change", nameOnChange);
surnameInput.addEventListener("change", surnameOnChange);
profitInput.addEventListener("change", profitOnChange);
expenseInput.addEventListener("change", expenseOnChange);

//получение из куков
//document.addEventListener("DOMContentLoaded", fillFormFromCookies)

//получение из локального хранилища
document.addEventListener("DOMContentLoaded", fillFormFromLocalStorage);

function fillFormFromLocalStorage() {
	if (
		JSON.parse(localStorage.getItem("name")) === null ||
		JSON.parse(localStorage.getItem("surname")) === null ||
		JSON.parse(localStorage.getItem("profit")) === null ||
		JSON.parse(localStorage.getItem("expense")) === null
	) {
		return "error";
	}

	account.name = JSON.parse(localStorage.getItem("name")).name;
	account.surname = JSON.parse(localStorage.getItem("surname")).surname;
	account.profit = +JSON.parse(localStorage.getItem("profit")).profit;
	account.expense = +JSON.parse(localStorage.getItem("expense")).expense;

	form.nameInput.value = account.name;
	form.surnameInput.value = account.surname;
	form.profitInput.value = account.profit;
	form.expenseInput.value = account.expense;
}

function fillFormFromCookies() {

    //получение массива из куков
	cookie = document.cookie.split("; ");
	// console.log(cookie)


    //массив => объект
	const newAccount = cookie.reduce((acc, val) => {
		let cookieValue = val.split("=");
		acc[cookieValue[0]] = cookieValue[1];
		return acc;
	}, {});

	if (
		newAccount.name === undefined ||
		newAccount.surname === undefined ||
		newAccount.profit === undefined ||
		newAccount.expense === undefined
	) {
		return "error";
	}

	account.name = newAccount.name;
	account.surname = newAccount.surname;
	account.profit = +newAccount.profit;
	account.expense = +newAccount.expense;

	form.nameInput.value = account.name;
	form.surnameInput.value = account.surname;
	form.profitInput.value = account.profit;
	form.expenseInput.value = account.expense;
}

function nameOnChange(e) {
	account.name = e.target.value;
	document.cookie = "name=" + encodeURIComponent(account.name);
	console.log(account);
	localStorage.setItem("name", JSON.stringify({ name: account.name }));
}

function surnameOnChange(e) {
	account.surname = e.target.value;
	document.cookie = "surname=" + encodeURIComponent(account.surname);
	console.log(account);
	localStorage.setItem(
		"surname",
		JSON.stringify({ surname: account.surname })
	);
}

function profitOnChange(e) {
	account.profit = e.target.value;
	document.cookie = "profit=" + encodeURIComponent(account.profit);
	console.log(account);
	localStorage.setItem("profit", JSON.stringify({ profit: account.profit }));
}

function expenseOnChange(e) {
	account.expense = e.target.value;
	document.cookie = "expense=" + encodeURIComponent(account.expense);
	console.log(account);
	localStorage.setItem(
		"expense",
		JSON.stringify({ expense: account.expense })
	);
}

function onClick(e) {
	e.preventDefault();

	form.nameInput.value = null;
	form.surnameInput.value = null;
	form.profitInput.value = null;
	form.expenseInput.value = null;

	outputForm.nameOutput.value = account.name;
	outputForm.surnameOutput.value = account.surname;
	outputForm.profitOutput.value = account.profit;
	outputForm.expenseOutput.value = account.expense;
}
