const app = require('./app.js')

const port = process.env.PORT || 3000
function main () {
    app.default.listen(port)
    console.log(`Server listening on port ${port}`)
}
main()
