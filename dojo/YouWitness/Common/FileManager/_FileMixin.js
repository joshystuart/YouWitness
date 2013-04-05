define([
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/dom-construct',
    'dojo/dom-prop',
    'dojo/dom-style',
    'dijit/_Widget',
    'dojo/Evented'
], function(
        lang,
        declare,
        array,
        domConstruct,
        domProp,
        domStyle,
        Widget,
        Evented
        ) {
    return declare(
            'Zoop/Admin/Common/FileManager/_FileMixin',
            [Widget, Evented], {
        events: [],
        thumbWidth: 120,
        fileId: 0,
        fileParent: 0,
        fileWidth: 0,
        fileHeight: 0,
        fileName: '',
        fileType: '',
        fileSize: 0,
        fileSrc: null,
        fileOrder: 0,
        setHeight: true,
        variations: [],
        displayVariation: null,
        preventActions: false,
        constructor: function(props) {
            lang.mixin(this, props);
            this.events = new Array();
        },
        postCreate: function() {
            this.inherited(arguments);
            this.showThumb();
        },
        showThumb: function() {
            this._setDisplayVariation();
            var fileType = this.get('fileType');
            if (fileType && fileType.toLowerCase().match(/image\/*/)) {
                if (fileType.match(/image\/(jpg|gif|png|jpeg)/)) {
                    this._createThumb();
                }
            }
        },
        _createThumb: function() {
            var newHeight = Math.round((this.get('fileHeight') / this.get('fileWidth')) * this.get('thumbWidth'));
            domConstruct.create('img', {
                src: this.get('fileSrc'),
                width: this.get('thumbWidth'),
                height: newHeight
            }, this.get('thumbNode'));
            domStyle.set(this.containerNode, {
                'width': this.get('thumbWidth') + 'px'
            });
            domStyle.set(this.get('thumbNode'), {'width': this.get('thumbWidth') + 'px'});
            if (this.get('setHeight') == true) {
                domStyle.set(this.get('thumbNode'), {'height': newHeight + 'px'});
            }
            this.emit('loaded', {});
        },
        setMessage: function(msg) {
            this.message = msg;
        },
        remove: function() {
            this._removeEvents();
            this.destroyRecursive(false);
        },
        _onDelete: function(e) {
            if (this.get('preventActions') === false) {
                this.set('preventActions', true);
                this.emit('delete', {});
            }
        },
        _setDisplayVariation: function() {
            var set = false;
            var variations = this.get('variations');
            if (this.get('displayVariation') != null) {
                for (var variation in variations) {
                    if (variations.hasOwnProperty(variation)) {
                        if (variation == this.displayVariation) {
                            var file = variations[variation];
                            variations[variation].fileId = variations[variation].fileParent;
                            lang.mixin(this, file);
                            set = true;
                        }
                    }
                }
            } else {
                if (variations['raw']) {
                    variations['raw'].fileId = variations['raw'].fileParent;
                    lang.mixin(this, variations['raw']);
                    set = true;
                }
            }
//last attempt at setting a default variation
            if (set === false) {
                for (variation in variations) {
                    break;
                }
                if (variations[variation]) {
                    variations[variation].fileId = variations[variation].fileParent;
                    lang.mixin(this, variations[variation]);
                }
            }
        },
        _setPreventActionsAttr: function(action) {
            this.preventActions = action;
            if (action === true) {
                domProp.set(this.deleteBtnNode, 'disabled', true);
            } else {
                domProp.set(this.deleteBtnNode, 'disabled', false);
            }
        },
        _setMessageAttr: {
            node: "messageNode",
            type: "innerHTML"
        },
        _setFileOrderAttr: function(order) {
            var variations = this.get('variations');
            for (var variation in variations) {
                if (variations.hasOwnProperty(variation)) {
                    if (variation == this.displayVariation) {
                        variations[variation].fileOrder = order;
                    }
                }
            }
            this.fileOrder = order;
            this._set('order', order);
        },
        _getVariationsAttr: function() {
            return this.variations;
        },
        addEvent: function(event) {
            this.events.push(event);
        },
        _removeEvents: function() {
            array.forEach(this.events, function(event) {
                event.remove();
            });
        }
    });
});