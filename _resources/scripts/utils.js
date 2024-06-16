function createElement(tag, params = {}, actions = () => {
}) {
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
}

function createMessage(type, text) {
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
}

function loadGoogle() {
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
}

function loadEruda() {
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
