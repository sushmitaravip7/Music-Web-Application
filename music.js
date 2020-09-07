// Put your Last.fm API key here
var api_key = "cd0f81ce5c2b7f1e107666e28915eff9";

function initialize(){}


function sendRequest () {
	
	//XML HTTP requests for metadata , top albums and similar artists
    var xhrm = new XMLHttpRequest();
	var xhrt = new XMLHttpRequest();
	var xhrs = new XMLHttpRequest();	
	
	//API methods to retrive information 
    var method = "artist.getinfo";
	var topAlbums = "artist.getTopAlbums";
	var similarArtists = "artist.getSimilar";
	
	//input from the search text box
    var artist = encodeURI(document.getElementById("form-input").value);
	
	
	//Handle Ajax responses
    xhrm.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
	xhrt.open("GET", "proxy.php?method="+topAlbums+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
	xhrs.open("GET", "proxy.php?method="+similarArtists+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
	
    xhrm.setRequestHeader("Accept","application/json");
	xhrt.setRequestHeader("Accept","application/json");
	xhrs.setRequestHeader("Accept","application/json");
	
	//Metadata of the artist
    xhrm.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            // var str = JSON.stringify(json,undefined,2);
			
			var metadata='';
			
			metadata="<tr><td><h2>"+json.artist.name+"</h2></td></tr>";
			metadata+="<tr><td><img src=\""+json.artist.image[2]['#text']+"\"></img></td></tr>";
			metadata+="<tr><td><p>"+json.artist.bio.content+"</p></td></tr><br><br>";
			metadata+="<tr><td><a href="+json.artist.url+" target=\"_blank\">Click here for more information on "+json.artist.name+"</a></td></tr>";
			
			//sending it to the HTML file to display
            document.getElementById("metadata").innerHTML = "<table><tr><th>Artist</th></tr>"+metadata+"</table>";
			
        }
    };
	
	//Top albums of the artist
	xhrt.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
           
			var topAlbums='';
			//Image and name of the album one by one
			for (var i = 0; i< json.topalbums.album.length;i++)
			{
				topAlbums+="<tr><td><img src=\""+json.topalbums.album[i].image[1]['#text']+"\>< style=\" hspace=20 /img>"+json.topalbums.album[i].name+"</td></tr>";
								
			}
			
            document.getElementById("topAlbums").innerHTML ="<table><tr><th>Top Albums</th></tr>"+topAlbums+"</table>";
        }
    };
	
	//Similar artists
	xhrs.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            
			var similarArtists='';
			
			//List of names of artists
			for (var i = 0; i< json.similarartists.artist.length;i++)
			{
				similarArtists+="<tr><td>"+json.similarartists.artist[i].name+"</td></tr>";
								
			}
            document.getElementById("similarArtists").innerHTML = "<table><tr><th>Similar Artists</th></tr>"+similarArtists+"</table>";
        }
    };
	//send AJAX requests
    xhrm.send(null);
	xhrt.send(null);
	xhrs.send(null);
}
