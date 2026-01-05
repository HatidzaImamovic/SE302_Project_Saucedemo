# SE302 Project – SauceDemo Automation

This repository contains an automated testing project for the SauceDemo web application (https://www.saucedemo.com/
).
The project was developed as part of the SE302 – Software Testing and Maintenance course.

The goal of this project is to automate and verify key functionalities of an e-commerce system, including authentication, product handling, cart operations, and checkout workflow.


## Objectives
* Automate functional testing of the SauceDemo website
* Validate critical user workflows
* Practice test automation concepts learned in SE302

## Features Tested
* User login (valid and invalid credentials)
* Viewing available products
* Adding and removing products from the cart
* Checkout process
* Logout functionality

## Project Structure
```bash
SE302_Project_Saucedemo/
│
├─ src/                # Test source files
│   ├─ tests/          # Test cases
│   ├─ pages/          # Page Object Models
│   └─ locators/       # File containing all locators
│
├─ package.json        # Project dependencies
├─ README.md           # Project documentation
└─ .gitignore
```


## Installation

1. Clone the repository.

```bash
git clone https://github.com/HatidzaImamovic/SE302_Project_Saucedemo.git
```

2. Navigate to the project directory.

```bash
cd SE302_Project_Saucedemo
```

3. Install dependencies.

```bash
npm install
```

## Running the Tests

Run all tests:

```bash
npm test
```

Run a specific test file:

```bash
npm test tests/<functional/smoke>/<test-file-name>
```

## Test Coverage
| Feature            | Status      |
| ------------------ | ----------- |
| Login              | Implemented |
| Product browsing   | Implemented |
| Cart functionality | Implemented |
| Checkout process   | Implemented |
| Logout             | Implemented |


## License

This project is created for educational purposes as part of the SE302 course.
