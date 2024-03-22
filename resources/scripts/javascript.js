function init() {
	window.addEventListener("beforeunload", (event) => {
		event.preventDefault();
		event.returnValue = "";
	});

	ace.require("ace/ext/language_tools");
	ace.require("ace/ext/inline_autocomplete");
	ace.require("ace/ext/searchbox");
	
    var editor = ace.edit("textfeld");
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

	var ace_wrap = document.getElementById("acewrap");

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
	var menu = document.getElementById("menu");
	var xmlarea = document.querySelector(".xmlarea");

	if (xmlarea.scrollHeight < menu.scrollHeight) {
		xmlarea.style.minHeight = (menu.scrollHeight + "px");
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		init();
		aceresize();
		
		setTimeout(() => {
			event.preventDefault();
			event.returnValue = "";
		}, 1);
	});
} else {
	init();
	aceresize();
}

window.addEventListener("resize", () => {
	aceresize();
});

function xmlclean(data) {
    var before = data.length;
    data = data.replace(/<IapMap>[^]+<\/IapMap>/gim, "<IapMap/>");
    var difference = before - data.length;
    var before = data.length;
    data = data.replace(/<([\w()]+)((?:\s+[\w()]+="[^"]*(?:"\$[^"]*"[^"]*)?")*)>\s*<\/\1>/gim, "<$1$2\/>");
    var difference = before - data.length;
    var before = data.length;
    data = data.replace(/<(MapZone ID="\d*?")(\sObjOffset="[-\d]*?"){2,}?>/gim, "<$1$2>");
    var difference = before - data.length;
    return data;
}

