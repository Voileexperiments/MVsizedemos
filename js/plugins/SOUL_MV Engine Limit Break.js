// ---------------------------------------------------------------------------------------------
// SOUL_MV Engine Limit Break.js
// ---------------------------------------------------------------------------------------------
/*:
* @plugindesc v1.0 Adjusts most of the maximum / changable values of the MV Engine.
* @author Soulpour777 - soulxregalia.wordpress.com
* 
* @help
// -------------------------------------------------
// SOUL_MV Engine Limit Break
// Author: Soulpour777 - soulxregalia.wordpress.com
// -------------------------------------------------

This plugin does not have any plugin commands.

This plugin allows you to change and adjust most maximum / adjustable
values inside the MV Engine.

May the sun give you the warmth thy soul needs,
and the wind giveth you enough source to live,
the waters enough supply to wake,
and the light enough shine to see.

* @param --- DATA ---
*
* @param Max Saved Files
* @desc Maximum values of saved files available.
* @default 20 
* 
* @param --- CRITICAL DAMAGE ---
*
* @param Critical Multiplier
* @desc Value multiplied with damage for critical damage. (Default: damage x 3)
* @default 3 
* 
* @param --- STATS ---
*
* @param Max HP
* @desc Limit max value of HP.
* @default 999999
*
* @param Max MP
* @desc Limit max value of MP.
* @default 9999
*
* @param Max Attack
* @desc Limit max value of Attack.
* @default 999
*
* @param Max Defense
* @desc Limit max value of Defense.
* @default 999
*
* @param Max Mag
* @desc Limit max value of Magical Attack.
* @default 999
*
* @param Max Mdef
* @desc Limit max value of Magical Defense.
* @default 999
*
* @param Max Agility
* @desc Limit max value of Agility.
* @default 999
*
* @param Max Luck
* @desc Limit max value of Luck.
* @default 999
* 
* @param --- PARTY ---
*
* @param Max Gold
* @desc Maximum value for gold.
* @default 99999999
*
* @param Max Items
* @desc Maximum value for items.
* @default 99
* 
* @param --- MAP ---
*
* @param Tile Width
* @desc Maximum value for tile width.
* @default 48
*
* @param Tile Height
* @desc Maximum value for tile heigth.
* @default 48
*
* @param Basic Floor Damage
* @desc Basic Floor Damage. (Default: 10)
* @default 10
* 
* @param --- CHARACTER ---
*
* @param Max Pattern
* @desc Maximum value for the patterns in the character (Default: 4).
* @default 48
*
* @param Search Limit
* @desc Maximum value for the search limit in the character (Default: 12).
* @default 12
* 
* @param --- VEHICLE ---
*
* @param Max Altitude
* @desc Maximum value for the altitude of the vehicle. (Default: 48).
* @default 48
*
* @param Fade Speed
* @desc Fade Speed value (when character is transferred / teleport) (Default: 24).
* @default 24
* 
* @param --- WINDOWS ---
*
* @param Item List Columns
* @desc Maximum columns for the item list.
* @default 2
*
* @param Skill List Columns
* @desc Maximum columns for the skill list.
* @default 2
*
* @param Equip Command Columns
* @desc Maximum columns for the equip command list.
* @default 3
*
* @param Max Equip Lines
* @desc Maximum equipment lines.
* @default 6
*
* @param Max Save Visible
* @desc Maximum visible saved items before scrolling.
* @default 5
*
* @param Shop Command Columns
* @desc Maximum columns for the shop command list.
* @default 3
*
* @param Shop Max Digits
* @desc Maximum digit number during shopping.
* @default 2
*
* @param Name Input Columns
* @desc Max columns shown when naming your character / Name Input Processing.
* @default 10
*
* @param Max Name Input Items
* @desc Maximum number of letters / characters shown when naming your character / Name Input Processing.
* @default 90
*
* @param Max Battle Log Lines
* @desc Maximum number of lines drawn in the battle log.
* @default 10
*
* @param Battle Enemy Columns
* @desc Number of columns shown to display names of targetted enemies in battle.
* @default 2
*
*/

