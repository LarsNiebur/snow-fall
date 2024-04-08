class Snowfall{
	constructor( in_bild, in_anz_Bilder = 50, in_speed = 1 ){
		this.bild				= in_bild
		this.max_img			= 250;
		this.max_speed			= 50;
		
		if ( in_speed > this.max_speed )
		{
			console.log("Snowfall.js WARNING: Max Speed violant > Limited to " + this.max_speed );
			in_speed = this.max_speed;
		}
		this.snow_fall_speed 	= in_speed; 
		
		
		if	( in_anz_Bilder > this.max_img ){
			console.log("Snowfall.js WARNING: To many images > Limited to " + this.max_img);
			in_anz_Bilder = this.max_img;
		}
		this.snow_img_count		= in_anz_Bilder;
		this.all_img			= Array();
		
		this.curr_y_pos_in_deg 	= 0;
		this.sin_left_add 		= 0;
		
		this.init();
	}	
	
	init(){
		for ( let x = 0  ; x < this.snow_img_count ; x++ ){
			var temp_elm 		= document.createElement("IMG"); 	
			temp_elm.src 		= this.bild;						
			temp_elm.style.top 	= "0px";
			temp_elm.style.left = "0px";
			temp_elm.pos_top	= 0;
			temp_elm.pos_left   = 0;	
							
			document.body.appendChild(temp_elm);
			
			// Alle IMG Tags der Seite lesen				
			this.setRandomPos( temp_elm );
			
			// Das IMG in ein Array speichern
			this.all_img.push( temp_elm );
		}
		
		// Erster Aufruf, der alles startet
		var init_id = setInterval(this.run.bind(this), 32);
	}
	
	run(){
		for (let i = 0; i < this.snow_img_count; i++){
			this.snowfall(this.all_img[i]);
		}		
	}
		
	snowfall(img_tag){
		this.curr_y_pos_in_deg 	= this.deg2rad(img_tag.pos_top * 3);
		this.sin_left_add 		= Math.sin(this.curr_y_pos_in_deg) * 5;
		
		// Neue Position berechnen
		img_tag.pos_top 		= img_tag.pos_top + ( img_tag.width * 0.025 ) * this.snow_fall_speed;
		img_tag.pos_left 		= img_tag.pos_left + this.sin_left_add;
		
		// Neue Position schreiben 
		img_tag.style.top 		= img_tag.pos_top + "px";
		img_tag.style.left 		= img_tag.pos_left + "px";
		
		if ( img_tag.pos_top > window.innerHeight && this.snow_fall_speed > 0 ){
			this.setRandomPos(img_tag);
		}
		else if ( img_tag.pos_top < ( (-1)*img_tag.height ) && this.snow_fall_speed < 0 ){
			this.setRandomPos(img_tag);
		}
	}
	
	setRandomPos(tmp_elm){
		tmp_elm.pos_left   		= Math.random() * window.innerWidth;
		tmp_elm.style.left 		= tmp_elm.pos_left + "px";	

		if( this.snow_fall_speed > 0 ){
			tmp_elm.pos_top			= Math.random() * ( -1 * window.innerHeight ) - tmp_elm.height;
			tmp_elm.style.top 		= tmp_elm.pos_top + "px";
		}
		else{
			tmp_elm.pos_top			= Math.random() * ( 1 * window.innerHeight ) + window.innerHeight;
			tmp_elm.style.top 		= tmp_elm.pos_top + "px";
		}
		
		tmp_elm.width			= Math.random() * 40 + 25;
	}
	
	deg2rad(deg){
		return deg * ( Math.PI * 0.00555 );
	}
}