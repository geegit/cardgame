window.slide = "right";

var currentUserId = "";

$('[data-label="ReturningUser"]').css('color','pink');
$('[data-label="f_input_id"] input').prop('disabled','true') 
$('[data-label="GreenCircle"]').hide()
$('[data-label="thumbsup"]').hide() 
//$('[data-label="TopShow_0"]').hide()
$('[data-label="bannertext"]').hide()
//Set All Text except Returning User text to max 130px -- hack
$('.ax_paragraph').not('[data-label="ReturningUser"]').find('.text').css('width','130px').attr('id','word-wrap-override');


function getData(url,callback){
	$.ajax({
    beforeSend: function(request) {
        request.setRequestHeader('Accept', 'www.cartoonnetwork.com+json; version=2');
        request.setRequestHeader('Authentication','monitoringapp');
    },
    dataType: "json",
    url: url,
    success: function(data) {
        callback(null,data);

    },
    error: function(error){
    	callback(error,null);
    }
	});
}
//stolen from here http://jsfiddle.net/briguy37/2mvfd/
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

function loadUserShowsAndPlayList(showUrl, playListUrl){

	attr = $('[data-label="f_input_id"] input').attr("disabled");
	console.log("Attribute is " + attr);

	if(attr == "disabled"){
		console.log("In HERE!")
		currentUserId = "ZZ" + generateUUID();
		 $('[data-label="f_input_id"] input').text(currentUserId);
	} else {
		//Use UUID supplied in form
		currentUserId = $('[data-label="f_input_id"] input').val();
		console.log("Current User Id is " + currentUserId);
	}

	console.log("Loading data for user " + currentUserId);
		getData(showUrl + "/" + currentUserId,loadShows);
		getData(playListUrl + "/" + currentUserId + "?auth=false",getPlaylist);
	




}

function getPlaylist(error,playlist){

	for(i=0; i < playlist.length; i++){

		video = playlist[i];
		img = $('[data-label="playlist_image"] img')[i];
		label = $('[data-label="playlist_label"]').find('span')[i];
		bannertext = $('[data-label="bannertext"]').find('span')[i];

		//Text Fields
		property = $('[data-label="property_name"]').find('span')[i];
		asset = $('[data-label="asset_name"]').find('span')[i];
		type = $('[data-label="type"]').find('span')[i];
		originalAirDate = $('[data-label="original_air_date"]').find('span')[i];
		publishDate = $('[data-label="publish_date"]').find('span')[i];
		original_air_date = $('[data-label="original_air_date"]').find('span')[i];


		//reformat all publish dates on page to MM/DD/YYYY
		
		

		if(img){
			$(img).attr('src',video.thumbnailurl);
			$(label).text(i+1);

			$(property).text(video.seriesname);
			$(asset).text(video.title);
			$(type).text("Type: " + video.authtype + "/" + video.type);
			$(originalAirDate).text("Orig Air Date: " + moment(video.originalpremieredate,'MMM D, YYYY').format('MM/DD/YYYY'));
			$(publishDate).text("Publish Date: " +  moment(video.pubdate,'MM/DD/YYYY').format('MM/DD/YYYY'));

			//Process Dates
		
		

		}

		if(video.bannertext){
			$(bannertext).text(video.bannertext);
			$($('[data-label="bannertext"]')[i]).show();
		}

		//color code boxes
		boundingbox = $('[data-label="playlist_label"]');
		
		if(video.preference.indexOf("editorial") > -1){
			$($(boundingbox)[i]).css('background-color','#3E8AE5');
			$($(boundingbox)[i]).find('img').remove();

		} else if(video.preference.indexOf("like") > -1){
			$($(boundingbox)[i]).css('background-color','#46DC1F');
			$($(boundingbox)[i]).find('img').remove();
		} else {
			//Neutral. paint red
			$($(boundingbox)[i]).css('background-color','#FF4038');
			$($(boundingbox)[i]).find('img').remove();
		}



	}

	


}



