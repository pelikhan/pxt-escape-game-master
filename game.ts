radio.setTransmitPower(7)
basic.showString("ESCAPE")

// disable default handler
let start = input.runningTime()
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
})


// game loop
basic.forever(function () {
    const elapsed = (input.runningTime() - start) / 1000;
    remaining = Math.max(0, totalSec - elapsed); // seconds

    const b = control.createBuffer(5);
    b[0] = escape.REMAINING_SECONDS;
    b.setNumber(NumberFormat.Int32LE, 1, remaining | 0);
    radio.sendBuffer(b);

    if (remaining <= 0) {
        basic.pause(10)
        const bo = pins.createBuffer(1)
        bo[0] = escape.TIME_OVER
        radio.sendBuffer(bo)
    }
    basic.pause(500)
})
