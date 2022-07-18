import { readFile } from 'fs/promises'

export default async (filePath) => {
  return JSON.parse(
    await readFile(
      new URL(filePath, import.meta.url),
    ),
  )
}
