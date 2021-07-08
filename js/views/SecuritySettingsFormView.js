'use strict';

var
	_ = require('underscore'),
	ko = require('knockout'),
	
	ModulesManager = require('%PathToCoreWebclientModule%/js/ModulesManager.js'),
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	Settings = require('modules/%ModuleName%/js/Settings.js')
;

/**
 * @constructor
 */
function CSecuritySettingsFormView()
{
	CAbstractSettingsFormView.call(this);
	
	this.visibleHeading = ko.observable(true);
	this.securitySections = ko.observableArray([]);
}

_.extendOwn(CSecuritySettingsFormView.prototype, CAbstractSettingsFormView.prototype);

CSecuritySettingsFormView.prototype.ViewTemplate = '%ModuleName%_SecuritySettingsFormView';

CSecuritySettingsFormView.prototype.registerTabSection = function (fGetSectionView, sModuleName)
{
	var oSection = fGetSectionView();
	oSection.sModuleName = sModuleName;
	oSection.visibleSection = ko.observable(true);
	
	if (sModuleName === 'TwoFactorAuth')
	{
		oSection.visibleHeading(oSection.passwordVerified());
		this.visibleHeading(!oSection.passwordVerified());
		oSection.passwordVerified.subscribe(function (bPasswordVerified) {
			_.each(this.securitySections(), function (oSection) {
				if (oSection.sModuleName === 'TwoFactorAuth')
				{
					oSection.visibleHeading(bPasswordVerified);
					this.visibleHeading(!bPasswordVerified);
				}
				else
				{
					oSection.visibleSection(!bPasswordVerified);
				}
			}.bind(this));
		}, this);
	}

	this.securitySections().push(oSection);
	var iLastIndex = Settings.ModulesOrder.length;
	this.securitySections(_.sortBy(this.securitySections(), function (oSection) {
		var iIndex = _.indexOf(Settings.ModulesOrder, oSection.sModuleName);
		return iIndex !== -1 ? iIndex : iLastIndex;
	}));
};

CSecuritySettingsFormView.prototype.onShow = function ()
{
	_.each(this.securitySections(), function (oSection) {
		if (_.isFunction(oSection.onShow)) {
			oSection.onShow();
		}
	});
};

module.exports = new CSecuritySettingsFormView();