function convertB64ToBinary(b64) {
    var raw = window.atob(b64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
    for (i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}

function next(fn) {
    requestAnimationFrame(function () {
        setTimeout(fn, 0);
    });
}

function acefold(foldit) {
    var editor = ace.edit("textfeld");
    if (foldit) editor.getSession().foldAll(1);
    else editor.getSession().unfold();
}

function download(content, filename, contentType) {
    if (!contentType) contentType = "application/octet-stream";
    var a = document.createElement("a");
    var blob = new Blob(content, {"type": contentType});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    var clickEvent = new MouseEvent("click", {"view": window, "bubbles": true, "cancelable": false});
    a.dispatchEvent(clickEvent);
}

function error(e, message) {
    alert(message);
}

function openglkeyfile() {
    var input = document.getElementById("glkeyfile").files[0];
    if (typeof input == "undefined") {
        alert("Файл не выбран!");
        return;
    }
    var reader = new FileReader();
    reader.onload = function () {
        try {
            var content = reader.result;
            var match = content.match(/"data":"(.*?)"/);
            document.getElementById("gluid").value = match[1];
        } catch (e) {
            error(e, "Ошибка загрузки ключа, может не тот файл?");
        }
    }
    reader.readAsText(input);
}

function savecontent1(input) {
    var savecontent = vkbeautify.xmlmin(input);
    savecontent = new TextEncoder().encode(savecontent);
    var savecontentlength = savecontent.length;
    savecontent = pako.deflate(savecontent);
    var savecontentcomplength = savecontent.length;
    var outputbuffer = new ArrayBuffer(16 + savecontentcomplength);
    var output = new DataView(outputbuffer);
    output.setUint32(0, savecontentlength, true);
    output.setUint32(4, savecontentcomplength, true);
    output.setUint32(8, 0, true);
    output.setUint32(12, 0, true);
    output = new Uint8Array(outputbuffer);
    output.set(savecontent, 16);
    return output;
}

function savecontent3(input, key) {
    var crc32value = CRC32.buf(input);
    var savecontentlength = input.length;
    var savecontent = pako.deflate(input);
    var savecontentcomplength = savecontent.length;
    var zlibbuffer = new ArrayBuffer(savecontentcomplength + 4);
    var zlib = new DataView(zlibbuffer);
    zlib.setUint32(savecontentcomplength, crc32value, true);
    zlib = new Uint8Array(zlibbuffer);
    zlib.set(savecontent, 0);
    savecontentcomplength = savecontentcomplength + 4;
    savecontent = xxtea.encrypt(zlib, key);
    var savecontentenclength = savecontent.length;
    var outputbuffer = new ArrayBuffer(savecontentenclength + 12);
    var output = new DataView(outputbuffer);
    output.setUint32(0, savecontentlength, true);
    output.setUint32(4, savecontentcomplength, true);
    output.setUint32(8, savecontentenclength, true);
    output = new Uint8Array(outputbuffer);
    output.set(savecontent, 12);
    return output;
}

function savecontent2(input) {
    var outputbuffer = new ArrayBuffer(4);
    var output = new DataView(outputbuffer);
    output.setUint32(0, input, true);
    output = new Uint8Array(outputbuffer);
    return output;
}

function closesavefile() {
    var gluid = document.getElementById("gluid").value;
    if (gluid.length == 0) {
        alert("Пожалуйста, введите ключ!");
        return;
    }
    next(function () {
		try {
			var key = convertB64ToBinary(gluid);
			var savecount = 25;
			var editor = ace.edit("textfeld");
			var savecontent = editor.getSession().getValue();
			var savecountpart = savecontent2(savecount);
			savecountpart = savecontent3(savecountpart, key);
			var savecontentpart = savecontent1(savecontent);
			savecontentpart = savecontent3(savecontentpart, key);
			var sections = savecontent2(2);
			download([savecountpart, savecontentpart, sections], "mlp_save_prime.dat");
		} catch (e) {
			error(e, "Ошибка сохранения игры, может недопустимые символы?");
		}
    });
}

function opensavefile() {
    var input = document.getElementById("savefile").files[0];
    if (typeof input == "undefined") {
        alert("Файл не выбран!");
        return;
    }
	if (input["type"] == "text/xml") {
		var reader = new FileReader();
		reader.onload = function () {
			next(function () {
				var data = reader.result;
				data = vkbeautify.xml(data);
				var editor = ace.edit("textfeld");
				editor.getSession().setValue(data);
				acefold(true);
				next(function () {
					alert("Данные загружены!\n\nНе забывайте делать резервные копии!");
				});
			});
		};
		reader.readAsText(input);
		return;
	}
    var gluid = document.getElementById("gluid").value;
    if (gluid.length == 0) {
        alert("Пожалуйста, введите ключ!");
        return;
    }
    var reader = new FileReader();
    reader.onload = function () {
        next(function () {
			try {
				var key = convertB64ToBinary(gluid);
				var buffer = reader.result;
				var savegame = new DataView(buffer);
				var size = savegame.getUint32(0, true);
				var compressed_size = savegame.getUint32(4, true);
				var encryptedsize = savegame.getUint32(8, true);
				var data = new Uint8Array(buffer, 12, encryptedsize);
				data = xxtea.decrypt(data, key);
				data = pako.inflate(data);
				var savecount = new DataView(data.buffer).getUint32(0, true);
				var offset = 12 + encryptedsize;
				var size = savegame.getUint32(offset + 0, true);
				var compressed_size = savegame.getUint32(offset + 4, true);
				var encryptedsize = savegame.getUint32(offset + 8, true);
				var data = new Uint8Array(buffer, offset + 12, encryptedsize);
				data = xxtea.decrypt(data, key);
				data = pako.inflate(data);
				data = new Uint8Array(data.buffer, 16);
				data = pako.inflate(data);
				data = new TextDecoder().decode(data);
				data = xmlclean(data);
				data = vkbeautify.xml(data);
				var editor = ace.edit("textfeld");
				editor.getSession().setValue(data);
				acefold(true);
				next(function () {
					alert("Данные загружены!\n\nНе забывайте делать резервные копии!");
				});
			} catch (e) {
				error(e, "Ошибка загрузки сохранения!\n\nВозможно, неправильный файл / поврежденный файл / неверный ключ?");
			};
        });
    };
    reader.readAsArrayBuffer(input);
}

function acebeautify() {
    var editor = ace.edit("textfeld");
    var data = editor.getSession().getValue();
	
    data = vkbeautify.xml(data);
    editor.getSession().setValue(data);
	
	acefold(true);
}

function acewrap() {
	var editor = ace.edit("textfeld");
	var ace_wrap = document.getElementById("acewrap");

	if (localStorage.getItem("acewrap") === "true") {
		ace_wrap.checked = false;
		editor.getSession().setUseWrapMode(false);
		localStorage.setItem("acewrap", "false");

		return false;
	}

	if (!localStorage.getItem("acewrap") || (localStorage.getItem("acewrap") === "false")) {
		ace_wrap.checked = true;
		editor.getSession().setUseWrapMode(true);
		localStorage.setItem("acewrap", "true");

		return true;
	}
}

function acefullscreen() {
	var textfeld = document.getElementById("textfeld");
	
	if (textfeld.requestFullscreen) {
            textfeld.requestFullscreen();
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
