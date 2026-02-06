const restdb_url = "https://blackbox-877b.restdb.io/rest/players";
const restdb_key = "6985e9fdbf4bcc279953e476";

const form = document.querySelector("form");

const username_input = document.querySelector('input[name="username"]');
const phone_input = document.querySelector('input[name="phone"]');
const password_input = document.querySelector('input[name="password"]');
const confirm_password_input = document.querySelector('input[name="confirm_password"]');

let data = JSON.parse(sessionStorage.getItem("data"));

//prevent game.js from running this
if (form) {
    //reset the validity notification
    phone_input.addEventListener("input", () => {
        phone_input.setCustomValidity("");
    });

    password_input.addEventListener("input", () => {
        password_input.setCustomValidity("");
    });

    if (confirm_password_input) {
        confirm_password_input.addEventListener("input", () => {
            confirm_password_input.setCustomValidity("");
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = username_input ? username_input.value.trim() : null;
        const phone = phone_input.value.trim();
        const password = password_input.value;
        const confirm_password = confirm_password_input ? confirm_password_input.value : null;

        const is_register = confirm_password_input !== null;

        //phone validation
        if (!/^[689]\d{7}$/.test(phone)) {
            phone_input.setCustomValidity("Enter a valid 8-digit SG phone number");
            phone_input.reportValidity();
            return;
        }

        //password exists
        if (password.length < 7) {
            password_input.setCustomValidity("Password must be more than 7 characters");
            password_input.reportValidity();
            return;
        }

        //register
        if (is_register) {
            if (password !== confirm_password) {
                confirm_password_input.setCustomValidity("Passwords do not match");
                confirm_password_input.reportValidity();
                return;
            }

            //set data to current details
            data.username = username;
            data.phone_number = phone;
            data.password = password;

            fetch(restdb_url, {
                method: "POST",
                headers: {
                    "x-apikey": restdb_key,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone_number: phone,
                    save: data
                })
            })
            .then(response => {
                if (!response.ok) {
                    //reset data
                    data = JSON.parse(sessionStorage.getItem("data"));

                    throw new Error("Account already exists");
                }
                return response.json();
            })
            .then(created => {
                sessionStorage.setItem("data", JSON.stringify(created.save));
                sessionStorage.setItem("player_id", created._id);
                sessionStorage.setItem("login", "true");

                window.location.href = "menu.html";
            })
            .catch(() => {
                phone_input.setCustomValidity("Phone number already registered");
                phone_input.reportValidity();
            });

            return;
        }

        //login
        fetch(
            restdb_url + '?q={"phone_number":"' + phone + '"}',
            {
                method: "GET",
                headers: {
                    "x-apikey": restdb_key
                }
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error("Request failed");
            }
            return response.json();
        })

        .then(players => {
            //check if account exists in database
            if (players.length === 0) {
                phone_input.setCustomValidity("No account found");
                phone_input.reportValidity();
                return;
            }

            const player = players[0];

            //password authentication
            if (player.save.password !== password) {
                password_input.setCustomValidity("Wrong password");
                password_input.reportValidity();
                return;
            }

            sessionStorage.setItem("data", JSON.stringify(player.save));
            sessionStorage.setItem("player_id", player._id);
            sessionStorage.setItem("login", "true");

            window.location.href = "menu.html";
        })
        .catch(error => {
            console.error(error);
        });
    });
}

//update player data
export function patch_player_data() {
    const player_id = sessionStorage.getItem("player_id");
    const data = JSON.parse(sessionStorage.getItem("data"));

    //if player dosent create an acc
    if (!player_id) {
        return;
    }

    fetch(restdb_url + "/" + player_id, {
        method: "PATCH",
        headers: {
            "x-apikey": restdb_key,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            phone_number: data.phone_number,
            save: data
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Patch failed");
        }

        //tell game.js that patch is applied
        window.dispatchEvent(new Event("patch_applied"));
    })
    .catch(error => {
        console.error(error);
    });
}
