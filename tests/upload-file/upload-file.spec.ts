import { resolve } from "node:path";
import { test } from "@/tests/test";

test("upload a file", async ({ page }) => {
  console.log(resolve(__dirname, "bar.png"));

  await page.goto("http://127.0.0.1:8080/upload-file/");
  await page.locator('input[name="foo"]').click();
  await page
    .locator('input[name="foo"]')
    .setInputFiles(resolve(__dirname, "bar.png"));

  await page.click("input[type=submit]");
});
