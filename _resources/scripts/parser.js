let categoriesData = null;
let languageData = null;

let categoriesList = [
    "Аватары",
    "Декорации",
    "Дорожки",
    "Коллекции",
    "Костюмы",
    "Магазины и Дома",
    "Метки",
    "Персонажи",
    "Питомцы",
    "Рамки аватаров",
    "Рамки фонов",
    "Строительные наборы",
    "Темы",
    "Тотемы",
    "Фоны"
];

let parser = new XMLParser({
    ignoreAttributes: false,
    allowBooleanAttributes: true,

    transformTagName: (tagName) => {
        return tagName.toLowerCase();
    },
    transformAttributeName: (attributeName) => {
        return attributeName.toLowerCase();
    },

    isArray: (name) => {
        return [
            "profileavataritemidowned",
            "profileavatarframeitemidowned",
            "playercardbackgrounditemidowned",
            "playercardbackgroundframeitemidowned",
            "playercardcutiemarkitemidowned",
            "ownedtheme",
            "ownedrbp",
            "storeditem",
            "mapzone",
            "object",
            "altpony",
            "ownpet",
            "item",
            "collection",
            "totem",
            "blueprint",
            "lottodata",
            "conversion",
            "song_timer"
        ].includes(name);
    }
});

async function loadDataFile() {
    try {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", "https://mlplist.jackiewaltryan.top/list/_resources/data/categoryes.json", true);

        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                categoriesData = JSON.parse(xhr.responseText);

                statistic();
            } else {
                setTimeout(() => {
                    loadDataFile();
                }, 1000);
            }
        });

        xhr.addEventListener("error", () => {
            setTimeout(() => {
                loadDataFile();
            }, 1000);
        });

        xhr.send();
    } catch (e) {
        console.error(e);
    }
}

async function loadLanguageFile() {
    try {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", "https://mlplist.jackiewaltryan.top/list/_resources/data/languages/russian.json", true);

        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                languageData = JSON.parse(xhr.responseText);

                statistic();
            } else {
                setTimeout(() => {
                    loadLanguageFile();
                }, 1000);
            }
        });

        xhr.addEventListener("error", () => {
            setTimeout(() => {
                loadLanguageFile();
            }, 1000);
        });

        xhr.send();
    } catch (e) {
        console.error(e);
    }
}

