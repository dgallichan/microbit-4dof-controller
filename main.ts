function radioSend (text: string, num: number) {
    if (Math.abs(num) > 10) {
        radio.sendValue(text, num)
    } else {
        radio.sendValue(text, 0)
    }
}
let value2 = 0
let value1 = 0
let valueForwards = 0
let valueTurn = 0
let thisRoll = 0
let comment = ""
led.enable(false)
radio.setGroup(242)
basic.forever(function () {
    serial.writeValue("x.1", pins.analogReadPin(AnalogPin.P0))
    serial.writeValue("x.2", pins.analogReadPin(AnalogPin.P1))
    serial.writeValue("x.3", pins.analogReadPin(AnalogPin.P3))
    serial.writeValue("x.4", Math.map(pins.digitalReadPin(DigitalPin.P5), 0, 1, 0, 1023))
    serial.writeValue("y.1", pins.analogReadPin(AnalogPin.P2))
    serial.writeValue("y.2", pins.analogReadPin(AnalogPin.P10))
    serial.writeValue("y.3", pins.analogReadPin(AnalogPin.P4))
    serial.writeValue("y.4", Math.map(pins.digitalReadPin(DigitalPin.P11), 0, 1, 0, 1023))
    if (input.buttonIsPressed(Button.AB)) {
        comment = "All independent"
        radioSend("M1", Math.map(pins.analogReadPin(AnalogPin.P0), 0, 1023, -100, 100))
        radioSend("M2", Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, -100, 100))
        radioSend("M3", Math.map(pins.analogReadPin(AnalogPin.P10), 0, 1023, 100, -100))
        radioSend("M4", Math.map(pins.analogReadPin(AnalogPin.P2), 0, 1023, -100, 100))
    } else if (input.buttonIsPressed(Button.A)) {
        comment = "Spinning"
        thisRoll = Math.map(pins.analogReadPin(AnalogPin.P0), 0, 1023, -100, 100)
        radio.sendValue("M1", thisRoll)
        radio.sendValue("M2", thisRoll)
        radio.sendValue("M3", -1 * thisRoll)
        radio.sendValue("M4", -1 * thisRoll)
    } else {
        comment = "Drive and Strafe"
        valueTurn = Math.map(pins.analogReadPin(AnalogPin.P0), 0, 1023, -100, 100)
        valueForwards = Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, -100, 100)
        value1 = Math.constrain(valueForwards + valueTurn, -100, 100)
        value2 = Math.constrain(valueForwards - valueTurn, -100, 100)
        radioSend("M1", value2)
        radioSend("M2", value1)
        radioSend("M3", value1)
        radioSend("M4", value2)
    }
})
