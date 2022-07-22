(async () => {
  console.log('Environment:\n', await (await import('@juquinha/config/resolve-dotenv.mjs')).default())
})()
