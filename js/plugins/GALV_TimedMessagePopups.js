//-----------------------------------------------------------------------------
//  Galv's Timed Message Popups
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_TimedMessagePopups.js
//-----------------------------------------------------------------------------
//  2016-03-24 - Version 1.3 - added ability to specify follower actor and
//                           - set windowskin
//  2016-03-23 - Version 1.2 - changed code to use | to split x|y coords
//  2016-03-23 - Version 1.1 - added "delay" setting and follower targeting
//  2016-03-23 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MessageCaptions = true;

var Galv = Galv || {};            // Galv's main object
Galv.Mpup = Galv.Mpup || {};        // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc Display popup message boxes on screen that do not stop gameplay and auto close after a set time.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Y Offset
 * @desc Offset Y position by this much when popup is displayed over a character.
 * @default -60
 *
 * @param Default Windowskin
 * @desc Windowskin file from /img/system/ that popup messages use by default
 * @default Window
 *
 * @help
 *   Galv's Timed Message Popups
 * ----------------------------------------------------------------------------
 * Creates timed message popup boxes that can appear at a position on the
 * screen or at a character's location. These popups do not stop player
 * movement and you can display as many of them at one time as needed.
 *
 * To activate a message popup, inside a "Show Text" box, you will need to
 * include a tag on the first line of the message:
 *
 *    <c:target,time,delay,windowskin>
 *
 * target  = the ID of an event (0 for current event) OR
 *           x|y screen coordinates OR
 *           negatives for followers (-1 being leader, -2 for second, etc.)
 *           OR... you can use a1, a2, a3, etc. to specify certain actor.
 *           If follower/actor is not in party, message won't display.
 * time    = frames the caption will be displayed before it closes
 * yoffset = pixels offset vertically (works for events and player only)
 * windowskin = filename of new windowskin located in /img/system/
 *              do not include this to use normal windowskin.
 *
 * EXAMPLES:
 * <c:4,160,0>     // Message on event 4 for 160 frames
 * <c:-1,60,10>    // After 10 frames, message on player for 60 frames
 * <c:-3,80,20>    // After 20 frames, message on party member 3 for 80 frames
 * <c:a7,60,0>     // Message on actor 7 for 60 frames if actor is a follower
 * <c:0,100,0>     // Message on current event for 100 frames
 * <c:100|100,80,5>  // After 5 frames, message at screen x100 y100 for 80 fr
 * <c:0|0,90,0,Window2>  // message at screen x0 y0 for 90 frames using
 *                       // /img/system/Window2.png windowskin file.
 *
 * Show Text message box settings and face do not have any effect on the
 * message popup box. These message boxes are removed when player goes into
 * the menu.
 *
 * Note that when the player opens the menu, even messages that were created
 * with a delay will be removed.
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------


(function() {

Galv.Mpup.thisEvent = null;
Galv.Mpup.yOffset = Number(PluginManager.parameters('Galv_TimedMessagePopups')['Y Offset']);
Galv.Mpup.windowskin = PluginManager.parameters('Galv_TimedMessagePopups')['Default Windowskin'];


Galv.Mpup.Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
Game_Interpreter.prototype.command101 = function() {
	
	var cap = this._list[this._index + 1].parameters[0].match(/<c:(.*)>/i);

	var pos = 2; //this._params[3];
	
	if (!cap) {
		Galv.Mpup.Game_Interpreter_command101.call(this);
	} else {
		Galv.Mpup.thisEvent = this._eventId;
		var txtArray = [];

		// get all text:
		while (this.nextEventCode() === 401) {  // Text data
            this._index++;
            txtArray.push(this.currentCommand().parameters[0]);
        };

		txtArray[0] = txtArray[0].replace(cap[0],"");
		
		var o = cap[1].split(",");
			var windowskin = o[3];
			if (windowskin) ImageManager.loadSystem(windowskin);
			
		if (o[0].contains("|")) {
			var xy = o[0].split("|");
			var target = [Number(xy[0]),Number(xy[1])];
		} else if (o[0].contains("a")) {
			var actorIndex = $gameActors.actor(Number(o[0].replace("a",""))).index();
			if (actorIndex < 0) return;
			var target = -(actorIndex + 1);
		} else {
			var target = Number(o[0]);
		};
		var time = Number(o[1]);
		var delay = Number(o[2]) || 0;

		SceneManager._scene.createCaptionWindow(target,time,txtArray,pos,delay,windowskin);
	};
};


// Scene Map
//-----------------------------------------------------------------------------

Galv.Mpup.Scene_Map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
    Galv.Mpup.Scene_Map_initialize.call(this);
	this._captionWindows = [];
};

Galv.Mpup.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    Galv.Mpup.Scene_Map_update.call(this);
	this.updateCaptionBoxes();
};

