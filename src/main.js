var CountSelectionAction = require('./actions/count-selection-action');

// This is the main entry point to your plugin called by the designer when he is ready
module.exports = {
    init: function (gravit) {
        console.log('Initialized my starter plugin.');

        gravit.actions.push(new CountSelectionAction());
    }

    start: function () {
        console.log('Started my starter plugin.');
    }
};
