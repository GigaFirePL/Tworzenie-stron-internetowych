import Koa from 'koa';
import Router from '@koa/router';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = new Koa();
const router = new Router();

// Read and parse CSV data
const csvContent = readFileSync(join(__dirname, 'drogi-rowerowe.csv'), 'utf-8');
const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true
});

// Data processing functions
function getRegionsData(year) {
    const yearData = records.find(record => record.rok === year);
    if (!yearData) return null;

    const regions = Object.entries(yearData)
        .filter(([key]) => key !== 'rok' && key !== 'total')
        .map(([region, value]) => ({
            region,
            value: parseFloat(value)
        }));

    return {
        regions: regions.map(r => r.region),
        values: regions.map(r => r.value)
    };
}

function getRegionHistory(region) {
    return {
        years: records.map(record => record.rok),
        values: records.map(record => parseFloat(record[region]))
    };
}

function calculatePercentages(year) {
    const yearData = records.find(record => record.rok === year);
    if (!yearData) return null;

    const total = parseFloat(yearData.total);
    const regions = Object.entries(yearData)
        .filter(([key]) => key !== 'rok' && key !== 'total')
        .map(([region, value]) => ({
            region,
            percentage: (parseFloat(value) / total * 100).toFixed(1)
        }));

    return {
        regions: regions.map(r => r.region),
        values: regions.map(r => parseFloat(r.percentage))
    };
}

router.get('/', async (ctx) => {
    // Set default values if no parameters provided
    const { 
        type = 'bar', 
        year = '2022', 
        region = 'wielkopolskie' 
    } = ctx.query;
    
    let chartData = null;
    let chartType = '';
    let chartTitle = '';

    switch(type) {
        case 'bar':
            chartData = getRegionsData(year);
            chartType = 'bar';
            chartTitle = `Długość dróg rowerowych w województwach (${year})`;
            break;
        case 'pie':
            chartData = calculatePercentages(year);
            chartType = 'pie';
            chartTitle = `Udział województw w całkowitej długości dróg rowerowych (${year})`;
            break;
        case 'line':
            chartData = getRegionHistory(region);
            chartType = 'line';
            chartTitle = `Rozwój dróg rowerowych w województwie ${region}`;
            break;
        default:
            // Instead of error, show bar chart as default
            chartData = getRegionsData(year);
            chartType = 'bar';
            chartTitle = `Długość dróg rowerowych w województwach (${year})`;
    }

    if (!chartData) {
        ctx.body = 'Nie znaleziono danych';
        return;
    }

    const template = readFileSync(join(__dirname, 'index.html'), 'utf8');
    ctx.type = 'html';
    ctx.body = template
        .replace('{{chartType}}', JSON.stringify(chartType))
        .replace('{{chartTitle}}', JSON.stringify(chartTitle))
        .replace('{{labels}}', JSON.stringify(chartData.regions || chartData.years))
        .replace('{{values}}', JSON.stringify(chartData.values));
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Bar chart: http://localhost:3000?type=bar&year=2022
// Pie chart: http://localhost:3000?type=pie&year=2022
// Line chart: http://localhost:3000?type=line&region=wielkopolskie