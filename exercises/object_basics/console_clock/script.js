        function Clock() {
            this.start = function () {
                setInterval(() => {
                    let date = new Date();
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    let seconds = date.getSeconds();
                    console.log(`${hours}:${minutes}:${seconds}`);
                }, 1000)
            }
        }
        let clock = new Clock();
        clock.start();
