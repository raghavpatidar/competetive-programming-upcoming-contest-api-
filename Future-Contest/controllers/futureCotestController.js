const puppeteer = require('puppeteer');
const pretty = require('pretty');
const res = require('express/lib/response');

// async function codechef() {
const codechef = async (req, res) => {
    try {
        console.log('codechef future contest data fetching');
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.codechef.com/contests?itm_medium=navmenu&itm_campaign=allcontests');
        await page.waitForSelector('#future-contests-data tr');
        const data = await page.evaluate(() => {
            const dataObject = [];
            const tbody = document.querySelector('#future-contests-data');
            for (const row of tbody.rows) {
                const [keyCell, valueCell, date, duration, startin] = row.cells;
                const obj = {
                    code: keyCell.innerText,
                    name: valueCell.innerText,
                    link: `codechef.com/${keyCell.innerText}`,
                    date: date.innerText,
                    duration: duration.innerText,
                    startin: startin.innerText
                }
                dataObject.push(obj);
            }
            return dataObject;
        });
        console.log(data);
        await browser.close();
        return res.json({
            err: false,
            message: "Successfully added",
            data: data,
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: true, message: "Something went Wrong" });
    }
}

// async function codeforces() {
const codeforces = async (req, res) => {
    try {
        console.log('codeforces future contest data fetching');
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://codeforces.com/contests');
        const data = await page.evaluate(() => {
            const dataObject = [];
            const tbody = document.querySelector('.contestList div.datatable table tbody');
            console.log('i am id');
            for (const row of tbody.rows) {
                const id = row.getAttribute('data-contestid');
                const [name, writer, date, duration] = row.cells;
                const obj = {
                    id: id,
                    name: name.innerText,
                    // writer: writer,
                    link: `codeforces.com/contest/${id}`,
                    date: date.innerText,
                    duration: duration.innerText,
                }
                dataObject.push(obj);
            }
            dataObject.shift();
            return dataObject;
        });
        await browser.close();
        console.log(data);

        return res.json({
            err: false,
            message: "Successfully added",
            data: data,
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: true, message: "Something went Wrong" });
    }
}

module.exports = {
    codeforces,
    codechef
}