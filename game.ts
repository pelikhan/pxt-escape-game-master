radio.setTransmitPower(7)
basic.showString("ESCAPE")

// disable default handler
let startMs = input.runningTime()
let totalSec = escape.TOTAL_SECONDS
let remaining = totalSec

radio.onReceivedBuffer(function () {
    led.toggle(0, 0)
})
input.onButtonPressed(Button.A, function () {
    totalSec = Math.min(0, totalSec - 60)
    basic.showIcon(IconNames.SmallHeart)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    totalSec = Math.max(0, totalSec + 60)
    basic.showIcon(IconNames.Heart)
    basic.clearScreen()
})
input.onButtonPressed(Button.AB, function () {
    for (let i = 0; i < 5; ++i) {
        escape.broadcastMessage(escape.RESET)
        basic.pause(10)
    }
    basic.showIcon(IconNames.Chessboard)
    basic.clearScreen()
    info()
})

// game loop
basic.forever(function () {
    const elapsed = (input.runningTime() - startMs) / 1000; 
    remaining = Math.max(0, totalSec - elapsed) | 0; // seconds

    escape.broadcastMessageNumber(escape.REMAINING_SECONDS, remaining)
    if (remaining <= 0) {
        basic.pause(10)
        escape.broadcastMessage(escape.TIME_OVER)
    }
    basic.pause(500)
})

function info() {
    console.log(`ESCAPE game master`)
    console.log(`game time ${(escape.TOTAL_SECONDS / 60) | 0} minutes`)
    console.log(`remaining ${remaining} seconds`)
    console.log(`codes ${escape.CODES.map(k => k.toString()).join(', ')}`)
}
info()
