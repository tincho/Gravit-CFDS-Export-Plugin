import {GCategory, GAction} from 'gravit/designer';

/**
 * Action for counting the number of selected elements
 * @class CountSelectionAction
 * @extends GAction
 * @constructor
 */
function CountSelectionAction() {
};
GObject.inherit(CountSelectionAction, GAction);

/**
 * @override
 */
CountSelectionAction.prototype.getId = function () {
    return 'selection.count';
};

/**
 * @override
 */
CountSelectionAction.prototype.getTitle = function () {
    return 'Count Selection';
};

/**
 * @override
 */
CountSelectionAction.prototype.getCategory = function () {
    return 'starter-plugin';
};

/**
 * @override
 */
CountSelectionAction.prototype.getGroup = function () {
    return '';
};

/**
 * @override
 */
CountSelectionAction.prototype.getShortcut = function () {
    return null;
};

/**
 * @override
 */
CountSelectionAction.prototype.isEnabled = function () {
    return gDesigner.getActiveDocument() !== null;
};

/**
 * @override
 */
CountSelectionAction.prototype.execute = function () {
    var editor = gDesigner.getActiveDocument().getEditor();
    var selection = editor.getSelection();

    if (selection && selection.length) {
        alert(selection.length + ' elements selected.');
    } else {
        alert('Nothing selected.');
    }
};

module.exports = CountSelectionAction;
