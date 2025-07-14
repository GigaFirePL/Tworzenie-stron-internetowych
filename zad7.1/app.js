import Koa from 'koa';
import Router from '@koa/router';
import { faker } from '@faker-js/faker';

const app = new Koa();
const router = new Router();

// Stała lista marek
const brands = ['Toyota', 'Ford', 'BMW', 'Audi', 'Honda', 'Mazda', 'Opel', 'Volkswagen'];

// Generowanie listy samochodów
function generateCars(count = 50) {
    const cars = [];
    for (let i = 0; i < count; i++) {
        const brand = brands[Math.floor(Math.random() * brands.length)];
        cars.push({
            brand,
            model: faker.vehicle.model(),
            year: faker.number.int({ min: 2000, max: 2023 })
        });
    }
    return cars;
}

const cars = generateCars(50);

// Endpoint 1: Cała, posortowana lista (po roku produkcji)
router.get('/cars', (ctx) => {
    const sorted = [...cars].sort((a, b) => a.year - b.year);
    ctx.body = sorted
        .map(car => `"${car.model}" (${car.year}) - ${car.brand}`)
        .join(', ');
});

// Endpoint 2: Samochody starsze/młodsze niż podana wartość roku
router.get('/cars/year/:op/:value', (ctx) => {
    const { op, value } = ctx.params;
    let filtered;
    if (op === 'gt') {
        filtered = cars.filter(car => car.year > Number(value));
    } else if (op === 'lt') {
        filtered = cars.filter(car => car.year < Number(value));
    } else {
        ctx.body = 'Użyj gt (większe) lub lt (mniejsze)';
        return;
    }
    ctx.body = filtered
        .map(car => `"${car.model}" (${car.year}) - ${car.brand}`)
        .join(', ');
});

// Endpoint 3: Samochody konkretnej marki
router.get('/cars/brand/:brand', (ctx) => {
    const { brand } = ctx.params;
    const filtered = cars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
    ctx.body = filtered.length
        ? filtered.map(car => `"${car.model}" (${car.year}) - ${car.brand}`).join(', ')
        : 'Brak samochodów tej marki';
});

router.get('/', (ctx) => {
    ctx.body = `
        <h2>API samochodów</h2>
        <ul>
            <li><a href="/cars">Cała, posortowana lista samochodów</a></li>
            <li><a href="/cars/year/gt/2015">Samochody młodsze niż 2015</a></li>
            <li><a href="/cars/year/lt/2010">Samochody starsze niż 2010</a></li>
            <li><a href="/cars/brand/BMW">Samochody marki BMW</a></li>
        </ul>
    `;
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});