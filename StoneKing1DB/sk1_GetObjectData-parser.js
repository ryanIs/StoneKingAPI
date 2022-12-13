/**
 * GetObjectData-parser.js
 * 
 * Since ActionScript 2 is so similar to JavaScript, I made a few adjustments to the factory function.
 * Now we are able to use Node to export this data as a consumable resource by our SQL server.
 */

// Our object data which will contains all the SK1 game object data as a consumable array.
var myObjectData;

// JSON objects which will be used to generate SQL tables & models.
var ability = [] // objects that will be placed in the Ability data model.
var npc = []     //  objects that will be placed in the NPC data model.
var quest = []   //  objects that will be placed in the Quest data model.
var item = []    //  objects that will be placed in the Item data model.

// AS2 Stone King globals
// _fps controls the current frame rate.
var _fps = 40;

/**
 * Returns a Loot object easy to export to MSSQL server.
 * 
 * @param {string} lootName - The item name for the loot.
 * @param {number} lootChance - The percent changes to obtain the loot.
 * @returns {object} The LootObject
 */
var Loot = function(lootName, lootChance) { return {lootName, lootChance} }

/**
 * Displays a string of what the random range will be (as calculated on run-time by game.)
 * 
 * @param {number} randomNumber - The maximum the random number may be.
 * @returns {string} The resulting paraphrase of randomness (range).
 */
var random = function( randomNumber ) { return `+random${randomNumber}`} // Parse output as string to display what the game will do.

/**
 * Get properties from an object. This object could be structured as many different things
 * such as items, spells, abilities, quests, etc.
 * 
 * This function was parsed to JavaScript from ActionScript 2 for use in our SQL database.
 * 
 * @param {string} object The Stone King 1 object type string.
 * @param {string} objectVariable (DEPRECATED) The specific property from the object you want to retreive from object.
 * @returns {object} The resulting Stone King 1 data object.
 */
