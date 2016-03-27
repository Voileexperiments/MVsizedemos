//=============================================================================
// Ark_SaveEngine_VariablesWindow.js // version 1.0
//=============================================================================
/*:
 * @plugindesc A new window called VariablesBox that will show any info that you want with the help of a few $gameVaribles.
 * @author ArkDG // Version 1.0
 * 
 *
 * @help 
//============================================================================
// ** Terms of Use
// This plugin is free to use for both free and commercial games as long as
// I'm credited in your game as this plugin writer. ;)
// My name full name is Leonardo Misseno Justino.
//============================================================================
 
 Hello game developper friend, I think that you are here to learn more about 
 how do this plugin works and I'm here to help you with that. 
 It's not hard to understand it's mechanics, this is a very customizable
 and user friendly plugin, so let's go to what really matters here.
 
 // First: This plugin is an addon. It requires and must be plugged below the
 "Ark_SaveScreen.js" (Ark Save Engine) plugin 2.2 or higher.
 
 // >>>> Variables_Core: This is the most important parameter of this plugin.
 It creates an array with the data you register inside of it and use its data
 to do the magic you see on your game. To this plugin to work properly, you
 must follow these rules:

1. The first value must be 'y' for the plugin to work. If you want to
deactivate the plugin, just change it for any other value.

2. After the first value, things get a little more serious. The second and the
third values are dependent one of the other, as the fourth and the fifth ones,
etc. This means that if you set a value after the first comma, or the third
comma, and etc, you will have to set a number after it's own comma or the
plugin will break!

The right way to do this is:

[ y, Name Value, Variable Value, Name Value, Variable Value etc... ]

A Name Value must have its own Variable Value.

The sequence must always end with no comma!

Wrong = [ y, Name Value, Variable Value, Name Value, Variable Value, ]
Right = [ y, Name Value, Variable Value, Name Value, Variable Value ]

3. The Name Value can be anything that you want, but the Variable Value is
the $gameVariable number that you use to register the information you want
to show to the player! You can show either numbers or text, but due to
the RMMV limitations, if you want to register a text (or String) inside
a gameVariable, you will need to use this script call:

$gameVariables.setValue(Variable Number, 'Your text');

And never - I'm saying never - change this variable by the normal means
during the game. Unless you want to turn it into a number.

 // >>>> Variable_Icons: If the first value of this parameter is 'y', then
 there will be shown icons before your varibles texts. In this array the
 entrance of values are much more simple as they are sequentially organized.
 After the first comma, first variable icon; after the second comma, second
 varibale icon, etc...

 Icons have index numbers. You shall find the index number of the icon that
 you want to use inside the game database, clicking on the icon change button
 of an item.
 
 // >>>> Denied_Values and Denie_Zero:
 
 If you have a sequence of variables registered to be shown in the box,
 like this:
 
 [ y, Hearths Broken:, 1, Happyness Acquired:, 10, Problems Solved:, 12  ]
 
 (...) the gameVariables with lesser numbers will be automatically setted
 to "0", and the ones with higher numbers, if not setted, will be
 represented by "null" or "undefined":
 
 ======Box in Status Window=====
 Hearths Broken: 0 (remembering that I never setted a value to this before)
 Happyness Acquired: 3
 Problems Solved: undefined 
 ===============================
  
 To bypass this, This script automatically ignore and don't show a variable
 with "null" or "undefined" values. But if it is zero it'll be shown unless
 you determine it to not be.
 
 I made it possible with Denied_Values to register another words that you
 might want to use to hide the variable from the save status window. So,
 when I do this:

 //Denied_Values//
 [Hide, Deactive]
 
 Remembering, the gameVarible '12' is linked to "Problems Solved" Name Value,
 so if I call: 
 
 $gameVariables.setValue(12, 'Hide'); 
 
 or even
 
 $gameVariables.setValue(12, 'Deactive');

This will happen:

 ======Box in Status Window=====
 Hearths Broken: 0 (remembering that I never setted a value to this before)
 Happyness Acquired: 3
  
 ===============================
 
 And with Denie_Zero, setting its value to '0' (any number you put here will
 be denied, so don't register anything that aren't '0' or 'N') this will
 happen:
 
 ======Box in Status Window===== 
 Happyness Acquired: 3  
 ===============================
 
 // >>>> Setup_a_Title and Title_Icon
 
 You can type any value here, this will be your Variable Box title. But first
 you have to set the first value, before  the  first comma, to "y" to activate
 the title. The second value is the name that you want it to have: 
 
 //Setup_a_Title//
 [y, Your Title Here]
 
 And this will happen:
 
 ======Box in Status Window=====
 Your Title Here
 Happyness Acquired: 3  
 ===============================
 
 By default this parameter has its own icon activated, the "Title_Icon" value
 right below it in the list. You can deactivate the Title_Icon changing its
 first value to any other value diferent from "y".
 
 Icons have index numbers. You shall find the index number of the icon that
 you want to use inside the game database, clicking on the icon change button
 of an item.
 
 
 // >>>> BOX POSITIONING

 X and Y are the horizontal and vertical positions of your box. As I know
 many games can have diferent resolutions and window sizes, it is possible
 to move the Variable Box to wherever you want in your screen. ;)
 
 And this is it! If you have any ideas or suggestions to make, any problems
 to repport or doubts to solve, please send me an e-mail at leomjusto at
 hotmail dot com.
   
 Enjoy game developping! I wish you good lucky and success. ^^
*
* 
*
*@param --CORE FUNCTIONS--
*
*@param Variables_Core
*@desc 'y' activate this plugin. The next values must be always in this order: "Name", "Number". Consult the help section, pls!
*@default y, Example One:, 1, Example 02:, 2
*
*@param Variable_Icons
*@desc 'y' activate this function. Show icons beside of your variables. Consult the help button if you have any doubts.
*@default n, 210, 241
*
*@param Denied_Values
*@desc If a var is null or undefined it won't appear. If you want to deny other values, register them separated with commas.
*@default example_test, example_test2
*
*@param Deny_Zero
*@desc If a var wasn't set to any value, it can be setted to '0' by system default. To deny '0', set it to '0'. Default is 'N'.
*@default N
*
*@param Setup_a_Title
*@desc You can put a title above the variables. Set the first value to "y" to activate it, and the second is the name string.
*@default n, Example Title
*
*@param Title_Icon
*@desc 'y' activate this function. Show icons beside of your variable box title. Consult the help button if you have any doubts.
*@default y, 191
*
*@param Registering_Text
*@desc If you want to show a text inside a variable, use the script call above to register a Text inside a game variable.
*@default $gameVariables.setValue(Variable Number, 'Your text'); //No, it isn't a changeable option.
*
*@param Read_the_Help!
*@desc If you have any doubts on how this plugin works, do what I'm saying above. Thank you!
*@default Click on the "Help" button right above!
*
*@param --BOX POSITIONING--
*
*@param Position_X
*@desc The horizontal postion of the variables text box. Default is '0'.
*@default 310
*
*@param Position_Y
*@desc The vertical postion of the variables text box. Default is '300'.
*@default 431
*
*@param Outside_StatusWin
*@desc Setting this to 'y' makes the Variable Box to be shown outside of the StatusWin, to the right of the ListWin.
*@default N
*
*/

