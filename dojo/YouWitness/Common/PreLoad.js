define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/text!./Template/PreLoad.html'
    ],
    function (
        declare,
        lang,
        domClass,
        domStyle,
        domGeom,
        Widget,
        TemplatedMixin,
        template
        ){
        return declare(
            'Zoop/Common/PreLoad',
            [Widget, TemplatedMixin],
            {
                templateString: template,
                message: 'Loading',
                parent: undefined,
                parentPosition: 'relative',
                position: 'relative',
                    
                constructor: function(data) {
                    lang.mixin(this, data);
                },
                
                postCreate: function() {
                    this.inherited(arguments);
                    
                    if(!this.parent) {
                        this.parent = this.domNode.parentNode;
                    }
                    domStyle.set(this.domNode,{
                        zIndex:10000
                    });
                    
                    if(this.position == 'fixed') {
                        var l = domGeom.position(this.parent);
                        domStyle.set(this.domNode,{
                            position: 'fixed',
                            top: l.y + 'px'
                        });
                    }
                    
                    if(this.parent) {
                        domStyle.set(this.parent,{
                            position: this.parentPosition
                           // '-webkit-transform': 'scale3d(1,1,1)' //webkit redraw hack
                        });
                    }
                },
                
                show: function(message) {             
                    if (message){
                        this.set('message', message);
                    }                    
                    domClass.remove(this.domNode, 'hide');
                    
                    //adjust height                    
                    this._updateDimensions();
                },
                
                hide: function() {         
                    domClass.add(this.domNode, 'hide');
                },
                                
                _updateDimensions: function() {
                    if(this.parent) {
                        var parentStyle = domStyle.getComputedStyle(this.parent);
                        var nodeStyle = domStyle.getComputedStyle(this.domNode);
                        
                        var d = domGeom.getContentBox(this.parent, parentStyle);
                        var p = domGeom.getPadExtents(this.parent, parentStyle);
                        var l = domGeom.position(this.loadingNode);
                        
                        var height = d.h + p.h;
                        var width = d.w + p.w;
                        var newHeight = (height/2) + (l.h / 2);
                        var newPaddingTop = (height/2) - (l.h / 2);
                        
                        if(newPaddingTop<0) {
                            newPaddingTop = 0;
                        }
                        
                        domGeom.setContentSize(this.domNode, {
                            h: newHeight,
                            w: width
                        }, nodeStyle);
                        
                        domStyle.set(this.domNode,{
                            paddingTop: newPaddingTop + 'px'
                        });
                    }  
                },
                
                _setMessageAttr: {
                    node: "messageNode", 
                    type: "innerHTML"
                }
            }
            );
    });