const fs = require('fs');

const categories = ['Electronics', 'Furniture', 'Clothing', 'Toys', 'Books'];
let products = [];

for (let i = 1; i <= 20000; i++) {
    const product = {
        name: `Product ${i}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        price_per_day: Math.floor(Math.random() * 100) + 1,
        availability: Math.random() > 0.5, // Random availability
        image: `http://example.com/image${i}.jpg`, // Placeholder image URL
        description: `Description for product ${i}`,
    };
    products.push(product);
}

fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
console.log('Products generated successfully.');