async function parseSave(saveData) {
    try {
        let parseData = {};

        for (let cat of categoriesList) {
            try {
                if (cat === "Аватары") {
                    try {
                        saveData["mlp_save"]["playerdata"]["profileavatarselection"]["profileavataritemidowned"].forEach((element) => {
                            try {
                                if (!(cat in parseData)) {
                                    parseData[cat] = [];
                                }

                                if (!parseData[cat].includes(element["@_id"])) {
                                    parseData[cat].push(element["@_id"]);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (cat === "Рамки аватаров") {
                    try {
                        saveData["mlp_save"]["playerdata"]["profileavatarselection"]["profileavatarframeitemidowned"].forEach((element) => {
                            try {
                                if (!(cat in parseData)) {
                                    parseData[cat] = [];
                                }

                                if (!parseData[cat].includes(element["@_id"])) {
                                    parseData[cat].push(element["@_id"]);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (cat === "Фоны") {
                    try {
                        saveData["mlp_save"]["playerdata"]["playercard"]["playercardbackgrounditemidowned"].forEach((element) => {
                            try {
                                if (!(cat in parseData)) {
                                    parseData[cat] = [];
                                }

                                if (!parseData[cat].includes(element["@_id"])) {
                                    parseData[cat].push(element["@_id"]);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (cat === "Рамки фонов") {
                    try {
                        saveData["mlp_save"]["playerdata"]["playercard"]["playercardbackgroundframeitemidowned"].forEach((element) => {
                            try {
                                if (!(cat in parseData)) {
                                    parseData[cat] = [];
                                }

                                if (!parseData[cat].includes(element["@_id"])) {
                                    parseData[cat].push(element["@_id"]);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (cat === "Метки") {
                    try {
                        saveData["mlp_save"]["playerdata"]["playercard"]["playercardcutiemarkitemidowned"].forEach((element) => {
                            try {
                                if (!(cat in parseData)) {
                                    parseData[cat] = [];
                                }

                                if (!parseData[cat].includes(element["@_id"])) {
                                    parseData[cat].push(element["@_id"]);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (cat === "Темы") {
                    try {
                        saveData["mlp_save"]["playerdata"]["themes"]["ownedtheme"].forEach((element) => {
                            try {
                                if (!(cat in parseData)) {
                                    parseData[cat] = [];
                                }

                                if (!parseData[cat].includes(element["@_id"])) {
                                    parseData[cat].push(element["@_id"]);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (cat === "Дорожки") {
                    try {
                        saveData["mlp_save"]["playerdata"]["roadbuildingpermit"]["ownedrbp"].forEach((element) => {
                            try {
                                if (!(cat in parseData)) {
                                    parseData[cat] = [];
                                }

                                if (!parseData[cat].includes(element["@_id"])) {
                                    parseData[cat].push(element["@_id"]);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (cat === "Персонажи") {
                    try {
                        saveData["mlp_save"]["playerdata"]["storage"]["storeditem"].forEach((element) => {
                            try {
                                if (element["@_id"].startsWith("Pony_")) {
                                    if (!(cat in parseData)) {
                                        parseData[cat] = [];
                                    }

                                    if (!parseData[cat].includes(element["@_id"])) {
                                        parseData[cat].push(element["@_id"]);
                                    }
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }

                    try {
                        saveData["mlp_save"]["mapzone"].forEach((zone) => {
                            try {
                                zone["gameobjects"]["pony_objects"]["object"].forEach((element) => {
                                    try {
                                        if (!(cat in parseData)) {
                                            parseData[cat] = [];
                                        }

                                        if (!parseData[cat].includes(element["@_id"])) {
                                            parseData[cat].push(element["@_id"]);
                                        }
                                    } catch (e) {
                                        console.error(e);
                                    }
                                });
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }

                    try {
                        saveData["mlp_save"]["playerdata"]["ownedalterformofpony"]["altpony"].forEach((element) => {
                            try {
                                if (!(cat in parseData)) {
                                    parseData[cat] = [];
                                }

                                if (!parseData[cat].includes(element["@_id"])) {
                                    parseData[cat].push(element["@_id"]);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (cat === "Магазины и Дома") {
                    try {
                        saveData["mlp_save"]["playerdata"]["storage"]["storeditem"].forEach((element) => {
                            try {
                                if (element["@_id"].startsWith("House_")) {
                                    if (!(cat in parseData)) {
                                        parseData[cat] = [];
                                    }

                                    if (!parseData[cat].includes(element["@_id"])) {
                                        parseData[cat].push(element["@_id"]);
                                    }
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }

                    try {
                        saveData["mlp_save"]["mapzone"].forEach((zone) => {
                            try {
                                zone["gameobjects"]["pony_house_objects"]["object"].forEach((element) => {
                                    try {
                                        if (!(cat in parseData)) {
                                            parseData[cat] = [];
                                        }

                                        if (!parseData[cat].includes(element["@_id"])) {
                                            parseData[cat].push(element["@_id"]);
                                        }
                                    } catch (e) {
                                        console.error(e);
                                    }
                                });
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (cat === "Питомцы") {
                    try {
                        saveData["mlp_save"]["playerdata"]["storage"]["storeditem"].forEach((element) => {
                            try {
                                if (element["@_id"].startsWith("Pet_")) {
                                    if (!(cat in parseData)) {
                                        parseData[cat] = [];
                                    }

                                    if (!parseData[cat].includes(element["@_id"])) {
                                        parseData[cat].push(element["@_id"]);
                                    }
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }

                    try {
                        saveData["mlp_save"]["mapzone"].forEach((zone) => {
                            try {
                                zone["gameobjects"]["pony_objects"]["object"].forEach((pony) => {
                                    try {
                                        pony["pet"]["ownpet"].forEach((element) => {
                                            try {
                                                if (!(cat in parseData)) {
                                                    parseData[cat] = [];
                                                }

                                                if (!parseData[cat].includes(element["@_id"])) {
                                                    parseData[cat].push(element["@_id"]);
                                                }
                                            } catch (e) {
                                                console.error(e);
                                            }
                                        });
                                    } catch (e) {
                                        console.error(e);
                                    }
                                });
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (cat === "Костюмы") {
                    try {
                        let boughtedList = [];

                        saveData["mlp_save"]["ponypartsdata"]["boughtedlist"]["item"].forEach((element) => {
                            try {
                                if (!boughtedList.includes(element["@_id"])) {
                                    boughtedList.push(element["@_id"]);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });

                        let ponysetData = categoriesData[cat]["data"];

                        for (let set in ponysetData) {
                            try {
                                if (ponysetData[set]["parts"].every((element) => {
                                    return boughtedList.includes(element);
                                })) {
                                    if (!(cat in parseData)) {
                                        parseData[cat] = [];
                                    }

                                    parseData[cat].push(ponysetData[set]["id"]);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (cat === "Коллекции") {
                    try {
                        saveData["mlp_save"]["collectiondata"]["completedcollectionlist"]["collection"].forEach((element) => {
                            try {
                                if (!(cat in parseData)) {
                                    parseData[cat] = [];
                                }

                                if (!parseData[cat].includes(element["@_collectionid"])) {
                                    parseData[cat].push(element["@_collectionid"]);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (cat === "Тотемы") {
                    try {
                        let dataList = [];

                        for (let item in categoriesData[cat]["data"]) {
                            try {
                                dataList.push(categoriesData[cat]["data"][item]["id"]);
                            } catch (e) {
                                console.error(e);
                            }
                        }

                        saveData["mlp_save"]["playerdata"]["zecorasshop"]["toteminfo"]["totem"].forEach((element) => {
                            try {
                                if (!(cat in parseData)) {
                                    parseData[cat] = [];
                                }

                                let elID = dataList.find((el) => {
                                    return ((("@_" + el.toLowerCase()) in element) && (element["@_" + el.toLowerCase()] === "1"));
                                });

                                if (elID && !parseData[cat].includes(elID)) {
                                    parseData[cat].push(elID);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (cat === "Декорации") {
                    try {
                        saveData["mlp_save"]["playerdata"]["storage"]["storeditem"].forEach((element) => {
                            try {
                                if (element["@_id"].startsWith("Decoration_")) {
                                    if (!(cat in parseData)) {
                                        parseData[cat] = [];
                                    }

                                    if (!parseData[cat].includes(element["@_id"])) {
                                        parseData[cat].push(element["@_id"]);
                                    }
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }

                    try {
                        saveData["mlp_save"]["mapzone"].forEach((zone) => {
                            try {
                                zone["gameobjects"]["decore_objects"]["object"].forEach((element) => {
                                    try {
                                        if (!(cat in parseData)) {
                                            parseData[cat] = [];
                                        }

                                        if (!parseData[cat].includes(element["@_id"])) {
                                            parseData[cat].push(element["@_id"]);
                                        }
                                    } catch (e) {
                                        console.error(e);
                                    }
                                });
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (cat === "Строительные наборы") {
                    try {
                        saveData["mlp_save"]["playerdata"]["blueprints"]["purchasedprints"]["blueprint"].forEach((element) => {
                            try {
                                if (!(cat in parseData)) {
                                    parseData[cat] = [];
                                }

                                if (!parseData[cat].includes(element["@_id"])) {
                                    parseData[cat].push(element["@_id"]);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }

        return parseData;
    } catch (e) {
        console.error(e);
    }
}

async function statistic() {
    try {
        if (!categoriesData) {
            await loadDataFile();

            return null;
        }

        if (!languageData) {
            await loadLanguageFile();

            return null;
        }

        let editor = ace.edit("content_xmlarea_textfeld");

        let saveData = parser.parse(editor.getSession().getValue());

        console.log(saveData);

        let parseData = await parseSave(saveData);

        let importData = document.getElementById("statistic_root");

        importData.innerHTML = "";

        importData.appendChild(createElement("b", {
            class: "rainbow"
        }, (el) => {
            el.innerText = ("Сохранение:");
        }));

        importData.appendChild(createElement("div", {
            class: "content_menu_block statistic"
        }, (el) => {
            try {
                if (saveData["mlp_save"]["header"]["gameversion"]["@_gameversion"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Версия игры: " + saveData["mlp_save"]["header"]["gameversion"]["@_gameversion"]);
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["header"]["@_start_region"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Регион: " + saveData["mlp_save"]["header"]["@_start_region"]);
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["header"]["@_time_of_save"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Дата сохранения файла: " + unixToTime(saveData["mlp_save"]["header"]["@_time_of_save"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["uploadtocloud"]["@_uploadtocloudlasttime"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Дата сохранения в облако: " + unixToTime(saveData["mlp_save"]["playerdata"]["uploadtocloud"]["@_uploadtocloudlasttime"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                let times = [];

                if (saveData["mlp_save"]["playerdata"]["@_geolocationprompttime"]) {
                    times.push(parseInt(saveData["mlp_save"]["playerdata"]["@_geolocationprompttime"]));
                }

                if (saveData["mlp_save"]["playerdata"]["rating"]["@_timeratedgame"]) {
                    times.push(parseInt(saveData["mlp_save"]["playerdata"]["rating"]["@_timeratedgame"]));
                }

                if (saveData["mlp_save"]["playerdata"]["rateusmanager"]["@_starttime"]) {
                    times.push(parseInt(saveData["mlp_save"]["playerdata"]["rateusmanager"]["@_starttime"]));
                }

                if (times.length > 0) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Дата начала игры: " + unixToTime(Math.min(...times)));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["@_totaltimeplayed"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Общее время игры: " + secondsToTime(saveData["mlp_save"]["playerdata"]["@_totaltimeplayed"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["@_sessioncount"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Заходов в игру: " + strToPoint(saveData["mlp_save"]["playerdata"]["@_sessioncount"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }
        }));

        importData.appendChild(createElement("br"));

        importData.appendChild(createElement("b", {
            class: "rainbow"
        }, (el) => {
            el.innerText = ("Профиль:");
        }));

        importData.appendChild(createElement("div", {
            class: "content_menu_block statistic"
        }, (el) => {
            try {
                if (saveData["mlp_save"]["playerdata"]["@_fakeplayernamea"] && saveData["mlp_save"]["playerdata"]["@_fakeplayernameb"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Локальное имя: " + languageData[saveData["mlp_save"]["playerdata"]["@_fakeplayernamea"]] + " " + languageData[saveData["mlp_save"]["playerdata"]["@_fakeplayernameb"]]);
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["sololeaderboard"]["@_displayname"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Социальное имя: " + saveData["mlp_save"]["sololeaderboard"]["@_displayname"]);
                    }));
                } else if (saveData["mlp_save"]["socialweekly"]["@_displayname"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Социальное имя: " + saveData["mlp_save"]["socialweekly"]["@_displayname"]);
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["@_friendcode"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Код: " + saveData["mlp_save"]["playerdata"]["@_friendcode"]);
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["date_of_birth"]["birthday"]["@_age"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Возраст: " + saveData["mlp_save"]["playerdata"]["date_of_birth"]["birthday"]["@_age"]);
                    }));
                } else if (saveData["mlp_save"]["playerdata"]["date_of_birth"]["birthday"]["@_year"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Возраст: " + (2024 - parseInt(saveData["mlp_save"]["playerdata"]["date_of_birth"]["birthday"]["@_year"])));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["@_level"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Уровень: " + saveData["mlp_save"]["playerdata"]["@_level"]);
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["@_xp"] && saveData["mlp_save"]["playerdata"]["@_requiredxp"] && saveData["mlp_save"]["playerdata"]["@_prevlvlrequiredxp"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        let xp = parseInt(saveData["mlp_save"]["playerdata"]["@_xp"]);
                        let rxp = parseInt(saveData["mlp_save"]["playerdata"]["@_requiredxp"]);
                        let prxp = parseInt(saveData["mlp_save"]["playerdata"]["@_prevlvlrequiredxp"]);

                        el2.innerText = ("Опыт: " + strToPoint(xp) + " / " + strToPoint(rxp) + " (" + strToPoint(Math.floor((xp - prxp) / ((rxp - prxp) / 100))) + "%)");
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["vip"]["@_vip_level"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Вип: " + saveData["mlp_save"]["playerdata"]["vip"]["@_vip_level"]);
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["friends"]["@_friendcount"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Друзья: " + strToPoint(saveData["mlp_save"]["playerdata"]["friends"]["@_friendcount"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["trackingdata"]["@_lastreferralscountsended"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Рефералы: " + strToPoint(saveData["mlp_save"]["trackingdata"]["@_lastreferralscountsended"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }
        }));

        importData.appendChild(createElement("br"));

        importData.appendChild(createElement("b", {
            class: "rainbow"
        }, (el) => {
            el.innerText = ("Валюта:");
        }));

        importData.appendChild(createElement("div", {
            class: "content_menu_block statistic"
        }, (el) => {
            try {
                if (saveData["mlp_save"]["playerdata"]["@_coins"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Битсы: " + strToPoint(saveData["mlp_save"]["playerdata"]["@_coins"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["@_hearts"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Камни: " + strToPoint(saveData["mlp_save"]["playerdata"]["@_hearts"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["@_social"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Сердца: " + strToPoint(saveData["mlp_save"]["playerdata"]["@_social"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["minecart"]["@_wheels"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Колеса: " + strToPoint(saveData["mlp_save"]["playerdata"]["minecart"]["@_wheels"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["tasktokens"]["@_token_fusion_electric"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Жетоны синтеза: " + strToPoint(saveData["mlp_save"]["playerdata"]["tasktokens"]["@_token_fusion_electric"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["tasktokens"]["@_token_ce_lottery"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Кристальные монеты: " + strToPoint(saveData["mlp_save"]["playerdata"]["tasktokens"]["@_token_ce_lottery"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["tasktokens"]["@_token_lottery"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Счастливые монетки: " + strToPoint(saveData["mlp_save"]["playerdata"]["tasktokens"]["@_token_lottery"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["arena"]["@_currency"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Волшебные монеты: " + strToPoint(saveData["mlp_save"]["arena"]["@_currency"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["dailydata"]["@_daily_coins"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Ежедневные цели: " + strToPoint(saveData["mlp_save"]["dailydata"]["@_daily_coins"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            el.appendChild(createElement("br"));

            try {
                el.appendChild(createElement("b", {
                    class: "rainbow"
                }, (el2) => {
                    el2.innerText = ("Элементы гармонии:");
                }));

                el.appendChild(createElement("div", {
                    class: "content_menu_block statistic"
                }, (el2) => {
                    if (saveData["mlp_save"]["playerdata"]["shards"]) {
                        let shards = {
                            "@_loyalty": "Элемент Верности",
                            "@_kindness": "Элемент Доброты",
                            "@_honesty": "Элемент Честности",
                            "@_generosity": "Элемент Щедрости",
                            "@_laughter": "Элемент Радости",
                            "@_magic": "Элемент Магии"
                        };

                        let shardsData = saveData["mlp_save"]["playerdata"]["shards"];

                        for (let shard in shardsData) {
                            try {
                                if (shardsData[shard] !== "0") {
                                    el2.appendChild(createElement("span", {}, (el3) => {
                                        el3.innerText = (shards[shard] + ": " + strToPoint(shardsData[shard]));
                                    }));
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    }
                }));
            } catch (e) {
                console.error(e);
            }

            el.appendChild(createElement("br"));

            try {
                el.appendChild(createElement("b", {
                    class: "rainbow"
                }, (el2) => {
                    el2.innerText = ("Ингредиенты тотемов:");
                }));

                el.appendChild(createElement("div", {
                    class: "content_menu_block statistic"
                }, (el2) => {
                    if (saveData["mlp_save"]["playerdata"]["ingredients"]) {
                        let ingredients = {
                            "@_purpleglowingmushrooms": "Пурпурные грибы",
                            "@_poisonjokeplant": "Веселый плющ",
                            "@_garlic": "Чеснок",
                            "@_blackiris": "Черный ирис",
                            "@_gluetree": "Древесная смола",
                            "@_redorchid": "Красная орхидея"
                        };

                        let ingredientsData = saveData["mlp_save"]["playerdata"]["ingredients"];

                        for (let ingredient in ingredientsData) {
                            try {
                                if (ingredientsData[ingredient] !== "0") {
                                    el2.appendChild(createElement("span", {}, (el3) => {
                                        el3.innerText = (ingredients[ingredient] + ": " + strToPoint(ingredientsData[ingredient]));
                                    }));
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    }
                }));
            } catch (e) {
                console.error(e);
            }

            el.appendChild(createElement("br"));

            try {
                el.appendChild(createElement("b", {
                    class: "rainbow"
                }, (el2) => {
                    el2.innerText = ("Материалы для пошива:");
                }));

                el.appendChild(createElement("div", {
                    class: "content_menu_block statistic"
                }, (el2) => {
                    if (saveData["mlp_save"]["playerdata"]["popcurrency"]) {
                        let popcurrency = {
                            "@_popcurrency1": "Булавки",
                            "@_popcurrency2": "Пуговицы",
                            "@_popcurrency3": "Нитки",
                            "@_popcurrency4": "Ленточки",
                            "@_popcurrency5": "Бабочки"
                        };

                        let popcurrencyData = saveData["mlp_save"]["playerdata"]["popcurrency"];

                        for (let pop in popcurrencyData) {
                            try {
                                if (popcurrencyData[pop] !== "0") {
                                    el2.appendChild(createElement("span", {}, (el3) => {
                                        el3.innerText = (popcurrency[pop] + ": " + strToPoint(popcurrencyData[pop]));
                                    }));
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    }
                }));
            } catch (e) {
                console.error(e);
            }

            el.appendChild(createElement("br"));

            try {
                el.appendChild(createElement("b", {
                    class: "rainbow"
                }, (el2) => {
                    el2.innerText = ("Тотемы:");
                }));

                el.appendChild(createElement("div", {
                    class: "content_menu_block statistic"
                }, (el2) => {
                    if (saveData["mlp_save"]["playerdata"]["zecorasshop"]["toteminfo"]["totem"]) {
                        let totems = {
                            "@_totem_laughter": "Тотем Смеха",
                            "@_totem_kindness": "Тотем Доброты",
                            "@_totem_loyalty": "Тотем Верности",
                            "@_totem_generosity": "Тотем Щедрости",
                            "@_totem_magic": "Тотем Волшебства",
                            "@_totem_honesty": "Тотем Честности",
                            "@_totem_greater_laughter": "Большой Тотем Смеха",
                            "@_totem_greater_kindness": "Большой Тотем Доброты",
                            "@_totem_greater_loyalty": "Большой Тотем Верности",
                            "@_totem_greater_generosity": "Большой Тотем Щедрости",
                            "@_totem_greater_magic": "Большой Тотем Волшебства",
                            "@_totem_greater_honesty": "Большой Тотем Честности",
                            "@_totem_superior_laughter": "Превосходный Тотем Смеха",
                            "@_totem_superior_kindness": "Превосходный Тотем Доброты",
                            "@_totem_superior_loyalty": "Превосходный Тотем Верности",
                            "@_totem_superior_generosity": "Превосходный Тотем Щедрости",
                            "@_totem_superior_magic": "Превосходный Тотем Волшебства",
                            "@_totem_superior_honesty": "Превосходный Тотем Честности",
                            "@_totem_elements": "Тотем Дружбы",
                            "@_totem_greater_elements": "Большой Тотем Дружбы"
                        };

                        let i = 0;
                        let ii = 6;

                        saveData["mlp_save"]["playerdata"]["zecorasshop"]["toteminfo"]["totem"].forEach((element) => {
                            try {
                                let elID = Object.keys(totems).find((el) => {
                                    return ((el in element) && (element[el] === "1"));
                                });

                                if (elID) {
                                    el2.appendChild(createElement("span", {}, (el3) => {
                                        el3.innerText = (totems[elID] + ": " + strToPoint(element["@_count"]));
                                    }));

                                    i += 1;
                                } else {
                                    ii -= 1;
                                }

                                if ((i === ii) && (i !== 0)) {
                                    el2.appendChild(createElement("br"));

                                    i = 0;
                                    ii = 6;
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    }
                }));
            } catch (e) {
                console.error(e);
            }

            el.appendChild(createElement("br"));

            try {
                el.appendChild(createElement("b", {
                    class: "rainbow"
                }, (el2) => {
                    el2.innerText = ("Пища животных:");
                }));

                el.appendChild(createElement("div", {
                    class: "content_menu_block statistic"
                }, (el2) => {
                    if (saveData["mlp_save"]["playerdata"]["foodtokens"]) {
                        let foods = {
                            "@_consumable_item_animalfarm_barley": "Мешок зерна",
                            "@_consumable_item_animalfarm_cabbage": "Мешок капусты",
                            "@_consumable_item_animalfarm_carrot": "Мешок морковки",
                            "@_consumable_item_animalfarm_corn": "Мешок кукурузы"
                        };

                        Object.keys(foods).forEach((food) => {
                            try {
                                el2.appendChild(createElement("span", {}, (el3) => {
                                    el3.innerText = (foods[food] + ": " + strToPoint(saveData["mlp_save"]["playerdata"]["foodtokens"][food]));
                                }));
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    }
                }));
            } catch (e) {
                console.error(e);
            }

            el.appendChild(createElement("br"));

            try {
                el.appendChild(createElement("b", {
                    class: "rainbow"
                }, (el2) => {
                    el2.innerText = ("Курс обмена МА и БИ:");
                }));

                el.appendChild(createElement("div", {
                    class: "content_menu_block statistic"
                }, (el2) => {
                    if (saveData["mlp_save"]["playerdata"]["lastarenaconversion"]["conversion"]) {
                        saveData["mlp_save"]["playerdata"]["lastarenaconversion"]["conversion"].forEach((element) => {
                            try {
                                el2.appendChild(createElement("span", {}, (el3) => {
                                    el3.innerText = ("Монеты: " + strToPoint(element["@_currency"]) + " - Камни: " + strToPoint(element["@_gems"]));
                                }));
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    }
                }));
            } catch (e) {
                console.error(e);
            }
        }));

        importData.appendChild(createElement("br"));

        importData.appendChild(createElement("b", {
            class: "rainbow"
        }, (el) => {
            el.innerText = ("Ресурсы:");
        }));

        importData.appendChild(createElement("div", {
            class: "content_menu_block statistic"
        }, (el) => {
            if (Object.keys(parseData).length > 0) {
                for (let cat of categoriesList) {
                    try {
                        if ((cat in parseData) && (parseData[cat].length > 0)) {
                            el.appendChild(createElement("span", {}, (el2) => {
                                el2.innerText = (cat + ": " + strToPoint(parseData[cat].length));
                            }));
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        }));

        importData.appendChild(createElement("br"));

        importData.appendChild(createElement("b", {
            class: "rainbow"
        }, (el) => {
            el.innerText = ("Очки:");
        }));

        importData.appendChild(createElement("div", {
            class: "content_menu_block statistic"
        }, (el) => {
            try {
                if (saveData["mlp_save"]["playerdata"]["vip"]["@_vip_points"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Вип: " + strToPoint(saveData["mlp_save"]["playerdata"]["vip"]["@_vip_points"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (saveData["mlp_save"]["playerdata"]["@_ballgamehighscore"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Лучший счет в мячик: " + strToPoint(saveData["mlp_save"]["playerdata"]["@_ballgamehighscore"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            el.appendChild(createElement("br"));

            try {
                el.appendChild(createElement("b", {
                    class: "rainbow"
                }, (el2) => {
                    el2.innerText = ("Алмазная шахта:");
                }));

                el.appendChild(createElement("div", {
                    class: "content_menu_block statistic"
                }, (el2) => {
                    try {
                        if (saveData["mlp_save"]["playerdata"]["minecart"]["@_best_score"]) {
                            el2.appendChild(createElement("span", {}, (el3) => {
                                el3.innerText = ("Один заёзд: " + strToPoint(saveData["mlp_save"]["playerdata"]["minecart"]["@_best_score"]));
                            }));
                        }
                    } catch (e) {
                        console.error(e);
                    }

                    try {
                        if (saveData["mlp_save"]["playerdata"]["minecart"]["@_accumulated_score"]) {
                            el2.appendChild(createElement("span", {}, (el3) => {
                                el3.innerText = ("Общее количество: " + strToPoint(saveData["mlp_save"]["playerdata"]["minecart"]["@_accumulated_score"]));
                            }));
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }));
            } catch (e) {
                console.error(e);
            }

            el.appendChild(createElement("br"));

            try {
                el.appendChild(createElement("b", {
                    class: "rainbow"
                }, (el2) => {
                    el2.innerText = ("Девочки Эквестрии:");
                }));

                el.appendChild(createElement("div", {
                    class: "content_menu_block statistic"
                }, (el2) => {
                    try {
                        if (saveData["mlp_save"]["sololeaderboard"]["leaderboard"]) {
                            let songs = {
                                "regular_eg_song1": "Вступление",
                                "regular_eg_song2": "Странный мир",
                                "regular_eg_song3": "Шире шаг",
                                "regular_eg_song4": "Музыка в кафе",
                                "regular_eg_song5": "Пойдем со мной"
                            };

                            saveData["mlp_save"]["sololeaderboard"]["leaderboard"].forEach((lb) => {
                                try {
                                    if (lb["@_lbname"] in songs) {
                                        el2.appendChild(createElement("span", {}, (el3) => {
                                            el3.innerText = (songs[lb["@_lbname"]] + ": " + strToPoint(lb["@_lastacceptedscore"]));
                                        }));
                                    }
                                } catch (e) {
                                    console.error(e);
                                }
                            });
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }));
            } catch (e) {
                console.error(e);
            }
        }));

        importData.appendChild(createElement("br"));

        importData.appendChild(createElement("b", {
            class: "rainbow"
        }, (el) => {
            el.innerText = ("Время:");
        }));

        importData.appendChild(createElement("div", {
            class: "content_menu_block statistic"
        }, (el) => {
            try {
                if (saveData["mlp_save"]["playerdata"]["subscribedata"]["@_subscriptionenddate"]) {
                    el.appendChild(createElement("span", {}, (el2) => {
                        el2.innerText = ("Окончание Королевского клуба: " + unixToTime(saveData["mlp_save"]["playerdata"]["subscribedata"]["@_subscriptionenddate"]));
                    }));
                }
            } catch (e) {
                console.error(e);
            }

            el.appendChild(createElement("br"));

            try {
                el.appendChild(createElement("b", {
                    class: "rainbow"
                }, (el2) => {
                    el2.innerText = ("Перезарядка магнита:");
                }));

                el.appendChild(createElement("div", {
                    class: "content_menu_block statistic"
                }, (el2) => {
                    if (saveData["mlp_save"]["mapzone"]) {
                        let mapzones = {
                            "0": "Понивилль",
                            "1": "Кантерлот",
                            "2": "Ферма Сладкое Яблоко",
                            "3": "Вечнозеленый Лес",
                            "4": "Кристальная Империя",
                            "5": "Королевство Оборотней",
                            "6": "Клуджтаун",
                            "7": "Клуджтаун",
                            "8": "Подземелье - Лабиринт"
                        };

                        saveData["mlp_save"]["mapzone"].forEach((zone) => {
                            try {
                                el2.appendChild(createElement("span", {}, (el3) => {
                                    el3.innerText = (mapzones[zone["@_id"]] + ": " + secondsToTime(zone["time"]["@_time_for_next_vacuum_cleaner"]));
                                }));
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    }
                }));
            } catch (e) {
                console.error(e);
            }

            el.appendChild(createElement("br"));

            try {
                el.appendChild(createElement("b", {
                    class: "rainbow"
                }, (el2) => {
                    el2.innerText = ("Бустеры:");
                }));

                el.appendChild(createElement("div", {
                    class: "content_menu_block statistic"
                }, (el2) => {
                    try {
                        if (saveData["mlp_save"]["playerdata"]["boosters"]["@_boostersbitstimer"]) {
                            el2.appendChild(createElement("span", {}, (el3) => {
                                el3.innerText = ("Битсы Х2: " + secondsToTime(saveData["mlp_save"]["playerdata"]["boosters"]["@_boostersbitstimer"]));
                            }));
                        }
                    } catch (e) {
                        console.error(e);
                    }

                    try {
                        if (saveData["mlp_save"]["playerdata"]["boosters"]["@_boostersxptimer"]) {
                            el2.appendChild(createElement("span", {}, (el3) => {
                                el3.innerText = ("Опыт Х2: " + secondsToTime(saveData["mlp_save"]["playerdata"]["boosters"]["@_boostersxptimer"]));
                            }));
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }));
            } catch (e) {
                console.error(e);
            }

            el.appendChild(createElement("br"));

            try {
                el.appendChild(createElement("b", {
                    class: "rainbow"
                }, (el2) => {
                    el2.innerText = ("Шарики:");
                }));

                el.appendChild(createElement("div", {
                    class: "content_menu_block statistic"
                }, (el2) => {
                    try {
                        if (saveData["mlp_save"]["playerdata"]["@_lottotickettimer"]) {
                            el2.appendChild(createElement("span", {}, (el3) => {
                                el3.innerText = ("Шарики Эквестрии: " + secondsToTime(saveData["mlp_save"]["playerdata"]["@_lottotickettimer"]));
                            }));
                        }
                    } catch (e) {
                        console.error(e);
                    }

                    try {
                        if (saveData["mlp_save"]["playerdata"]["lottoplaytimers"]["lottodata"]) {
                            let lottos = {
                                "lotto_default_gems": "Королевские шарики",
                                "lotto_default_social": "Шарики дружбы"
                            };

                            saveData["mlp_save"]["playerdata"]["lottoplaytimers"]["lottodata"].forEach((lotto) => {
                                try {
                                    el2.appendChild(createElement("span", {}, (el3) => {
                                        el3.innerText = (lottos[lotto["@_lottoname"]] + ": " + secondsToTime(lotto["@_timer"]));
                                    }));
                                } catch (e) {
                                    console.error(e);
                                }
                            });
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }));
            } catch (e) {
                console.error(e);
            }

            el.appendChild(createElement("br"));

            try {
                el.appendChild(createElement("b", {
                    class: "rainbow"
                }, (el2) => {
                    el2.innerText = ("Девочки Эквестрии:");
                }));

                el.appendChild(createElement("div", {
                    class: "content_menu_block statistic"
                }, (el2) => {
                    try {
                        if (saveData["mlp_save"]["playerdata"]["equestria_girl"]["@_uptime"]) {
                            el2.appendChild(createElement("span", {}, (el3) => {
                                el3.innerText = ("Наиграно времени: " + secondsToTime(saveData["mlp_save"]["playerdata"]["equestria_girl"]["@_uptime"]));
                            }));
                        }
                    } catch (e) {
                        console.error(e);
                    }

                    el2.appendChild(createElement("br"));

                    el2.appendChild(createElement("b", {
                        class: "rainbow"
                    }, (el3) => {
                        el3.innerText = ("Таймер:");
                    }));

                    el2.appendChild(createElement("div", {
                        class: "content_menu_block statistic"
                    }, (el3) => {
                        try {
                            if (saveData["mlp_save"]["playerdata"]["equestria_girl"]["song_timer"]) {
                                let songs = {
                                    0: "Вступление",
                                    1: "Странный мир",
                                    2: "Шире шаг",
                                    3: "Музыка в кафе",
                                    4: "Пойдем со мной"
                                };

                                saveData["mlp_save"]["playerdata"]["equestria_girl"]["song_timer"].forEach((song, index) => {
                                    try {
                                        el3.appendChild(createElement("span", {}, (el4) => {
                                            el4.innerText = (songs[index] + ": " + secondsToTime(song["@_timer"]));
                                        }));
                                    } catch (e) {
                                        console.error(e);
                                    }
                                });
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    }));
                }));
            } catch (e) {
                console.error(e);
            }
        }));

        importData.appendChild(createElement("br"));

        importData.appendChild(createElement("b", {
            class: "rainbow"
        }, (el) => {
            el.innerText = ("Улучшения:");
        }));

        importData.appendChild(createElement("div", {
            class: "content_menu_block statistic"
        }, (el) => {
            try {
                el.appendChild(createElement("b", {
                    class: "rainbow"
                }, (el2) => {
                    el2.innerText = ("Алмазная шахта:");
                }));

                el.appendChild(createElement("div", {
                    class: "content_menu_block statistic"
                }, (el2) => {
                    try {
                        if (saveData["mlp_save"]["playerdata"]["minecart"]["upgrades"]) {
                            let upgrades = {
                                "@_boosttier": "Ускорение",
                                "@_magnettier": "Магнит",
                                "@_multitier": "Множитель",
                                "@_shieldtier": "Щит"
                            };

                            Object.keys(upgrades).forEach((upgrade) => {
                                try {
                                    el2.appendChild(createElement("span", {}, (el3) => {
                                        el3.innerText = (upgrades[upgrade] + ": " + (parseInt(saveData["mlp_save"]["playerdata"]["minecart"]["upgrades"][upgrade]) + 1) + " / 5");
                                    }));
                                } catch (e) {
                                    console.error(e);
                                }
                            });
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }));
            } catch (e) {
                console.error(e);
            }
        }));

        createMessage("info", "Информация обновлена");
    } catch (e) {
        console.error(e);
    }
}
