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

function message(type, text) {
    let box = document.getElementById("message_box");

    let mess = createElement("div", {
        class: ("message message_" + type)
    }, (el) => {
        el.innerText = text;
    });

    box.appendChild(mess);

    setTimeout(() => {
        mess.remove();
    }, 3000);
}

function init() {
    ace.require("ace/ext/language_tools");
    ace.require("ace/ext/inline_autocomplete");
    ace.require("ace/ext/searchbox");

    let editor = ace.edit("textfeld");

    editor.$blockScrolling = Infinity;

    editor.setOptions({
        mode: "ace/mode/xml",
        theme: "ace/theme/cobalt",
        showPrintMargin: false,
        enableSnippets: true,
        enableBasicAutocompletion: true,
        enableInlineAutocompletion: true,
        enableLiveAutocompletion: true,
        customScrollbar: true,
        enableMultiselect: true,
        enableAutoIndent: true
    });

    let ace_wrap = document.getElementById("acewrap");

    if (!localStorage.getItem("acewrap")) {
        localStorage.setItem("acewrap", "true");
    }

    if (localStorage.getItem("acewrap") === "true") {
        ace_wrap.checked = true;
        editor.getSession().setUseWrapMode(true);
    }

    if (localStorage.getItem("acewrap") === "false") {
        ace_wrap.checked = false;
        editor.getSession().setUseWrapMode(false);
    }
}

function aceresize() {
    let menu = document.getElementById("menu");
    let xmlarea = document.querySelector(".xmlarea");

    if (xmlarea.scrollHeight < menu.scrollHeight) {
        xmlarea.style.minHeight = (menu.scrollHeight + "px");
    }

    xmlarea.addEventListener("keyup", () => {
        window.addEventListener("beforeunload", (event) => {
            event.preventDefault();
            event.returnValue = "";
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        init();
        aceresize();
    });
} else {
    init();
    aceresize();
}

window.addEventListener("resize", () => {
    aceresize();
});

window.addEventListener("scroll", () => {
    aceresize();
});

function xmlclean(data) {
    data = data.replace(/<IapMap>[^]+<\/IapMap>/gim, "<IapMap/>");
    data = data.replace(/<([\w()]+)((?:\s+[\w()]+="[^"]*(?:"\$[^"]*"[^"]*)?")*)>\s*<\/\1>/gim, "<$1$2\/>");
    data = data.replace(/<(MapZone ID="\d*?")(\sObjOffset="[-\d]*?"){2,}?>/gim, "<$1$2>");

    return data;
}

function convertB64ToBinary(b64) {
    let raw = window.atob(b64);
    let rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; (i < rawLength); i++) {
        array[i] = raw.charCodeAt(i);
    }

    return array;
}

function acefold(foldit) {
    let editor = ace.edit("textfeld");

    if (foldit) {
        editor.getSession().foldAll(1);

        message("info", "Все блоки свернуты!");
    } else {
        editor.getSession().unfold();

        message("info", "Все блоки развернуты!");
    }
}

function download(content, filename, contentType) {
    if (!contentType) {
        contentType = "application/octet-stream";
    }

    let blob = new Blob(content, {
        "type": contentType
    });

    let a = createElement("a", {
        href: window.URL.createObjectURL(blob),
        download: filename
    });

    let clickEvent = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": false
    });

    a.dispatchEvent(clickEvent);
}

function openglkeyfile() {
    let input = document.getElementById("glkeyfile").files[0];

    if (typeof input == "undefined") {
        message("alert", "Файл не выбран!");

        return;
    }

    let reader = new FileReader();

    reader.addEventListener("load", () => {
        try {
            let content = reader.result;
            let match = content.match(/"data":"(.*?)"/);

            document.getElementById("gluid").value = match[1];

            message("info", "Ключ успешно загружен!");
        } catch {
            message("error", "Ошибка загрузки ключа, может, не тот файл?");
        }
    });

    reader.readAsText(input);
}

function savecontent1(input) {
    let savecontent = vkbeautify.xmlmin(input);

    savecontent = new TextEncoder().encode(savecontent);

    let savecontentlength = savecontent.length;

    savecontent = pako.deflate(savecontent);

    let savecontentcomplength = savecontent.length;
    let outputbuffer = new ArrayBuffer(16 + savecontentcomplength);
    let output = new DataView(outputbuffer);

    output.setUint32(0, savecontentlength, true);
    output.setUint32(4, savecontentcomplength, true);
    output.setUint32(8, 0, true);
    output.setUint32(12, 0, true);

    output = new Uint8Array(outputbuffer);

    output.set(savecontent, 16);

    return output;
}

function savecontent3(input, key) {
    let crc32value = CRC32.buf(input);
    let savecontentlength = input.length;
    let savecontent = pako.deflate(input);
    let savecontentcomplength = savecontent.length;
    let zlibbuffer = new ArrayBuffer(savecontentcomplength + 4);
    let zlib = new DataView(zlibbuffer);

    zlib.setUint32(savecontentcomplength, crc32value, true);

    zlib = new Uint8Array(zlibbuffer);

    zlib.set(savecontent, 0);

    savecontentcomplength = savecontentcomplength + 4;
    savecontent = xxtea.encrypt(zlib, key);

    let savecontentenclength = savecontent.length;
    let outputbuffer = new ArrayBuffer(savecontentenclength + 12);
    let output = new DataView(outputbuffer);

    output.setUint32(0, savecontentlength, true);
    output.setUint32(4, savecontentcomplength, true);
    output.setUint32(8, savecontentenclength, true);

    output = new Uint8Array(outputbuffer);

    output.set(savecontent, 12);

    return output;
}

