        let library = [
            {
                author: 'Bill Gates',
                title: 'The Road Ahead',
                readingStatus: true
            },
            {
                author: 'Steve Jobs',
                title: 'Walter Isaacson',
                readingStatus: true
            },
            {
                author: 'Suzanne Collins',
                title: 'Mockingjay: The Final Book of The Hunger Games',
                readingStatus: false
            }
        ];
        function printLibraryInfo(library){
            library.forEach(book => {
                console.log(`${book.readingStatus ? "Already read" : "You still need to read"} ${book.title} by ${book.author}`)
            })
        }
        printLibraryInfo(library);