(function() {
	var SOUL_MV = SOUL_MV || {};
	SOUL_MV.LimitationChanger = {};

	//MANAGERS
	SOUL_MV.LimitationChanger.maxSavefiles = Number(PluginManager.parameters('SOUL_MV Engine Limit Break')['Max Saved Files'] || 20);

	// OBJECTS
	SOUL_MV.LimitationChanger.CriticalMultiplier = Number(PluginManager.parameters('SOUL_MV Limit Break')['Critical Multiplier'] || 3);
	SOUL_MV.LimitationChanger.MHP = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max HP'] || 999999);
	SOUL_MV.LimitationChanger.MMP = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max MP'] || 9999);
	SOUL_MV.LimitationChanger.Attack = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max Attack'] || 999);
	SOUL_MV.LimitationChanger.Defense = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max Def'] || 999);
	SOUL_MV.LimitationChanger.Magic = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max Mag'] || 999);
	SOUL_MV.LimitationChanger.Mdef = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max Mdef'] || 999);
	SOUL_MV.LimitationChanger.Agi = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max Agility'] || 999);
	SOUL_MV.LimitationChanger.Luck = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max Luck'] || 999);
	SOUL_MV.LimitationChanger.FloorDamage = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Basic Floor Damage'] || 10);
	SOUL_MV.LimitationChanger.maxGold = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max Gold'] || 99999999);
	SOUL_MV.LimitationChanger.maxItems = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max Items'] || 99);
	SOUL_MV.LimitationChanger.tileWidth = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Tile Width'] || 48);
	SOUL_MV.LimitationChanger.tileHeight = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Tile Height'] || 48);
	SOUL_MV.LimitationChanger.maxPattern = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max Pattern'] || 4);
	SOUL_MV.LimitationChanger.searchLimit = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Search Limit'] || 12);
	SOUL_MV.LimitationChanger.altitude = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max Altitude'] || 48);
	SOUL_MV.LimitationChanger.fadeSpeed = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Fade Speed'] || 24);

	// WINDOWS
	SOUL_MV.LimitationChanger.itemListCols = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Item List Columns'] || 2);
	SOUL_MV.LimitationChanger.skillListCols = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Skill List Columns'] || 2);
	SOUL_MV.LimitationChanger.equipComListCols = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Equip Command Columns'] || 3);
	SOUL_MV.LimitationChanger.shopCommandCols = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Shop Command Colums'] || 3);
	SOUL_MV.LimitationChanger.equipLines = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max Equip Lines'] || 6);
	SOUL_MV.LimitationChanger.saveVisib = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max Save Visible'] || 5);
	SOUL_MV.LimitationChanger.maxdigi = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Shop Max Digits'] || 2);
	SOUL_MV.LimitationChanger.nameInput = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Name Input Columns'] || 10);
	SOUL_MV.LimitationChanger.nameinputLimit = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max Name Input Items'] || 90);
	SOUL_MV.LimitationChanger.battlelog = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Max Battle Log Lines'] || 10);
	SOUL_MV.LimitationChanger.battleenem = Number(PluginManager.parameters('SOUL_MV Limitation Changer')['Battle Enemy Columns'] || 2);


	// MANAGER
	DataManager.maxSavefiles = function() {
	    return SOUL_MV.LimitationChanger.maxSavefiles;
	};



	//OBJECTS
	Game_Action.prototype.applyCritical = function(damage) {
	    return damage * SOUL_MV.LimitationChanger.CriticalMultiplier;
	};	

	Game_BattlerBase.prototype.paramMax = function(paramId) {
	    if (paramId === 0) {
	        return SOUL_MV.LimitationChanger.MHP;  // MHP
	    } else if (paramId === 1) {
	        return SOUL_MV.LimitationChanger.MMP;    // MMP
	    } else if (paramId === 2) {
	        return SOUL_MV.LimitationChanger.Attack;    // Attack	
	    } else if (paramId === 3) {
	        return SOUL_MV.LimitationChanger.Defense;    // Def
	    } else if (paramId === 4) {
	        return SOUL_MV.LimitationChanger.Magic;    // Mag
	    } else if (paramId === 5) {
	        return SOUL_MV.LimitationChanger.Mdef;    // Mdef	     
	    } else if (paramId === 6) {
	        return SOUL_MV.LimitationChanger.Agi;    // Agility
	    } else if (paramId === 7) {
	        return SOUL_MV.LimitationChanger.Luck;    // Luck	 	        	 	           	        	                
	    } else {
	        return 999;
	    }
	};
	Game_Actor.prototype.paramMax = function(paramId) {
	    if (paramId === 0) {
	        return SOUL_MV.LimitationChanger.MHP;  // MHP
	    } else if (paramId === 1) {
	        return SOUL_MV.LimitationChanger.MMP;    // MMP
	    } else if (paramId === 2) {
	        return SOUL_MV.LimitationChanger.Attack;    // Attack	
	    } else if (paramId === 3) {
	        return SOUL_MV.LimitationChanger.Defense;    // Def
	    } else if (paramId === 4) {
	        return SOUL_MV.LimitationChanger.Magic;    // Mag
	    } else if (paramId === 5) {
	        return SOUL_MV.LimitationChanger.Mdef;    // Mdef	     
	    } else if (paramId === 6) {
	        return SOUL_MV.LimitationChanger.Agi;    // Agility
	    } else if (paramId === 7) {
	        return SOUL_MV.LimitationChanger.Luck;    // Luck	 	        	 	           	        	                
	    } else {
	        return 999;
	    }
	    return Game_Battler.prototype.paramMax.call(this, paramId);
	};	
	Game_Actor.prototype.basicFloorDamage = function() {
	    return SOUL_MV.LimitationChanger.FloorDamage;
	};	
	Game_Party.prototype.maxBattleMembers = function() {
	    return SOUL_MV.LimitationChanger.BattleMembers;
	};
	Game_Party.prototype.maxGold = function() {
	    return SOUL_MV.LimitationChanger.maxGold;
	};
	Game_Party.prototype.maxItems = function(item) {
	    return SOUL_MV.LimitationChanger.maxItems;
	};	
	Game_Map.prototype.tileWidth = function() {
	    return SOUL_MV.LimitationChanger.tileWidth;
	};

	Game_Map.prototype.tileHeight = function() {
	    return SOUL_MV.LimitationChanger.tileHeight;
	};
	Game_CharacterBase.prototype.maxPattern = function() {
	    return SOUL_MV.LimitationChanger.maxPattern;
	};	
	Game_Character.prototype.searchLimit = function() {
	    return SOUL_MV.LimitationChanger.searchLimit;
	};	
	Game_Vehicle.prototype.maxAltitude = function() {
	    return SOUL_MV.LimitationChanger.altitude;
	};
	Game_Interpreter.prototype.fadeSpeed = function() {
	    return SOUL_MV.LimitationChanger.fadeSpeed;
	};			

	// WINDOW

	Window_ItemList.prototype.maxCols = function() {
	    return SOUL_MV.LimitationChanger.itemListCols;
	};
	Window_SkillList.prototype.maxCols = function() {
	    return SOUL_MV.LimitationChanger.skillListCols;
	};
	Window_EquipCommand.prototype.maxCols = function() {
	    return SOUL_MV.LimitationChanger.equipComListCols;
	};
	Window_Status.prototype.maxEquipmentLines = function() {
	    return SOUL_MV.LimitationChanger.equipLines;
	};
	Window_SavefileList.prototype.maxVisibleItems = function() {
	    return SOUL_MV.LimitationChanger.saveVisib;
	};
	Window_ShopCommand.prototype.maxCols = function() {
	    return SOUL_MV.LimitationChanger.shopCommandCols;
	};
	Window_ShopNumber.prototype.maxDigits = function() {
	    return SOUL_MV.LimitationChanger.maxdigi;
	};	
	Window_NameInput.prototype.maxCols = function() {
	    return SOUL_MV.LimitationChanger.nameInput;
	};

	Window_NameInput.prototype.maxItems = function() {
	    return SOUL_MV.LimitationChanger.nameinputLimit;
	};	
	Window_BattleLog.prototype.maxLines = function() {
	    return SOUL_MV.LimitationChanger.battlelog;
	};	
	Window_BattleEnemy.prototype.maxCols = function() {
	    return SOUL_MV.LimitationChanger.battleenem;
	};	


})();