function savecontent2(input) {
    let outputbuffer = new ArrayBuffer(4);
    let output = new DataView(outputbuffer);

    output.setUint32(0, input, true);

    output = new Uint8Array(outputbuffer);

    return output;
}

function closesavefile() {
    let gluid = document.getElementById("gluid").value;

    if (gluid.length === 0) {
        message("alert", "Пожалуйста, введите ключ!");

        return;
    }

    try {
        let key = convertB64ToBinary(gluid);
        let savecount = 25;
        let editor = ace.edit("textfeld");
        let savecontent = editor.getSession().getValue();
        let savecountpart = savecontent2(savecount);

        savecountpart = savecontent3(savecountpart, key);

        let savecontentpart = savecontent1(savecontent);

        savecontentpart = savecontent3(savecontentpart, key);

        let sections = savecontent2(2);

        download([savecountpart, savecontentpart, sections], "mlp_save_prime.dat");

        message("info", "Файл успешно сохранен!");
    } catch {
        message("error", "Ошибка сохранения игры, может, недопустимые символы?");
    }
}

function opensavefile() {
    let input = document.getElementById("savefile").files[0];

    if (typeof input == "undefined") {
        message("alert", "Файл не выбран!");

        return;
    }

    let reader = new FileReader();

    if (input["type"] === "text/xml") {
        reader.addEventListener("load", () => {
            try {
                let data = reader.result;

                data = vkbeautify.xml(data);

                let editor = ace.edit("textfeld");

                editor.getSession().setValue(data);

                acefold(true);

                message("info", "Данные загружены! Не забывайте делать резервные копии!");
            } catch {
                message("error", "Ошибка загрузки сохранения! Возможно, неправильный файл / поврежденный файл / неверный ключ?");
            }
        });

        reader.readAsText(input);

        return;
    }

    let gluid = document.getElementById("gluid").value;

    if (gluid.length === 0) {
        message("alert", "Пожалуйста, введите ключ!");

        return;
    }

    reader.addEventListener("load", () => {
        try {
            let key = convertB64ToBinary(gluid);
            let buffer = reader.result;
            let savegame = new DataView(buffer);

            savegame.getUint32(0, true);
            savegame.getUint32(4, true);

            let encryptedsize1 = savegame.getUint32(8, true);
            let data1 = new Uint8Array(buffer, 12, encryptedsize1);

            data1 = xxtea.decrypt(data1, key);
            data1 = pako.inflate(data1);

            new DataView(data1.buffer).getUint32(0, true);

            let offset = 12 + encryptedsize1;

            savegame.getUint32(offset, true);
            savegame.getUint32(offset + 4, true);

            let encryptedsize = savegame.getUint32(offset + 8, true);
            let data = new Uint8Array(buffer, offset + 12, encryptedsize);

            data = xxtea.decrypt(data, key);
            data = pako.inflate(data);
            data = new Uint8Array(data.buffer, 16);
            data = pako.inflate(data);
            data = new TextDecoder().decode(data);
            data = xmlclean(data);
            data = vkbeautify.xml(data);

            let editor = ace.edit("textfeld");

            editor.getSession().setValue(data);

            acefold(true);

            message("info", "Данные загружены! Не забывайте делать резервные копии!");
        } catch {
            message("error", "Ошибка загрузки сохранения! Возможно, неправильный файл / поврежденный файл / неверный ключ?");
        }
    });

    reader.readAsArrayBuffer(input);
}

function acebeautify() {
    let editor = ace.edit("textfeld");
    let data = editor.getSession().getValue();

    data = vkbeautify.xml(data);

    editor.getSession().setValue(data);

    acefold(true);

    message("info", "Текст успешно отформатирован!");
}

function acewrap() {
    let editor = ace.edit("textfeld");
    let ace_wrap = document.getElementById("acewrap");

    if (localStorage.getItem("acewrap") === "true") {
        ace_wrap.checked = false;

        editor.getSession().setUseWrapMode(false);

        localStorage.setItem("acewrap", "false");

        message("info", "Перенос строк отключен!");

        return;
    }

    if (!localStorage.getItem("acewrap") || (localStorage.getItem("acewrap") === "false")) {
        ace_wrap.checked = true;

        editor.getSession().setUseWrapMode(true);

        localStorage.setItem("acewrap", "true");

        message("info", "Перенос строк включен!");
    }
}

function acefullscreen() {
    let textfeld = document.getElementById("textfeld");

    if (textfeld.requestFullscreen) {
        textfeld.requestFullscreen().then(r => r);
    } else if (textfeld.mozRequestFullScreen) {
        textfeld.mozRequestFullScreen();
    } else if (textfeld.webkitRequestFullscreen) {
        textfeld.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (textfeld.msRequestFullscreen) {
        textfeld.msRequestFullscreen();
    } else {
        if (textfeld.webkitEnterFullscreen) {
            textfeld.webkitEnterFullscreen();
        }
    }
}