function loadShows(error, shows){

	console.log("Do some Ajax Stuff");
	//Hide thumbs until we get shows for this user
	$('[data-label="thumbsup"]').hide() 
	$('[data-label="GreenCircle"]').hide()

	//var shows = [{"contentid":"431896","seriestitleid":"2012957","title":"Clarence","headicon":null,"showlogopng":null,"tuneinmsg":"Watch Full Episodes Now!","introwhitelistflag":"true","mixwhitelistflag":"true","featuredobj":{"isFeatured":true},"secondarycolor":"#6a4f9e","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/clarence_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i105/CLARENCE_900x675_2.png","createdate":"2015-10-13T03:00:09.925Z","camelCase":null,"sequence":1,"collections":[{"name":"Clarence Extras","collectionId":"8a250ab0440572760144465f89c20149"}],"adshowid":"clarence","shorttitle":"Clarence","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/clarence_780x370.png","vmacollectionid":"8a250ab042e2ae3e01439c86535d095c","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/clarence_99x112.png","deeplinkname":"clarence","usersticky":true},{"contentid":"104068","seriestitleid":"757073","title":"Adventure Time","headicon":null,"showlogopng":null,"tuneinmsg":"Watch Full Episodes Now!","introwhitelistflag":"false","mixwhitelistflag":"true","featuredobj":{"isFeatured":true},"secondarycolor":"#18ACD0","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"},{"seasonNumber":"3"},{"seasonNumber":"4"},{"seasonNumber":"5"},{"seasonNumber":"6"},{"seasonNumber":"7"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/AT_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/at_900x675.png","createdate":"2015-10-13T03:00:09.947Z","camelCase":null,"sequence":9,"collections":[],"adshowid":"advtime","shorttitle":"Adventure Time","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/at_780x370.png","vmacollectionid":"8a250ab02578da2201257a603d960035","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/AT_99x112.png","deeplinkname":"adventuretime","usersticky":true},{"contentid":"104115","seriestitleid":"810150","title":"Regular Show","headicon":null,"showlogopng":null,"tuneinmsg":"Watch Full Episodes Now!","introwhitelistflag":"true","mixwhitelistflag":"true","featuredobj":{"isFeatured":true},"secondarycolor":"#526ec8","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"},{"seasonNumber":"3"},{"seasonNumber":"4"},{"seasonNumber":"5"},{"seasonNumber":"6"},{"seasonNumber":"7"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/RS_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i105/RS_900x675_2.png","createdate":"2015-10-13T03:00:09.955Z","camelCase":null,"sequence":12,"collections":[],"adshowid":"regshow","shorttitle":"Regular Show","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/regshow_780x370.png","vmacollectionid":"8a250ab02a424622012a48374e330051","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/RS_99x112.png","deeplinkname":"regularshow","usersticky":true},{"contentid":"286280","seriestitleid":"2000349","title":"Teen Titans Go! ","headicon":null,"showlogopng":null,"tuneinmsg":"Watch Full Episodes Now!","introwhitelistflag":"true","mixwhitelistflag":"true","featuredobj":{"isFeatured":true},"secondarycolor":"#26c5e7","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"},{"seasonNumber":"3"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/TTG_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i105/TTG_900x675_2.png","createdate":"2015-10-13T03:00:09.914Z","camelCase":null,"sequence":0,"collections":[],"adshowid":"ttg","shorttitle":"Teen Titans Go! ","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/ttg_780x370.png","vmacollectionid":"8a250ab03cca0480013d1cf705eb035c","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/TTG_99x112.png","deeplinkname":"teen-titans-go","usersticky":false},{"contentid":"116115","seriestitleid":"835928","title":"The Amazing World of Gumball","headicon":null,"showlogopng":null,"tuneinmsg":"New Episodes! Thursdays at 7/6c ","introwhitelistflag":"true","mixwhitelistflag":"true","featuredobj":{"isFeatured":true},"secondarycolor":"#1ec6bc","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"},{"seasonNumber":"3"},{"seasonNumber":"4"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/GUMBALL_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i105/GUM_900x675_2.png","createdate":"2015-10-13T03:00:09.928Z","camelCase":null,"sequence":2,"collections":[],"adshowid":"gumball","shorttitle":"Gumball","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/gumball_780x370.png","vmacollectionid":"8a250ab02ee8e496012f080adc4c02ee","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/gumball_99x112.png","deeplinkname":"gumball","usersticky":false},{"contentid":"531392","seriestitleid":"2056641","title":"We Bare Bears","headicon":null,"showlogopng":null,"tuneinmsg":"Watch Full Episodes Now!","introwhitelistflag":"true","mixwhitelistflag":"true","featuredobj":{"isFeatured":true},"secondarycolor":"#669b32","seasons":[{"seasonNumber":"1"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i101/wbb_characterhead_grizzly_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i101/wbb_group_900x675.png","createdate":"2015-10-13T03:00:09.931Z","camelCase":null,"sequence":3,"collections":[{"name":"We Bare Bears ","collectionId":"8a250ab04e88a600014ead539af2020d"}],"adshowid":"webarebears","shorttitle":"We Bare Bears","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i101/wbb_780x370_white.png","vmacollectionid":"8a250ab04de35614014de83516e10477","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i101/wbb_characterhead_grizzly_99x112.png","deeplinkname":"we-bare-bears","usersticky":false},{"contentid":"464665","seriestitleid":"10000000000580854","title":"Halloween Specials","headicon":null,"showlogopng":null,"tuneinmsg":"","introwhitelistflag":"false","mixwhitelistflag":"false","featuredobj":null,"secondarycolor":"#f4008a","seasons":[],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i111/cn_halloween2015_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i111/cn_halloween2015_charactergrouping_900x675.png","createdate":"2015-10-13T03:00:09.934Z","camelCase":null,"sequence":4,"collections":[],"adshowid":null,"shorttitle":"Halloween Specials","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i111/halloween2015_logo_780x370.png","vmacollectionid":"8a250ab047fac984014837517133015a","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i111/cn_halloween2015_99x112.png","deeplinkname":"special-event","usersticky":false},{"contentid":"566965","seriestitleid":"2026524","title":"Total Drama Presents: The Ridonculous Race","headicon":null,"showlogopng":null,"tuneinmsg":"","introwhitelistflag":"true","mixwhitelistflag":"true","featuredobj":null,"secondarycolor":"#4775a3","seasons":[{"seasonNumber":"7"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i108/tdrr_characterhead_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i108/tdrr_charactergroup_900x675.png","createdate":"2015-10-13T03:00:09.937Z","camelCase":null,"sequence":5,"collections":[{"name":"Total Drama Presents: The Ridonculous Race - Interviews","collectionId":"8a250ab04f83f11d014f8a4913450036"}],"adshowid":"totaldrama","shorttitle":"Total Drama Ridonculous Race","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i108/tdrr_showlogo_780x370.png","vmacollectionid":"8a250ab04f83f11d014f8597180a0010","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i108/tdrr_characterhead_99x112.png","deeplinkname":"total-drama-ridonculous-race","usersticky":false},{"contentid":"576954","seriestitleid":"2062459","title":"Wabbit","headicon":null,"showlogopng":null,"tuneinmsg":"","introwhitelistflag":"false","mixwhitelistflag":"true","featuredobj":null,"secondarycolor":"#6F7F40","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i110/wabbit_characterhead_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i110/wabbit_charactergroup_900x675.png","createdate":"2015-10-13T03:00:09.940Z","camelCase":null,"sequence":6,"collections":[],"adshowid":"wabbit","shorttitle":"Wabbit","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i110/wabbit_showlogo_780x370.png","vmacollectionid":"8a250ab04fcc7288014fe1a24be10010","featuredmessage":"See It First!","characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i110/wabbit_characterhead_99x112.png","deeplinkname":"wabbit","usersticky":false},{"contentid":"421492","seriestitleid":"2011404","title":"Steven Universe","headicon":null,"showlogopng":null,"tuneinmsg":"Watch Full Episodes Now!","introwhitelistflag":"true","mixwhitelistflag":"true","featuredobj":{"isFeatured":true},"secondarycolor":"#2b4a76","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/STEVEN_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i103/stevenuniverse_900x675.png","createdate":"2015-10-13T03:00:09.942Z","camelCase":null,"sequence":7,"collections":[{"name":"GEM POWERS","collectionId":"8a250ab04128b56501415ba0733404db"},{"name":"THAT'S SO STEVEN","collectionId":"8a250ab04405727601456c0fce5509cf"},{"name":"TOYS, GAMES & MOVIES","collectionId":"8a250ab0459934c30145f6d52b1a0435"},{"name":"STEVEN'S GREATEST HITS","collectionId":"8a250ab047f52bd80147f99d6acc0009"}],"adshowid":"steven","shorttitle":"Steven Universe","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/steven_780x370.png","vmacollectionid":"8a250ab04128b56501415b9d237f04d9","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/STEVEN_99x112.png","deeplinkname":"steven-universe","usersticky":false},{"contentid":"575206","seriestitleid":"2031360","title":"Be Cool, Scooby-Doo!","headicon":null,"showlogopng":null,"tuneinmsg":"","introwhitelistflag":"false","mixwhitelistflag":"true","featuredobj":null,"secondarycolor":"#005B54","seasons":[{"seasonNumber":"1"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i110/bcsd_characterhead_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i110/bcsd_charactergroup_900x675.png","createdate":"2015-10-13T03:00:09.945Z","camelCase":null,"sequence":8,"collections":[],"adshowid":"scooby","shorttitle":"Be Cool, Scooby-Doo!","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i110/bcsd_showlogo_780x370.png","vmacollectionid":"8a250ab04fcc7288014fe1f2363d0012","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i110/bcsd_characterhead_99x112.png","deeplinkname":"be-cool-scooby-doo","usersticky":false},{"contentid":"504057","seriestitleid":"2055199","title":"Mighty Magiswords","headicon":null,"showlogopng":null,"tuneinmsg":"","introwhitelistflag":"true","mixwhitelistflag":"true","featuredobj":{"isFeatured":true,"bannertext":null,"text_line1":"MIGHTY MAGISWORDS","text_line2":"Dolphinominal","titleid":"/video/magiswords/dolphinominal-episode.html","thumburl":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i111/care1006241500005256_010_640x360.jpg"},"secondarycolor":"#364298","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/MAGISWORDS_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/magiswords_900x675.png","createdate":"2015-10-13T03:00:09.950Z","camelCase":null,"sequence":10,"collections":[],"adshowid":"magiswords","shorttitle":"Magiswords","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/magiswords_780x370.png","vmacollectionid":"8a250ab04bfef2d6014d29abe2b40530","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/MAGISWORDS_99x112.png","deeplinkname":"magiswords","usersticky":false},{"contentid":"180561","seriestitleid":"860668","title":"NINJAGO","headicon":null,"showlogopng":null,"tuneinmsg":"Watch Full Episodes Now!","introwhitelistflag":"false","mixwhitelistflag":"true","featuredobj":null,"secondarycolor":"#d9851f","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"},{"seasonNumber":"3"},{"seasonNumber":"4"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/NINJAGO_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/ninjago_900x675.png","createdate":"2015-10-13T03:00:09.952Z","camelCase":null,"sequence":11,"collections":[{"name":"NINJAGO","collectionId":"8a250ab044057276014547a235a50898"}],"adshowid":"ninjago","shorttitle":"NINJAGO","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/ninjago_780x370.png","vmacollectionid":"8a250ab02e2c1313012e352b9c0e00b1","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/NINJAGO_99x112.png","deeplinkname":"ninjago","usersticky":false},{"contentid":"425425","seriestitleid":"2011545","title":"Mixels","headicon":null,"showlogopng":null,"tuneinmsg":"","introwhitelistflag":"false","mixwhitelistflag":"true","featuredobj":null,"secondarycolor":"#12a9ec","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"},{"seasonNumber":"3"},{"seasonNumber":"4"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/MIXELS_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/mixels_900x675.png","createdate":"2015-10-13T03:00:09.957Z","camelCase":null,"sequence":13,"collections":[],"adshowid":"mixels","shorttitle":"Mixels","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/mixels_780x370.png","vmacollectionid":"8a250ab041e120fc0141eaf0c650002e","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/MIXELS_99x112.png","deeplinkname":"www.mixels.com","usersticky":false},{"contentid":"335429","seriestitleid":"2007332","title":"Uncle Grandpa","headicon":null,"showlogopng":null,"tuneinmsg":"Watch Full Episodes Now!","introwhitelistflag":"true","mixwhitelistflag":"true","featuredobj":{"isFeatured":true},"secondarycolor":"#B12283","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/UG_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/ug_900x675.png","createdate":"2015-10-13T03:00:09.960Z","camelCase":null,"sequence":14,"collections":[{"name":"Uncle Grandpa Extras","collectionId":"8a250ab040ac04220140c691eec3022a"}],"adshowid":"unclegrandpa","shorttitle":"Uncle Grandpa","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/ug_780x370.png","vmacollectionid":"8a250ab03fa574f901400cf733bc020e","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/UG_99x112.png","deeplinkname":"uncle-grandpa","usersticky":false},{"contentid":"442561","seriestitleid":"2005235","title":"Total Drama: Pahkitew Island","headicon":null,"showlogopng":null,"tuneinmsg":null,"introwhitelistflag":"false","mixwhitelistflag":"false","featuredobj":null,"secondarycolor":"#4775a3","seasons":[{"seasonNumber":"1"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i107/tdpi_characterhead_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i107/tdpi_group_900x675.png","createdate":"2015-10-13T03:00:09.962Z","camelCase":null,"sequence":15,"collections":[{"name":"Total Drama: Pahkitew Island Extras","collectionId":"8a250ab0466d2b55014681ea9ce80067"}],"adshowid":"totaldrama","shorttitle":"Total Drama","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i107/tdpi_780x370.png","vmacollectionid":"8a250ab0459934c3014624a3d134051e","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i107/tdpi_characterhead_99x112.png","deeplinkname":"total-drama","usersticky":false},{"contentid":"496082","seriestitleid":"2054282","title":"Sick Bricks","headicon":null,"showlogopng":null,"tuneinmsg":"","introwhitelistflag":"false","mixwhitelistflag":"false","featuredobj":null,"secondarycolor":"#3e3e3e","seasons":[],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/SICKBRICKS_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/sickbricks_900x675.png","createdate":"2015-10-13T03:00:09.965Z","camelCase":null,"sequence":16,"collections":[],"adshowid":"sickbricks","shorttitle":"Sick Bricks","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/sickbricks_780x370.png","vmacollectionid":"8a250ab04b9d58b9014be14628f201de","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/SICKBRICKS_99x112.png","deeplinkname":"sick-bricks","usersticky":false},{"contentid":"338843","seriestitleid":"2002231","title":"Total Drama All-Stars","headicon":null,"showlogopng":null,"tuneinmsg":null,"introwhitelistflag":"false","mixwhitelistflag":"false","featuredobj":null,"secondarycolor":"#0c94bb","seasons":[{"seasonNumber":"5"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i101/tdas_characterhead_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i101/tdas_group_900x675.png","createdate":"2015-10-13T03:00:09.968Z","camelCase":null,"sequence":17,"collections":[],"adshowid":"totaldrama","shorttitle":"Total Drama All-Stars","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i101/tdas_780x370.png","vmacollectionid":"8a250ab036a833af0136d10469960058","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i101/tdas_characterhead_99x112.png","deeplinkname":"total-drama-all-stars","usersticky":false},{"contentid":"151657","seriestitleid":"1360","title":"LEGO [AD] ","headicon":null,"showlogopng":null,"tuneinmsg":"","introwhitelistflag":"false","mixwhitelistflag":"false","featuredobj":null,"secondarycolor":"#69badd","seasons":[{"seasonNumber":"Collection"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i110/cn_app_showicon_lego-city-character-sep-2015-1.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i110/property_char_grouping-lego-city-sept-2015.png","createdate":"2015-10-13T03:00:09.970Z","camelCase":null,"sequence":18,"collections":[],"adshowid":"lego","shorttitle":"LEGO [AD] ","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i105/lego_780x370_2.png","vmacollectionid":"8a250ab03119fb4b01314ded81ea03c6\r\n\r\n","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i110/cn_app_showicon_lego-city-character-sep-2015_99x112.png","deeplinkname":"lego","usersticky":false},{"contentid":"471937","seriestitleid":"2012689","title":"Sonic Boom","headicon":null,"showlogopng":null,"tuneinmsg":"Watch Full Episodes Now!","introwhitelistflag":"false","mixwhitelistflag":"true","featuredobj":null,"secondarycolor":"#0365c0","seasons":[{"seasonNumber":"1"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/SONIC_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i105/SONIC_900x675_2.png","createdate":"2015-10-13T03:00:09.973Z","camelCase":null,"sequence":19,"collections":[],"adshowid":"sonicboom","shorttitle":"Sonic Boom","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/sonic_780x370.png","vmacollectionid":"8a250ab049106d77014933571a5200e5","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/SONIC_99x112.png","deeplinkname":"sonic-boom","usersticky":false},{"contentid":"241107","seriestitleid":"871368","title":"Ben 10 Omniverse","headicon":null,"showlogopng":null,"tuneinmsg":null,"introwhitelistflag":"false","mixwhitelistflag":"false","featuredobj":{"isFeatured":true,"bannertext":"Movie","text_line1":"Ben 10: Race Against Time","text_line2":null,"titleid":"686932","thumburl":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i111/care1009291500006958_001_640x360.jpg"},"secondarycolor":"#289403","seasons":[{"seasonNumber":"1"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/BEN10_OMNI_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/ben10_900x675.png","createdate":"2015-10-13T03:00:09.975Z","camelCase":null,"sequence":20,"collections":[],"adshowid":"ben10","shorttitle":"Ben 10 Omniverse","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/ben10_780x370.png","vmacollectionid":"8a250ab0385763600138721314a3014e","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/BEN10_OMNI_99x112.png","deeplinkname":"ben10","usersticky":false},{"contentid":"495154","seriestitleid":"2043744","title":"Transformers: Robots in Disguise","headicon":null,"showlogopng":null,"tuneinmsg":"Watch Full Episodes Now!","introwhitelistflag":"false","mixwhitelistflag":"false","featuredobj":{"isFeatured":true},"secondarycolor":"#144576","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/TRANSFORMERS_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/transformers_900x675.png","createdate":"2015-10-13T03:00:09.978Z","camelCase":null,"sequence":21,"collections":[],"adshowid":"transformers","shorttitle":"Transformers","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/transformers_780x370.png","vmacollectionid":"8a250ab04b9d58b9014bc27cec0200b3","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/TRANSFORMERS_99x112.png","deeplinkname":"transformers","usersticky":false},{"contentid":"104134","seriestitleid":"2011437","title":"The Tom and Jerry Show","headicon":null,"showlogopng":null,"tuneinmsg":"Weekdays at 1/12c","introwhitelistflag":"false","mixwhitelistflag":"true","featuredobj":{"isFeatured":true},"secondarycolor":"#57caf6","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/TJ_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/tj_900x675.png","createdate":"2015-10-13T03:00:09.980Z","camelCase":null,"sequence":22,"collections":[{"name":"Classic Tom and Jerry","collectionId":"8a250ab022ea97c70122ebea0f680055"}],"adshowid":"tomjerry","shorttitle":"The Tom and Jerry Show","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/tj_780x370.png","vmacollectionid":"8a250ab044057276014508f90ae70760","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/TJ_99x112.png","deeplinkname":"tomjerry","usersticky":false},{"contentid":"465728","seriestitleid":"2017785","title":"Over the Garden Wall","headicon":null,"showlogopng":null,"tuneinmsg":null,"introwhitelistflag":"false","mixwhitelistflag":"true","featuredobj":null,"secondarycolor":"#d2aa68","seasons":[{"seasonNumber":"1"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/test_otgw_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/otgw_900x675.png","createdate":"2015-10-13T03:00:09.983Z","camelCase":null,"sequence":23,"collections":[{"name":"Songs From the Series","collectionId":"8a250ab049106d7701493361781a00ed"}],"adshowid":"otgw","shorttitle":"Over the Garden Wall","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/otgw_780x370.png","vmacollectionid":"8a250ab047fac98401488f07857c03a2","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/OTGW_99x112.png","deeplinkname":"over-the-garden-wall","usersticky":false},{"contentid":"431891","seriestitleid":"2011402","title":"Pok&eacute;mon the Series: XY","headicon":null,"showlogopng":null,"tuneinmsg":"Saturdays at 8a/7c","introwhitelistflag":"false","mixwhitelistflag":"false","featuredobj":{"isFeatured":true},"secondarycolor":"#007bc9","seasons":[{"seasonNumber":"17"},{"seasonNumber":"18"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/test_pikachu_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i105/POKEMON_900x675_2.png","createdate":"2015-10-13T03:00:09.985Z","camelCase":null,"sequence":24,"collections":[{"name":"Pok&eacute;mon the Series: XY - Extras","collectionId":"8a250ab047ca8f950147cac762bb0003"}],"adshowid":"pokemon","shorttitle":"Pokemon","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/pokemon_780x370.png","vmacollectionid":"8a25c39221152c35012117de262c0042","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/POKEMON_99x112.png","deeplinkname":"pokemon","usersticky":false},{"contentid":"104102","seriestitleid":"632346","title":"Johnny Test","headicon":null,"showlogopng":null,"tuneinmsg":"Sunday at 6:30/5:30c","introwhitelistflag":"false","mixwhitelistflag":"false","featuredobj":{"isFeatured":true},"secondarycolor":"#58ba17","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"},{"seasonNumber":"3"},{"seasonNumber":"4"},{"seasonNumber":"5"},{"seasonNumber":"6"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/JTEST_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i105/JTEST_900x675_2.png","createdate":"2015-10-13T03:00:09.988Z","camelCase":null,"sequence":25,"collections":[],"adshowid":"johnnytest","shorttitle":"Johnny Test","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/jtest_780x370.png","vmacollectionid":"8a250ab022ea97c70122ebea95d00059","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/JTEST_99x112.png","deeplinkname":"johnnytest","usersticky":false},{"contentid":"268696","seriestitleid":"973216","title":"Legends of Chima","headicon":null,"showlogopng":null,"tuneinmsg":"Saturdays at 7:30a/6:30c","introwhitelistflag":"false","mixwhitelistflag":"false","featuredobj":null,"secondarycolor":"#729e12","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/CHIMA_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i105/CHIMA_900x675_2.png","createdate":"2015-10-13T03:00:09.991Z","camelCase":null,"sequence":26,"collections":[{"name":"Chima","collectionId":"8a250ab0440572760144ade0261804e7"}],"adshowid":"chima","shorttitle":"Chima","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/chima_780x370.png","vmacollectionid":"8a250ab03baefee9013c159afc82046b","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/CHIMA_99x112.png","deeplinkname":"legends-of-chima","usersticky":false},{"contentid":"182107","seriestitleid":"2007217","title":"Dreamworks Dragons: Defenders of Berk","headicon":null,"showlogopng":null,"tuneinmsg":null,"introwhitelistflag":"false","mixwhitelistflag":"false","featuredobj":null,"secondarycolor":"#7FAEBF","seasons":[{"seasonNumber":"2"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/DRAGONS_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/dragons_900x675.png","createdate":"2015-10-13T03:00:09.993Z","camelCase":null,"sequence":27,"collections":[{"name":"DreamWorks Dragons: Riders of Berk","collectionId":"8a250ab0385763600138721473b4014f"}],"adshowid":"dragons","shorttitle":"Dreamworks Dragons","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/dragons_780x370.png","vmacollectionid":"8a250ab0410360af0141142cc77901aa","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/DRAGONS_99x112.png","deeplinkname":"dragons","usersticky":false},{"contentid":"120793","seriestitleid":"824654","title":"The Looney Tunes Show","headicon":null,"showlogopng":null,"tuneinmsg":null,"introwhitelistflag":"false","mixwhitelistflag":"false","featuredobj":null,"secondarycolor":"#30b74c","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/LOONEY_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/looney_900x675.png","createdate":"2015-10-13T03:00:09.996Z","camelCase":null,"sequence":28,"collections":[],"adshowid":"looney","shorttitle":"Looney Tunes","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/looney_780x370.png","vmacollectionid":"8a250ab02e4e9a23012e594077ff00c5","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/LOONEY_99x112.png","deeplinkname":"looneytunesshow","usersticky":false},{"contentid":"104085","seriestitleid":"330149","title":"Courage the Cowardly Dog","headicon":null,"showlogopng":null,"tuneinmsg":null,"introwhitelistflag":"false","mixwhitelistflag":"false","featuredobj":{"isFeatured":true},"secondarycolor":"#c84329","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"},{"seasonNumber":"3"},{"seasonNumber":"4"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/COURAGE_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i105/COURAGE_900x675_2.png","createdate":"2015-10-13T03:00:09.998Z","camelCase":null,"sequence":29,"collections":[],"adshowid":"courage","shorttitle":"Courage","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/courage_780x370.png","vmacollectionid":"8a25c3920d1231fe010d126608c4008f","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/COURAGE_99x112.png","deeplinkname":"courage","usersticky":false},{"contentid":"207792","seriestitleid":"874208","title":"DC Nation","headicon":null,"showlogopng":null,"tuneinmsg":null,"introwhitelistflag":"false","mixwhitelistflag":"false","featuredobj":{"isFeatured":true},"secondarycolor":"#274e71","seasons":[],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/DCNATION_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/dcnation_900x675.png","createdate":"2015-10-13T03:00:10.001Z","camelCase":null,"sequence":30,"collections":[],"adshowid":"dcnation","shorttitle":"DC Nation","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/dcnation_780x370.png","vmacollectionid":"8a250ab034d7d1e00135210c7f7a016f","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/DCNATION_99x112.png","deeplinkname":"dc-nation","usersticky":false}];

	console.log("Loaded Shows " + error);
	console.log(shows);

	 

	showImages = $('[data-label="TopShow_0"] img');

	liked = 0;

	for(i=0; i < shows.length;i++){
		if($(showImages)[i]) {
			$(showImages)[i].src = shows[i].characterhead;
			$($('[data-label="TopShow_0"]')[i]).show();
			if(shows[i].usersticky == true){
				$($('[data-label="thumbsup"]')[i]).show();
				$($('[data-label="GreenCircle"]')[i]).show();
				$($('[data-label="TopShow_0"]')[i]).css('opacity','1');
				liked += 1;
			} else {
				
				$($('[data-label="TopShow_0"]')[i]).css('opacity','.25');
			}
		}
	}

     $('[data-label="TopShow_0"]').css('border','1px solid green').css('border-radius','50%').css('overflow','hidden').css('width','60px').css('height','60px');

	//Set #of Liked Shows Counter
	$('[data-label="num_liked_shows"]').find('span').text(liked)
}
  

function toggleSwitch(){

	javascript:$('[data-label="slider"]').animate({
         opacity:100,
         
         left:window.slide == "right" ? "+=50" : "-=50"
         
       }, 1000, function() { 
          

          if(window.slide == "right"){
          	$('[data-label="ReturningUser"]').css('color','black');
          	$('[data-label="f_input_id"] input').removeAttr('disabled');   
          }else {
			$('[data-label="ReturningUser"]').css('color','pink');
			$('[data-label="f_input_id"] input').prop('disabled','true') 
          }


			window.slide = window.slide == "right" ? "left" : "right";
       });
}
