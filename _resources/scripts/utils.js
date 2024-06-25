function createElement(tag, params = {}, actions = () => {
}) {
    try {
        let el = document.createElement(tag);

        for (let name in params) {
            try {
                el.setAttribute(name, params[name]);
            } catch (e) {
                console.log(e);
            }
        }

        actions(el);

        return el;
    } catch (e) {
        console.error(e);
    }
}

function createMessage(type, text) {
    try {
        let messages = document.getElementById("messages");

        let message = createElement("div", {
            class: ("messages_message messages_message_" + type)
        }, (el) => {
            el.innerText = text;
        });

        messages.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 3000);
    } catch (e) {
        console.error(e);
    }
}

function loadGoogle() {
    try {
        let tag = "G-35RJCF1F6W";

        document.querySelector("head").appendChild(createElement("script", {
            type: "text/javascript",
            src: ("https://www.googletagmanager.com/gtag/js?id=" + tag)
        }, (el) => {
            el.addEventListener("load", () => {
                window.dataLayer = (window.dataLayer || []);

                function gtag() {
                    dataLayer.push(arguments);
                }

                gtag("js", new Date());
                gtag("config", tag);
            });

            el.addEventListener("error", () => {
                setTimeout(() => {
                    loadGoogle();
                }, 1000);
            });
        }));
    } catch (e) {
        console.error(e);
    }
}

function loadEruda() {
    try {
        window.getURL = (window.getURL || new URL(location.href));

        if (getURL.searchParams.has("dev")) {
            document.querySelector("head").appendChild(createElement("script", {
                type: "text/javascript",
                src: "/_resources/scripts/eruda.min.js"
            }, (el) => {
                el.addEventListener("load", () => {
                    eruda.init();
                });

                el.addEventListener("error", () => {
                    setTimeout(() => {
                        loadEruda();
                    }, 1000);
                });
            }));
        }
    } catch (e) {
        console.error(e);
    }
}

function strToPoint(str) {
    try {
        str = str.toString();

        let res = "";

        if (str.length > 3) {
            for (let i = 0; (i < str.length); i += 3) {
                res = (((str.substring((str.length - i - 3), (str.length - i))) + ".") + res);
            }

            res = res.slice(0, -1);
        }

        return (res || str);
    } catch (e) {
        console.error(e);
    }
}

function secondsToTime(sec) {
    try {
        sec = Math.floor(parseFloat(sec));

        let seconds = (sec % 60);
        let minutes = (Math.floor(sec / 60) % 60);
        let hours = (Math.floor(sec / 3600) % 24);
        let days = (Math.floor(sec / 86400) % 30);
        let mounth = (Math.floor(sec / 2629743) % 12);
        let years = Math.floor(sec / 31556926);

        let padSeconds = seconds.toString().padStart(2, "0");
        let padMinutes = minutes.toString().padStart(2, "0");
        let padHours = hours.toString().padStart(2, "0");

        return (
            (years > 0) ? (years + " год, " + mounth + " месяц, " + days + " день, " + padHours + ":" + padMinutes + ":" + padSeconds) : (
                (mounth > 0) ? (mounth + " месяц, " + days + " день, " + padHours + ":" + padMinutes + ":" + padSeconds) : (
                    (days > 0) ? (days + " день, " + padHours + ":" + padMinutes + ":" + padSeconds) : (
                        padHours + ":" + padMinutes + ":" + padSeconds
                    )
                )
            )
        );
    } catch (e) {
        console.error(e);
    }
}

function unixToTime(unix) {
    try {
        unix = parseInt(unix);

        let date = new Date(unix * 1000);

        return date.toLocaleString();
    } catch (e) {
        console.error(e);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        loadGoogle();
        loadEruda();
    });
} else {
    loadGoogle();
    loadEruda();
}
