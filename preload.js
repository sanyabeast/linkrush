
const { forEach } = require( "lodash" )

const scripts = {
    "youtube" : ()=>{
        setTimeout(()=>{
            set_yt_quality(1)
        }, 2000)
    }
}

forEach( scripts, ( script_function, host_regexp )=>{
    console.log(host_regexp, window.location.href, window.location.href.match( new RegExp( host_regexp, "gm" ) ))
    if ( window.location.href.match( new RegExp( host_regexp, "gm" ) ) ) {
        script_function()
    }
} )

async function set_yt_quality(quality_index){
    let open_settings_button = document.querySelector("button.ytp-settings-button");
    fire_event(open_settings_button, "click");
    await sleep(0.5)

    let settings_buttons = document.querySelectorAll(".ytp-settings-menu .ytp-menuitem");
    let open_quality_menu_button = settings_buttons[settings_buttons.length - 1]
    fire_event(open_quality_menu_button, "click");
    await sleep(0.5);

    let quality_buttons = document.querySelectorAll(".ytp-quality-menu .ytp-menuitem");
    let target_quality_button = quality_buttons[Math.max(quality_buttons.length - quality_index - 1, 0)];
    console.log(target_quality_button.innerText);
    fire_event(target_quality_button, "click");
}

function fire_event(el, etype){
    let $e = document.createEvent('Events');
    $e.initEvent(etype, true, false);
    el.dispatchEvent($e);
}
async function sleep(t){ return new Promise((r, j)=>{setTimeout(()=>{r()}, t * 1000)}); }

window.set_yt_quality = set_yt_quality