/////////////////////////////PARAMETERS///////////////////////////////////

var params = PluginManager.parameters('Ark_SaveEngine_VariablesWindow');

var ark_variables_box = params['Variables_Core'].split(',');
var ark_denied_values = params['Denied_Values'].split(',');
var ark_setup_title   = params['Setup_a_Title'].split(',');
var ark_deny_zero = Number(params['Deny_Zero'] || N);
var ark_varwin_X = Number(params['Position_X'] || 310);
var ark_varwin_Y = Number(params['Position_Y'] || 431);

var ark_var_title_icon   = params['Title_Icon'].split(',');
var ark_var_icons   = params['Variable_Icons'].split(',');
var ark_var_outside   = params['Outside_StatusWin'].split(',');

var ark_statusHeight = 0;

//////////////////////////////////////////////////////////////////////////

(function() {

/////////////////////////THE DATA////////////////////////////

if (Imported.ArkDG_SaveScreen){
var MakeVariablesInfo_for_var = DataManager.makeSavefileInfo;
	DataManager.makeSavefileInfo = function() {
	var info = MakeVariablesInfo_for_var.call(this);		
        
        var ark_show_variables = [];
        var var_Acounter = 0;
        var var_Agetting = 0;        
        do {var_Acounter = var_Acounter + 2;
            var_Agetting = Number(ark_variables_box[var_Acounter]);
            ark_show_variables.push($gameVariables.value(var_Agetting));
        } while (var_Acounter < ark_variables_box.length - 1);        
        info.ark_stored_variables = ark_show_variables;
        
		return info;
	}; 
}

/////////////////////////THE ALIAS////////////////////////////

if (Imported.ArkDG_SaveScreen && ark_variables_box[0] == 'y'){ 
    
   
      
     if (ark_var_outside == 'y') {
    Scene_File.prototype.createListWindow = function() {    
    var x = 0;
    var y = this._helpWindow.height;
    var width = (Graphics.boxWidth / 3) * 2;
    var height = Graphics.boxHeight - y;
    this._listWindow = new Window_SavefileList(x, y, width, height);
    this._listWindow.setHandler('ok',     this.onSavefileOk.bind(this));
    this._listWindow.setHandler('cancel', this.onSavefileNot.bind(this));
    this._listWindow.select(this.firstSavefileIndex());
    this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
    this._listWindow.setMode(this.mode());
    this._listWindow.refresh();
    this.addWindow(this._listWindow);
        ark_varwin_X = (Graphics.boxWidth / 3) * 2;
        ark_varwin_Y = this._helpWindow.height;
        ark_statusHeight =  this._listWindow.fittingHeight(ark_File_v_Status_Sizes);
};
    
     }

    
    
    
    var _alias_SceneFile_create_for_var = Scene_File.prototype.createListWindow;
	Scene_File.prototype.createListWindow = function() {
		_alias_SceneFile_create_for_var.call(this);        
        this.createVariableBox();        
	}; 
    
    Scene_File.prototype.createVariableBox = function() {
        var x = 0;
        var y = this._listWindow.y + this._listWindow.height;
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight - y;
        
        this._variablesWindow = new Window_Variables();        
        this._variablesWindow.setMode(this.mode());
        if (ark_var_outside != 'y') {this._variablesWindow.opacity = 0;} else {this._variablesWindow.opacity = 255;}
        this._listWindow.variablesWindow = this._variablesWindow;        
        this._listWindow.callUpdateHelp();                
        this._listWindow.refresh();   
        this.addChild(this._variablesWindow);
    };
        
    var _alias_to_Var_the_callUpdateHelp = Window_SavefileList.prototype.callUpdateHelp;
     Window_SavefileList.prototype.callUpdateHelp = function() {
        _alias_to_Var_the_callUpdateHelp.call(this);
        if (this.active && this.variablesWindow) {
            this.variablesWindow.setId(this.index() + 1);            
        }
    }; }

    
/////////////////////////THE WINDOW////////////////////////////

    function Window_Variables() {
        this.initialize.apply(this, arguments); }

    Window_Variables.prototype = Object.create(Window_Base.prototype);
    Window_Variables.prototype.constructor = Window_Variables;
    Window_Variables.prototype.initialize = function(x, y, width, height) {
         var x = ark_varwin_X;
		 if (ark_setup_title[0] == 'y' && ark_var_outside != 'y') {var y = ark_varwin_Y - this.lineHeight();} else {var y = ark_varwin_Y;}
         var width = this.windowWidth();
         var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._id = 1;
    };


Window_Variables.prototype.windowWidth = function() {
    if (ark_var_outside != 'y') {var width = Graphics.boxWidth;} else {var width = Graphics.boxWidth / 3;}
    
    
    return width; };

Window_Variables.prototype.windowHeight = function() {
    if (ark_var_outside != 'y') {var Height = this.fittingHeight((ark_variables_box.length - 1) / 2 + 1);
                                } else {var Height = ark_statusHeight;}
    return Height; };


    Window_Variables.prototype.setMode = function(mode) {
        this._mode = mode; };

    Window_Variables.prototype.setId = function(id) {         
        this._id = id;
        this.refresh();  };

Window_Variables.prototype.refresh = function() {    
        this.contents.clear();
        var id = this._id;
        var valid = DataManager.isThisGameFile(id);
        var info = DataManager.loadSavefileInfo(id);
        var rect = this.contents.rect;
    
    if (info && info.ark_stored_variables) {
    var ark_var_length = ark_variables_box.length - 1;   
    var ark_create_vartext = 0;
    var ark_text_Y = 0;
    var ark_varcounter = 0;
    var ark_var_check = undefined;
    var ark_icon_x_add = 0;    
        
        if (ark_setup_title[0] == 'y') {            
            if (ark_var_title_icon[0] == 'y' && ark_var_title_icon[1] != undefined && ark_var_title_icon[1] != null){
                ark_icon_x_add = 20;
            this.drawIcon(ark_var_title_icon[1], 0, ark_text_Y + 1); } 
            this.drawText(ark_setup_title[1], ark_icon_x_add, ark_text_Y, this.windowWidth());
                ark_text_Y = ark_text_Y + this.lineHeight();
        }

        do { ark_create_vartext = ark_create_vartext + 2;            
             ark_var_check = info.ark_stored_variables[ark_varcounter];
if (ark_var_check != undefined && ark_var_check != null && !ark_denied_values.contains(ark_var_check) && ark_var_check != ark_deny_zero){ 
    
    
    if (ark_var_icons[0] == 'y'){ ark_icon_x_add = 20;
    if (ark_var_icons[ark_varcounter + 1] != undefined || ark_var_icons[ark_varcounter + 1] != null) {
            this.drawIcon(ark_var_icons[ark_varcounter + 1], 0, ark_text_Y + 1); } }
    
    
    
    this.drawText(ark_variables_box[ark_create_vartext - 1] + ' ' + ark_var_check, ark_icon_x_add, ark_text_Y, this.windowWidth() -65, 'left');
  ark_text_Y = ark_text_Y + this.lineHeight(); }
            ark_varcounter++; } while (ark_create_vartext < ark_var_length); 
    }    
};
    
    
})();
     