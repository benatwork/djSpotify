

$(function(){

	$("#search button").click(function(e){
		var query = $("#search-term").val();
		var type = $(this).attr("id");
		if(query!="") {

			$("#search-results").empty();
			var search = new models.Search(query);

			search.localResults = models.LOCALSEARCHRESULTS.APPEND;		// Local files last
			search.observe(models.EVENT.CHANGE, function() {
				if(search.tracks.length) {
					tempPlaylist = new models.Playlist();
					$.each(search.tracks,function(index,track){
						tempPlaylist.add(models.Track.fromURI(track.uri));				// Note: artwork is compiled from first few tracks. if any are local it will fail to generate....
					});/*				
					var playlistArt = new views.Player();
						playlistArt.track = tempPlaylist.get(0);
						playlistArt.context = tempPlaylist;
						$("#search-results").append(playlistArt.node);*/
					var playlistList = new views.List(tempPlaylist);
						playlistList.node.classList.add("temporary");
						$("#search-results").append(playlistList.node);
				} else {
					$("#search-results").append('<div>No tracks in results</div>');
				}
			});
			search.appendNext();
				
				
			
		}
	});
});

