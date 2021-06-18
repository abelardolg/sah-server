export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  api: {
    url: process.env.JSON_URL
  },
})
