        let student = {
            name: "John",
            age: 30,
            isAdmin: false,
            courses: ["html", "css", "js"],
            wife: null
        }
        function getAttributesArray(obj){
            if(typeof obj !== "object" || obj === null){
                return [];
            }
            return Object.keys(obj);
        }
        function getValuesArray(obj){
            if(typeof obj !== "object" || obj === null){
                return [];
            }
            return Object.values(obj);
        }
        function getEntriesArray(obj){
            if(typeof obj !== "object" || obj === null){
                return [];
            }
            return Object.entries(obj);
        }
        console.log(getAttributesArray(student));
        console.log(getValuesArray(student));
        console.log(getEntriesArray(student));
