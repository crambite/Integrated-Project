let player_data = {
    //player details
    username : "",
    phone_number : "",
    password : "",

    //referral code
    code : "",

    //voucher redemption
    voucher : false,
    referral : false,

    //map completion status
    The_Room : false,
    Enemies : false,
    The_Exit : false,
    North_America : false,
    Australia : false,
    Africa : false,
    Asia : false,
    South_America : false, 
    Familiar_Scene : false,

    //badges (bronze is completion, so can just take map completion status)
    //silver
    The_Room_silver : false,
    Enemies_silver : false,
    The_Exit_silver : false,
    North_America_silver : false,
    Australia_silver : false,
    Africa_silver : false,
    Asia_silver : false,
    South_America_silver : false, 
    Familiar_Scene_silver : false,

    //gold
    The_Room_gold : false,
    Enemies_gold : false,
    The_Exit_gold : false,
    North_America_gold : false,
    Australia_gold : false,
    Africa_gold : false,
    Asia_gold : false,
    South_America_gold : false, 
    Familiar_Scene_gold : false,

    //plat
    The_Room_plat : false,
    Enemies_plat : false,
    The_Exit_plat : false,
    North_America_plat : false,
    Australia_plat : false,
    Africa_plat : false,
    Asia_plat : false,
    South_America_plat : false, 
    Familiar_Scene_plat : false,

    //cutscene played
    open : false,
    end : false,

    //setting
    volume : 1,
    brightness : 50,
    text_speed : "Normal"
}


//ensure that data wont be overide
if (!sessionStorage.getItem("data")) {
    sessionStorage.setItem("data", JSON.stringify(player_data));
}
