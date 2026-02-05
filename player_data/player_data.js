let data = {
    //player details
    username : "crambite",

    //map completion status
    The_Room : false,
    Enemies : false,
    The_Exit : false,
    North_America : false,
    Australia : true,
    Africa : true,
    Asia : true,
    South_America : true, 
    Familiar_Scene : false,
}


//ensure that data wont be overide
if (!sessionStorage.getItem("data")) {
    sessionStorage.setItem("data", JSON.stringify(data));
}
