const chalk = require("chalk")
const { nanoid } = require("nanoid")


function index(purchases) {
    return purchases.length ? purchases.map(purchase => ({[purchase.id]: purchase.name,})) : "No products purchased."
}

function show(purchases, purchaseId) {
    const purchase = purchases.find(purchase => purchase.id === purchaseId)
    return chalk.green("id") + ` ${purchase.id} ` + chalk.green("name") + ` ${purchase.name} ` + chalk.green("amount") + ` ${purchase.amount} ` + chalk.green("donation") + ` ${chalk.yellow(purchase.donation)}`
}

function create(purchases, values) {
    const [name, amount, donation] = values;

    const newPurchase = {
        id: nanoid(1),
        name,
        amount,
        donation
    }
    purchases.push(newPurchase);
    return purchases
}

function update(purchases, values) {
    const id = values.find((ele) => ele.split("=")[0] === "id").split("=")[1];

    const index = purchases.findIndex(purchase => purchase.id === id)

    values.forEach((prop) => {
        const [key, value] = prop.split("=");
        purchases[index][key] = value;
    })

    return purchases;
}

function destroy(purchases, id) {
    let filtered = purchases.filter((purchase) => purchase.id !==id)
    return filtered.length === purchases ? filtered : "No Products Match Id"
}

module.exports = { index, show, create, update, destroy }