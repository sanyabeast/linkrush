// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const { forEach } = require(`lodash`)

const jsonfile = require('jsonfile')
const file = 'config.json'
const config = jsonfile.readFileSync(file)
console.log(config)

let window_index = 0
let windows_count = 0
let rows = Math.ceil(Math.sqrt(config.count))
let cols = Math.ceil(Math.sqrt(config.count))

useragent_strings = [
    ()=> `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/${ rand_in_range( 200, 537 ) }.36 (KHTML, like Gecko) Chrome/${ rand_in_range( 40, 80 ) }.0.4147.89 Safari/537.36`,
    ()=> `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/${ rand_in_range( 200, 537 ) }.36 (KHTML, like Gecko) Chrome/${ rand_in_range( 40, 80 ) }.0.3538.102 Safari/537.36 Edge/18.19041`,
    ()=> `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/${ rand_in_range( 200, 537 ) }.36 (KHTML, like Gecko) Chrome/${ rand_in_range( 40, 80 ) }.0.3538.102 Safari/537.36 Edge/18.19041`
]

function rand_in_range ( from, to ) {
    return Math.floor( from + (Math.random() * (to - from ) )  )
}

function rand_from_array ( array ) {
    return array[Math.floor( Math.random() * array.length )]
}

async function sleep(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, timeout * 1000)
    })
}

async function create_window({
    url,
    lifetime
}) 
    {
    windows_count ++
    let w = 1920 / cols
    let h = 1080 / rows
    let main_window = new BrowserWindow({

        width: w,
        height: h,
        webPreferences: {
            images:false,
            zoomFactor:0.2,
            preload: path.join(__dirname, 'preload.js'),
            backgroundThrottling: false,
        }
    })

    main_window.webContents.setAudioMuted(true)
    if (config.hidden === true) {
        main_window.hide()
    }

    main_window.loadURL(url, {
        /**set random useragent string aset window`s useragent */
        userAgent: rand_from_array( useragent_strings )()
    })

    main_window.setPosition(
        (window_index%cols)*w, 
        (Math.floor(window_index/ rows))*h 
    )

    window_index++
    await sleep(lifetime)
    main_window.close()
    windows_count --
    
} 

app.whenReady().then(async () => {
    for (let i = 0; i < config.count; i++) {
        create_window({
            ...config
        })
        await sleep (config.delay) 
    }
})

function kill_window() {
    main_window.close()
}
app.on('window-all-closed', function() {
})



// function sleep(timeout) {
//     let now = + new Date 
//     let dl = now + timeout * 1000
//     while (now<dl){
//         now = + new Date 
//     }
// }