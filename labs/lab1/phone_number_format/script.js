    let phoneNumber = prompt("Внеси телефонски број:")
    while (!validatePhoneNumber(phoneNumber)) {
        alert("Внеси валиден телефонски број")
        phoneNumber = prompt("Внеси телефонски број:")
    }
    console.log(`0${phoneNumber.substring(0, 2)}/${phoneNumber.substring(2, 5)}-${phoneNumber.substring(5)} - ${operator(phoneNumber[1])}`)


    function validatePhoneNumber(num) {
        const regex = /^7[0125678]\d{6}$/
        return regex.test(num)
    }

    function operator(num) {
        switch (num) {
            case "0":
            case "1":
            case "2":
                return "T-mobile"
            case "5":
            case "6":
                return "One"
            default:
                return "Vip"
        }
    }
