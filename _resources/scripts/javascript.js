function init() {
    document.getElementById("content_menu_block_openglkeyfile").addEventListener("click", () => {
        openGLKeyFile();
    });

    document.getElementById("content_menu_block_opensavefile").addEventListener("click", () => {
        openSaveFile();
    });

    document.getElementById("content_menu_block_closesavefile").addEventListener("click", () => {
        closeSaveFile();
    });

    document.getElementById("content_menu_block_acebeautify").addEventListener("click", () => {
        aceBeautify();
    });

    document.getElementById("content_menu_block_acefoldtrue").addEventListener("click", () => {
        aceFold(true);
    });

    document.getElementById("content_menu_block_acefoldfalse").addEventListener("click", () => {
        aceFold(false);
    });

    document.getElementById("content_menu_block_acefullscreen").addEventListener("click", () => {
        aceFullScreen();
    });

    document.getElementById("content_menu_block_acewrap").addEventListener("change", () => {
        aceWrap();
    });

    let content_xmlarea = document.querySelector(".content_xmlarea");

    content_xmlarea.addEventListener("keyup", () => {
        window.addEventListener("beforeunload", (event) => {
            event.preventDefault();

            event.returnValue = "";
        });
    });

    ace.require("ace/ext/language_tools");
    ace.require("ace/ext/inline_autocomplete");
    ace.require("ace/ext/searchbox");

    let editor = ace.edit("content_xmlarea_textfeld");

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

    let content_menu_block_acewrap = document.getElementById("content_menu_block_acewrap");

    if (!localStorage.getItem("aceWrap")) {
        localStorage.setItem("aceWrap", "true");
    }

    if (localStorage.getItem("aceWrap") === "true") {
        content_menu_block_acewrap.checked = true;
        editor.getSession().setUseWrapMode(true);
    }

    if (localStorage.getItem("aceWrap") === "false") {
        content_menu_block_acewrap.checked = false;
        editor.getSession().setUseWrapMode(false);
    }

    editor.session.on("changeAnnotation", () => {
        let annotations = editor.session.getAnnotations();

        if (annotations.length > 0) {
            let trigger = false;

            annotations.forEach((ann, index) => {
                if (ann["text"].includes("BranchHeal(Fluttershy)")) {
                    annotations.splice(index, 1);

                    trigger = true;
                }
            });

            if (trigger) {
                editor.session.setAnnotations(annotations);
            }
        }
    });
}

