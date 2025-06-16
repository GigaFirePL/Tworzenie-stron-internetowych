import Koa from 'koa';
import Router from '@koa/router';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = new Koa();
const router = new Router();

// Poznań coordinates
const DEFAULT_LAT = 52.4064;
const DEFAULT_LON = 16.9252;

async function getWeatherData(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&daily=precipitation_probability_max&timezone=auto`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            current: data.current,
            daily: data.daily
        };
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}

function getTemperatureMessage(temp) {
    if (temp < 10) return 'Zimno';
    if (temp < 25) return 'Przyjemnie';
    return 'Upał';
}

router.get('/', async (ctx) => {
    const weatherData = await getWeatherData(DEFAULT_LAT, DEFAULT_LON);
    
    if (!weatherData) {
        ctx.body = 'Błąd pobierania danych pogodowych';
        return;
    }

    const temperature = weatherData.current.temperature_2m;
    const windSpeed = weatherData.current.wind_speed_10m;
    const rainProbability = weatherData.daily.precipitation_probability_max[1];
    
    const template = readFileSync(join(__dirname, 'index.html'), 'utf8');
    
    const html = template
        .replace('{{temperature}}', temperature)
        .replace('{{windSpeed}}', windSpeed)
        .replace('{{tempMessage}}', getTemperatureMessage(temperature))
        .replace('{{tomorrowMessage}}', 
            rainProbability > 50 
                ? 'Weź parasol, możliwe opady!' 
                : 'Świetna pogoda na spacer!');

    ctx.type = 'html';
    ctx.body = html;
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});