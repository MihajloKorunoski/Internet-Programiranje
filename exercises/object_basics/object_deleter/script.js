    let student = {
      name: "Pero",
      surname: "Kurka",
      age: 22,
      rollno: 12345,
      school: "Harward"
    }
    function deleteAttribute(obj,attribute){
      if(typeof obj !== "object" || obj === null){
        console.log("Not an object");
      }
      delete obj[attribute];
    }
    console.log("Before deleting: ",student);

    deleteAttribute(student, 'rollno')

//    deleteAttribute(student,'rollno');
    console.log("After deleting: ",student);