Scene_Map.prototype.updateCaptionBoxes = function() {
	for (var i = 0; i < this._captionWindows.length; i++) {
		if (!this._captionWindows[i] || !this._captionWindows[i].active) {
			this._windowLayer.removeChild(this._captionWindows[i]);
			this._captionWindows[i] = null;    
			this._captionWindows.splice(i, 1);
			i--;
		};
	};
};

Scene_Map.prototype.createCaptionWindow = function(target,time,textArray,pos,delay,windowskin) {
	var p = new Window_GalvCaption(target,time,textArray,pos,delay,windowskin);
	this._captionWindows.push(p);
    this.addWindow(p);
};


// Caption Window
//-----------------------------------------------------------------------------

function Window_GalvCaption() {
    this.initialize.apply(this, arguments);
}

Window_GalvCaption.prototype = Object.create(Window_Base.prototype);
Window_GalvCaption.prototype.constructor = Window_GalvCaption;

Window_GalvCaption.prototype.initialize = function(target,time,textArray,pos,delay,windowskin) {
	// target = [x,y] or event id or 0 for player
	this._pos = pos;  // bottom is 2, top is 0, middle is 1
	this.skin = windowskin || Galv.Mpup.windowskin;
	if (Number.isInteger(target)) {
		// event ID or player
		if (target >= -1) {
			switch (target) {
				case 0:
					this.target = $gameMap.event(Galv.Mpup.thisEvent);
					break;
				case -1:
					this.target = $gamePlayer;
					break;
				default:
					this.target = $gameMap.event(target);
					break;
			};
		
		} else {
			var f = Math.abs(target) - 2;

			this.target = $gamePlayer._followers.follower(f);
			if (f > $gameParty.battleMembers().length) this._disable = true;
		};
		Galv.Mpup.thisEvent = null;
		this.follow = true; // follow the object in update
	} else {
		this.targetX = target[0];
		this.targetY = target[1];
	};
	
	this._time = time + delay || 160;
	this._delayTime = this._time - delay;
	this._txtArray = textArray;

    Window_Base.prototype.initialize.call(this, this.targetX, this.targetY, 1000, this.fittingHeight(this._txtArray.length));
	this.windowskin = ImageManager.loadSystem(this.skin);

	this.checkWindowSkin();
    this.openness = 0;
	if (!this._disable) this.active = true;
};


Window_GalvCaption.prototype.loadWindowskin = function() {
	this.windowskin = ImageManager.loadSystem(this.skin);
};

Window_GalvCaption.prototype.setWindowDimensions = function() {
	var w = 10;
	this.contents.clear();
	// Calc max width and line height to get dimensions
	for (var i = 0; i < this._txtArray.length; i++) {
        var lineWidth = this.textWidthEx(this._txtArray[i]) + this.textPadding() * 6;
        if (w < lineWidth) {
            w = lineWidth;
        };
		this.drawTextEx(this._txtArray[i], 0, this.lineHeight() * i);
    }
	this.width = w;
	
	this._offsetY = 0;
	if (this._pos == 2) {
		this._offsetY = -this.height - 60;
	};
};


Window_GalvCaption.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_GalvCaption.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	
	if (!this.skinLoaded) this.checkWindowSkin();
	
	if (this._time == this._delayTime) {if (!this._disable) this.open()};
	if (this._time <= 0) {
		if (this._time == 0) {
			this.close();
		} else if (this.openness == 0) {
			this.active = false;
		};
	};
	this._time -= 1;
	
	if (this.follow) {
		var centX = this.target.screenX() - this.width / 2;
		this.x = centX;
		this.y = this.target.screenY() + this._offsetY;
	};
};

Window_GalvCaption.prototype.checkWindowSkin = function() {
	if (this.windowskin.isReady()) {
		this.setWindowDimensions();
		this.skinLoaded = true;
	};
};

})();