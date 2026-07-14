import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const layoutPath = new URL("../app/layout.tsx", import.meta.url)
const pagePath = new URL("../app/page.tsx", import.meta.url)

test("mounts Sonner globally and shows a toast from the page button", async () => {
  const [layout, page] = await Promise.all([
    readFile(layoutPath, "utf8"),
    readFile(pagePath, "utf8"),
  ])

  assert.match(layout, /import \{ Toaster \} from "@\/components\/ui\/sonner"/)
  assert.match(layout, /<ThemeProvider>[\s\S]*\{children\}[\s\S]*<Toaster \/>[\s\S]*<\/ThemeProvider>/)
  assert.match(page, /^"use client"/)
  assert.match(page, /import \{ toast \} from "sonner"/)
  assert.match(page, /<Button[^>]*onClick=\{\(\) => toast\("Button clicked"\)\}/)
})
