var _core = GravitDesigner.framework.core;
var GRectangle = _core.GRectangle;
var GStylable = _core.GStylable;
var GRGBColor = _core.GRGBColor;
var GElement = _core.GElement;

/**
 * A sample properties panel
 * @class GProperties
 * @extends GEventTarget
 * @constructor
 */
function GSampleProperties() {
};

/**
 * @type {JQuery}
 * @private
 */
GSampleProperties.prototype._panel = null;

/**
 * @type {JQuery}
 * @private
 */
GSampleProperties.prototype._toolbar = null;

/**
 * Called to initialize the properties panel
 * @param {JQuery} panel the panel to init on
 * @param {JQuery} toolbar the optional toolbar to init on
 */
GSampleProperties.prototype.init = function (panel, toolbar) {
    this._toolbar = toolbar;
    this._panel = panel;

    //add a title to the toolbar
    $('<label></label>')
        .text('Sample properties panel')
        .appendTo(this._toolbar);

    //use the gPropertyRow plugin to easily create a elements row
    $('<div></div>')
      .gPropertyRow({
          columns: [
              {
                  width: '25%',
                  content: $('<button/>')
                    .addClass('add-rectangle')
                    .html('Add rectangle')
                    .on('click', function() {
                        this._addRectangle();
                    }.bind(this));
              },
              {
                  width: '25%',
                  content: $('<button/>')
                    .addClass('select-all')
                    .html('Select all')
                    .on('click', function() {
                        this._selectAll();
                    }.bind(this));
              },
              {
                  width: '25%',
                  content: $('<button/>')
                    .addClass('clear-selection')
                    .html('Clear selection')
                    .on('click', function() {
                        this._clearSelection();
                    }.bind(this));
              },
              {
                  width: '25%',
                  content: $('<button/>')
                    .addClass('delete-all')
                    .html('Delete Selection')
                    .on('click', function() {
                        this._deleteSelection();
                    }.bind(this));
              }
          ]
      })
      .appendTo(this._panel);
};

/**
 * First check done whether the properties are available or not
 * @param {Boolean} transformMode whether transform mode is set or not
 * @return {Boolean} true if properties are available false if not
 */
GSampleProperties.prototype.isAvailable = function (transformMode) {
    //only use the property panel if there is one active document
    return !!gDesigner.getActiveDocument();
};

/**
 * Called to update
 * @param {GDocument} document the document to work on, this may be null
 * when the document got released
 * @param {Array<GElement>} elements array of elements, may be null or empty
 * @return {Boolean} true if this properties panel is available, false if not
 */
GSampleProperties.prototype.update = function (document, elements) {
    var selection = gDesigner.getActiveDocument().getEditor().getSelection();
    var hasSelection = selection && selection.length > 0;

    this._panel.find('.clear-selection').prop('disabled', !hasSelection);
    this._panel.find('.delete-all').prop('disabled', !hasSelection);
};

/**
 * Create a new rectangle, paint it and add it to the current page
 */
GSampleProperties.prototype._addRectangle = function() {
    var rectangle = new GRectangle(0, 0, 50, 50);

    rectangle.getPaintLayers().appendChild(new GStylable.FillPaintLayer(new GRGBColor([235,235,235]), 1.0));

    gDesigner.getActiveDocument().getEditor().getScene().getActivePage().appendChild(rectangle);
};

/**
 * Select all elements on the page
 */
GSampleProperties.prototype._selectAll = function() {
    var newSelection = [];

    gDesigner.getActiveDocument().getEditor().getScene().getActivePage().acceptChildren(function (node) {
        if (!node.hasFlag(GElement.Flag.FullLocked)) {
            newSelection.push(node);
        }
    }, false, true);

    gDesigner.getActiveDocument().getEditor().updateSelection(false, newSelection);
};

/**
 * Clear selection
 */
GSampleProperties.prototype._clearSelection = function() {
    gDesigner.getActiveDocument().getEditor().updateSelection(false, []);
};

/**
 * Delete selection
 */
GSampleProperties.prototype._deleteSelection = function() {
    gDesigner.getActiveDocument().getEditor().deleteSelection();
};

/** @override */
GSampleProperties.prototype.toString = function () {
    return "[Object GSampleProperties]";
};

module.exports = GSampleProperties;
