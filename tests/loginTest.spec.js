import {test,expect} from '@playwright/test';
const testData=require('../test-data/loginData.json');
import dotenv from 'dotenv';
dotenv.config({ path: './env/.env'});
const XLSX = require('xlsx');

test.describe("verify xlsx file",()=>{
   const workbook = XLSX.readFile('test-data/TestData.xlsx');
   const sheet = workbook.Sheets['Sheet1'];
   const rows = XLSX.utils.sheet_to_json(sheet);
   for(let row of rows){
    test(`login test using : ${row.Username}`,async({page})=>{
        await page.goto(process.env.BASE_URL);
        await page.getByPlaceholder("Username",{exact:true}).fill(row.Username);
        await page.getByPlaceholder("Password",{exact:true}).fill(row.Password);
        await page.locator("#login-button").click();
        await page.waitForTimeout(2000);
        await page.getByText("Swag Labs",{exact:true}).isVisible();
        await page.close();
    })
}
})