function getObjectData(object, objectVariable) {
	var O = {};
	var objectData;
	// if (!Debug) {
	if (object == "DEFAULT") {
		O.NPCArray = ["dummy", 10, 1, 1, 2, 2, 2, 2, 2, 2, 2, "Dummy", [0, 0], 0, 0.00];
		//[instance name, maxhp, level, exp, strength, focus, evasion, endurance, stamina, damage, defense, name, loot, gold, fleeChance(%)]
		O.strength = 0; // How high damage can hit.
		O.focus = 0; // How high, and accurate spells hit / are.
		O.evasion = 0; // Frequency attacks will miss.
		O.endurance = 0; // Maximum health, and some defence against melee and ranged attacks
		O.stamina = 0; // Maximum energy, and some defence against spells.
		O.damage = 0; // Lowest possible damage that can be dealt
		O.defence = 0; // How much damage will be reduced
		O.N = ""; // Name
		O.D = ""; // Description of the item. Form: Item description ( stat bonuses seperated by a comma )
		O.S = undefined; // Equip slot
		O.U = undefined; // Object use
		O.sack = undefined; // Bag slots (for sacks)
		O.Rlevel = undefined; // Required level to use/equip item
		O.cost = undefined; // Cost
		O.steps = ["No Quest Guides"]; // Quest guide
		O.complete = false; // Quest complete.
	}
	else if(object == "messageToTheKing") {
		O.N = "Urgent Message";
		O.D = "A message recieved from Warlock for the King, Priscus.";
		O.Rlevel = 1;
		O.cost = -1;
		return ( O );
	}
	// Fishs
	else if ( object == "fish_0" )
	{
		O.N = "Tuna";
		O.D = "It's Raw Tuna! I should cook this. ( Ck Lvl: 1 )"
		O.Rlevel = 1;
		O.fishTime = _fps;
		O.fishExp = 2
		return ( O );
	}
	else if ( object == "fish_1" )
	{
		O.N = "Lobster";
		O.D = "It's Raw Lobster! I should cook this. ( Ck Lvl: 10 )"
		O.Rlevel = 10;
		O.fishTime = _fps * 2;
		O.fishExp = 5;
		return ( O );
	}
	else if ( object == "fish_2" )
	{
		O.N = "Eel";
		O.D = "It's Raw Eel! I should cook this. ( Ck Lvl: 20 )"
		O.Rlevel = 20;
		O.fishTime = _fps * 4;
		O.fishExp = 5;
		return ( O );
	}
	else if ( object == "fish_3" )
	{
		O.N = "Dolphin";
		O.D = "It's Raw Dolphin! I should cook this. ( Ck Lvl: 30 )"
		O.Rlevel = 30;
		O.fishTime = _fps * 7;
		O.fishExp = 8;
		return ( O );
	}
	else if ( object == "fish_4" )
	{
		O.N = "Alligator";
		O.D = "It's Raw Alligator! I should cook this. ( Ck Lvl: 40 )"
		O.Rlevel = 40;
		O.fishTime = _fps * 12;
		O.fishExp = 12;
		return ( O );
	}
	else if ( object == "fish_5" )
	{
		O.N = "Octopus";
		O.D = "It's Raw Octopus! I should cook this. ( Ck Lvl: 50 )"
		O.Rlevel = 50;
		O.fishTime = _fps * 16;
		O.fishExp = 20;
		return ( O );
	}
	else if ( object == "fish_6" )
	{
		O.N = "Whale";
		O.D = "It's Raw Whale! I should cook this. ( Ck Lvl: 60 )"
		O.Rlevel = 60;
		O.fishTime = _fps * 20;
		O.fishExp = 25;
		return ( O );
	}
	else if ( object == "fish_7" )
	{
		O.N = "Shark";
		O.D = "It's Raw Shark! I should cook this. ( Ck Lvl: 70 )"
		O.Rlevel = 70;
		O.fishTime = _fps * 25;
		O.fishExp = 30;
		return ( O );
	}
	else if ( object == "fish_8" )
	{
		O.N = "Kraken";
		O.D = "It's Raw Kraken! I should cook this. ( Ck Lvl: 80 )"
		O.Rlevel = 80;
		O.fishTime = _fps * 60;
		O.fishExp = 40;
		return ( O );
	}
	// Orbs
	else if ( object == "orb_none" )
	{
		O.N = "No orb";
		O.D = "";
		O.C = "";
		return ( O );
	}
	else if ( object == "orb_oil" )
	{
		O.N = "Orb of Oil";
		O.D = "Add a fire type to your attack. ( Lvl: 1, Slot: Or )";
		O.C = "";
		O.S = "spellOrb";
		O.activatedMessage = "Orb of Oil Activated";
		O.cost = 250;
		O.Rlevel = 1;
		return ( O );
	}
	else if ( object == "orb_flood" )
	{
		O.N = "Orb of the Flood";
		O.D = "Add a water type to your attack. ( Lvl: 1, Slot: Or )";
		O.C = "";
		O.S = "spellOrb";
		O.activatedMessage = "Orb of the Flood Activated";
		O.cost = 250;
		O.Rlevel = 1;
		return ( O );
	}
	else if ( object == "orb_rock" )
	{
		O.N = "Orb of Rock";
		O.D = "Add a rock type to your attack. ( Lvl: 1, Slot: Or )";
		O.C = "";
		O.S = "spellOrb";
		O.activatedMessage = "Orb of Rock Activated";
		O.cost = 250;
		O.Rlevel = 1;
		return ( O );
	}
	else if ( object == "orb_grass" )
	{
		O.N = "Orb of Grass";
		O.D = "Add a grass type to your attack. ( Lvl: 1, Slot: Or )";
		O.C = "";
		O.S = "spellOrb";
		O.activatedMessage = "Orb of Grass Activated";
		O.cost = 250;
		O.Rlevel = 1;
		return ( O );
	}
	else if ( object == "orb_gust" )
	{
		O.N = "Orb of gust";
		O.D = "Add a wind type to your attack ( Lvl: 1, Slot: Or )";
		O.C = "";
		O.S = "spellOrb";
		O.activatedMessage = "Orb of Gust Activated";
		O.cost = 250;
		O.Rlevel = 1;
		return ( O );
	}
	// Spells
	else if( object == "spell_fire" )
	{
		O.inBattle = true;
		O.N = "Fire";
		O.D = "This spell will cause the enemy to burn. ( Lvl: 1, Typ: Fire, Eng: 2, Dmg: 1 )";
		O.C = "[ A ] [ D ] [ A ]";
		O.damage = 1;
		O.spellSpecial = ["magic", "fire"];
		O.combo = "A,D,A";
		O.comboTime = _fps * 7;
		O.castAnimation = "castPush";
		O.spellType = "fire";
		O.Renergy = 2;
		O.Rlevel = 1;
		O.cost = 50;
		return ( O ); // This is the weirdest thing: With only spell fire, it doesn't return a value. So i must put this here.
	}
	else if( object == "spell_greaterFire" )
	{
		O.inBattle = true;
		O.N = "Greater Fire";
		O.D = "This spell will burn the enemy a lot. ( Lvl: 5, Typ: Fire, Eng: 5, Dmg: 6 )";
		O.C = "[ A ] [ D ] [ W ] [ S ] [ D ] [ A ]";
		O.damage = 6;
		O.spellSpecial = ["magic", "fire"];
		O.combo = "A,D,W,S,D,A";
		O.comboTime = _fps * 5;
		O.castAnimation = "castPush";
		O.spellType = "fire";
		O.Renergy = 5;
		O.Rlevel = 5;
		O.cost = 250;
		return ( O );
	}
	else if( object == "spell_omegaFire" )
	{
		O.inBattle = true;
		O.N = "Omega Fire";
		O.D = "This spell will inflict an enourmous amount of fire damage upon your foe. ( Lvl: 10, Typ: Fire, Eng: 11, Dmg: 11 )";
		O.C = "[ A ] [ D ] [ S ] [ D ] [ A ] [ D ] [ W ] [ S ] [ S ]";
		O.damage = 11;
		O.spellSpecial = ["magic", "fire"];
		O.combo = "A,D,S,D,A,D,W,S,S";
		O.comboTime = _fps * 4;
		O.castAnimation = "castPush";
		O.spellType = "fire";
		O.Renergy = 11;
		O.Rlevel = 10;
		O.cost = 500;
		return ( O );
	}
	else if( object == "spell_ultimateFire" )
	{
		O.inBattle = true;
		O.N = "Ultimate Fire";
		O.D = "This fully enhanced spell will deal massive fire damage to your opponenet. ( Lvl: 15, Typ: Fire, Eng: 23, Dmg: 19 )";
		O.C = "[ A ] [ D ] [ A ] [ S ] [ W ] [ D ] [ W ] [ A ] [ W ] [ S ] [ A ] [ D ]";
		O.damage = 19;
		O.spellSpecial = ["magic", "fire"];
		O.combo = "A,D,A,S,W,D,W,A,W,S,A,D";
		O.comboTime = _fps * 5;
		O.castAnimation = "castPush";
		O.spellType = "fire";
		O.Renergy = 23;
		O.Rlevel = 15;
		O.cost = 1000;
		return ( O ); 
	}
	else if( object == "spell_grass" )
	{
		O.inBattle = true;
		O.N = "Grass";
		O.D = "This spell will barrage the enemy with grass. ( Lvl: 7, Typ: Grass, Eng: 10, Dmg: 9 )";
		O.C = "[ A ] [ S ] [ D ] [ S ] [ A ] [ S ] [ D ] [ S ] [ A ]";
		O.damage = 9;
		O.spellSpecial = ["magic", "grass"];
		O.combo = "A,S,D,S,A,S,D,S,A";
		O.comboTime = _fps * 4;
		O.castAnimation = "castPush";
		O.spellType = "grass";
		O.Renergy = 10;
		O.Rlevel = 7;
		O.cost = 500;
		return ( O );
	}
	else if( object == "spell_greaterGrass" )
	{
		O.inBattle = true;
		O.N = "Greater Grass";
		O.D = "This spell will slice the enemy with thin grass. ( Lvl: 15, Typ: Grass, Eng: 23, Dmg: 18 )";
		O.C = "[ A ] [ S ] [ W ] [ W ] [ S ] [ W ] [ D ] [ A ] [ S ] [ D ] [ A ] [ S ]";
		O.damage = 18;
		O.spellSpecial = ["magic", "grass"];
		O.combo = "A,S,W,W,S,W,D,A,S,D,A,S";
		O.comboTime = _fps * 4;
		O.castAnimation = "castPush";
		O.spellType = "grass";
		O.Renergy = 23;
		O.Rlevel = 15;
		O.cost = 2000;
		return ( O ); 
	}
	else if( object == "spell_omegaGrass" )
	{
		O.inBattle = true;
		O.N = "Omega Grass";
		O.D = "This spell will violently cut your foe with large blades of grass. ( Lvl: 24, Typ: Grass, Eng: 33, Dmg: 28 )";
		O.C = "[ A ] [ S ] [ D ] [ D ] [ A ] [ S ] [ W ] [ W ] [ A ] [ S ] [ D ] [ D ] [ W ] [ S ]";
		O.damage = 28;
		O.spellSpecial = ["magic", "grass"];
		O.combo = "A,S,D,D,D,A,S,W,W,A,S,D,D,W,S";
		O.comboTime = _fps * 4;
		O.castAnimation = "castPush";
		O.spellType = "grass";
		O.Renergy = 33;
		O.Rlevel = 24;
		O.cost = 3000;
		return ( O ); 
	}
	else if( object == "spell_ultimateGrass" )
	{
		O.inBattle = true;
		O.N = "Ultimate Grass";
		O.D = "This fully enhanced spell will cut through the limbs of your opponent with sharp grass. ( Lvl: 33, Typ: Grass, Eng: 50, Dmg: 50 )";
		O.C = "[ A ] [ S ] [ A ] [ W ] [ S ] [ D ] [ W ] [ A ] [ D ] [ S ] [ S ] [ W ] [ D ] [ A ] [ S ] [ S ]";
		O.damage = 50;
		O.spellSpecial = ["magic", "grass"];
		O.combo = "A,S,A,W,S,D,W,A,D,S,S,W,D,A,S,S";
		O.comboTime = _fps * 4;
		O.castAnimation = "castPush";
		O.spellType = "grass";
		O.Renergy = 50;
		O.Rlevel = 33;
		O.cost = 3000;
		return ( O ); 
	}
	else if ( object == "spell_water" )
	{
		O.inBattle = true;
		O.damage = 3;
		O.spellSpecial = ["magic", "water"];
		O.N = "Water";
		O.D = "This spell will douse the enemy with water. ( Lvl: 2, Typ: Water, Eng: 4, Dmg: 3 )";
		O.C = "[ S ] [ W ] [ D ] [ D ]";
		O.combo = "S,W,D,D";
		O.comboTime = _fps * 5;
		O.castAnimation = "castPush";
		O.spellType = "water";
		O.Rlevel = 2;
		O.Renergy = 4;
		O.cost = 75;
		return ( O );
	}
	else if ( object == "spell_greaterWater" )
	{
		O.inBattle = true;
		O.damage = 9;
		O.spellSpecial = ["magic", "water"];
		O.N = "Greater Water";
		O.D = "This spell will douse the enemy with a lot of water quickly. ( Lvl: 8, Typ: Water, Eng: 9, Dmg: 9 )";
		O.C = "[ S ] [ W ] [ S ] [ A ] [ D ] [ S ] [ W ]";
		O.combo = "S,W,S,A,D,S,W";
		O.comboTime = _fps * 5;
		O.castAnimation = "castPush";
		O.spellType = "water";
		O.Rlevel = 9;
		O.Renergy = 9;
		O.cost = 350;
		return ( O );
	}
	else if ( object == "spell_omegaWater" )
	{
		O.inBattle = true;
		O.damage = 15;
		O.spellSpecial = ["magic", "water"];
		O.N = "Omega Water";
		O.D = "This spell will barrage the enemy with millions of gallons of water. ( Lvl: 17, Typ: Water, Eng: 18, Dmg: 15 )";
		O.C = "[ S ] [ W ] [ W ] [ S ] [ W ] [ D ] [ A ] [ S ] [ D ] [ A ]";
		O.combo = "S,W,W,S,W,D,A,S,D,A";
		O.comboTime = _fps * 4;
		O.castAnimation = "castPush";
		O.spellType = "water";
		O.Rlevel = 17;
		O.Renergy = 18;
		O.cost = 1000;
		return ( O );
	}
	else if ( object == "spell_ultimateWater" )
	{
		O.inBattle = true;
		O.damage = 29;
		O.spellSpecial = ["magic", "water"];
		O.N = "Ultimate Water";
		O.D = "This fully enhanced spell will shoot thin slits of water, fast enough to cut holes into your enemy. ( Lvl: 24, Typ: Water, Eng: 25, Dmg: 29 )";
		O.C = "[ S ] [ W ] [ D ] [ W ] [ D ] [ A ] [ S ] [ W ] [ D ] [ S ] [ D ] [ W ] [ S ]";
		O.combo = "S,W,D,W,D,A,S,W,D,S,D,W,S";
		O.comboTime = Math.round ( _fps * 3.5 );
		O.castAnimation = "castPush";
		O.spellType = "water";
		O.Rlevel = 24;
		O.Renergy = 25;
		O.cost = 2500;
		return ( O );
	}
	else if ( object == "spell_rock" )
	{
		O.inBattle = true;
		O.damage = 5;
		O.spellSpecial = ["magic", "earth"];
		O.N = "Rock";
		O.D = "This spell will hurtle rocks at your enemy.  ( Lvl: 3, Typ: Earth, Eng: 4, Dmg: 5 )";
		O.C = "[ W ] [ D ] [ A ] [ S ] [ W ]";
		O.combo = "W,D,A,S,W";
		O.comboTime = _fps * 4;
		O.castAnimation = "castPush";
		O.spellType = "earth";
		O.Rlevel = 3;
		O.Renergy = 4;
		O.cost = 150;
		return ( O );
	}
	else if ( object == "spell_greaterRock" )
	{
		O.inBattle = true;
		O.damage = 12;
		O.spellSpecial = ["magic", "earth"];

		O.N = "Greater Rock";
		O.D = "This spell will hurtle sharp rocks at your enemy.  ( Lvl: 11, Typ: Earth, Eng: 15, Dmg: 12 )";
		O.C = "[ W ] [ D ] [ A ] [ W ] [ W ] [ D ] [ S ] [ A ]";
		O.combo = "W,D,A,W,W,D,S,A";
		O.comboTime = _fps * 3;
		O.castAnimation = "castPush";
		O.spellType = "earth";
		O.Rlevel = 11;
		O.Renergy = 15;
		O.cost = 500;
		return ( O );
	}
	else if ( object == "spell_omegaRock" )
	{
		O.inBattle = true;
		O.damage = 24;
		O.spellSpecial = ["magic", "earth"];
		O.N = "Omega Rock";
		O.D = "This spell will hurtle sharp magma rocks at your enemy.  ( Lvl: 20, Typ: Earth, Eng: 28, Dmg: 24 )";
		O.C = "[ W ] [ D ] [ D ] [ A ] [ W ] [ D ] [ W ] [ S ] [ A ] [ A ] [ S ]";
		O.combo = "W,D,D,A,W,D,W,S,A,A,S";
		O.comboTime = _fps * 4;
		O.castAnimation = "castPush";
		O.spellType = "earth";
		O.Rlevel = 20;
		O.Renergy = 28;
		O.cost = 2400;
		return ( O );
	}
	else if ( object == "spell_ultimateRock" )
	{
		O.inBattle = true;
		O.damage = 39;
		O.spellSpecial = ["magic", "earth"];
		O.N = "Ultimate Rock";
		O.D = "This fully enhanced spell will launch rocks of massive size at your enemy with scary speeds.  ( Lvl: 30, Typ: Earth, Eng: 41, Dmg: 39 )";
		O.C = "[ W ] [ D ] [ S ] [ W ] [ D ] [ A ] [ A ] [ S ] [ D ] [ W ] [ D ] [ W ] [ D ] [ A ]";
		O.combo = "W,D,S,W,D,A,A,S,D,W,D,W,D,A";
		O.comboTime = _fps * 4;
		O.castAnimation = "castPush";
		O.spellType = "earth";
		O.Rlevel = 30;
		O.Renergy = 41;
		O.cost = 2400;
		return ( O );
	}
	else if ( object == "spell_wind" )
	{
		O.inBattle = true;
		O.damage = 7;
		O.spellSpecial = ["magic", "wind"];
		O.N = "Wind";
		O.D = "This spell will blast your enemy with wind.  ( Lvl: 6, Typ: Wind, Eng: 7, Dmg: 7 )";
		O.C = "[ D ] [ W ] [ D ] [ A ] [ A ] [ A ]";
		O.combo = "D,W,D,A,A,A";
		O.comboTime = _fps * 6;
		O.castAnimation = "castPush";
		O.spellType = "wind";
		O.Rlevel = 6;
		O.Renergy = 7;
		O.cost = 400;
		return ( O );
	}
	else if ( object == "spell_greaterWind" )
	{
		O.inBattle = true;
		O.damage = 16;
		O.spellSpecial = ["magic", "wind"];
		O.N = "Greater Wind";
		O.D = "This spell will blast your enemy with violent wind.  ( Lvl: 15, Typ: Wind, Eng: 19, Dmg: 16 )";
		O.C = "[ D ] [ W ] [ A ] [ A ] [ D ] [ W ] [ S ] [ S ] [ D ]";
		O.combo = "D,W,A,A,D,W,S,S,D";
		O.comboTime = _fps * 5;
		O.castAnimation = "castPush";
		O.spellType = "wind";
		O.Rlevel = 15;
		O.Renergy = 19;
		O.cost = 1000;
		return ( O );
	}
	else if ( object == "spell_omegaWind" )
	{
		O.inBattle = true;
		O.damage = 25;
		O.spellSpecial = ["magic", "wind"];
		O.N = "Omega Wind";
		O.D = "This spell will barrage your enemy with extreamly violent wind.  ( Lvl: 24, Typ: Wind, Eng: 28, Dmg: 25 )";
		O.C = "[ D ] [ W ] [ A ] [ W ] [ W ] [ A ] [ A ] [ A ] [ W ] [ D ] [ S ] [ A ]";
		O.combo = "D,W,A,W,W,A,A,A,W,D,S,A";
		O.comboTime = _fps * 4;
		O.castAnimation = "castPush";
		O.spellType = "wind";
		O.Rlevel = 24;
		O.Renergy = 28;
		O.cost = 2500;
		return ( O );
	}
	else if ( object == "spell_ultimateWind" )
	{
		O.inBattle = true;
		O.damage = 46;
		O.spellSpecial = ["magic", "wind"];
		O.N = "Ultimate Wind";
		O.D = "This fully enhanced spell will shoot winds fast enough to slice through your enemy.  ( Lvl: 36, Typ: Wind, Eng: 28, Dmg: 46 )";
		O.C = "[ D ] [ W ] [ A ] [ S ] [ W ] [ D ] [ D ] [ A ] [ S ] [ D ] [ W ] [ S ] [ D ] [ A ] [ W ]";
		O.combo = "D,W,A,S,W,D,D,A,S,D,W,S,D,A,W";
		O.comboTime = _fps * 4;
		O.castAnimation = "castPush";
		O.spellType = "wind";
		O.Rlevel = 36;
		O.Renergy = 28;
		O.cost = 2500;
		return ( O );
	}
	else if ( object == "spell_heal" )
	{
		O.inBattle = false;
		O.spellSpecial = ["magic", "normal"];
		O.N = "Heal";
		O.D = "This spell will heal you.  ( Lvl: 5, Typ: Normal, Eng: 7, Heal: 5 - 25 )";
		O.C = "[ A ] [ A ] [ D ] [ W ] [ S ] [ W ] [ D ]";
		O.healFunction = function ( )
		{
			var gainedAmount = 5 + random ( 21 );
			if(health + gainedAmount > maxHealth)
			gainedAmount = maxHealth - health;
			boostStat("health", gainedAmount, "You heal "+gainedAmount+" health.");
			if ( inBattle ) 
			splash ( field.pro._x, field.pro._y - ( field.pro._height / 2 ), "hp", "none", "none", gainedAmount.toString ( ) );
			playSound ( "SFX_Heal", 0, 1 );
			return;
		};
		O.combo = "A,A,D,W,S,W,D";
		O.comboTime = _fps * 5;
		O.castAnimation = "castHeal";
		O.spellType = "normal";
		O.Rlevel = 5;
		O.Renergy = 7;
		O.cost = 300;
		return ( O );
	}
	else if ( object == "spell_greaterHeal" )
	{
		O.inBattle = false;
		O.spellSpecial = ["magic", "normal"];
		O.N = "Greater Heal";
		O.D = "This spell will heal you well.  ( Lvl: 15, Typ: Normal, Eng: 20, Heal: 15 - 100 )";
		O.C = "[ A ] [ A ] [ S ] [ D ] [ S ] [ D ] [ W ] [ A ] [ S ] [ D ]";
		O.healFunction = function ( )
		{
			var gainedAmount = 15 + random ( 86 );
			if(health + gainedAmount > maxHealth)
			gainedAmount = maxHealth - health;
			boostStat("health", gainedAmount, "You heal "+gainedAmount+" health.");
			if ( inBattle ) 
			splash ( field.pro._x, field.pro._y - ( field.pro._height / 2 ), "hp", "none", "none", gainedAmount.toString ( ) );
			playSound ( "SFX_Heal", 0, 1 );
			return;
		};
		O.combo = "A,A,S,D,S,D,W,A,S,D";
		O.comboTime = _fps * 5;
		O.castAnimation = "castHeal";
		O.spellType = "normal";
		O.Rlevel = 15;
		O.Renergy = 20;
		O.cost = 1000;
		return ( O );
	}
	else if ( object == "spell_omegaHeal" )
	{
		O.inBattle = false;
		O.spellSpecial = ["magic", "normal"];
		O.N = "Omega Heal";
		O.D = "This spell will heal you very well.  ( Lvl: 25, Typ: Normal, Eng: 30, Heal: 50 - 200 )";
		O.C = "[ A ] [ A ] [ W ] [ S ] [ D ] [ A ] [ S ] [ S ] [ D ] [ A ] [ W ] [ W ] [ A ]";
		O.healFunction = function ( )
		{
			var gainedAmount = 50 + random ( 151 );
			if(health + gainedAmount > maxHealth)
			gainedAmount = maxHealth - health;
			boostStat("health", gainedAmount, "You heal "+gainedAmount+" health.");
			if ( inBattle ) 
			splash ( field.pro._x, field.pro._y - ( field.pro._height / 2 ), "hp", "none", "none", gainedAmount.toString ( ) );
			playSound ( "SFX_Heal", 0, 1 );
			return;
		};
		O.combo = "A,A,W,S,D,A,S,S,D,A,W,W,A";
		O.comboTime = _fps * 5;
		O.castAnimation = "castHeal";
		O.spellType = "normal";
		O.Rlevel = 25;
		O.Renergy = 30;
		O.cost = 3000;
		return ( O );
	}
	else if ( object == "spell_ultimateHeal" )
	{
		O.inBattle = false;
		O.spellSpecial = ["magic", "normal"];
		O.N = "Ultimate Heal";
		O.D = "This fully enhanced spell will heal you extreamly well.  ( Lvl: 38, Typ: Normal, Eng: 60, Heal: 125 - 300 )";
		O.C = "[ A ] [ A ] [ W ] [ S ] [ S ] [ D ] [ W ] [ A ] [ D ] [ A ] [ S ] [ W ] [ S ] [ D ] [ A ] [ S ]";
		O.healFunction = function ( )
		{
			var gainedAmount = 125 + random ( 301 );
			if(health + gainedAmount > maxHealth)
			gainedAmount = maxHealth - health;
			boostStat("health", gainedAmount, "You heal "+gainedAmount+" health.");
			if ( inBattle ) 
			splash ( field.pro._x, field.pro._y - ( field.pro._height / 2 ), "hp", "none", "none", gainedAmount.toString ( ) );
			playSound ( "SFX_Heal", 0, 1 );
			return;
		};
		O.combo = "A,A,W,S,S,D,W,A,D,A,S,W,S,D,A,S";
		O.comboTime = _fps * 5;
		O.castAnimation = "castHeal";
		O.spellType = "normal";
		O.Rlevel = 38;
		O.Renergy = 60;
		O.cost = 5000;
		return ( O );
	}
	// Abilities
	else if ( object == "ability_smash" )
	{
		O.inBattle = true;
		O.damage = 2;
		O.spellSpecial = ["melee", "none", "strength_4"];
		O.N = "Smash";
		O.D = "This ability will smash your opponent with your weapon. ( Lvl: 2, Typ: Normal, Eng: 4, Dmg: 2, Spe: +4 Str )";
		O.C = "[ X ] [ A ] [ W ] [ D ]";
		O.combo = "X,A,W,D";
		O.comboTime = _fps * 6;
		O.castAnimation = "focSmash";
		O.spellType = "normal";
		O.Rlevel = 2;
		O.Renergy = 4;
		O.cost = 75;

		return ( O );
	}
	else if ( object == "ability_greaterSmash" )
	{
		O.inBattle = true;
		O.damage = 10;
		O.spellSpecial = ["melee", "none", "strength_7"];
		O.N = "Greater Smash";
		O.D = "This ability will violently smash your opponent with your weapon. ( Lvl: 9, Typ: Normal, Eng: 12, Dmg: 10, Spe: +7 Str )";
		O.C = "[ X ] [ A ] [ D ] [ X ] [ D ] [ A ] [ W ] [ S ] [ S ]";
		O.combo = "X,A,D,X,D,A,W,S,S";
		O.comboTime = _fps * 6;
		O.castAnimation = "focSmash";
		O.spellType = "normal";
		O.Rlevel = 9;
		O.Renergy = 12;
		O.cost = 550;
		return ( O );
	}
	else if ( object == "ability_omegaSmash" )
	{
		O.inBattle = true;
		O.damage = 20;
		O.spellSpecial = ["melee", "none", "strength_15"];
		O.N = "Omega Smash";
		O.D = "This ability will violently, and accurately smash your opponent with your weapon. ( Lvl: 18, Typ: Normal, Eng: 20, Dmg: 20, Spe: +15 Str )";
		O.C = "[ X ] [ A ] [ A ] [ W ] [ S ] [ D ] [ D ] [ S ] [ A ] [ X ] [ S ] [ A ] [ A ] [ W ]";
		O.combo = "X,A,A,W,S,D,D,S,A,X,S,A,A,W";
		O.comboTime = _fps * 5;
		O.castAnimation = "focSmash";
		O.spellType = "normal";
		O.Rlevel = 18;
		O.Renergy = 20;
		O.cost = 1000;
		return ( O );
	}
	else if ( object == "ability_ultimateSmash" )
	{
		O.inBattle = true;
		O.damage = 35;
		O.spellSpecial = ["melee", "none", "strength_30"];
		O.N = "Ultimate Smash";
		O.D = "This fully enhanced ability will violently, accurately, smash your opponent with your enhanced weapon. ( Lvl: 30, Typ: Normal, Eng: 30, Dmg: 35, Spe: +30 Str )";
		O.C = "[ X ] [ A ] [ D ] [ W ] [ A ] [ X ] [ X ] [ A ] [ S ] [ D ] [ X ] [ W ] [ X ] [ X ] [ A ] [ S ] ";
		O.combo = "X,A,D,W,A,X,X,A,S,D,X,W,X,X,A,S";
		O.comboTime = _fps * 5;
		O.castAnimation = "focSmash";
		O.spellType = "normal";
		O.Rlevel = 30;
		O.Renergy = 30;
		O.cost = 1000;
		return ( O );
	}
	else if ( object == "ability_stun" )
	{
		O.inBattle = true;
		O.damage = 2;
		O.spellSpecial = ["melee", "none", "stun_6_1"];
		O.N = "Stab";
		O.D = "This ability will stab your opponent. ( Lvl: 4, Typ: Normal, Eng: 5, Dmg: 2 Spe: STUN [16.7% Chance, 1 turn] )";
		O.C = "[ S ] [ W ] [ S ] [ W ] [ S ] [ W ] [ S ] [ W ] [ S ] [ W ] ";
		O.combo = "S,W,S,W,S,W,S,W,S,W";
		O.comboTime = _fps * 5;
		O.castAnimation = "focStun";
		O.spellType = "normal";
		O.Rlevel = 4;
		O.Renergy = 5;
		O.cost = 300;
		return ( O );
	}
	else if ( object == "ability_greaterStun" )
	{
		O.inBattle = true;
		O.damage = 5;
		O.spellSpecial = ["melee", "none", "stun_5_2"];
		O.N = "Greater Stab";
		O.D = "This ability will violently stab. ( Lvl: 13, Typ: Normal, Eng: 9, Dmg: 5, Spe: STUN [20% Chance, 2 turns] )";
		O.C = "[ S ] [ W ] [ S ] [ W ] [ W ] [ S ] [ W ] [ S ] [ W ] [ S ] [ W ] [ S ] [ W ] [ S ] [ W ] [ S ]";
		O.combo = "S,W,S,W,S,W,S,W,S,W,S,W,S,W,S,W";
		O.comboTime = _fps * 5;
		O.castAnimation = "focStun";
		O.spellType = "normal";
		O.Rlevel = 13;
		O.Renergy = 9;
		O.cost = 900;
		return ( O );
	}
	else if ( object == "ability_omegaStun" )
	{
		O.inBattle = true;
		O.damage = 10;
		O.spellSpecial = ["melee", "none", "stun_3_3"];
		O.N = "Omega Stab";
		O.D = "This ability will violently stab your opponent in a vital spot. ( Lvl: 27, Typ: Normal, Eng: 19, Dmg: 10, Spe: STUN [33.3% Chance, 3 turns] )";
		O.C = "[ S ] [ W ] [ X ] [ W ] [ S ] [ A ] [ S ] [ W ] [ S ] [ W ] [ S ] [ W ] [ S ] [ W ] [ S ]";
		O.combo = "S,W,X,W,S,A,S,W,S,W,S,W,S,W,S,W";
		O.comboTime = _fps * 5;
		O.castAnimation = "focStun";
		O.spellType = "normal";
		O.Rlevel = 27;
		O.Renergy = 19;
		O.cost = 2000;
		return ( O );
	}
	else if ( object == "ability_ultimateStun" )
	{
		O.inBattle = true;
		O.damage = 20;
		O.spellSpecial = ["melee", "none", "stun_2_4"];
		O.N = "Ultimate Stab";
		O.D = "This fully enhanced ability will violently stab your opponent in the heart. ( Lvl: 40, Typ: Normal, Eng: 33, Dmg: 20, Spe: STUN [50% Chance, 4 turns] )";
		O.C = "[ S ] [ W ] [ W ] [ D ] [ X ] [ A ] [ W ] [ D ] [ X ] [ A ] [ W ] [ D ] [ X ] [ A ] [ W ] [ D ]";
		O.combo = "S,W,W,D,X,A,W,D,X,A,W,D,X,A,W,D";
		O.comboTime = _fps * 4;
		O.castAnimation = "focStun";
		O.spellType = "normal";
		O.Rlevel = 40;
		O.Renergy = 33;
		O.cost = 2000;
		return ( O );
	}
	else if ( object == "ability_sapHealth" )
	{
		O.inBattle = true;
		O.damage = -1;
		O.spellSpecial = ["melee", "none", "sap_h_75"];
		O.N = "Sap Health";
		O.D = "This ability will sap a little of your enemy's health. ( Lvl: 6, Typ: Normal, Eng: 7, Dmg: Normal, Spe: SAP [75% of damage, to health] )";
		O.C = "[ S ] [ S ] [ Z ] [ Z ] [ D ] [ D ]";
		O.combo = "S,S,Z,Z,D,D";
		O.comboTime = _fps * 6;
		O.castAnimation = "atk";
		O.spellType = "normal";
		O.Rlevel = 6;
		O.Renergy = 7;
		O.cost = 500;
		return ( O );
	}
	else if ( object == "ability_greaterSapHealth" )
	{
		O.inBattle = true;
		O.damage = -1;
		O.spellSpecial = ["melee", "none", "sap_h_66"];
		O.N = "Greater Sap Health";
		O.D = "This ability will sap your enemy's health. ( Lvl: 12, Typ: Normal, Eng: 15, Dmg: Normal, Spe: SAP [66.6% of damage, to health] )";
		O.C = "[ S ] [ S ] [ W ] [ W ] [ A ] [ A ] [ D ] [ D ]";
		O.combo = "S,S,W,W,A,A,Z,Z";
		O.comboTime = _fps * 5;
		O.castAnimation = "atk";
		O.spellType = "normal";
		O.Rlevel = 12;
		O.Renergy = 15;
		O.cost = 1000;
		return ( O );
	}
	else if ( object == "ability_omegaSapHealth" )
	{
		O.inBattle = true;
		O.damage = -1;
		O.spellSpecial = ["melee", "none", "sap_h_100"];
		O.N = "Omega Sap Health";
		O.D = "This ability will sap a lot of your enemy's health. ( Lvl: 20, Typ: Normal, Eng: 20, Dmg: Normal, Spe: SAP [100% of damage, to health] )";
		O.C = "[ S ] [ S ] [ A ] [ A ] [ D ] [ D ] [ W ] [ W ] [ D ] [ D ] [ S ] [ S ] [ Z ] [ Z ]";
		O.combo = "S,S,A,A,D,D,W,W,D,D,S,S,Z,Z";
		O.comboTime = _fps * 5;
		O.castAnimation = "atk";
		O.spellType = "normal";
		O.Rlevel = 20;
		O.Renergy = 20;
		O.cost = 2000;
		return ( O );
	}
	else if ( object == "ability_ultimateSapHealth" )
	{
		O.inBattle = true;
		O.damage = -1;
		O.spellSpecial = ["melee", "none", "sap_h_150"];
		O.N = "Ultimate Sap Health";
		O.D = "This fully enhanced ability will sap a massive amount of your enemy's health. ( Lvl: 30, Typ: Normal, Eng: 33, Dmg: Normal, Spe: SAP [150% of damage, to health] )";
		O.C = "[ S ] [ S ] [ W ] [ W ] [ S ] [ S ] [ A ] [ A ] [ Z ] [ Z ] [ D ] [ D ] [ S ] [ S ] [ W ] [ W ]";
		O.combo = "S,S,W,W,S,S,A,A,Z,Z,D,D,S,S,W,W";
		O.comboTime = _fps * 5;
		O.castAnimation = "atk";
		O.spellType = "normal";
		O.Rlevel = 30;
		O.Renergy = 33;
		O.cost = 3000;
		return ( O );
	}
	else if ( object == "ability_sapEnergy" )
	{
		O.inBattle = true;
		O.damage = -1;
		O.spellSpecial = ["melee", "none", "sap_e_50"];
		O.N = "Sap Energy";
		O.D = "This ability will sap a little of your enemy's energy. ( Lvl: 4, Typ: Normal, Eng: 5, Dmg: Normal, Spe: SAP [50% of damage, to energy] )";
		O.C = "[ S ] [ S ] [ Z ] [ Z ] [ Z ] [ Z ] [ Z ] [ Z ]";
		O.combo = "S,S,Z,Z,Z,Z,Z,Z";
		O.comboTime = _fps * 6;
		O.castAnimation = "atk";
		O.spellType = "normal";
		O.Rlevel = 4;
		O.Renergy = 5;
		O.cost = 250;
		return ( O );
	}
	else if ( object == "ability_greaterSapEnergy" )
	{
		O.inBattle = true;
		O.damage = -1;
		O.spellSpecial = ["melee", "none", "sap_e_80"];
		O.N = "Omega Sap Energy";
		O.D = "This ability will sap your enemy's energy. ( Lvl: 10, Typ: Normal, Eng: 9, Dmg: Normal, Spe: SAP [80% of damage, to energy] )";
		O.C = "[ S ] [ S ] [ Z ] [ Z ] [ Z ] [ Z ] [ Z ] [ Z ] [ S ] [ S ] [ Z ] [ Z ] [ Z ] [ Z ] [ Z ] [ Z ]";
		O.combo = "S,S,Z,Z,Z,Z,Z,Z,S,S,Z,Z,Z,Z,Z,Z";
		O.comboTime = _fps * 5;
		O.castAnimation = "atk";
		O.spellType = "normal";
		O.Rlevel = 10;
		O.Renergy = 9;
		O.cost = 900;
		return ( O );
	}
	else if ( object == "ability_omegaSapEnergy" )
	{
		O.inBattle = true;
		O.damage = -1;
		O.spellSpecial = ["melee", "none", "sap_e_125"];
		O.N = "Omega Sap Energy";
		O.D = "This ability will sap a lot your enemy's energy. ( Lvl: 24, Typ: Normal, Eng: 15, Dmg: Normal, Spe: SAP [125% of damage, to energy] )";
		O.C = "[ S ] [ S ] [ Z ] [ Z ] [ S ] [ S ] [ Z ] [ Z ] [ S ] [ S ] [ Z ] [ Z ] [ Z ] [ Z ] [ S ] [S ]";
		O.combo = "S,S,Z,Z,Z,S,S,Z,S,S,Z,Z,Z,Z,S,S";
		O.comboTime = _fps * 4;
		O.castAnimation = "atk";
		O.spellType = "normal";
		O.Rlevel = 24;
		O.Renergy = 15;
		O.cost = 1500;
		return ( O );
	}
	else if ( object == "ability_ultimateSapEnergy" )
	{
		O.inBattle = true;
		O.damage = -1;
		O.spellSpecial = ["melee", "none", "sap_e_200"];
		O.N = "Ultimate Sap Energy";
		O.D = "This fully enhanced ability will sap nearly all of your enemy's energy. ( Lvl: 37, Typ: Normal, Eng: 22, Dmg: Normal, Spe: SAP [200% of damage, to energy] )";
		O.C = "[ S ] [ S ] [ Z ] [ Z ] [ S ] [ S ] [ Z ] [ Z ] [ S ] [ S ] [ Z ] [ Z ] [ Z ] [ Z ] [ S ] [S ]";
		O.combo = "S,S,Z,Z,Z,X,X,Z,S,S,Z,Z,X,X,S,S";
		O.comboTime = _fps * 4;
		O.castAnimation = "atk";
		O.spellType = "normal";
		O.Rlevel = 37;
		O.Renergy = 22;
		O.cost = 3000;
		return ( O );
	}
	else if ( object == "ability_steal" )
	{
		O.inBattle = true;
		O.damage = -1;
		O.spellSpecial = ["melee", "none", "sap_g_200"];
		O.N = "Steal";
		O.D = "This ability will steal a little bit of your opponent's gold. ( Lvl: 8, Typ: Normal, Eng: 4, Dmg: Normal, Spe: ROB [steal a little gold] )";
		O.C = "[ S ] [ A ] [ D ] [ D ]";
		O.combo = "S,A,D,D";
		O.comboTime = _fps * 1;
		O.castAnimation = "atk";
		O.spellType = "normal";
		O.Rlevel = 8;
		O.Renergy = 4;
		O.cost = 200;
		return ( O );
	}
	else if ( object == "ability_greaterSteal" )
	{
		O.inBattle = true;
		O.damage = -1;
		O.spellSpecial = ["melee", "none", "sap_g_400"];
		O.N = "Greater Steal";
		O.D = "This ability will steal some of your opponent's gold. ( Lvl: 16, Typ: Normal, Eng: 10, Dmg: Normal, Spe: ROB [steal some gold] )";
		O.C = "[ S ] [ A ] [ D ] [ S ] [ A ]";
		O.combo = "S,A,D,S,A";
		O.comboTime = _fps * 4;
		O.castAnimation = "atk";
		O.spellType = "normal";
		O.Rlevel = 16;
		O.Renergy = 10;
		O.cost = 500;
		return ( O );
	}
	else if ( object == "ability_omegaSteal" )
	{
		O.inBattle = true;
		O.damage = -1;
		O.spellSpecial = ["melee", "none", "sap_g_1000"];
		O.N = "Omega Steal";
		O.D = "This ability will steal a lot of your opponent's gold. ( Lvl: 25, Typ: Normal, Eng: 10, Dmg: Normal, Spe: ROB [steal a lot of gold] )";
		O.C = "[ S ] [ A ] [ D ] [ S ] [ A ] [ D ]";
		O.combo = "S,A,D,S,A,D";
		O.comboTime = _fps * 4;
		O.castAnimation = "atk";
		O.spellType = "normal";
		O.Rlevel = 25;
		O.Renergy = 10;
		O.cost = 2500;
		return ( O );
	}
	else if ( object == "ability_ultimateSteal" )
	{
		O.inBattle = true;
		O.damage = -1;
		O.spellSpecial = ["melee", "none", "sap_g_3000"];
		O.N = "Omega Steal";
		O.D = "This ability will steal an abundance of your opponent's gold. ( Lvl: 34, Typ: Normal, Eng: 21, Dmg: Normal, Spe: ROB [steal an abundance of gold] )";
		O.C = "[ S ] [ A ] [ D ] [ S ] [ A ] [ D ] [ S ]";
		O.combo = "S,A,D,S,A,D,S";
		O.comboTime = _fps * 4;
		O.castAnimation = "atk";
		O.spellType = "normal";
		O.Rlevel = 34;
		O.Renergy = 21;
		O.cost = 3000;
		return ( O );
	}
	// Sacks SACKS HAVE BEEN REMOVED FROM THE GAME
	else if(object == "clothSack")
	{
		O.N = "Cloth Sack";
		O.D = "An old, weak sack that looks weird. ( Use: + 2 Slots )";
		O.sack = 2;
		O.cost = 200;
		return ( O );
	}
	else if(object == "leatherSack")
	{
		O.N = "Leather Sack";
		O.D = "It's a gray, smooth leather sack made with pride. ( Use: + 3 Slots )";
		O.sack = 3;
		O.cost = 500;
		return ( O );
	}
	// Itemss
	else if(object == "steelBlock") {
		O.N = "Block of Steel";
		O.D = "I should give this to a blacksmith. ( Use: Give to blacksmith to make steel-type armor, weapon, or shield. )";
		O.Rlevel = 1;
		O.cost = 100;
		return ( O );
	}
	else if(object == "runeBlock") {
		O.N = "Block of Rune";
		O.D = "I should give this to a blacksmith. ( Use: Give to blacksmith to make rune-type armor, weapon, or shield. )";
		O.Rlevel = 1;
		O.cost = 400;
		return ( O );
	}
	else if(object == "sirusBlock") {
		O.N = "Block of Sirus";
		O.D = "I should give this to a blacksmith. ( Use: Give to blacksmith to make sirus-type armor, weapon, or shield. )";
		O.Rlevel = 1;
		O.cost = 750;
		return ( O );
	}
	else if(object == "flamesBlock") {
		O.N = "Block of Flames";
		O.D = "I should give this to a blacksmith. ( Use: Give to blacksmith to make flames-type armor, weapon, or shield. )";
		O.Rlevel = 1;
		O.cost = 2222;
		return ( O );
	}
	else if(object == "wavesBlock") {
		O.N = "Block of Waves";
		O.D = "I should give this to a blacksmith. ( Use: Give to blacksmith to make waves-type armor, weapon, or shield. )";
		O.Rlevel = 1;
		O.cost = 1888;
		return ( O );
	}
	else if(object == "rockBlock") {
		O.N = "Block of Rocks";
		O.D = "I should give this to a blacksmith. ( Use: Give to blacksmith to make rock-type armor, weapon, or shield. )";
		O.Rlevel = 1;
		O.cost = 150;
		return ( O );
	}
	else if(object == "grassBlock") {
		O.N = "Block of Grass";
		O.D = "I should give this to a blacksmith. ( Use: Give to blacksmith to make grass-type armor, weapon, or shield. )";
		O.Rlevel = 1;
		O.cost = 300;
		return ( O );
	}
	else if(object == "windBlock") {
		O.N = "Block of Wind";
		O.D = "I should give this to a blacksmith. ( Use: Give to blacksmith to make wind-type armor, weapon, or shield. )";
		O.Rlevel = 1;
		O.cost = 5000;
		return ( O );
	}
	else if(object == "alanBlock") {
		O.N = "Block of Alan";
		O.D = "I should give this to a blacksmith. ( Use: Give to blacksmith to make Alan-type armor, weapon, or shield. )";
		O.Rlevel = 1;
		O.cost = 8000;
		return ( O );
	}
	else if(object == "vines") {
		O.N = "Green Vines";
		O.D = "Some green vines.";
		O.Rlevel = 1;
		O.cost = 10;
		return ( O );
	}
	else if(object == "beetleWings") {
		O.N = "Beetle Wings";
		O.D = "A gross pair of a beetle's wings.";
		O.Rlevel = 1;
		O.cost = 7;
		return ( O );
	}
	else if(object == "rocks") {
		O.N = "Rocks Material";
		O.D = "These are rocks. They are very hard. ( Use: Combine with any empty equipment to produce rock-type equipment. )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 190;
		return ( O );
	}
	else if(object == "superRocks") {
		O.N = "Super Rocks Material";
		O.D = "These are super rocks. They are very super hard. ( Use: Combine with an empty sword and shield to produce super rock-type equipment. )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 450;
		return ( O );
	}
	else if(object == "ratFur") {
		O.N = "Rat Fur Material";
		O.D = "Gross, it's fur from a rat.( Use: Combine with an empty helmet to produce a rat hood. )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 55;
		return ( O );
	}
	else if(object == "wood") {
		O.N = "Wood Material";
		O.D = "It's a block of wood. ( Use: Combine with any empty equipment to produce wooden equipment )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 25;
		return ( O );
	}
	else if(object == "grass") {
		O.N = "Grass Material";
		O.D = "It's a few patches of grass. ( Use: Combine with any empty equipment to produce grass equipment )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 50;
		return ( O );
	}
	else if(object == "frogLeather") {
		O.N = "Frog Leather Material";
		O.D = "It's Frog Leather. (Use: Combine with empty helm, body, or legs to produce frog leather type equipment)";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 40;
		return ( O );
	}
	else if(object == "xiasLeather") {
		O.N = "Xias Leather Material";
		O.D = "It's a red, hard piece of xias leather. ( Use: Combine with empty helm, body, or legs to produce xias leather type equipment )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 1000;
		return ( O );
	}
	else if(object == "emptySword") {
		O.N = "Empty Sword";
		O.D = "An empty sword that is useless in its current form. I should combine it with a material. ( Use: Use a material type item on this to make equipment. )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 50;
		return ( O );
	}
	else if(object == "emptyShield") {
		O.N = "Empty Shield";
		O.D = "An empty shield that is useless in its current form. I should combine it with a material. ( Use: Use a material type item on this to make equipment. )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 50;
		return ( O );
	}
	else if(object == "emptyHelmet") {
		O.N = "Empty Helmet";
		O.D = "An empty helmet that is useless in its current form. I should combine it with a material. ( Use: Use a material type item on this to make equipment. )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 50;
		return ( O );
	}
	else if(object == "emptyPlatebody") {
		O.N = "Empty Platebody";
		O.D = "An empty platebody that is useless in its current form. I should combine it with a material. ( Use: Use a material type item on this to make equipment. )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 50;
		return ( O );
	}
	else if(object == "emptyPlatelegs") {
		O.N = "Empty Platelegs";
		O.D = "An empty pair of platelegs that is useless in its current form. I should combine it with a material. ( Use: Use a material type item on this to make equipment. )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 50;
		return ( O );
	}
	else if(object == "emptyBoots") {
		O.N = "Empty Boots";
		O.D = "An empty pair of boots that is useless in its current form. I should combine it with a material. ( Use: Use a material type item on this to make equipment. )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 50;
		return ( O );
	}
	else if(object == "emptyGloves") {
		O.N = "Empty Gloves";
		O.D = "An empty pair of gloves that is useless in its current form. I should combine it with a material. ( Use: Use a material type item on this to make equipment. )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 50;
		return ( O );
	}
	else if(object == "emptyNecklace") {
		O.N = "Empty Necklace";
		O.D = "An empty necklace that is useless in its current form. I should combine it with a material. ( Use: Use a material type item on this to make equipment. )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 50;
		return ( O );
	}
	else if(object == "emptyRings") {
		O.N = "Empty Rings";
		O.D = "An empty pair of rings that is useless in its current form. I should combine it with a material. ( Use: Use a material type item on this to make equipment. )";
		O.UonI = true;
		O.Rlevel = 1;
		O.cost = 50;
		return ( O );
	}
	// Npcss
	else if(object == "npc_vines") {
		O.NPCElementType = "normal";
		O.NPCAttackSpecial = [ "melee", "none" ];
		O.NPCFlee = 0.11;
		O.NPCLoot = [new Loot ( "vines", 10 ), new Loot ( "vines", 4 )];
		O.NPCGold = random ( 10 );
		O.NPCInsName = "vines";
		O.NPCMaxHp = 1;
		O.NPCMaxEnergy = 1;
		O.NPCLevel = 1;
		O.NPCExp = 1;
		O.NPCStrength = 1;
		O.NPCFocus = 1;
		O.NPCEvasion = 1;
		O.NPCEndurance = 1;
		O.NPCStamina = 1;
		O.NPCDamage = 1;
		O.NPCDefense = 1;
		O.NPCName = "Vines";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_rockSnake") {
		O.NPCElementType = "earth";
		O.NPCAttackSpecial = [ "melee", "earth" ];
		O.NPCFlee = 0.09;
		O.NPCLoot = [new Loot("rocks", 20),  new Loot ( "orb_grass", 100 )];
		O.NPCGold = random ( 50 );
		O.NPCInsName = "rockSnake";
		O.NPCMaxHp = 5;
		O.NPCMaxEnergy = 1;
		O.NPCLevel = 3;
		O.NPCExp = 3;
		O.NPCStrength = 5;
		O.NPCFocus = 1;
		O.NPCEvasion = 40;
		O.NPCEndurance = 2;
		O.NPCStamina = 1;
		O.NPCDamage = 2;
		O.NPCDefense = 3;
		O.NPCName = "Rock Snake";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_rockGiant") {
		O.NPCElementType = "earth";
		O.NPCAttackSpecial = [ "melee", "earth" ];
		O.NPCFlee = 0.25;
		O.NPCLoot = [new Loot("rocks", 3), new Loot("rocks", 5), new Loot ( "orb_grass", 20 )];
		O.NPCGold = 25 + random ( 50 );
		O.NPCInsName = "rockGiant";
		O.NPCMaxHp = 20;
		O.NPCMaxEnergy = 10;
		O.NPCLevel = 5;
		O.NPCExp = 5;
		O.NPCStrength = 10;
		O.NPCFocus = 7;
		O.NPCEvasion = 1;
		O.NPCEndurance = 5;
		O.NPCStamina = 4;
		O.NPCDamage = 5;
		O.NPCDefense = 20;
		O.NPCName = "Rock Giant";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_jack") {
		O.NPCElementType = "normal";
		O.NPCAttackSpecial = [ "melee", "none" ];
		O.NPCFlee = 2.00;
		O.NPCLoot = [new Loot("jacksSword", 1), new Loot("jacksShield", 1)];
		O.NPCGold = 300 + random ( 100 );
		O.NPCInsName = "jack";
		O.NPCMaxHp = 50;
		O.NPCMaxEnergy = 40;
		O.NPCLevel = 10;
		O.NPCExp = 40;
		O.NPCStrength = 14;
		O.NPCFocus = 14;
		O.NPCEvasion = 30;
		O.NPCEndurance = 15;
		O.NPCStamina = 14;
		O.NPCDamage = 5;
		O.NPCDefense = 50;
		O.NPCName = "Jack";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_xias") {
		O.NPCElementType = "fire";
		O.NPCAttackSpecial = [ "melee", "fire" ];
		O.NPCFlee = 2.00;
		O.NPCLoot = [new Loot ( "xiasLeather", 1 ), new Loot ( "xiasLeather", 10 ), new Loot ( "xiasLeather", 50 )];
		O.NPCGold = 750 + random ( 300 );
		O.NPCInsName = "xias";
		O.NPCMaxHp = 900;
		O.NPCMaxEnergy = 200;
		O.NPCLevel = 25;
		O.NPCExp = 100;
		O.NPCStrength = 80;
		O.NPCFocus = 14;
		O.NPCEvasion = 50;
		O.NPCEndurance = 20;
		O.NPCStamina = 20;
		O.NPCDamage = 12;
		O.NPCDefense = 100;
		O.NPCName = "Xias";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_zoro") {
		O.NPCElementType = "wind";
		O.NPCAttackSpecial = [ "melee", "wind" ];
		O.NPCFlee = 2.00;
		O.NPCLoot = [new Loot ( "zoroPlatebody", 6 )];
		O.NPCGold = 2500 + random ( 2500 );
		O.NPCInsName = "zoro";
		O.NPCMaxHp = 1250;
		O.NPCMaxEnergy = 150;
		O.NPCLevel = 33;
		O.NPCExp = 220;
		O.NPCStrength = 35;
		O.NPCFocus = 18;
		O.NPCEvasion = 60;
		O.NPCEndurance = 40;
		O.NPCStamina = 50;
		O.NPCDamage = 20;
		O.NPCDefense = 50;
		O.NPCName = "Zoro";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_verus") {
		O.NPCElementType = "normal";
		O.NPCAttackSpecial = [ "melee", "normal" ];
		O.NPCFlee = 2.00;
		O.NPCLoot = [];
		O.NPCGold = 0;
		O.NPCInsName = "verus";
		O.NPCMaxHp = 4000;
		O.NPCMaxEnergy = 1500;
		O.NPCLevel = 50;
		O.NPCExp = 300;
		O.NPCStrength = 118;
		O.NPCFocus = 125;
		O.NPCEvasion = 80;
		O.NPCEndurance = 70;
		O.NPCStamina = 50;
		O.NPCDamage = 25;
		O.NPCDefense = 200;
		O.NPCName = "Verus";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_evilTree") {
		O.NPCElementType = "grass";
		O.NPCAttackSpecial = [ "melee", "grass" ];
		O.NPCFlee = 0.15;
		O.NPCLoot = [new Loot ( "vines", 10 ), new Loot ( "vines", 10 ), new Loot ( "orb_grass", 15 ), new Loot ( "grass", 16 ), new Loot ( "grass", 25 ) ];
		O.NPCGold = random ( 50 ) + 5;
		O.NPCInsName = "evilTree";
		O.NPCMaxHp = 80;
		O.NPCMaxEnergy = 50;
		O.NPCLevel = 12;
		O.NPCExp = 10;
		O.NPCStrength = 9;
		O.NPCFocus = 13;
		O.NPCEvasion = 0;
		O.NPCEndurance = 10;
		O.NPCStamina = 40;
		O.NPCDamage = 6;
		O.NPCDefense = 15;
		O.NPCName = "Evil Tree";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_superRockGiant") {
		O.NPCElementType = "earth";
		O.NPCAttackSpecial = [ "melee", "earth" ];
		O.NPCFlee = 0.39;
		O.NPCLoot = [new Loot("rocks", 5), new Loot("superRocks", 9), new Loot ( "orb_grass", 10 )];
		O.NPCGold = 50 + random ( 100 );
		O.NPCInsName = "superRockGiant";
		O.NPCMaxHp = 30;
		O.NPCMaxEnergy = 40;
		O.NPCLevel = 10;
		O.NPCExp = 15;
		O.NPCStrength = 16;
		O.NPCFocus = 12;
		O.NPCEvasion = 1;
		O.NPCEndurance = 8;
		O.NPCStamina = 6;
		O.NPCDamage = 8;
		O.NPCDefense = 33;
		O.NPCName = "Super Rock Giant";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_giantRat") {
		O.NPCElementType = "normal";
		O.NPCAttackSpecial = [ "melee", "none" ];
		O.NPCFlee = 0.14;
		O.NPCLoot = [new Loot("ratFur", 10)];
		O.NPCGold = random ( 30 );
		O.NPCInsName = "giantRat";
		O.NPCMaxHp = 10;
		O.NPCMaxEnergy = 1;
		O.NPCLevel = 3;
		O.NPCExp = 5;
		O.NPCStrength = 3;
		O.NPCFocus = 1;
		O.NPCEvasion = 40;
		O.NPCEndurance = 1;
		O.NPCStamina = 1;
		O.NPCDamage = 2;
		O.NPCDefense = 1;
		O.NPCName = "Giant Rat";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_bronzeChest") {
		O.NPCElementType = "fire";
		O.NPCAttackSpecial = [ "melee", "fire" ];
		O.NPCFlee = 0.50;
		O.NPCLoot = [new Loot("orb_oil", 20)];
		O.NPCGold = 25 + random ( 200 );
		O.NPCInsName = "chest";
		O.NPCMaxHp = 10;
		O.NPCMaxEnergy = 10;
		O.NPCLevel = 1;
		O.NPCExp = 5;
		O.NPCStrength = 3;
		O.NPCFocus = 3;
		O.NPCEvasion = 1;
		O.NPCEndurance = 1;
		O.NPCStamina = 1;
		O.NPCDamage = 2;
		O.NPCDefense = 4;
		O.NPCName = "Chest";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_dummy") {
		O.NPCElementType = "normal";
		O.NPCAttackSpecial = [ "melee", "none" ];
		O.NPCFlee = 0.00;
		O.NPCLoot = [new Loot("wood", 1), new Loot("wood", 4)];
		O.NPCGold = random ( 7 );
		O.NPCInsName = "dummy";
		O.NPCMaxHp = 3;
		O.NPCMaxEnergy = 1;
		O.NPCLevel = 1;
		O.NPCExp = 1;
		O.NPCStrength = 1;
		O.NPCFocus = 1;
		O.NPCEvasion = 1;
		O.NPCEndurance = 1;
		O.NPCStamina = 1;
		O.NPCDamage = 1;
		O.NPCDefense = 3;
		O.NPCName = "Dummy";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_frog") {
		O.NPCElementType = "normal";
		O.NPCAttackSpecial = [ "melee", "none" ];
		O.NPCFlee = 0.05;
		O.NPCLoot = [new Loot("frogLeather", 3)];
		O.NPCGold = random ( 10 );
		O.NPCInsName = "frog";
		O.NPCMaxHp = 2;
		O.NPCMaxEnergy = 2;
		O.NPCLevel = 1;
		O.NPCExp = 1;
		O.NPCStrength = 1;
		O.NPCFocus = 1;
		O.NPCEvasion = 1;
		O.NPCEndurance = 1;
		O.NPCStamina = 1;
		O.NPCDamage = 1;
		O.NPCDefense = 1;
		O.NPCName = "Frog";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_wolf") {
		O.NPCElementType = "normal";
		O.NPCAttackSpecial = [ "melee", "none" ];
		O.NPCFlee = 0.11;
		O.NPCLoot = [];
		O.NPCGold = random ( 20 );
		O.NPCInsName = "wolf";
		O.NPCMaxHp = 5;
		O.NPCLevel = 2;
		O.NPCExp = 4;
		O.NPCMaxEnergy = 1;
		O.NPCStrength = 6;
		O.NPCFocus = 1;
		O.NPCEvasion = 1;
		O.NPCEndurance = 2;
		O.NPCStamina = 2;
		O.NPCDamage = 1;
		O.NPCDefense = 3;
		O.NPCName = "Wolf";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_fireWolf") {
		O.NPCElementType = "fire";
		O.NPCAttackSpecial = [ "melee", "fire" ];
		O.NPCFlee = 0.15;
		O.NPCLoot = [];
		O.NPCGold = random ( 32 );
		O.NPCInsName = "fireWolf";
		O.NPCMaxHp = 200;
		O.NPCLevel = 15;
		O.NPCExp = 16;
		O.NPCMaxEnergy = 1;
		O.NPCStrength = 21;
		O.NPCFocus = 1;
		O.NPCEvasion = 25;
		O.NPCEndurance = 7;
		O.NPCStamina = 1;
		O.NPCDamage = 7;
		O.NPCDefense = 29;
		O.NPCName = "Fire Wolf";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_waterWolf") {
		O.NPCElementType = "water";
		O.NPCAttackSpecial = [ "melee", "water" ];
		O.NPCFlee = 0.09;
		O.NPCLoot = [];
		O.NPCGold = random ( 20 );
		O.NPCInsName = "waterWolf";
		O.NPCMaxHp = 250;
		O.NPCLevel = 15;
		O.NPCExp = 17;
		O.NPCMaxEnergy = 1;
		O.NPCStrength = 33;
		O.NPCFocus = 1;
		O.NPCEvasion = 30;
		O.NPCEndurance = 8;
		O.NPCStamina = 1;
		O.NPCDamage = 9;
		O.NPCDefense = 30;
		O.NPCName = "Water Wolf";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_rockWolf") {
		O.NPCElementType = "earth";
		O.NPCAttackSpecial = [ "melee", "earth" ];
		O.NPCFlee = 0.25;
		O.NPCLoot = [];
		O.NPCGold = random ( 44 );
		O.NPCInsName = "rockWolf";
		O.NPCMaxHp = 400;
		O.NPCLevel = 16;
		O.NPCExp = 20;
		O.NPCMaxEnergy = 1;
		O.NPCStrength = 15;
		O.NPCFocus = 1;
		O.NPCEvasion = 15;
		O.NPCEndurance = 10;
		O.NPCStamina = 1;
		O.NPCDamage = 11;
		O.NPCDefense = 35;
		O.NPCName = "Rock Wolf";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_windWolf") {
		O.NPCElementType = "wind";
		O.NPCAttackSpecial = [ "melee", "wind" ];
		O.NPCFlee = 0.19;
		O.NPCLoot = [];
		O.NPCGold = random ( 65 );
		O.NPCInsName = "windWolf";
		O.NPCMaxHp = 250;
		O.NPCLevel = 17;
		O.NPCExp = 22;
		O.NPCMaxEnergy = 1;
		O.NPCStrength = 20;
		O.NPCFocus = 1;
		O.NPCEvasion = 75;
		O.NPCEndurance = 6;
		O.NPCStamina = 1;
		O.NPCDamage = 13;
		O.NPCDefense = 35;
		O.NPCName = "Wind Wolf";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_grassWolf") {
		O.NPCElementType = "grass";
		O.NPCAttackSpecial = [ "melee", "grass" ];
		O.NPCFlee = 0.22;
		O.NPCLoot = [];
		O.NPCGold = random ( 65 );
		O.NPCInsName = "grassWolf";
		O.NPCMaxHp = 350;
		O.NPCLevel = 20;
		O.NPCExp = 30;
		O.NPCMaxEnergy = 1;
		O.NPCStrength = 35;
		O.NPCFocus = 1;
		O.NPCEvasion = 27;
		O.NPCEndurance = 11;
		O.NPCStamina = 1;
		O.NPCDamage = 15;
		O.NPCDefense = 60;
		O.NPCName = "Grass Wolf";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_bettle") {
		O.NPCElementType = "normal";
		O.NPCAttackSpecial = [ "melee", "none" ];
		O.NPCFlee = 0.08;
		O.NPCLoot = [new Loot ( "beetleWings", 5 )];
		O.NPCGold = 3 + random ( 7 );
		O.NPCInsName = "bettle";
		O.NPCMaxHp = 1;
		O.NPCMaxEnergy = 5;
		O.NPCLevel = 1;
		O.NPCExp = 1;
		O.NPCStrength = 1;
		O.NPCFocus = 1;
		O.NPCEvasion = 1;
		O.NPCEndurance = 1;
		O.NPCStamina = 1;
		O.NPCDamage = 1;
		O.NPCDefense = 1;
		O.NPCName = "Beetle";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	else if(object == "npc_fireBeetle") {
		O.NPCElementType = "fire";
		O.NPCAttackSpecial = [ "melee", "fire" ];
		O.NPCFlee = 0.15;
		O.NPCLoot = [new Loot ( "orb_oil", 15 ), new Loot ( "beetleWings", 5 )];
		O.NPCGold = 10 + random ( 10 );
		O.NPCInsName = "fireBeetle";
		O.NPCMaxHp = 8;
		O.NPCMaxEnergy = 1;
		O.NPCLevel = 10;
		O.NPCExp = 4;
		O.NPCStrength = 8;
		O.NPCFocus = 1;
		O.NPCEvasion = 1;
		O.NPCEndurance = 1;
		O.NPCStamina = 1;
		O.NPCDamage = 6;
		O.NPCDefense = 2;
		O.NPCName = "Fire Beetle";
		O.NPCArray = [O.NPCInsName, O.NPCMaxHp, O.NPCLevel, O.NPCExp, O.NPCStrength, O.NPCFocus, O.NPCEvasion, O.NPCEndurance, O.NPCStamina, O.NPCDamage, O.NPCDefense, O.NPCName, O.NPCLoot, O.NPCGold, O.NPCFlee, O.NPCAttackSpecial, O.NPCMaxEnergy, O.NPCElementType];
		return ( O );
	}
	// Questss
	else if(object == "quest_getPrepared") {
		O.N = "Get Prepared";
		O.steps = ["Warlock has given me enough gold to buy a weapon, I must find the weapon and armor shop so I can buy equipment.", "Warlock has now asked me to equip my items and go to the training house. I will then learn how to fight!", "I must now report back to Warlock. I'm now prepared for battle."];
		O.complete = false;
		return ( O );
	}
	else if(object == "quest_stoniteEquipment") {
		O.N = "Stonite Equipment";
		O.steps = [
				   "The Stone King, Priscus, has been murdered by his own brother, Verus! Priscus gave me the correct armor to put Stonite into, so I can wield it and defeat Verus. I must go to Jack's Cave, south of the Castle of Light, and get stonite there first.", 
				   "I have the Stonite Helmet, and need to go to the Forest of Truth, located south-east of the Castle of Light. Once I'm there, I will not tell one single lie, and be granted two more pounds of Stonite. If I lie once, I will be instantly killed.", 
				   "I now must travel to the Isler Village, located south-west of the Castle of Light. There I will go into the blacksmith's chamber, fight the three headed dragon, protecting the Stonite source, then obtain more Stonite.", 
				   "Prisucs then told me that there would be a white dragon wondering around the Dynasty of Light somewhere, I should search for it, and destroy it.", 
				   "The last place Priscus told me to go, is my hometown: Marsh Village. I'll go there, and speak with Warlock about this hidden Stonite in our village."
				   ];
		O.complete = false;
		return ( O );
	}
	else if(object == "quest_none") {
		O.N = "No quest";
		O.steps = ["I do not have a quest assigned to me."];
		O.complete = false;
		return ( O );
	}
	// Items
	else if(object == "silverKey") {
		O.N = "Silver Key";
		O.D = "A basic silver key. It's okay looking. ( Use: Open silver chests, Lvl: 1 )";
		O.Rlevel = 3;
		O.cost = 50;
		return ( O );
	}
	else if(object == "goldenKey") {
		O.N = "Golden Key";
		O.D = "A smooth golden key. It's very shiny! ( Use: Opens golden chests, Lvl: 5 )";
		O.Rlevel = 5;
		O.cost = 100;
		return ( O );
	}
	else if(object == "platinumKey") {
		O.N = "Platinum Key";
		O.D = "A shiny, and clean platinum key. ( Use: Opens platinum chests, Lvl: 10 )";
		O.Rlevel = 10;
		O.cost = 500;
		return ( O );
	}
	else if(object == "bronzeKey") {
		O.N = "Bronze Key";
		O.D = "A rusty-looking key. ( Use: Opens bronze chests, Lvl: 10 )";
		O.Rlevel = 1;
		O.cost = 10;
		return ( O );
	}
	else if(object == "marshBook") {
		O.N = "Marsh Book";
		O.D = "This book will teleport me back to Marsh Village. ( Lvl: 1, Use: Teleports you back to marsh village )";
		O.U = function() {
			if ( !inBattle && !changingFrame )
			{
				randomBattleLevel = 0;
				stopMusic ( );
				startMusic ( "MUS_MarshVillage" );
				changeFrame ( "MarVil_B2" );
				charX = 275;
				charY = 200;
				minusItem ( "marshBook" );
				smallMessage ( "You safely teleport to Marsh Village." );
			}
			else
			smallMessage ( "You are in battle.", _fps * 4 );
		};
		O.Rlevel = 1;
		O.cost = 85;
		return ( O );
	}
	// Potionss
	else if(object == "evasionPotion") {
		O.N = "Evasion Potion";
		O.D = "A round vial with a thick, white liquid inside it. ( Lvl: 1, Use: + 4 evasion [ 1 battle ] )";
		O.U = function() {
			var gainedAmount = 4;
			boostStat("evasion", gainedAmount, "Your evasion has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255,gb:-200}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 1;
		O.cost = 85;
		return ( O );
	}
	else if(object == "greaterEvasionPotion") {
		O.N = "Greater Evasion Potion";
		O.D = "A round vial with a very thick, white liquid inside it. ( Lvl: 10, Use: + 14 evasion [ 1 battle ] )";
		O.U = function() {
			if ( level < 10 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 14;
			boostStat("evasion", gainedAmount, "Your evasion has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255,gb:-200}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 10;
		O.cost = 360;
		return ( O );
	}
	else if(object == "omegaEvasionPotion") {
		O.N = "Omega Evasion Potion";
		O.D = "A round vial with an extreamly thick, white liquid inside it. ( Lvl: 25, Use: + 22 evasion [ 1 battle ] )";
		O.U = function() {
			if ( level < 25 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 22;
			boostStat("evasion", gainedAmount, "Your evasion has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255,gb:-200}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 25;
		O.cost = 950;
		return ( O );
	}
	else if(object == "ultimateEvasionPotion") {
		O.N = "Ultimate Evasion Potion";
		O.D = "A round vial with a massively thick, white liquid inside it. ( Lvl: 40, Use: + 32 evasion [ 1 battle ] )";
		O.U = function() {
			if ( level < 40 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 32;
			boostStat("evasion", gainedAmount, "Your evasion has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255,gb:-200}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 40;
		O.cost = 2520;
		return ( O );
	}
	else if(object == "endurancePotion") {
		O.N = "Endurance Potion";
		O.D = "A round vial with a thick, orange liquid inside it. ( Lvl: 1, Use: + 2 endurance [ 1 battle ] )";
		O.U = function() {
			var gainedAmount = 2;
			boostStat("endurance", gainedAmount, "Your endurance has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255,gb:-200}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 1;
		O.cost = 90;
		return ( O );
	}
	else if(object == "greaterEndurancePotion") {
		O.N = "Greater Endurance Potion";
		O.D = "A round vial with a very thick, orange liquid inside it. ( Lvl: 4, Use: + 4 endurance [ 1 battle ] )";
		O.U = function() {
			if ( level < 4 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 4;
			boostStat("endurance", gainedAmount, "Your endurance has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255,gb:-200}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 4;
		O.cost = 195;
		return ( O );
	}
	else if(object == "omegaEndurancePotion") {
		O.N = "Omega Endurance Potion";
		O.D = "A round vial with an extreamly thick, orange liquid inside it. ( Lvl: 18, Use: + 8 endurance [ 1 battle ] )";
		O.U = function() {
			if ( level < 18 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 8;
			boostStat("endurance", gainedAmount, "Your endurance has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255,gb:-200}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 18;
		O.cost = 500;
		return ( O );
	}
	else if(object == "ultimateEndurancePotion") {
		O.N = "Ultimate Endurance Potion";
		O.D = "A round vial with a massively thick, orange liquid inside it. ( Lvl: 26, Use: + 14 endurance [ 1 battle ] )";
		O.U = function() {
			if ( level < 26 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 14;
			boostStat("endurance", gainedAmount, "Your endurance has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255,gb:-200}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 26;
		O.cost = 1200;
		return ( O );
	}
	else if(object == "staminaPotion") {
		O.N = "Stamina Potion";
		O.D = "A round vial with a thick, purple liquid inside it. ( Lvl: 1, Use: + 2 stamina [ 1 battle ] )";
		O.U = function() {
			var gainedAmount = 2;
			boostStat("stamina", gainedAmount, "Your stamina has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255,gb:-200}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 1;
		O.cost = 100;
		return ( O );
	}
	else if(object == "greaterStaminaPotion") {
		O.N = "Greater Stamina Potion";
		O.D = "A round vial with a very thick, purple liquid inside it. ( Lvl: 6, Use: + 5 stamina [ 1 battle ] )";
		O.U = function() {
			if ( level < 6 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 5;
			boostStat("stamina", gainedAmount, "Your stamina has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255,gb:-200}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 6;
		O.cost = 256;
		return ( O );
	}
	else if(object == "omegaStaminaPotion") {
		O.N = "Omega Stamina Potion";
		O.D = "A round vial with an extreamly thick, purple liquid inside it. ( Lvl: 20, Use: + 15 stamina [ 1 battle ] )";
		O.U = function() {
			if ( level < 20 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 15;
			boostStat("stamina", gainedAmount, "Your stamina has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255,gb:-200}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 20;
		O.cost = 1225;
		return ( O );
	}
	else if(object == "ultimateStaminaPotion") {
		O.N = "Ultimate Stamina Potion";
		O.D = "A round vial with a massively thick, purple liquid inside it. ( Lvl: 30, Use: + 33 stamina [ 1 battle ] )";
		O.U = function() {
			if ( level < 30 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 33;
			boostStat("stamina", gainedAmount, "Your stamina has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255,gb:-200}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 30;
		O.cost = 3950;
		return ( O );
	}
	else if(object == "fullPotion") {
		O.N = "Full Potion";
		O.D = "A round vial with a thick, black liquid inside it. ( Use: +100% health & energy, Lvl: 20 )";
		O.U = function() {
			var gainedAmount = 9999;
			if(health + gainedAmount > maxHealth)
			gainedAmount = maxHealth - health;
			boostStat("health", gainedAmount, "You recover "+gainedAmount+" health.");
			minusItem(object);
			usePotion ( new Object ( {gb:-200,bb:-200, rb:-200} ), "hp", gainedAmount, field.pro, hero_mc );
			
			gainedAmount = 9999;
			if(energy + gainedAmount > maxEnergy)
			gainedAmount = maxEnergy - energy;
			boostStat("energy", gainedAmount, "You recover "+gainedAmount+" energy.");
		};
		O.Rlevel = 20;
		O.cost = 4000;
		return ( O );
	}
	else if(object == "healthPotion") {
		O.N = "Health Potion";
		O.D = "A round vial with a thick, red liquid inside it. ( Use: + 4 - 7 health, Lvl: 1 )";
		O.U = function() {
			var gainedAmount = 4 + random(4);
			if(health + gainedAmount > maxHealth)
			gainedAmount = maxHealth - health;
			boostStat("health", gainedAmount, "You recover "+gainedAmount+" health.");
			minusItem(object);
			usePotion ( new Object ( {gb:-255,bb:-255} ), "hp", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 1;
		O.cost = 5;
		return ( O );
	}
	else if(object == "superHealthPotion") {
		O.N = "Super Health Potion";
		O.D = "A round vial with a super thick, red liquid inside it. ( Use: + 4 - 11 health, Lvl: 3 )";
		O.U = function() {
			if ( level < 3 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 4 + random(12);
			if(health + gainedAmount > maxHealth)
			gainedAmount = maxHealth - health;
			boostStat("health", gainedAmount, "You recover "+gainedAmount+" health.");
			minusItem(object);
			usePotion ( new Object ( {gb:-255,bb:-255} ), "hp", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 3;
		O.cost = 10;
		return ( O );
	}
	else if(object == "greaterHealthPotion") {
		O.N = "Greater Health Potion";
		O.D = "A large round vial, with a very heavy red liquid inside it. It has two drinking spots. ( Use: + 10 - 25 health, Lvl: 5 )";
		O.U = function() {
			if ( level < 5 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 10 + random(16);
			if(health + gainedAmount > maxHealth)
			gainedAmount = maxHealth - health;
			boostStat("health", gainedAmount, "You recover "+gainedAmount+" health.");
			minusItem(object);
			usePotion ( new Object ( {gb:-255,bb:-255} ), "hp", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 5;
		O.cost = 25;
		return ( O );
	}
	else if(object == "omegaHealthPotion") {
		O.N = "Omega Health Potion";
		O.D = "A large round vial, with an extreamly heavy red liquid inside it. It has three drinking spots. ( Use: + 25 - 65 health, Lvl: 10 )";
		O.U = function() {
			if ( level < 10 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 25 + random(41);
			if(health + gainedAmount > maxHealth)
			gainedAmount = maxHealth - health;
			boostStat("health", gainedAmount, "You recover "+gainedAmount+" health.");
			minusItem(object);
			usePotion ( new Object ( {gb:-255,bb:-255} ), "hp", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 10;
		O.cost = 75;
		return ( O );
	}
	else if(object == "ultimateHealthPotion") {
		O.N = "Ultimate Health Potion";
		O.D = "A large round vial, with an intense, heavy red liquid inside it. It has three drinking spots. ( Use: + 50 - 150 health, Lvl: 20 )";
		O.U = function() {
			if ( level < 20 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 50 + random(101);
			if(health + gainedAmount > maxHealth)
			gainedAmount = maxHealth - health;
			boostStat("health", gainedAmount, "You recover "+gainedAmount+" health.");
			minusItem(object);
			usePotion ( new Object ( {gb:-255,bb:-255} ), "hp", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 20;
		O.cost = 150;
		return ( O );
	}
	else if(object == "focusPotion") {
		O.N = "Energy Potion";
		O.D = "A round vial with a thick, blue liquid inside it. ( Use: + 2 - 8 energy, Lvl: 1 )";
		O.U = function() {
			var gainedAmount = 2 + random(9);
			if(energy + gainedAmount > maxEnergy)
			gainedAmount = maxEnergy - energy;
			boostStat("energy", gainedAmount, "You recover "+gainedAmount+" energy.");
			minusItem(object);
			usePotion ( new Object ({gb:-255,rb:-255}), "ep", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 1;
		O.cost = 5;
		return ( O );
	}
	else if(object == "superFocusPotion") {
		O.N = "Super Energy Potion";
		O.D = "A round vial with a super thick, blue liquid inside it. ( Use: + 3 - 13 energy, Lvl: 3 )";
		O.U = function() {
			if ( level < 3 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 3 + random(11);
			if(energy + gainedAmount > maxEnergy)
			gainedAmount = maxEnergy - energy;
			boostStat("energy", gainedAmount, "You recover "+gainedAmount+" energy.");
			minusItem(object);
			usePotion ( new Object ({gb:-255,rb:-255}), "ep", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 3;
		O.cost = 10;
		return ( O );
	}
	else if(object == "greaterFocusPotion") {
		O.N = "Greater Energy Potion";
		O.D = "A large round vial with a very heavy blue liquid inside it. It has two drinking spots.  ( Use: + 10 - 35 energy, Lvl: 5 )";
		O.U = function() {
			if ( level < 5 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 10 + random(26);
			if(energy + gainedAmount > maxEnergy)
			gainedAmount = maxEnergy - energy;
			boostStat("energy", gainedAmount, "You recover "+gainedAmount+" energy.");
			minusItem(object);
			usePotion ( new Object ({gb:-255,rb:-255}), "ep", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 5;
		O.cost = 30;
		return ( O );
	}
	else if(object == "omegaFocusPotion") {
		O.N = "Omega Enegy Potion";
		O.D = "A large round vial with an extreamly heavy blue liquid inside it. It has three drinking spots.  ( Use: + 35 - 90 energy, Lvl: 10 )";
		O.U = function() {
			if ( level < 10 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 35 + random(56);
			if(energy + gainedAmount > maxEnergy)
			gainedAmount = maxEnergy - energy;
			boostStat("energy", gainedAmount, "You recover "+gainedAmount+" energy.");
			minusItem(object);
			usePotion ( new Object ({gb:-255,rb:-255}), "ep", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 10;
		O.cost = 75;
		return ( O );
	}
	else if(object == "ultimateFocusPotion") {
		O.N = "Ultimate Enegy Potion";
		O.D = "A large round vial with a intense, heavy blue liquid inside it. It has three drinking spots.  ( Use: + 100 - 200 energy, Lvl: 20 )";
		O.U = function() {
			if ( level < 20 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 100 + random(201);
			if(energy + gainedAmount > maxEnergy)
			gainedAmount = maxEnergy - energy;
			boostStat("energy", gainedAmount, "You recover "+gainedAmount+" energy.");
			minusItem(object);
			usePotion ( new Object ({gb:-255,rb:-255}), "ep", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 20;
		O.cost = 150;
		return ( O );
	}
	else if(object == "energyPotion") {
		O.N = "Focus Potion";
		O.D = "A round vial with a thick, cyan liquid inside it. ( Lvl: 1, Use: + 3 focus [ 1 battle ] )";
		O.U = function() {
			var gainedAmount = 3;
			boostStat("focus", gainedAmount, "Your focus has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({rb:-255}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 1;
		O.cost = 16;
		return ( O );
	}
	else if(object == "greaterEnergyPotion") {
		O.N = "Greater Focus Potion";
		O.D = "A round vial with a very thick, cyan liquid inside it. ( Lvl: 7, Use: + 8 focus [ 1 battle ] )";
		O.U = function() {
			var gainedAmount = 8;
			if ( level < 7 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			boostStat("focus", gainedAmount, "Your focus has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({rb:-255}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 7;
		O.cost = 100;
		return ( O );
	}
	else if(object == "omegaEnergyPotion") {
		O.N = "Omega Focus Potion";
		O.D = "A round vial with an extreamly thick, cyan liquid inside it. ( Lvl: 15, Use: + 14 focus [ 1 battle ] )";
		O.U = function() {
			if ( level < 7 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 14;
			boostStat("focus", gainedAmount, "Your focus has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({rb:-255}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 7;
		O.cost = 235;
		return ( O );
	}
	else if(object == "ultimateEnergyPotion") {
		O.N = "Ultimate Focus Potion";
		O.D = "A round vial with a massively thick, cyan liquid inside it. ( Lvl: 25, Use: + 20 focus [ 1 battle ] )";
		O.U = function() {
			if ( level < 25 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 20;
			boostStat("focus", gainedAmount, "Your focus has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({rb:-255}), "pot", gainedAmount, field.pro, hero_mc );
		};
		O.Rlevel = 25;
		O.cost = 425;
		return ( O );
	}
	else if(object == "strengthPotion") {
		O.N = "Strength Potion";
		O.D = "A round vial with a strange looking yellow liquid inside. ( Lvl: 1, Use: + 3 strength [ 1 battle ] )";
		O.U = function ( )
		{
			var gainedAmount = 3;
			boostStat("strength", gainedAmount, "Your strength has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255}), "pot", gainedAmount, field.pro, hero_mc );
			return;
		}
		O.Rlevel = 1;
		O.cost = 16;
		return ( O );
	}
	else if(object == "greaterStrengthPotion") {
		O.N = "Greater Strength Potion";
		O.D = "A round vial with a very strange looking yellow liquid inside. ( Lvl: 7, Use: + 8 strength [ 1 battle ] )";
		O.U = function ( )
		{
			if ( level < 7 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 8;
			boostStat("strength", gainedAmount, "Your strength has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255}), "pot", gainedAmount, field.pro, hero_mc );
			return;
		}
		O.Rlevel = 7;
		O.cost = 100;
		return ( O );
	}
	else if(object == "omegaStrengthPotion") {
		O.N = "Omega Strength Potion";
		O.D = "A round vial with an extreamly strange looking yellow liquid inside. ( Lvl: 15, Use: + 14 strength [ 1 battle ] )";
		O.U = function ( )
		{
			if ( level < 15 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 14;
			boostStat("strength", gainedAmount, "Your strength has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255}), "pot", gainedAmount, field.pro, hero_mc );
			return;
		}
		O.Rlevel = 15;
		O.cost = 235;
		return ( O );
	}
	else if(object == "ultimateStrengthPotion") {
		O.N = "Ultimate Strength Potion";
		O.D = "A round vial with an massively strange looking yellow liquid inside. ( Lvl: 25, Use: + 20 strength [ 1 battle ] )";
		O.U = function ( )
		{
			if ( level < 25 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 20;
			boostStat("strength", gainedAmount, "Your strength has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({bb:-255}), "pot", gainedAmount, field.pro, hero_mc );
			return;
		}
		O.Rlevel = 25;
		O.cost = 425;
		return ( O );
	}
	else if(object == "defencePotion") {
		O.N = "Defence Potion";
		O.D = "A round vial with a strange looking green liquid inside. ( Lvl: 1, Use: + 3 defence [ 1 battle ] )";
		O.U = function ( )
		{
			var gainedAmount = 3;
			boostStat("defence", gainedAmount, "Your defence has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({rb:-255, bb:-255}), "pot", gainedAmount, field.pro, hero_mc );
			return;
		}
		O.Rlevel = 1;
		O.cost = 20;
		return ( O );

	}
	else if(object == "greaterDefencePotion") {
		O.N = "Greater Defence Potion";
		O.D = "A round vial with a very strange looking green liquid inside. ( Lvl: 8, Use: + 10 defence [ 1 battle ] )";
		O.U = function ( )
		{
			if ( level < 8 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 10;
			boostStat("defence", gainedAmount, "Your defence has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({rb:-255, bb:-255}), "pot", gainedAmount, field.pro, hero_mc );
			return;
		}
		O.Rlevel = 8;
		O.cost = 110;
		return ( O );
	}
	else if(object == "omegaDefencePotion") {
		O.N = "Omega Defence Potion";
		O.D = "A round vial with an extreamly strange looking green liquid inside. ( Lvl: 19, Use: + 25 defence [ 1 battle ] )";
		O.U = function ( )
		{
			if ( level < 19 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 25;
			boostStat("defence", gainedAmount, "Your defence has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({rb:-255, bb:-255}), "pot", gainedAmount, field.pro, hero_mc );
			return;
		}
		O.Rlevel = 19;
		O.cost = 565;
		return ( O );
	}
	else if(object == "ultimateDefencePotion") {
		O.N = "Ultimate Defence Potion";
		O.D = "A round vial with a massively strange looking green liquid inside. ( Lvl: 28, Use: + 40 defence [ 1 battle ] )";
		O.U = function ( )
		{
			if ( level < 28 ) {
				smallMessage ( "You aren't high enough level to use this.", _fps * 3 );
				return;
			}
			var gainedAmount = 40;
			boostStat("defence", gainedAmount, "Your defence has been increased by " + gainedAmount + " until the end of battle.");
			minusItem(object);
			usePotion ( new Object ({rb:-255, bb:-255}), "pot", gainedAmount, field.pro, hero_mc );
			return;
		}
		O.Rlevel = 28;
		O.cost = 1100;
		return ( O );
	}
	// Boots
	else if(object == "woodenBoots") {
		O.equipSound = "SFX_EquipItemWood";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 3;
		O.N = "Wooden Boots";
		O.D = "Uncomfortable wooden boots. (Lvl: 4, Slot: F, Def: 3)";
		O.S = "feet";
		O.Rlevel = 4;
		O.cost = 75;
		return ( O );
	}
	else if(object == "critBoots") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 0;
		O.N = "Crit Boots";
		O.D = "They look special. (Lvl: 8, Slot: F, Spe: CRIT [+2% Chance])";
		O.S = "feet";
		O.Rlevel = 8;
		O.cost = 4800;
		return ( O );
	}
	else if(object == "regenBoots") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 0;
		O.N = "Regen Boots";
		O.D = "They look special. (Lvl: 14, Slot: F, Spe: REGEN [+2 Health, every turn])";
		O.S = "feet";
		O.Rlevel = 14;
		O.cost = 5000;
		return ( O );
	}
	else if(object == "combatBoots") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 3;
		O.focus = 0;
		O.evasion = 3;
		O.endurance = 1;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 6;
		O.N = "Combat Boots";
		O.D = "These boots will make me more suit for combat. (Lvl: 5, Slot: F, Str: 3, Eva: 3, End: 1, Def: 6)";
		O.S = "feet";
		O.Rlevel = 5;
		O.cost = 220;
		return ( O );
	}
	else if(object == "fightingBoots") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 9;
		O.focus = 0;
		O.evasion = 7;
		O.endurance = 3;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 10;
		O.N = "Fighting Boots";
		O.D = "These boots will make me more suit for fighting. (Lvl: 13, Slot: F, Str: 9, Eva: 7, End: 3, Def: 10)";
		O.S = "feet";
		O.Rlevel = 13;
		O.cost = 850;
		return ( O );
	}
	else if(object == "softBoots") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 3;
		O.evasion = 3;
		O.endurance = 0;
		O.stamina = 1;
		O.damage = 0;
		O.defence = 5;
		O.N = "Soft Boots";
		O.D = "These boots will allow me to focus faster. (Lvl: 5, Slot: F, Foc: 3, Eva: 3, Sta: 1, Def: 5)";
		O.S = "feet";
		O.Rlevel = 5;
		O.cost = 215;
		return ( O );
	}
	else if(object == "focusBoots") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 9;
		O.evasion = 7;
		O.endurance = 0;
		O.stamina = 4;
		O.damage = 0;
		O.defence = 8;
		O.N = "Focus Boots";
		O.D = "These boots will allow me to focus faster, and better. (Lvl: 13, Slot: F, Foc: 9, Eva: 7, Sta: 4, Def: 8)";
		O.S = "feet";
		O.Rlevel = 13;
		O.cost = 800;
		return ( O );
	}
	else if(object == "brainBoots") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 18;
		O.evasion = 12;
		O.endurance = 0;
		O.stamina = 10;
		O.damage = 0;
		O.defence = 15;
		O.N = "Brain Boots";
		O.D = "These boots will enhance my brain power. (Lvl: 20, Slot: F, Foc: 18, Eva: 12, Sta: 10, Def: 15)";
		O.S = "feet";
		O.Rlevel = 20;
		O.cost = 2000;
		return ( O );
	}
	else if(object == "warBoots") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 20;
		O.focus = 0;
		O.evasion = 13;
		O.endurance = 9;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 20;
		O.N = "War Boots";
		O.D = "These boots will make me more prepared for war. (Lvl: 20, Slot: F, Str: 20, Eva: 13, End: 9, Def: 20)";
		O.S = "feet";
		O.Rlevel = 20;
		O.cost = 2222;
		return ( O );
	}
	else if(object == "combatBoots") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 3;
		O.evasion = 3;
		O.endurance = 0;
		O.stamina = 2;
		O.damage = 0;
		O.defence = 3;
		O.N = "Soft Boots";
		O.D = "These boots will make me more comfortable, and allow me to concentrate. (Lvl: 5, Slot: F, Foc: 3, Eva: 3, Sta: 2, Def: 3)";
		O.S = "feet";
		O.Rlevel = 5;
		O.cost = 200;
		return ( O );
	}
	else if(object == "alanBoots") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 2;
		O.focus = 2;
		O.evasion = 2;
		O.endurance = 2;
		O.stamina = 2;
		O.damage = 2;
		O.defence = 10;
		O.N = "Alan Boots";
		O.D = "A flawless pair or boots created by the greatest warrior ever to exist. (Lvl: 40, Slot: F, Def: 8, All: 2)";
		O.S = "feet";
		O.Rlevel = 40;
		O.cost = 14200;
		return ( O );
	}
	else if(object == "regenGloves") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 0;
		O.N = "Regen Gloves";
		O.D = "They look special. (Lvl: 13, Slot: Ha, Spe: REGEN [+2 Energy, every turn])";
		O.S = "hands";
		O.Rlevel = 13;
		O.cost = 5000;
		return ( O );
	}
	else if(object == "alanGloves") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 4;
		O.focus = 4;
		O.evasion = 4;
		O.endurance = 4;
		O.stamina = 4;
		O.damage = 4;
		O.defence = 20;
		O.N = "Alan Gloves";
		O.D = "A flawless pair or gloves created by the greatest warrior ever to exist. (Lvl: 40, Slot: Ha, Def: 16, All: 4)";
		O.S = "feet";
		O.Rlevel = 40;
		O.cost = 15000;
		return ( O );
	}
	else if(object == "rockBoots") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 5;
		O.N = "Rock Boots";
		O.D = "Uncomfortable rock boots. (Lvl: 5, Slot: F, Def: 5)";
		O.S = "feet";
		O.Rlevel = 5;
		O.cost = 100;
		return ( O );
	}
	else if(object == "grassBoots") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 1;
		O.damage = 0;
		O.defence = 9;
		O.N = "Grass Boots";
		O.D = "Very well made grass boots. (Lvl: 10, Slot: F, Def: 9, Sta: 1)";
		O.S = "feet";
		O.Rlevel = 10;
		O.cost = 250;
		return ( O );
	}
	// Gloves
	else if(object == "woodenGloves") {
		O.equipSound = "SFX_EquipItemWood";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 2;
		O.N = "Wooden Gloves";
		O.D = "Uncomfortable wooden gloves. (Lvl: 4, Slot: Ha, Def: 2)";
		O.S = "hands";
		O.Rlevel = 4;
		O.cost = 50;
		return ( O );
	}
	else if(object == "critGloves") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 0;
		O.N = "Crit Gloves";
		O.D = "They look special. (Lvl: 9, Slot: G, Spe: CRIT [+3% Chance])";
		O.S = "hands";
		O.Rlevel = 8;
		O.cost = 5000;
		return ( O );
	}
	else if(object == "combatGloves") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 4;
		O.focus = 0;
		O.evasion = 1;
		O.endurance = 1;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 2;
		O.N = "Combat Gloves";
		O.D = "These will make me more prepared for combat. (Lvl: 5, Slot: G, Str: 4, Eva: 1, End: 1, Def: 2";
		O.S = "hands";
		O.Rlevel = 5;
		O.cost = 300;
		return ( O );
	}
	else if(object == "fightingGloves") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 10;
		O.focus = 0;
		O.evasion = 3;
		O.endurance = 2;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 5;
		O.N = "Fighting Gloves";
		O.D = "These will make me more prepared for fighting. (Lvl: 13, Slot: G, Str: 10, Eva: 3, End: 2, Def: 5";
		O.S = "hands";
		O.Rlevel = 13;
		O.cost = 1000;
		return ( O );
	}
	else if(object == "warGloves") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 23;
		O.focus = 0;
		O.evasion = 6;
		O.endurance = 5;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 10;
		O.N = "War Gloves";
		O.D = "These will make me more prepared for war. (Lvl: 20, Slot: G, Str: 23, Eva: 6, End: 5, Def: 10";
		O.S = "hands";
		O.Rlevel = 20;
		O.cost = 2680;
		return ( O );
	}
	else if(object == "focusGloves") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 10;
		O.evasion = 3;
		O.endurance = 0;
		O.stamina = 3;
		O.damage = 0;
		O.defence = 4;
		O.N = "Focus Gloves";
		O.D = "These will allow me to focus faster, and better. (Lvl: 13, Slot: G, Foc: 10, Eva: 3, Sta: 3, Def: 4";
		O.S = "hands";
		O.Rlevel = 13;
		O.cost = 920;
		return ( O );
	}
	else if(object == "brainGloves") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 21;
		O.evasion = 5;
		O.endurance = 0;
		O.stamina = 7;
		O.damage = 0;
		O.defence = 8;
		O.N = "Brain Gloves";
		O.D = "These will enhance my brain power. (Lvl: 20, Slot: G, Str: 21, Eva: 5, Sta: 7, Def: 8";
		O.S = "hands";
		O.Rlevel = 20;
		O.cost = 2500;
		return ( O );
	}
	else if(object == "softGloves") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 4;
		O.evasion = 1;
		O.endurance = 0;
		O.stamina = 1;
		O.damage = 0;
		O.defence = 2;
		O.N = "Soft Gloves";
		O.D = "These will allow me to be comfortable, and concentrate. (Lvl: 5, Slot: G, Foc: 4, Eva: 1, Sta: 1, Def: 2";
		O.S = "hands";
		O.Rlevel = 5;
		O.cost = 250;
		return ( O );
	}
	else if(object == "rockGloves") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 4;
		O.N = "Rock Gloves";
		O.D = "Uncomfortable rock gloves. (Lvl: 5, Slot: Ha, Def: 4)";
		O.S = "hands";
		O.Rlevel = 5;
		O.cost = 80;
		return ( O );
	}
	else if(object == "grassGloves") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 1;
		O.damage = 0;
		O.defence = 7;
		O.N = "Grass Gloves";
		O.D = "Well made grass gloves. (Lvl: 10, Slot: Ha, Def: 7, Sta: 1)";
		O.S = "hands";
		O.Rlevel = 10;
		O.cost = 220;
		return ( O );
	}
	// Necklaces
	else if(object == "woodenNecklace") {
		O.equipSound = "SFX_EquipItemWood";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 1;
		O.N = "Wooden Necklace";
		O.D = "A wooden necklace. (Lvl: 4, Slot: N, Def: 1)";
		O.S = "necklace";
		O.Rlevel = 4;
		O.cost = 100;
		return ( O );
	}
	else if(object == "luckyNecklace") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 0;
		O.N = "Lucky Necklace";
		O.D = "It looks special. (Lvl: 4, Slot: N, Use: Increase chance to get more loot from battles)";
		O.S = "necklace";
		O.Rlevel = 5;
		O.cost = 2000;
		return ( O );
	}
	else if(object == "critNecklace") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 0;
		O.N = "Crit Necklace";
		O.D = "It looks special. (Lvl: 11, Slot: N, Spe: CRIT [+6% Chance])";
		O.S = "necklace";
		O.Rlevel = 11;
		O.cost = 6000;
		return ( O );
	}
	else if(object == "experienceNecklace") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 0;
		O.N = "Experience Necklace";
		O.D = "It looks special. (Lvl: 1, Slot: N, Spe: EXP [+50% Experience])";
		O.S = "necklace";
		O.Rlevel = 1;
		O.cost = 13337;
		return ( O );
	}
	else if(object == "battlesNecklace") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 0;
		O.N = "Battles Necklace";
		O.D = "It looks special. (Lvl: 1, Slot: N, Spe: ANTI [-50% Chance of random battles])";
		O.S = "necklace";
		O.Rlevel = 1;
		O.cost = 5000;
		return ( O );
	}
	else if(object == "alanBoots") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 7;
		O.focus = 7;
		O.evasion = 7;
		O.endurance = 7;
		O.stamina = 7;
		O.damage = 7;
		O.defence = 30;
		O.N = "Alan Necklace";
		O.D = "A flawless necklace created by the greatest warrior ever to exist. (Lvl: 40, Slot: N, Def: 23, All: 7)";
		O.S = "feet";
		O.Rlevel = 40;
		O.cost = 20000;
		return ( O );
	}
	else if(object == "rockNecklace") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 1;
		O.focus = -1;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 2;
		O.N = "Rock Necklace";
		O.D = "A rock necklace. (Lvl: 5, Slot: N, Def: 2, Str: 1, Foc: -1)";
		O.S = "necklace";
		O.Rlevel = 5;
		O.cost = 145;
		return ( O );
	}
	else if(object == "grassNecklace") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 2;
		O.damage = 0;
		O.defence = 3;
		O.N = "Grass Necklace";
		O.D = " A very powerful grass necklace (Lvl: 11, Slot: N, Def: 3, Sta: 2)";
		O.S = "necklace";
		O.Rlevel = 11;
		O.cost = 300;
		return ( O );
	}
	// Rings
	else if(object == "woodenRings") {
		O.equipSound = "SFX_EquipItemWood";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 1;
		O.N = "Wooden Rings";
		O.D = "Uncomfortable wooden rings. (Lvl: 4, Slot: R, Def: 1)";
		O.S = "rings";
		O.Rlevel = 4;
		O.cost = 95;
		return ( O );
	}
	else if(object == "critRings") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 0;
		O.N = "Crit Rings";
		O.D = "They look special. (Lvl: 10, Slot: R, Spe: CRIT [+4% Chance])";
		O.S = "rings";
		O.Rlevel = 10;
		O.cost = 5500;
		return ( O );
	}
	else if(object == "rageRings") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 13;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 5;
		O.defence = -25;
		O.N = "Rage Rings";
		O.D = "I wonder how I would act with these on. (Lvl: 10, Slot: R, Str: 13, Dmg: 5, Def: -50)";
		O.S = "rings";
		O.Rlevel = 10;
		O.cost = 2000;
		return ( O );
	}
	else if(object == "mentalRageRings") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 14;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = -25;
		O.N = "Mental Rage Rings";
		O.D = "I wonder how I would act with these on. (Lvl: 10, Slot: R, Foc: 22, Dmg: 5, Def: -50)";
		O.S = "rings";
		O.Rlevel = 10;
		O.cost = 2260;
		return ( O );
	}
	else if(object == "shieldedRings") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 10;
		O.N = "Shielded Rings";
		O.D = "They look shielded to me. (Lvl: 16, Slot: R, Def: 10)";
		O.S = "rings";
		O.Rlevel = 16;
		O.cost = 1250;
		return ( O );
	}
	else if(object == "goldRings") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 0;
		O.N = "Gold Rings";
		O.D = "They look special. (Lvl: 5, Slot: R, Spe: GOLD [+50% Gold])";
		O.S = "rings";
		O.Rlevel = 5;
		O.cost = 6650;
		return ( O );
	}
	else if(object == "alanRings") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 3;
		O.focus = 3;
		O.evasion = 3;
		O.endurance = 3;
		O.stamina = 3;
		O.damage = 3;
		O.defence = 10;
		O.N = "Alan Rings";
		O.D = "A flawless pair or rings created by the greatest warrior ever to exist. (Lvl: 40, Slot: R, Def: 7, All: 3)";
		O.S = "feet";
		O.Rlevel = 40;
		O.cost = 11205;
		return ( O );
	}
	else if(object == "rockRings") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 2;
		O.N = "Rock Rings";
		O.D = "Uncomfortable rock rings. (Lvl: 5, Slot: R, Def: 2)";
		O.S = "rings";
		O.Rlevel = 5;
		O.cost = 125;
		return ( O );
	}
	else if(object == "grassRings") {
		O.equipSound = "SFX_EquipItem";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 1;
		O.damage = 0;
		O.defence = 3;
		O.N = "Grass Rings";
		O.D = "Well made grass rings. (Lvl: 11, Slot: R, Def: 3, Sta: 1)";
		O.S = "rings";
		O.Rlevel = 11;
		O.cost = 250;
		return ( O );
	}
	// shields
	else if(object == "sirusShield") {
		O.equipSound = "SFX_EquipWeapon";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 3;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 18;
		O.N = "Sirus Shield";
		O.D = "A very powerful shield. ( Lvl: 15, Slot: OH, Def: 18, Eva: 3 )";
		O.S = "offHand";
		O.Rlevel = 15;
		O.cost = 750;
		return ( O );
	}
	else if(object == "stoniteShield") {
		O.equipSound = "SFX_EquipWeapon";
		O.strength = 20;
		O.focus = 20;
		O.evasion = 5;
		O.endurance = 20;
		O.stamina = 20;
		O.damage = 20;
		O.defence = 80;
		O.N = "Stonite Shield";
		O.D = "The Stonite Shield ( Lvl: 30, Slot: OH, Def: 60, All: 20, Eva: -15 )";
		O.S = "offHand";
		O.Rlevel = 30;
		O.cost = 99999;
		return ( O );
	}
	else if(object == "jacksShield") {
		O.equipSound = "SFX_EquipWeapon";
		O.strength = 0;
		O.focus = 3;
		O.evasion = 0;
		O.endurance = 1;
		O.stamina = 1;
		O.damage = 0;
		O.defence = 14;
		O.N = "Jack's Shield";
		O.D = "A very powerful shield. ( Lvl: 7, Slot: OH, Def: 14, Foc: 3, End: 1, Sta: 1 )";
		O.S = "offHand";
		O.Rlevel = 7;
		O.cost = 550;
		return ( O );
	}
	else if(object == "runeShield") {
		O.equipSound = "SFX_EquipWeapon";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 9;
		O.N = "Rune Shield";
		O.D = "A shield forged with rune, a very rare material. ( Lvl: 10 Slot: OH, Def: 9 )";
		O.S = "offHand";
		O.Rlevel = 10;
		O.cost = 425;
		return ( O );
	}
	else if(object == "grassShield") {
		O.equipSound = "SFX_EquipWeapon";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 1;
		O.damage = 0;
		O.defence = 13;
		O.N = "Grass Shield";
		O.D = "A strong grass shield. ( Lvl: 12, Slot: OH, Def: 13, Sta: 1 )";
		O.S = "offHand";
		O.Rlevel = 12;
		O.cost = 425;
		return ( O );
	}
	else if(object == "wavesShield") {
		O.equipSound = "SFX_EquipWeapon";
		O.strength = 0;
		O.focus = 2;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 20;
		O.N = "Waves Shield";
		O.D = "A well made shield made from metal and waves of the ocean. ( Lvl: 18, Slot: OH, Def: 20, Foc: 2 )";
		O.S = "offHand";
		O.Rlevel = 18;
		O.cost = 2200;
		return ( O );
	}
	else if(object == "flamesSheild") {
		O.equipSound = "SFX_EquipWeapon";
		O.strength = 2;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 33;
		O.N = "Flames Shield";
		O.D = "A well made shield made from metal and flames of the oven. ( Lvl: 24, Slot: OH, Def: 33, Str: 2 )";
		O.S = "offHand";
		O.Rlevel = 24;
		O.cost = 4050;
		return ( O );
	}
	else if(object == "windShield") {
		O.equipSound = "SFX_EquipWeapon";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 2;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 40;
		O.N = "Wind Shield";
		O.D = "A well made shield made from metal and the strongest winds. ( Lvl: 30, Slot: OH, Def: 40, Eva: 2 )";
		O.S = "offHand";
		O.Rlevel = 30;
		O.cost = 6000;
		return ( O );
	}
	else if(object == "alanShield") {
		O.equipSound = "SFX_EquipWeapon";
		O.strength = 10;
		O.focus = 10;
		O.evasion = 10;
		O.endurance = 10;
		O.stamina = 10;
		O.damage = 10;
		O.defence = 95;
		O.N = "Alan Shield";
		O.D = "A flawless shield created by the greatest warrior ever to exist. ( Lvl: 40, Slot: OH, Def: 85, All: 10 )";
		O.S = "offHand";
		O.Rlevel = 40;
		O.cost = 10000;
		return ( O );
	}
	else if(object == "woodenShield") {
		O.equipSound = "SFX_EquipItemWood";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 3;
		O.N = "Wooden Shield";
		O.D = "A sturdy brown, small wooden shield. ( Slot: OH, Def: 3, Lvl: 1 )";
		O.S = "offHand";
		O.Rlevel = 1;
		O.cost = 20;
		return ( O );
	}
	else if(object == "rockShield") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 1;
		O.focus = -1;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 10;
		O.N = "Rock Shield";
		O.D = "A shield made out of rocks. (Lvl: 1, Slot: OH, Def: 10, Str: 1, Foc: -1 )";
		O.S = "offHand";
		O.Rlevel = 5;
		O.cost = 100;
		return ( O );
	}
	else if(object == "superRockShield") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 3;
		O.focus = -4;
		O.evasion = 0;
		O.endurance = -1;
		O.stamina = -1;
		O.damage = 2;
		O.defence = 16;
		O.N = "Super Rock Shield";
		O.D = "A shield made out of super rocks. (Lvl: 8, Slot: OH, Dmg: 2, Def: 16, End: -1, Sta: -1 Str: 3, Foc: -4 )";
		O.S = "offHand";
		O.Rlevel = 8;
		O.cost = 550;
		return ( O );
	}
	else if(object == "oakShield") {
		O.equipSound = "SFX_EquipItemWood";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 5;
		O.N = "Oak Shield";
		O.D = "A well-made, oak shield. It looks like it will defend well. ( Slot: OH, Def: 5, Lvl: 3 )";
		O.S = "offHand";
		O.Rlevel = 3;
		O.cost = 55;
		return ( O );
	}
	else if(object == "steelShield") {
		O.equipSound = "SFX_EquipWeapon";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 20;
		O.N = "Steel Shield";
		O.D = "A steel shield. ( Lvl: 4 Slot: OH, Def: 20 )";
		O.S = "offHand";
		O.Rlevel = 6;
		O.cost = 390;
		return ( O );
	}
	else if(object == "ironShield") {
		O.equipSound = "SFX_EquipWeapon";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 16;
		O.N = "Iron Shield";
		O.D = "An iron shield. ( Lvl: 4 Slot: OH, Def: 15 )";
		O.S = "offHand";
		O.Rlevel = 4;
		O.cost = 150;
		return ( O );
	}
	// Bodies
	else if ( object == "stonitePlatebody" ) {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 20;
		O.focus = 20;
		O.evasion = 5;
		O.endurance = 20;
		O.stamina = 20;
		O.damage = 20;
		O.defence = 120;
		O.N = "Stonite Platebody";
		O.D = "The Stonite Platebody. ( Lvl: 30, Slot: L, All: 20, Def: 100, Eva: -15 )";
		O.S = "body";
		O.Rlevel = 30;
		O.cost = 99999;
		return ( O );
	}
	else if(object == "sirusPlatebody") {
		O.elementType = "normal";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 1;
		O.focus = 1;
		O.evasion = 4;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 37;
		O.N = "Sirus Platebody";
		O.D = "A very special platebody, made for speed, accuracy, and defence. ( Lvl: 15 Slot: B, Typ: Normal, Def: 37, Str: 1, Foc: 1, Eva: 4 )";
		O.S = "body";
		O.Rlevel = 15;
		O.cost = 3350;
		return ( O );
	}
	else if(object == "runePlatebody") {
		O.elementType = "normal";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 23;
		O.N = "Rune Platebody";
		O.D = "Platebody forged with a very rare material, rune.( Lvl: 10, Typ: Normal, Slot: B, Def: 23 )";
		O.S = "body";
		O.Rlevel = 10;
		O.cost = 1000;
		return ( O );
	}
	else if(object == "grassPlatebody") {
		O.elementType = "grass";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 2;
		O.damage = 0;
		O.defence = 27;
		O.N = "Grass Platebody";
		O.D = "A strong, grass platebody. ( Lvl: 12, Typ: Grass, Slot: B, Def: 27, Sta: 2 )";
		O.S = "body";
		O.Rlevel = 12;
		O.cost = 1350;
		return ( O );
	}
	else if(object == "wavesPlatebody") {
		O.elementType = "water";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 3;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 45;
		O.N = "Waves Platebody";
		O.D = "A well made platebody made from metal and waves of the ocean. ( Lvl: 18, Typ: Water, Slot: B, Def: 45, Foc: 3 )";
		O.S = "body";
		O.Rlevel = 18;
		O.cost = 5000;
		return ( O );
	}
	else if(object == "flamesPlatebody") {
		O.elementType = "fire";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 3;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 58;
		O.N = "Flames Platebody";
		O.D = "A well made platebody made from metal and flames of the oven. ( Lvl: 24, Typ: Fire, Slot: B, Def: 58, Str: 3 )";
		O.S = "body";
		O.Rlevel = 24;
		O.cost = 8500;
		return ( O );
	}
	else if(object == "windPlatebody") {
		O.elementType = "wind";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 4;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 70;
		O.N = "Wind Platebody";
		O.D = "A well made platebody made from metal and the strongest winds. ( Lvl: 30, Typ: Wind, Slot: B, Def: 70, Eva: 4 )";
		O.S = "body";
		O.Rlevel = 30;
		O.cost = 10000;
		return ( O );
	}
	else if(object == "zoroPlatebody") {
		O.elementType = "wind";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 2;
		O.focus = 2;
		O.evasion = 5;
		O.endurance = 2;
		O.stamina = 2;
		O.damage = 2;
		O.defence = 95;
		O.N = "Zoro Platebody";
		O.D = "A platebody found in the stomach of the legendary Zoro Dragon. ( Lvl: 33, Typ: Wind, Slot: B, Def: 95, Eva: 3, All: 2 )";
		O.S = "body";
		O.Rlevel = 35;
		O.cost = 14200;
		return ( O );
	}
	else if(object == "alanPlatebody") {
		O.elementType = "normal";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 15;
		O.focus = 15;
		O.evasion = 15;
		O.endurance = 15;
		O.stamina = 15;
		O.damage = 15;
		O.defence = 130;
		O.N = "Alan Platebody";
		O.D = "A flawless platebody created by the greatest warrior ever to exist. ( Lvl: 40, Typ: Normal, Slot: B, Def: 115, All: 15 )";
		O.S = "body";
		O.Rlevel = 40;
		O.cost = 16544;
		return ( O );
	}
	else if(object == "steelPlatebody") {
		O.elementType = "normal";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 18;
		O.N = "Steel Platebody";
		O.D = "A steel platebody. ( Lvl: 6 Typ: Normal, Slot: B, Def: 18 )";
		O.S = "body";
		O.Rlevel = 6;
		O.cost = 600;
		return ( O );
	}
	else if(object == "woodenPlatebody") {
		O.elementType = "earth";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 13;
		O.N = "Wooden Platebody";
		O.D = "A very uncomfortable platebody made out of wood. ( Lvl: 4, Typ: Earth, Slot: B, Def: 13 )";
		O.S = "body";
		O.Rlevel = 4;
		O.cost = 400;
		return ( O );
	}
	else if(object == "rockPlatebody") {
		O.elementType = "earth";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 1;
		O.focus = -1;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 15;
		O.N = "Rock Platebody";
		O.D = "A rock platebody. This sure will be comfortable. ( Lvl: 5, Typ: Earth, Slot: B, Def: 15, Str: 1, Foc: -1 )";
		O.S = "body";
		O.Rlevel = 5;
		O.cost = 500;
		return ( O );
	}
	else if(object == "clothRobe") {
		O.elementType = "normal";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 5;
		O.N = "Cloth Robe";
		O.D = "A comfortable, smooth robe made out of cloth. ( Lvl: 1, Typ: Normal, Slot: B, Def: 5 )";
		O.S = "body";
		O.Rlevel = 1;
		O.cost = 40;
		return ( O );
	}
	else if(object == "leatherRobe") {
		O.elementType = "normal";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 9;
		O.N = "Leather Robe";
		O.D = "A comfortable, silky robe made out of leather. (Lvl: 3, Typ: Normal, Slot: B, Def: 9 )";
		O.S = "body";
		O.Rlevel = 3;
		O.cost = 90;
		return ( O );
	}
	else if(object == "frogLeatherRobe") {
		O.elementType = "grass";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 2;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 10;
		O.N = "Frog Leather Robe";
		O.D = "A very comfortable robe made out of frog leather. (Lvl: 5, Typ: Grass, Slot: B, Def: 10, Foc: 2 )";
		O.S = "body";
		O.Rlevel = 5;
		O.cost = 200;
		return ( O );
	}
	else if(object == "xiasLeatherRobe") {
		O.elementType = "fire";
		O.equipSound = "SFX_EquipArmor";
		O.strength = 7;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 33;
		O.N = "Xias Leather Robe";
		O.D = "A very comfortable robe made out of Xias leather. (Lvl: 23, Typ: Fire, Slot: B, Def: 33, Str: 7 )";
		O.S = "body";
		O.Rlevel = 22;
		O.cost = 5000;
		return ( O );
	}
	// Heads
	else if(object == "sirusHelmet") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 1;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 19;
		O.N = "Sirus Helmet";
		O.D = "A very special helmet providing speed, and defence. ( Lvl: 15, Slot: He, Def: 12, Eva: 1 )";
		O.S = "head";
		O.Rlevel = 15;
		O.cost = 1000;
		return ( O );
	}
	else if(object == "stoniteHelmet") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 20;
		O.focus = 20;
		O.evasion = 5;
		O.endurance = 20;
		O.stamina = 20;
		O.damage = 20;
		O.defence = 90;
		O.N = "Stonite Helmet";
		O.D = "The Stonite Helmet. ( Lvl: 30, Slot: He, Def: 70, All: 20, Eva: -15 )";
		O.S = "head";
		O.Rlevel = 30;
		O.cost = 99999;
		return ( O );
	}
	else if(object == "runeHelmet") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 14;
		O.N = "Rune Helmet";
		O.D = "Helmet forged with rune, a very rare material. ( Lvl: 10, Slot: He, Def: 14 )";
		O.S = "head";
		O.Rlevel = 10;
		O.cost = 430;
		return ( O );
	}
	else if(object == "grassHelmet") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 1;
		O.damage = 0;
		O.defence = 19;
		O.N = "Grass Helmet";
		O.D = "A strong grass helmet ( Lvl: 12, Slot: He, Def: 19, Sta: 1 )";
		O.S = "head";
		O.Rlevel = 12;
		O.cost = 500;
		return ( O );
	}
	else if(object == "wavesHelmet") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 1;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 25;
		O.N = "Waves Helmet";
		O.D = "A well made helmet made from metal and waves of the ocean. ( Lvl: 18, Slot: He, Def: 25, Foc: 1 )";
		O.S = "head";
		O.Rlevel = 18;
		O.cost = 1750;
		return ( O );
	}
	else if(object == "flamesHelmet") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 1;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 36;
		O.N = "Flames Helmet";
		O.D = "A well made helmet made from metal and flames of the oven. ( Lvl: 24, Slot: He, Def: 36, Str: 1 )";
		O.S = "head";
		O.Rlevel = 24;
		O.cost = 3000;
		return ( O );
	}
	else if(object == "windHelmet") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 2;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 45;
		O.N = "Wind Helmet";
		O.D = "A well made helmet made from metal and the strongest winds. ( Lvl: 30, Slot: He, Def: 45, Eva: 2 )";
		O.S = "head";
		O.Rlevel = 30;
		O.cost = 4210;
		return ( O );
	}
	else if(object == "alanHelmet") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 5;
		O.focus = 5;
		O.evasion = 5;
		O.endurance = 5;
		O.stamina = 5;
		O.damage = 5;
		O.defence = 80;
		O.N = "Alan Helmet";
		O.D = "A flawless helmet created by the greatest warrior ever to exist. ( Lvl: 40, Slot: He, Def: 75, All: 5 )";
		O.S = "head";
		O.Rlevel = 40;
		O.cost = 8500;
		return ( O );
	}
	else if(object == "steelHelmet") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 10;
		O.N = "Steel Helmet";
		O.D = "A basic helmet.  ( Lvl: 6, Slot: He, Def: 10 )";
		O.S = "head";
		O.Rlevel = 6;
		O.cost = 210;
		return ( O );
	}
	else if(object == "woodenHelmet") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0; //E:\Program files\itunes\itunes.resources\en_GB.\proj., e:\program files\aas\lounge lizard 3.0\unwise.exe
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 7;
		O.N = "Wooden Helmet";
		O.D = "A wooden helmet. ( Lvl: 4, Slot: He, Def: 7 )";
		O.S = "head";
		O.Rlevel = 4;
		O.cost = 100;
		return ( O );
	}
	else if(object == "rockHelmet") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 1;
		O.focus = -1;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 9;
		O.N = "Rock Helmet";
		O.D = "A rock helmet. ( Lvl: 8, Slot: He, Def: 9, Str: 1, Foc: -1 )";
		O.S = "head";
		O.Rlevel = 5;
		O.cost = 155;
		return ( O );
	}
	else if(object == "clothHood") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 1;
		O.N = "Cloth Hood";
		O.D = "A cloth hood that will fit snug on the head. ( Lvl: 1, Slot: He, Def: 1 )";
		O.S = "head";
		O.Rlevel = 1;
		O.cost = 10;
		return ( O );
	}
	else if(object == "leatherHood") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 4;
		O.N = "Leather Hood";
		O.D = "A leather hood that will fit snug on the head. ( Lvl: 3, Slot: He, Def: 3 )";
		O.S = "head";
		O.Rlevel = 3;
		O.cost = 39;
		return ( O );
	}
	else if(object == "frogLeatherHood") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 1;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 6;
		O.N = "Frog Leather Hood";
		O.D = "A comfortable frog leather hood. ( Lvl: 5, Slot: He, Def: 6, Foc: 2 )";
		O.S = "head";
		O.Rlevel = 5;
		O.cost = 100;
		return ( O );
	}
	else if(object == "xiasLeatherHood") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 4;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 33;
		O.N = "Xias Leather Hood";
		O.D = "A comfortable frog leather hood. ( Lvl: 23, Slot: He, Def: 33, Str: 4 )";
		O.S = "head";
		O.Rlevel = 23;
		O.cost = 4320;
		return ( O );
	}
	else if(object == "ratHood") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 8;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 1;
		O.N = "Rat Hood";
		O.D = "A rat hood. Gross. ( Lvl: 3, Slot: He, Def: 1, Eva: 8 )";
		O.S = "head";
		O.Rlevel = 3;
		O.cost = 100;
		return ( O );
	}
	// Legs
	else if ( object == "stonitePlatelegs" ) {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 20;
		O.focus = 20;
		O.evasion = 5;
		O.endurance = 20;
		O.stamina = 20;
		O.damage = 20;
		O.defence = 110;
		O.N = "Stonite Platelegs";
		O.D = "The Stonite Platelegs ( Lvl: 30, Slot: L, All: 20, Def: 90, Eva: -15 )";
		O.S = "legs";
		O.Rlevel = 30;
		O.cost = 99999;
		return ( O );
	}
	else if ( object == "sirusPlatelegs" ) {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 3;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 27;
		O.N = "Sirus Platelegs";
		O.D = "A special type of platelegs built for speed, and defence. ( Lvl: 15, Slot: L, Eva: 3, Def: 27 )";
		O.S = "legs";
		O.Rlevel = 15;
		O.cost = 2300;
		return ( O );
	}
	else if ( object == "runePlatelegs" ) {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 16;
		O.N = "Rune Platelegs";
		O.D = "Platelegs forged with a very rare material called rune. ( Lvl: 10, Slot: L, Def: 14 )";
		O.S = "legs";
		O.Rlevel = 10;
		O.cost = 850;
		return ( O );
	}
	else if ( object == "grassPlatelegs" ) {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 1;
		O.damage = 0;
		O.defence = 21;
		O.N = "Grass Platelegs";
		O.D = "A very strong pair of grass platelegs. ( Lvl: 12, Slot: L, Def: 21, Sta: 1 )";
		O.S = "legs";
		O.Rlevel = 12;
		O.cost = 950;
		return ( O );
	}
	else if ( object == "wavesPlatelegs" ) {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 2;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 35;
		O.N = "Waves Platelegs";
		O.D = "A well made pair of platelegs made from metal and waves of the ocean. ( Lvl: 18, Slot: L, Def: 35, Foc: 2 )";
		O.S = "legs";
		O.Rlevel = 18;
		O.cost = 2650;
		return ( O );
	}
	else if ( object == "flamesPlatelegs" ) {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 2;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 44;
		O.N = "Flames Platelegs";
		O.D = "A well made helmet made from metal and flames of the oven. ( Lvl: 24, Slot: L, Def: 44, Str: 2 )";
		O.S = "legs";
		O.Rlevel = 24;
		O.cost = 4000;
		return ( O );
	}
	else if ( object == "windPlatelegs" ) {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 3;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 55;
		O.N = "Wind Platelegs";
		O.D = "A well made pair of platelegs made from metal and the strongest winds. ( Lvl: 30, Slot: L, Def: 55, Eva: 3 )";
		O.S = "legs";
		O.Rlevel = 30;
		O.cost = 5375;
		return ( O );
	}
	else if ( object == "alanPlatelegs" ) {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 12;
		O.focus = 12;
		O.evasion = 12;
		O.endurance = 12;
		O.stamina = 12;
		O.damage = 12;
		O.defence = 107;
		O.N = "Alan Platelegs";
		O.D = "A flawless platebody created by the greatest warrior ever to exist. ( Lvl: 40, Slot: L, Def: 95, All: 12 )";
		O.S = "legs";
		O.Rlevel = 40;
		O.cost = 10000;
		return ( O );
	}
	else if ( object == "steelPlatelegs" ) {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 12;
		O.N = "Steel Platelegs";
		O.D = "A durable pair of steel platelegs. ( Lvl: 6, Slot: L, Def: 12 )";
		O.S = "legs";
		O.Rlevel = 6;
		O.cost = 450;
		return ( O );
	}
	else if ( object == "woodenPlatelegs" ) {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 9;
		O.N = "Wooden Platelegs";
		O.D = "A very uncomfortable pair of wooden platelegs. ( Lvl: 4, Slot: L, Def: 9 )";
		O.S = "legs";
		O.Rlevel = 4;
		O.cost = 240;
		return ( O );
	}
	else if ( object == "rockPlatelegs" ) {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 1;
		O.focus = -1;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 10;
		O.N = "Rock Platelegs";
		O.D = "Sweet platelegs made out of rocks. ( Lvl: 5, Slot: L, Def: 10, Str: 1, Foc: -1 )";
		O.S = "legs";
		O.Rlevel = 5;
		O.cost = 355;
		return ( O );
	}
	else if ( object == "clothLeggings" ) {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 4;
		O.N = "Cloth Leggings";
		O.D = "A nice pair of cloth Leggings. ( Lvl: 1, Slot: L, Def: 4 )";
		O.S = "legs";
		O.Rlevel = 1;
		O.cost = 40;
		return ( O );
	}
	else if(object == "leatherLeggings") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 7;
		O.N = "Leather Leggings";
		O.D = "A nice pair of leather Leggings. ( Lvl: 3, Slot: L, Def: 7 )";
		O.S = "legs";
		O.Rlevel = 3;
		O.cost = 80;
		return ( O );
	}
	else if(object == "frogLeatherLeggings") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 0;
		O.focus = 2;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 9;
		O.N = "Frog Leather Leggings";
		O.D = "A comfortable pair of frog leather leggings. ( Lvl: 5, Slot: L, Def: 9, Foc: 2 )";
		O.S = "legs";
		O.Rlevel = 5;
		O.cost = 130;
		return ( O );
	}
	else if(object == "frogLeatherLeggings") {
		O.equipSound = "SFX_EquipArmor";
		O.strength = 5;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 40;
		O.N = "Xias Leather Leggings";
		O.D = "A comfortable pair of frog leather leggings. ( Lvl: 23, Slot: L, Def: 40, Str: 5 )";
		O.S = "legs";
		O.Rlevel = 23;
		O.cost = 4500;
		return ( O );
	}
	// Weaponss
	else if(object == "stoniteSword") {
		O.equipSound = "SFX_EquipWeapon";
		O.combatStyle = "melee";
		O.elementStyle = "none";
		O.strength = 50;
		O.focus = 20;
		O.evasion = 5;
		O.endurance = 20;
		O.stamina = 20;
		O.damage = 20;
		O.defence = 20;
		O.N = "Stonite Sword";
		O.D = "The Stonite Sword. ( Lvl: 30, Typ: Normal, Slot: MH, Str: 50, All: 20, Eva: -15 )";
		O.S = "mainHand";
		O.Rlevel = 30;
		O.cost = 99999;
		return ( O );
	}
	else if(object == "sirusSword") {
		O.equipSound = "SFX_EquipWeapon";
		O.combatStyle = "melee";
		O.elementStyle = "none";
		O.strength = 10;
		O.focus = 2;
		O.evasion = 4;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 9;
		O.defence = 0;
		O.N = "Sirus Blade";
		O.D = "A very special blade, made for speed, and accuracy. ( Lvl: 10, Typ: Normal, Slot: MH, Dmg: 9, Str: 10, Foc: 2, Eva: 4 )";
		O.S = "mainHand";
		O.Rlevel = 15;
		O.cost = 2000;
		return ( O );
	}
	else if(object == "jacksSword") {
		O.equipSound = "SFX_EquipWeapon";
		O.combatStyle = "melee";
		O.elementStyle = "none";
		O.strength = 8;
		O.focus = 0;
		O.evasion = 4;
		O.endurance = 1;
		O.stamina = 2;
		O.damage = 3;
		O.defence = 0;
		O.N = "Jack's Sword";
		O.D = "The sword jack created and used. It is very powerful. ( Lvl: 7, Typ: Normal, Slot: MH, Dmg: 3, Str: 8, Eva: 4, End: 1, Sta: 2)";
		O.S = "mainHand";
		O.Rlevel = 7;
		O.cost = 550;
		return ( O );
	}
	else if(object == "runeSword") {
		O.equipSound = "SFX_EquipWeapon";
		O.combatStyle = "melee";
		O.elementStyle = "none";
		O.strength = 6;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 5;
		O.defence = 0;
		O.N = "Rune Sword";
		O.D = "This sword is forged with a very powerful material called rune. It's a rare material. ( Lvl: 10, Typ: Normal, Slot: MH, Dmg: 5, Str: 6 )";
		O.S = "mainHand";
		O.Rlevel = 10;
		O.cost = 350;
		return ( O );
	}
	else if(object == "grassSword") {
		O.equipSound = "SFX_EquipWeapon";
		O.combatStyle = "melee";
		O.elementStyle = "grass";
		O.strength = 9;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 1;
		O.damage = 7;
		O.defence = 0;
		O.N = "Grass Sword";
		O.D = "A very powerful sword embedded with the grass element. ( Lvl: 12, Typ: Grass, Slot: MH, Dmg: 7, Str: 9, Sta: 1 )";
		O.S = "mainHand";
		O.Rlevel = 12;
		O.cost = 520;
		return ( O );
	}
	else if(object == "wavesSword") {
		O.equipSound = "SFX_EquipWeapon";
		O.combatStyle = "melee";
		O.elementStyle = "water";
		O.strength = 15;
		O.focus = 2;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 9;
		O.defence = 0;
		O.N = "Waves Sword";
		O.D = "A well made sword made from metal and waves of the ocean. ( Lvl: 18, Typ: Water, Slot: MH, Dmg: 9, Str: 15, Foc: 2 )";
		O.S = "mainHand";
		O.Rlevel = 18;
		O.cost = 2650;
		return ( O );
	}
	else if(object == "flamesSword") {
		O.equipSound = "SFX_EquipWeapon";
		O.combatStyle = "melee";
		O.elementStyle = "fire";
		O.strength = 23;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 11;
		O.defence = 0;
		O.N = "Flames Sword";
		O.D = "A well made shield made from metal and flames of the oven. ( Lvl: 24, Typ: Fire, Slot: MH, Dmg: 11, Str: 23 )";
		O.S = "mainHand";
		O.Rlevel = 24;
		O.cost = 3750;
		return ( O );
	}
	else if(object == "windSword") {
		O.equipSound = "SFX_EquipWeapon";
		O.combatStyle = "melee";
		O.elementStyle = "wind";
		O.strength = 21;
		O.focus = 0;
		O.evasion = 5;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 13;
		O.defence = 0;
		O.N = "Wind Sword";
		O.D = "A well made pair of platelegs made from metal and the strongest winds. ( Lvl: 30, Typ: Wind, Slot: MH, Dmg: 13, Str: 21, Eva: 5 )";
		O.S = "mainHand";
		O.Rlevel = 30;
		O.cost = 5000;
		return ( O );
	}
	else if(object == "alanSword") {
		O.equipSound = "SFX_EquipWeapon";
		O.combatStyle = "melee";
		O.elementStyle = "normal";
		O.strength = 50;
		O.focus = 15;
		O.evasion = 15;
		O.endurance = 15;
		O.stamina = 15;
		O.damage = 35;
		O.defence = 15;
		O.N = "Alan Sword";
		O.D = "A flawless platebody created by the greatest warrior ever to exist. ( Lvl: 40, Typ: Normal, Slot: MH, Dmg: 20, Str: 35, All: 15 )";
		O.S = "mainHand";
		O.Rlevel = 40;
		O.cost = 10000;
		return ( O );
	}
	else if(object == "steelSword") {
		O.equipSound = "SFX_EquipWeapon";
		O.combatStyle = "melee";
		O.elementStyle = "none";
		O.strength = 2;
		O.focus = 0;
		O.evasion = 1;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 2;
		O.defence = 0;
		O.N = "Steel Blade";
		O.D = "This steel blade is sharp, and made by the hands of a noble blacksmith. ( Lvl: 7, Typ: Normal, Slot: MH, Dmg: 2, Str: 2, Eva: 1, Def: 1 )";
		O.S = "mainHand";
		O.Rlevel = 7;
		O.cost = 100;
		return ( O );
	}
	else if(object == "pointedSword") {
		O.equipSound = "SFX_EquipWeapon";
		O.combatStyle = "melee";
		O.elementStyle = "none";
		O.strength = 2;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 1;
		O.defence = 5;
		O.N = "Pointed Sword";
		O.D = "I wouldn't want to get stabbed by this pointed sword. ( Lvl: 5, Typ: Normal, Slot: MH, Dmg: 1, Def: 5 )";
		O.S = "mainHand";
		O.Rlevel = 5;
		O.cost = 60;
		return ( O );
	}
	else if(object == "trainingSword") {
		O.equipSound = "SFX_EquipWeapon";
		O.combatStyle = "melee";
		O.elementStyle = "none";
		O.strength = 1;
		O.focus = 0;
		O.evasion = 2;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 1;
		O.defence = 0;
		O.N = "Training Sword";
		O.D = "I should use this to train with. ( Lvl: 4, Typ: Normal, Slot: MH, Dmg: 1, Eva: 2 )";
		O.S = "mainHand";
		O.Rlevel = 4;
		O.cost = 40;
		return ( O );
	}
	else if(object == "woodenSword") {
		O.equipSound = "SFX_EquipItemWood";
		O.combatStyle = "melee";
		O.elementStyle = "none";
		O.strength = 1;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 1;
		O.defence = 0;
		O.N = "Wooden Sword";
		O.D = "A wooden sword probably made out of wood. ( Lvl: 2, Typ: Normal, Slot: MH, Dmg: 1, Str: 1 )";
		O.S = "mainHand";
		O.Rlevel = 2;
		O.cost = 20;
		return ( O );
	}
	else if(object == "rockSword") {
		O.equipSound = "SFX_EquipWeapon";
		O.combatStyle = "melee";
		O.elementStyle = "earth";
		O.strength = 4;
		O.focus = -3;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 3;
		O.defence = 0;
		O.N = "Rock Sword";
		O.D = "A sharp sword make out of rocks.( Lvl: 2, Typ: Earth, Slot: MH, Dmg: 3, Str: 4, Foc: -3 )";
		O.S = "mainHand";
		O.Rlevel = 5;
		O.cost = 160;
		return ( O );
	}
	else if(object == "superRockSword") {
		O.equipSound = "SFX_EquipWeapon";
		O.combatStyle = "melee";
		O.elementStyle = "earth";
		O.strength = 13;
		O.focus = -5;
		O.evasion = -5;
		O.endurance = -2;
		O.stamina = -2;
		O.damage = 6;
		O.defence = 5;
		O.N = "Super Rock Sword";
		O.D = "A sharp sword make out of super rocks.( Lvl: 8, Typ: Rock, Slot: MH, Dmg: 6, Str: 13, Foc: -5, Eva: -5, End: -2, Sta: -2, Def: 5 )";
		O.S = "mainHand";
		O.Rlevel = 8;
		O.cost = 450;
		return ( O );
	}
	else if(object == "oakStick") {
		O.equipSound = "SFX_EquipItemWood";
		O.combatStyle = "melee";
		O.elementStyle = "none";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 1;
		O.defence = 3;
		O.N = "Oak Stick";
		O.D = "An oak stick probably made out of oak. ( Lvl: 1, Typ: Normal, Slot: MH, Dmg: 1, Def: 3 )";
		O.S = "mainHand";
		O.Rlevel = 1;
		O.cost = 12;
		return ( O );
	}
	else if(object == "woodenStick") {
		O.equipSound = "SFX_EquipItemWood";
		O.combatStyle = "melee";
		O.elementStyle = "none";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 1;
		O.defence = 0;
		O.N = "Wooden Stick";
		O.D = "A wooden stick that probably fell off a tree. ( Lvl: 1, Typ: Normal, Slot: MH, Dmg: 1 )";
		O.S = "mainHand";
		O.Rlevel = 1;
		O.cost = 5;
		return ( O );
	}
	else if(object == "none") {
		O.equipSound = "SFX_EquipItemWood";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 0;
		O.N = "";
		O.D = "";
		O.Rlevel = 0;
		O.cost = 0;
		return ( O );
	}
	else {
		trace("[getObjectData] Object ("+object+") is requiring ("+objectVariable+")");
		O.equipSound = "SFX_EquipArmor";
		O.elementType = "normal";
		O.strength = 0;
		O.focus = 0;
		O.evasion = 0;
		O.endurance = 0;
		O.stamina = 0;
		O.damage = 0;
		O.defence = 0;
		O.N = "";
		O.D = "";
		O.Rlevel = 0;
		O.cost = 0;
		return ( O );
	}
	return ( O );
}

/**
 * Builds an array of data from the AS2 item factory function to use as our database.
 */
function flattenGetObjectDataFuncToArray() {
  myObjectData = [
    getObjectData("DEFAULT"),
    getObjectData("messageToTheKing"),
    getObjectData("fish_0" ),
    getObjectData("fish_1" ),
    getObjectData("fish_2" ),
    getObjectData("fish_3" ),
    getObjectData("fish_4" ),
    getObjectData("fish_5" ),
    getObjectData("fish_6" ),
    getObjectData("fish_7" ),
    getObjectData("fish_8" ),
    getObjectData("orb_none" ),
    getObjectData("orb_oil" ),
    getObjectData("orb_flood" ),
    getObjectData("orb_rock" ),
    getObjectData("orb_grass" ),
    getObjectData("orb_gust" ),
    getObjectData("spell_fire" ),
    getObjectData("spell_greaterFire" ),
    getObjectData("spell_omegaFire" ),
    getObjectData("spell_ultimateFire" ),
    getObjectData("spell_grass" ),
    getObjectData("spell_greaterGrass" ),
    getObjectData("spell_omegaGrass" ),
    getObjectData("spell_ultimateGrass" ),
    getObjectData("spell_water" ),
    getObjectData("spell_greaterWater" ),
    getObjectData("spell_omegaWater" ),
    getObjectData("spell_ultimateWater" ),
    getObjectData("spell_rock" ),
    getObjectData("spell_greaterRock" ),
    getObjectData("spell_omegaRock" ),
    getObjectData("spell_ultimateRock" ),
    getObjectData("spell_wind" ),
    getObjectData("spell_greaterWind" ),
    getObjectData("spell_omegaWind" ),
    getObjectData("spell_ultimateWind" ),
    getObjectData("spell_heal" ),
    getObjectData("spell_greaterHeal" ),
    getObjectData("spell_omegaHeal" ),
    getObjectData("spell_ultimateHeal" ),
    getObjectData("ability_smash" ),
    getObjectData("ability_greaterSmash" ),
    getObjectData("ability_omegaSmash" ),
    getObjectData("ability_ultimateSmash" ),
    getObjectData("ability_stun" ),
    getObjectData("ability_greaterStun" ),
    getObjectData("ability_omegaStun" ),
    getObjectData("ability_ultimateStun" ),
    getObjectData("ability_sapHealth" ),
    getObjectData("ability_greaterSapHealth" ),
    getObjectData("ability_omegaSapHealth" ),
    getObjectData("ability_ultimateSapHealth" ),
    getObjectData("ability_sapEnergy" ),
    getObjectData("ability_greaterSapEnergy" ),
    getObjectData("ability_omegaSapEnergy" ),
    getObjectData("ability_ultimateSapEnergy" ),
    getObjectData("ability_steal" ),
    getObjectData("ability_greaterSteal" ),
    getObjectData("ability_omegaSteal" ),
    getObjectData("ability_ultimateSteal" ),
    getObjectData("clothSack"),
    getObjectData("leatherSack"),
    getObjectData("steelBlock"),
    getObjectData("runeBlock"),
    getObjectData("sirusBlock"),
    getObjectData("flamesBlock"),
    getObjectData("wavesBlock"),
    getObjectData("rockBlock"),
    getObjectData("grassBlock"),
    getObjectData("windBlock"),
    getObjectData("alanBlock"),
    getObjectData("vines"),
    getObjectData("beetleWings"),
    getObjectData("rocks"),
    getObjectData("superRocks"),
    getObjectData("ratFur"),
    getObjectData("wood"),
    getObjectData("grass"),
    getObjectData("frogLeather"),
    getObjectData("xiasLeather"),
    getObjectData("emptySword"),
    getObjectData("emptyShield"),
    getObjectData("emptyHelmet"),
    getObjectData("emptyPlatebody"),
    getObjectData("emptyPlatelegs"),
    getObjectData("emptyBoots"),
    getObjectData("emptyGloves"),
    getObjectData("emptyNecklace"),
    getObjectData("emptyRings"),
    getObjectData("npc_vines"),
    getObjectData("npc_rockSnake"),
    getObjectData("npc_rockGiant"),
    getObjectData("npc_jack"),
    getObjectData("npc_xias"),
    getObjectData("npc_zoro"),
    getObjectData("npc_verus"),
    getObjectData("npc_evilTree"),
    getObjectData("npc_superRockGiant"),
    getObjectData("npc_giantRat"),
    getObjectData("npc_bronzeChest"),
    getObjectData("npc_dummy"),
    getObjectData("npc_frog"),
    getObjectData("npc_wolf"),
    getObjectData("npc_fireWolf"),
    getObjectData("npc_waterWolf"),
    getObjectData("npc_rockWolf"),
    getObjectData("npc_windWolf"),
    getObjectData("npc_grassWolf"),
    getObjectData("npc_bettle"),
    getObjectData("npc_fireBeetle"),
    getObjectData("quest_getPrepared"),
    getObjectData("quest_stoniteEquipment"),
    getObjectData("quest_none"),
    getObjectData("silverKey"),
    getObjectData("goldenKey"),
    getObjectData("platinumKey"),
    getObjectData("bronzeKey"),
    getObjectData("marshBook"),
    getObjectData("evasionPotion"),
    getObjectData("greaterEvasionPotion"),
    getObjectData("omegaEvasionPotion"),
    getObjectData("ultimateEvasionPotion"),
    getObjectData("endurancePotion"),
    getObjectData("greaterEndurancePotion"),
    getObjectData("omegaEndurancePotion"),
    getObjectData("ultimateEndurancePotion"),
    getObjectData("staminaPotion"),
    getObjectData("greaterStaminaPotion"),
    getObjectData("omegaStaminaPotion"),
    getObjectData("ultimateStaminaPotion"),
    getObjectData("fullPotion"),
    getObjectData("healthPotion"),
    getObjectData("superHealthPotion"),
    getObjectData("greaterHealthPotion"),
    getObjectData("omegaHealthPotion"),
    getObjectData("ultimateHealthPotion"),
    getObjectData("focusPotion"),
    getObjectData("superFocusPotion"),
    getObjectData("greaterFocusPotion"),
    getObjectData("omegaFocusPotion"),
    getObjectData("ultimateFocusPotion"),
    getObjectData("energyPotion"),
    getObjectData("greaterEnergyPotion"),
    getObjectData("omegaEnergyPotion"),
    getObjectData("ultimateEnergyPotion"),
    getObjectData("strengthPotion"),
    getObjectData("greaterStrengthPotion"),
    getObjectData("omegaStrengthPotion"),
    getObjectData("ultimateStrengthPotion"),
    getObjectData("defencePotion"),
    getObjectData("greaterDefencePotion"),
    getObjectData("omegaDefencePotion"),
    getObjectData("ultimateDefencePotion"),
    getObjectData("woodenBoots"),
    getObjectData("critBoots"),
    getObjectData("regenBoots"),
    getObjectData("combatBoots"),
    getObjectData("fightingBoots"),
    getObjectData("softBoots"),
    getObjectData("focusBoots"),
    getObjectData("brainBoots"),
    getObjectData("warBoots"),
    getObjectData("combatBoots"),
    getObjectData("alanBoots"),
    getObjectData("regenGloves"),
    getObjectData("alanGloves"),
    getObjectData("rockBoots"),
    getObjectData("grassBoots"),
    getObjectData("woodenGloves"),
    getObjectData("critGloves"),
    getObjectData("combatGloves"),
    getObjectData("fightingGloves"),
    getObjectData("warGloves"),
    getObjectData("focusGloves"),
    getObjectData("brainGloves"),
    getObjectData("softGloves"),
    getObjectData("rockGloves"),
    getObjectData("grassGloves"),
    getObjectData("woodenNecklace"),
    getObjectData("luckyNecklace"),
    getObjectData("critNecklace"),
    getObjectData("experienceNecklace"),
    getObjectData("battlesNecklace"),
    getObjectData("alanBoots"),
    getObjectData("rockNecklace"),
    getObjectData("grassNecklace"),
    getObjectData("woodenRings"),
    getObjectData("critRings"),
    getObjectData("rageRings"),
    getObjectData("mentalRageRings"),
    getObjectData("shieldedRings"),
    getObjectData("goldRings"),
    getObjectData("alanRings"),
    getObjectData("rockRings"),
    getObjectData("grassRings"),
    getObjectData("sirusShield"),
    getObjectData("stoniteShield"),
    getObjectData("jacksShield"),
    getObjectData("runeShield"),
    getObjectData("grassShield"),
    getObjectData("wavesShield"),
    getObjectData("flamesSheild"),
    getObjectData("windShield"),
    getObjectData("alanShield"),
    getObjectData("woodenShield"),
    getObjectData("rockShield"),
    getObjectData("superRockShield"),
    getObjectData("oakShield"),
    getObjectData("steelShield"),
    getObjectData("ironShield"),
    getObjectData("stonitePlatebody" ),
    getObjectData("sirusPlatebody"),
    getObjectData("runePlatebody"),
    getObjectData("grassPlatebody"),
    getObjectData("wavesPlatebody"),
    getObjectData("flamesPlatebody"),
    getObjectData("windPlatebody"),
    getObjectData("zoroPlatebody"),
    getObjectData("alanPlatebody"),
    getObjectData("steelPlatebody"),
    getObjectData("woodenPlatebody"),
    getObjectData("rockPlatebody"),
    getObjectData("clothRobe"),
    getObjectData("leatherRobe"),
    getObjectData("frogLeatherRobe"),
    getObjectData("xiasLeatherRobe"),
    getObjectData("sirusHelmet"),
    getObjectData("stoniteHelmet"),
    getObjectData("runeHelmet"),
    getObjectData("grassHelmet"),
    getObjectData("wavesHelmet"),
    getObjectData("flamesHelmet"),
    getObjectData("windHelmet"),
    getObjectData("alanHelmet"),
    getObjectData("steelHelmet"),
    getObjectData("woodenHelmet"),
    getObjectData("rockHelmet"),
    getObjectData("clothHood"),
    getObjectData("leatherHood"),
    getObjectData("frogLeatherHood"),
    getObjectData("xiasLeatherHood"),
    getObjectData("ratHood"),
    getObjectData("stonitePlatelegs" ),
    getObjectData("sirusPlatelegs" ),
    getObjectData("runePlatelegs" ),
    getObjectData("grassPlatelegs" ),
    getObjectData("wavesPlatelegs" ),
    getObjectData("flamesPlatelegs" ),
    getObjectData("windPlatelegs" ),
    getObjectData("alanPlatelegs" ),
    getObjectData("steelPlatelegs" ),
    getObjectData("woodenPlatelegs" ),
    getObjectData("rockPlatelegs" ),
    getObjectData("clothLeggings" ),
    getObjectData("leatherLeggings"),
    getObjectData("frogLeatherLeggings"),
    getObjectData("frogLeatherLeggings"),
    getObjectData("stoniteSword"),
    getObjectData("sirusSword"),
    getObjectData("jacksSword"),
    getObjectData("runeSword"),
    getObjectData("grassSword"),
    getObjectData("wavesSword"),
    getObjectData("flamesSword"),
    getObjectData("windSword"),
    getObjectData("alanSword"),
    getObjectData("steelSword"),
    getObjectData("pointedSword"),
    getObjectData("trainingSword"),
    getObjectData("woodenSword"),
    getObjectData("rockSword"),
    getObjectData("superRockSword"),
    getObjectData("oakStick"),
    getObjectData("woodenStick"),
    getObjectData("none"),
  ];
}

/**
 * Compartmentalize the data into different categories for the API.
 * 
 * Does best job to parse code which may have executed as a string to 
 * demonstrate what it would do.
 * 
 * - Spells/Abilities: have an O.C set
 * - NPCs: have NPCInsName (among other NPC{var} variables)
 * - Quests: have O.steps assigned
 * - Items/Equipment: Default
 *   - Item functions (O.U and healFunction) should be visible as a string.
 */
function categorizeMyObjectData() {
  myObjectData = myObjectData.map(object => {
    if(object == null) {
      return object;
    }

    // object.APIType = 'item';

    if(object.U != undefined) {
      object.U = object.U.toString()
    }
    if(object.healFunction != undefined) {
      object.healFunction = object.healFunction.toString();
    }

    if(object.C != null && object.C.length > 0) {
      // object.APIType = 'ability';
      ability.push(object);
    }
    else if(object.NPCInsName != null && object.NPCInsName.length > 0) {
      // object.APIType = 'npc';
      npc.push(object);
    } 
    else if(object.steps != null && object.steps.length > 0) {
      // object.APIType = 'quest';
      quest.push(object);
    } 
    else {
      item.push(object);
    }
    // else if(object.C != null && object.C.length > 0) {
    //   object.APIType = 'item' // equipment (O.S)
    // } 

    return object;
  })
}

  var fs = require("fs");
  const path = require('path');
/**
 * Export our API-ready data into a consumable file for the database to ingest.
 */
function generateConsumableFilesForAPI() {
  // let _testo = [myObjectData[1], myObjectData[2]];
  // let _testo = [item[10], item[12], item.filter(o => o.N == 'Marsh Book')];
  // console.log(_testo[2])
  // .replace(/\\n/g, '  ').replace(/\\t/g, '');
  // console.log(JSON.stringify(_testo).replace(/\\n/g, '  ').replace(/\\t/g, ''));
  // ;
// console.log(__dirname)
  [{myArr: ability, arrName: 'ability'}, 
    {myArr: npc, arrName: 'npc'}, 
    {myArr: quest, arrName: 'quest'}, 
    {myArr: item, arrName: 'item'}]
      .map(inTableObj => {
        let outTableJSONStr = JSON.stringify(inTableObj.myArr).replace(/\\n/g, '  ').replace(/\\t/g, '');
        fs.writeFile(path.resolve(__dirname, './parser-output', `${inTableObj.arrName}.json`), outTableJSONStr, "utf8", err => {
          if(err) { console.log(err); console.log(`Error writing parser-output/${inTableObj.arrName}.json`) }
        });
      });
  
  // // Writing...
  // var fs = require("fs");

  // fs.writeFile( "filename.json", JSON.stringify( myJson ), "utf8", yourCallback );
// 
  // // And then, to read it...
  // myJson = require("./filename.json");
}

// Execution
flattenGetObjectDataFuncToArray();

categorizeMyObjectData();

generateConsumableFilesForAPI();

console.log("Parser finished.");