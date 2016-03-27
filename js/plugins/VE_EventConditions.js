/*
 * ==============================================================================
 * ** Victor Engine MV - Event Conditions
 * ------------------------------------------------------------------------------
 * Version History:
 *  v 1.00 - 2016.12.18 > First release.
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - Event Conditions'] = '1.00';

var VictorEngine = VictorEngine || {};
VictorEngine.EventConditions = VictorEngine.EventConditions || {};

(function() {

	VictorEngine.EventConditions.loadDatabase = DataManager.loadDatabase;
	DataManager.loadDatabase = function() {
		VictorEngine.EventConditions.loadDatabase.call(this);
		PluginManager.requiredPlugin.call(PluginManager, 'VE - Event Conditions', 'VE - Basic Module', '1.07');
	};

	VictorEngine.EventConditions.requiredPlugin = PluginManager.requiredPlugin;
	PluginManager.requiredPlugin = function(name, required, version) {
		if (!VictorEngine.BasicModule) {
			var msg = 'The plugin ' + name + ' requires the plugin ' + required;
			msg += ' v' + version + ' or higher installed to work properly.';
			msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
			throw new Error(msg);
		} else {
			VictorEngine.EventConditions.requiredPlugin.call(this, name, required, version)
		};
	};
	
})();

/*:
 * ------------------------------------------------------------------------------
 * @plugindesc v1.00 - Use script call on comments as event page conditions.
 * @author Victor Sant
 *
 * ------------------------------------------------------------------------------
 * @help 
 * ------------------------------------------------------------------------------
 * Event and Troop Comments:
 * ------------------------------------------------------------------------------
 *  
 * <event condition>
 *  result = code
 * </event condition>
 *   Setup a custom event page condition. The code can be any valid javascript
 *   code. 
 *
 * ------------------------------------------------------------------------------
 * Additional Information:
 * ------------------------------------------------------------------------------
 * 
 *  The normal pages conditions for events are still valid, in addition, you can
 *  use any valid script code as the condition for the page to start.
 *  The code should be a true/false statement. The 'result' must return a 
 *  true/false value. if you don't set a result, it will be as it was set false
 *  and the condition will be never met. 
 *  This plugin requires some javascript knowledge to be used to it's full
 *  potential.
 *
 * ------------------------------------------------------------------------------
 * Example Notetags:
 * ------------------------------------------------------------------------------
 *
 * <event condition>
 *  result = $gameSystem.battleCount() > 10
 * </event condition>
 *   Checking if the battle count is higher than 10
 *
 * ---------------
 *
 * <event condition>
 *  result = $gameSelfSwitches.value([this._mapId, 6, "A"])
 * </event condition>
 *   Checking a self switch on another event.
 *
 * ------------------------------------------------------------------------------
 */

(function() {
	
	//=============================================================================
	// VictorEngine
	//=============================================================================
	
	VictorEngine.EventConditions.getPageNotes = function(page) {
		if (!page || !page.list) return "";
		return page.list.reduce(function(r, cmd) {
			var valid   = (cmd.code === 108 || cmd.code === 408);
			var comment = valid ? cmd.parameters[0] + "\r\n" : "";
			return r + comment;
		}, "");
	};
	
	VictorEngine.EventConditions.getCustomCondition = function(page) {
		var note   = this.getPageNotes(page);
		var regex  = VictorEngine.getNotesValues('event condition');
		return regex.exec(note);
	};
	
	VictorEngine.EventConditions.hasCustomCondition = function(pages) {
		return pages.some(function(page){
			return this.getCustomCondition(page);
		}, this)
	};
	
	//=============================================================================
	// Game_Event
	//=============================================================================
	
	VictorEngine.EventConditions.refresh = Game_Event.prototype.refresh;
	Game_Event.prototype.refresh = function() {
		VictorEngine.EventConditions.refresh.call(this);
		this._hasCustomCondition = VictorEngine.EventConditions.hasCustomCondition(this.event().pages);
	};
	
	VictorEngine.EventConditions.update = Game_Event.prototype.update;
	Game_Event.prototype.update = function() {
		VictorEngine.EventConditions.update.call(this);
		if (this.needRefresh()) this.refresh();
	};
	
	VictorEngine.EventConditions.meetsConditionsGameEvent = Game_Event.prototype.meetsConditions;
	Game_Event.prototype.meetsConditions = function(page) {
		var result = VictorEngine.EventConditions.meetsConditionsGameEvent.call(this, page);
		if (!result) return false;
		return this.customConditionMet(page);
	};
	
	Game_Event.prototype.customConditionMet = function(page) {
		var result = false;
		var condition = VictorEngine.EventConditions.getCustomCondition(page);
		if (condition) eval(condition[1]);
		return result;
	};
	
	Game_Event.prototype.needRefresh = function() {
		if (!this._hasCustomCondition || Graphics.frameCount % 5 !== 0) return false;
		var newIndex = (this._erased) ? -1 : this.findProperPageIndex();
		return (newIndex  > 0 && newIndex !== this._pageIndex);
	};
	
	//=============================================================================
	// Game_Troop
	//=============================================================================
	
	VictorEngine.EventConditions.setup = Game_Troop.prototype.setup;
	Game_Troop.prototype.setup = function(troopId) {
		VictorEngine.EventConditions.setup.call(this, troopId);
		this._hasCustomCondition = VictorEngine.EventConditions.hasCustomCondition(this.troop().pages);
	};
	
	VictorEngine.EventConditions.meetsConditionsGameTroop = Game_Troop.prototype.meetsConditions;
	Game_Troop.prototype.meetsConditions = function(page) {
		var result = VictorEngine.EventConditions.meetsConditionsGameTroop.call(this, page);
		if (!result) return false;
		return this.customConditionMet(page);
	};
	
	Game_Troop.prototype.customConditionMet = function(page) {
		var result = false;
		var condition = VictorEngine.EventConditions.getCustomCondition(page);
		if (condition) eval(condition[1]);
		return result;
	};
	
})(); 
  
  
