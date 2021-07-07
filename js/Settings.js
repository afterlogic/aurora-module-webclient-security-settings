'use strict';

var
	_ = require('underscore')
;

module.exports = {
	ServerModuleName: '%ModuleName%',
	HashModuleName: 'security',
	
	/**
	 * Initializes settings from AppData object sections.
	 * 
	 * @param {Object} oAppData Object contained modules settings.
	 */
	init: function (oAppData)
	{
		var oAppDataSection = oAppData['%ModuleName%'];
		
		if (!_.isEmpty(oAppDataSection))
		{
			// parse settings
		}
	}
};
