import app from './index'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port...${PORT}`)
})