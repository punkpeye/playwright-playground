import { resolve } from "node:path";
import { expect, test } from "@/tests/test";
import { createDataTransfer } from "playwright-utilities";

test("upload a file", async ({ page }) => {
  await page.goto("http://127.0.0.1:8080/upload-file/");
  await page.locator('input[type="file"]').click();
  await page
    .locator('input[type="file"]')
    .setInputFiles(resolve(__dirname, "bar.png"));

  await expect(page.locator('input[type="file"]')).toHaveValue(/bar/);
});

test("upload file using drop event", async ({ page }) => {
  await page.goto("http://127.0.0.1:8080/upload-file/");

  const dataTransfer = await createDataTransfer({
    page,
    filePath: resolve(__dirname, "bar.png"),
    fileName: "bar.png",
    fileType: "image/png",
  });

  await page.dispatchEvent("#drop_zone", "drop", { dataTransfer });

  await expect(page.locator("text=bar.png")).toBeVisible();
});
