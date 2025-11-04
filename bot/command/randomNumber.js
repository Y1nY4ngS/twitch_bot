function randomNumber(userNumber) {

    if (!userNumber) {
        return `Please enter a valid input example !random 5`
    }
    const userNum = Number(userNumber)
    
    if (!Number.isInteger(userNum) || userNum < 1 || userNum > 10) {
        return `Unvalid input, please pick a number between 1 and 10`
    }

    const num = Math.floor(Math.random() * 10) + 1
    let string = ``

    if (userNum === num) {
        string = `Congratulations, the number ${userNum} was correct`
    } else {
        string = `Sadly the number was ${num}`
    }
    return string;
};

module.exports = randomNumber;