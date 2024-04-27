//siia lisame lingid failidele, mis toetavad express raamistiku tööd
const express = require("express");
const app = express(); //initsialiseeri vahemälus rakendus

app.use(express.static("public")); //anda luba serveril kasutada css ja js faile saata

//kui tuleb päring localhost:3000st
app.get("/", (req, resp)=> { //päring pealehele - / ; req - päring serverile; res - response serveri vastus päringule 
    //console.log(__dirname); //tuvastab projekti kausta asukohta
    resp.sendFile(__dirname + "/index.html"); //et võtaks kõik andmed html failist
});

app.get("/about", (req, resp)=> { //päring about lehele
    resp.send("Hello, I am Kristiina. Nice to meet You!");
});

//paneme rakenduse ootama päringut
app.listen(3000, ()=>{ //number vist suvaline
    console.log("Server is running on Port 3000.");
});