function xmlClean(data) {
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

function aceFold(foldit) {
    let editor = ace.edit("content_xmlarea_textfeld");

    if (foldit) {
        editor.getSession().foldAll(1);

        createMessage("info", "Все блоки свернуты!");
    } else {
        editor.getSession().unfold();

        createMessage("info", "Все блоки развернуты!");
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

function openGLKeyFile() {
    let input = document.getElementById("content_menu_block_glkeyfile").files[0];

    if (typeof input == "undefined") {
        createMessage("alert", "Файл не выбран!");

        return;
    }

    let reader = new FileReader();

    reader.addEventListener("load", () => {
        try {
            let content = reader.result;
            let match = content.match(/"data":"(.*?)"/);

            document.getElementById("content_menu_block_gluid").value = match[1];

            createMessage("info", "GLUID успешно загружен!");
        } catch {
            createMessage("error", "Ошибка загрузки GLUID, может, не тот файл?");
        }
    });

    reader.readAsText(input);
}

function saveContent1(input) {
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

function saveContent3(input, key) {
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

function saveContent2(input) {
    let outputbuffer = new ArrayBuffer(4);
    let output = new DataView(outputbuffer);

    output.setUint32(0, input, true);

    output = new Uint8Array(outputbuffer);

    return output;
}

function closeSaveFile() {
    let gluid = document.getElementById("content_menu_block_gluid").value;

    if (gluid.length === 0) {
        createMessage("alert", "Пожалуйста, введите GLUID!");

        return;
    }

    try {
        let key = convertB64ToBinary(gluid);
        let savecount = 25;
        let editor = ace.edit("content_xmlarea_textfeld");
        let savecontent = editor.getSession().getValue();
        let savecountpart = saveContent2(savecount);

        savecountpart = saveContent3(savecountpart, key);

        let savecontentpart = saveContent1(savecontent);

        savecontentpart = saveContent3(savecontentpart, key);

        let sections = saveContent2(2);

        download([savecountpart, savecontentpart, sections], "mlp_save_prime.dat");

        createMessage("info", "Файл успешно сохранен!");
    } catch {
        createMessage("error", "Ошибка сохранения файла, может, недопустимые символы?");
    }
}

function openSaveFile() {
    let input = document.getElementById("content_menu_block_savefile").files[0];

    if (typeof input == "undefined") {
        createMessage("alert", "Файл не выбран!");

        return;
    }

    let reader = new FileReader();

    if (input["type"] === "text/xml") {
        reader.addEventListener("load", () => {
            try {
                let data = reader.result;

                data = vkbeautify.xml(data);

                let editor = ace.edit("content_xmlarea_textfeld");

                editor.getSession().setValue(data);

                aceFold(true);

                createMessage("info", "Данные загружены! Не забывайте делать резервные копии!");
            } catch {
                createMessage("error", "Ошибка загрузки сохранения! Возможно, неправильный файл / поврежденный файл / неверный ключ?");
            }
        });

        reader.readAsText(input);

        return;
    }

    let gluid = document.getElementById("content_menu_block_gluid").value;

    if (gluid.length === 0) {
        createMessage("alert", "Пожалуйста, введите GLUID!");

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
            data = xmlClean(data);
            data = vkbeautify.xml(data);

            let editor = ace.edit("content_xmlarea_textfeld");

            editor.getSession().setValue(data);

            aceFold(true);

            createMessage("info", "Данные загружены! Не забывайте делать резервные копии!");
        } catch {
            createMessage("error", "Ошибка загрузки сохранения! Возможно, неправильный файл / поврежденный файл / неверный ключ?");
        }
    });

    reader.readAsArrayBuffer(input);
}

function aceBeautify() {
    let editor = ace.edit("content_xmlarea_textfeld");
    let data = editor.getSession().getValue();

    data = vkbeautify.xml(data);

    editor.getSession().setValue(data);

    aceFold(true);

    createMessage("info", "Текст успешно отформатирован!");
}

function aceWrap() {
    let editor = ace.edit("content_xmlarea_textfeld");
    let content_menu_block_acewrap = document.getElementById("content_menu_block_acewrap");

    if (localStorage.getItem("aceWrap") === "true") {
        content_menu_block_acewrap.checked = false;

        editor.getSession().setUseWrapMode(false);

        localStorage.setItem("aceWrap", "false");

        createMessage("info", "Перенос строк отключен!");

        return;
    }

    if (!localStorage.getItem("aceWrap") || (localStorage.getItem("aceWrap") === "false")) {
        content_menu_block_acewrap.checked = true;

        editor.getSession().setUseWrapMode(true);

        localStorage.setItem("aceWrap", "true");

        createMessage("info", "Перенос строк включен!");
    }
}

function aceFullScreen() {
    let content_xmlarea_textfeld = document.getElementById("content_xmlarea_textfeld");

    if (content_xmlarea_textfeld.requestFullscreen) {
        content_xmlarea_textfeld.requestFullscreen().then(r => r);
    } else if (content_xmlarea_textfeld.mozRequestFullScreen) {
        content_xmlarea_textfeld.mozRequestFullScreen();
    } else if (content_xmlarea_textfeld.webkitRequestFullscreen) {
        content_xmlarea_textfeld.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (content_xmlarea_textfeld.msRequestFullscreen) {
        content_xmlarea_textfeld.msRequestFullscreen();
    } else {
        if (content_xmlarea_textfeld.webkitEnterFullscreen) {
            content_xmlarea_textfeld.webkitEnterFullscreen();
        }
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        init();
    });
} else {
    init();
}
