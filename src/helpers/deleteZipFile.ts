import * as fs from 'fs/promises'

export async function deleteZipFile(zipPath: string) {
  try {
    console.log('zipPath', zipPath)
    await fs.unlink(zipPath)
    console.log(`File ${zipPath} deleted successfully`)
  } catch (error) {
    console.error(`Error deleting file ${zipPath}:`, error)
  }
}
