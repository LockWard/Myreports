import app from './index'
import { PORT } from './config/config'

// const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port...${PORT}`)
})