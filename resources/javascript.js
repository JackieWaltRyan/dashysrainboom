function init()
{
	var editor = ace.edit("textfeld");
    editor.setTheme("ace/theme/cobalt");
	editor.setShowPrintMargin(false);
	editor.getSession().setMode("ace/mode/xml");
	editor.$blockScrolling=Infinity;
	
}
document.addEventListener("DOMContentLoaded",init);

function xmlclean(data)
{
	var before=data.length;
	data=data.replace(/<IapMap>[^]+<\/IapMap>/gim,"<IapMap/>");
	var difference=before-data.length;
	if(difference>0)console.log("removed "+difference+" characters iapmap data!");
	
	var before=data.length;
	data=data.replace(/<([\w()]+)((?:\s+[\w()]+="[^"]*(?:"\$[^"]*"[^"]*)?")*)>\s*<\/\1>/gim,"<$1$2\/>");
	var difference=before-data.length;
	if(difference>0)console.log("removed unneeded close tags!");
	
	var before=data.length;
	data=data.replace(/<(MapZone ID="\d*?")(\sObjOffset="[-\d]*?"){2,}?>/gim,"<$1$2>");
	var difference=before-data.length;
	if(difference>0)console.log("repaired MapZone tags!");
	
	return data;
}

function convertB64ToBinary(b64) {
  var raw = window.atob(b64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));
 
  for(i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

function next(fn)
{
	requestAnimationFrame(function(){setTimeout(fn,0);});
}

function fold(foldit)
{
	var editor = ace.edit("textfeld");
	if(foldit)editor.getSession().foldAll(1);
	else editor.getSession().unfold();
}

function download(content, filename, contentType)
{
	if(!contentType) contentType = 'application/octet-stream';
	var a = document.createElement('a');
	var blob = new Blob(content, {'type':contentType});
	a.href = window.URL.createObjectURL(blob);
	a.download = filename;
	//a.click();
	var clickEvent = new MouseEvent("click",{"view": window,"bubbles": true,"cancelable": false});
	a.dispatchEvent(clickEvent);
}

function error(e,message)
{
	alert(message);
}

function openglkeyfile()
{
	var input = document.getElementById('glkeyfile').files[0];
	if(typeof input=="undefined"){alert('Файл не выбран!');return;}

	var reader = new FileReader();
	reader.onload = function()
	{
		try{
		var content = reader.result;
		var match=content.match(/ANMP\.GloftPOHM_GAIA_ANON_GLUID{"data":"(.*?)"/);
		if(!match)match=content.match(/AMAZ\.GloftPOAZ\.ultimata_GAIA_ANON_GLUID{"data":"(.*?)"/);
		document.getElementById('gluid').value=match[1];
		}catch(e){error(e,'Ошибка загрузки ключа, может не тот файл?');}
	}
	reader.readAsText(input);
}

function savecontent1(input)
{
	var savecontent=vkbeautify.xmlmin(input);
	savecontent=new TextEncoder().encode(savecontent);
	var savecontentlength=savecontent.length;
	
	savecontent=pako.deflate(savecontent);
	var savecontentcomplength=savecontent.length;
	
	var outputbuffer=new ArrayBuffer(16+savecontentcomplength);
	var output=new DataView(outputbuffer);
	output.setUint32(0,savecontentlength,true);
	output.setUint32(4,savecontentcomplength,true);
	output.setUint32(8,0,true);
	output.setUint32(12,0,true);
	output=new Uint8Array(outputbuffer);
	output.set(savecontent,16);
	return output;
}

function savecontent3(input, key)
{
	var crc32value=CRC32.buf(input);
	var savecontentlength=input.length;
	
	var savecontent = pako.deflate(input);
	var savecontentcomplength=savecontent.length;
	
	var zlibbuffer=new ArrayBuffer(savecontentcomplength+4);
	var zlib=new DataView(zlibbuffer);
	zlib.setUint32(savecontentcomplength,crc32value,true);
	zlib=new Uint8Array(zlibbuffer);
	zlib.set(savecontent,0);
	savecontentcomplength=savecontentcomplength+4;
	
	savecontent = xxtea.encrypt(zlib,key);
	var savecontentenclength=savecontent.length;
	var outputbuffer=new ArrayBuffer(savecontentenclength+12);
		
	var output=new DataView(outputbuffer);
	output.setUint32(0,savecontentlength,true);
	output.setUint32(4,savecontentcomplength,true);
	output.setUint32(8,savecontentenclength,true);
	output=new Uint8Array(outputbuffer);
	output.set(savecontent,12);
	return output;
}

function savecontent2(input)
{
	var outputbuffer=new ArrayBuffer(4);
	var output=new DataView(outputbuffer);
	output.setUint32(0,input,true);
	output=new Uint8Array(outputbuffer);
	return output;
}

function closesavefile()
{
	var gluid=document.getElementById('gluid').value;
	if(gluid.match(/^tank$/i)){window.open("https://www.youtube.com/watch?v=t-N_UmTfdA4","_blank");return;}
	if(gluid.length==0){alert('Пожалуйста, введите ключ!');return;}

	next(function(){

	next(function(){
	try{
	var key = convertB64ToBinary(gluid);
	var savecount=25;
	var editor = ace.edit("textfeld");
	var savecontent=editor.getSession().getValue();
		
	var savecountpart=savecontent2(savecount);
	savecountpart=savecontent3(savecountpart,key);
	
	var savecontentpart=savecontent1(savecontent);
	savecontentpart=savecontent3(savecontentpart,key);
	
	var sections=savecontent2(2);
	
	download([savecountpart,savecontentpart,sections],"mlp_save_prime.dat");
	}catch(e){error(e,'Ошибка сохранения игры, может недопустимые символы?');}
	
	next(function(){
	});});});
}

function opensavefile()
{
	var input = document.getElementById('savefile').files[0];
	if(typeof input=="undefined"){alert('Файл не выбран!');return;}
	var gluid=document.getElementById('gluid').value;
	if(gluid.length==0){alert('Пожалуйста, введите ключ!');return;}
			
	var reader = new FileReader();
	reader.onload = function()
	{
		next(function(){
		
		next(function(){
		try{
		var key = convertB64ToBinary(gluid);
		var buffer = reader.result;
		var savegame = new DataView(buffer);
		
		//Savecount
		var size = savegame.getUint32(0,true);
		var compressed_size = savegame.getUint32(4,true);
		var encryptedsize = savegame.getUint32(8,true);
		var data = new Uint8Array(buffer,12,encryptedsize);
		data = xxtea.decrypt(data,key);
		data = pako.inflate(data);
		var savecount = new DataView(data.buffer).getUint32(0,true);
				
		//XML Data
		var offset = 12+encryptedsize;
		var size = savegame.getUint32(offset+0,true);
		var compressed_size = savegame.getUint32(offset+4,true);
		var encryptedsize = savegame.getUint32(offset+8,true);
		var data = new Uint8Array(buffer,offset+12,encryptedsize);
		data = xxtea.decrypt(data,key);
		data = pako.inflate(data);
				
		data = new Uint8Array(data.buffer,16);
		data = pako.inflate(data);
		
		data = new TextDecoder().decode(data);
		data = xmlclean(data);
		data = vkbeautify.xml(data);
		var editor = ace.edit("textfeld");
		editor.getSession().setValue(data);
		//editor.getSession().foldAll(1);
		fold(true);
		}catch(e){error(e,'Ошибка загрузки сохранения!\n\nВозможно, неправильный файл / поврежденный файл / неверный ключ?');}
		
		next(function(){
		alert("Данные загружены!\n\nНе забывайте делать резервные копии!");
		});});});
    };
    reader.readAsArrayBuffer(input);
}