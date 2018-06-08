<template>
  <div class="h-content">
    <div style="margin:10px 60px;">
      <div class="h-title">
        <Button icon="chevron-left" @click="$router.push('/index/walkby')" size="small" style="float: left;margin-top: 6px;margin-left: 5px;">返回</Button>
        <p style="text-align: center">查看任务分布</p>
      </div>
      <div>
        <div style="padding:20px 0">
          <CheckboxGroup>
            <Checkbox label="item.id" v-for="item,index in technicianList" :key="item.id">
              <Icon :color="colors[index]" type="flag"></Icon>
              <span>{{item.loginName}}</span>
            </Checkbox>
          </CheckboxGroup>
        </div>
        <div class="task-left">
          <div style="padding: 5px 15px;">
            <p style="font-size: 12px">{{$t('m.walkby.sel2')}}</p>
            <Tree :data="region" show-checkbox @on-check-change="selregion"></Tree>
          </div>
        </div>
        <div class="taskRight">
          <div style="width:100%;height:850px;">
            <div id="map" style="width:100%;height:100%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    nane:'addtask',
    data() {
      return {
        region:[],
        map:'',
        markers:[],
        walkbycurrent:0,
        icons:['../../static/icon1.png','../../static/icon2.png'],
        technician:'',
        technicianList:[],
        selectedregions:[],
        lacations: [],
        colors : ['#5793f3', '#d14a61'],
        //查询表号的表格
        //列名
        metercolumns: [
          {
            type: 'selection',
            width: 50,
          },
          {
            title: this.$t('m.open.metercolumnstitle1'),
            key: 'meterNumber'
          },
        ],
      }
    },
    computed: {
      // 计算属性的 getter
      meterIDs:function () {
        let arr=[];
        this.lacations.forEach((val,index)=> {
          if(val._checked){
            arr.push(val.meterId);
          }
        });
        return arr;
      },
    },
    methods: {
      getTree(tree = []) {
        let arr = [];
        if (!!tree && tree.length !== 0) {
          tree.forEach(item => {
            let obj = {};
            obj.title = item.regionName;
            obj.regionCode = item.regionCode;
            obj.expand = true;
            obj.selected = false;
            obj.children = this.getTree(item.childRegions); // 递归调用
            arr.push(obj);
          });
        }
        return arr;
      },
      selregion(selected){
        let arr=[];
        selected.forEach( (val,index)=> {
          arr.push(val.regionCode);
        });
        this.selectedregions=arr;
        this.$http({
          url:'walkby/getMeter.do',
          credentials:true,
          body:this.selectedregions,
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
        }).then((response) => {
          this.markers.forEach((val,index)=>{
            val.setMap(null);
          });
          this.markers=[];
          response.body.meterList.forEach((val,index)=> {
            val._checked=false;
            this.meterIDs.forEach(function (val1,index1) {
              if(val1===val.meterId){
                val._checked=true;
              }
            });
            val.location=new google.maps.LatLng(val.latitude, val.longitude);
          });
          this.lacations=response.body.meterList;

          var markers=this.lacations.forEach((val, i)=> {

            var marker= new google.maps.Marker({
              position: val.location,
              animation: google.maps.Animation.DROP,
              map: this.map,
              title:val.meterNumber,
              meter:val,
              iconList:this.icons,
              icon:val._checked?this.icons[0]:this.icons[1]
            });
            google.maps.event.addListener(marker, 'click', ()=> {
              val._checked= !val._checked;
              marker.setIcon(val._checked?this.icons[0]:this.icons[1]);
            });
            this.markers.push(marker);
            return marker;
          });
        });
      },
      MapInitialize() {
        // if (navigator.geolocation) {
          //获取当前地理位置信息
          let latitude,longitude;
          navigator.geolocation.getCurrentPosition((pos,error)=>{
            latitude = pos.coords.latitude;
            longitude = pos.coords.longitude;
            console.log("当前位置：经度：" + latitude + " 纬度：" + longitude);
          });
            var vm=this;
            //构建经纬度点
            var uluru = {lat: 30.26, lng:120.19};
            var myOptions =
              {
                zoom: 12,
                center: uluru,
                // mapTypeId: google.maps.MapTypeId.HYBRID,
                //关闭 API 的默认用户界面设置
                // disableDefaultUI: true,
                mapTypeControl: false,
                gestureHandling: 'greedy',
                //标尺
                scaleControl: true,
                scaleControlOptions: {
                  position: google.maps.ControlPosition.RIGHT_BOTTOM
                }
              };
            this.map = new google.maps.Map(document.getElementById("map"), myOptions); //实例化地图
            this.map.enableKeyDragZoom();

        // } else {
        //   alert("你的浏览器不支持HTML5来获取地理位置信息。");
        // }
      },
      keydragzoom () {
        let vm=this;
        /*jslint browser:true */
        /*global google */
        /**
         * Converts 'thin', 'medium', and 'thick' to pixel widths
         * in an MSIE environment. Not called for other browsers
         * because getComputedStyle() returns pixel widths automatically.
         * @param {String} widthValue
         */
        var toPixels = function (widthValue) {
          var px;
          switch (widthValue) {
            case 'thin':
              px = "2px";
              break;
            case 'medium':
              px = "4px";
              break;
            case 'thick':
              px = "6px";
              break;
            default:
              px = widthValue;
          }
          return px;
        };
        /**
         * Get the widths of the borders of an HTML element.
         *
         * @param {Object} h  HTML element
         * @return {Object} widths object (top, bottom left, right)
         */
        var getBorderWidths = function (h) {
          var computedStyle;
          var bw = {};
          if (document.defaultView && document.defaultView.getComputedStyle) {
            computedStyle = h.ownerDocument.defaultView.getComputedStyle(h, "");
            if (computedStyle) {
              // The computed styles are always in pixel units (good!)
              bw.top = parseInt(computedStyle.borderTopWidth, 10) || 0;
              bw.bottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
              bw.left = parseInt(computedStyle.borderLeftWidth, 10) || 0;
              bw.right = parseInt(computedStyle.borderRightWidth, 10) || 0;
              return bw;
            }
          } else if (document.documentElement.currentStyle) { // MSIE
            if (h.currentStyle) {
              // The current styles may not be in pixel units so try to convert (bad!)
              bw.top = parseInt(toPixels(h.currentStyle.borderTopWidth), 10) || 0;
              bw.bottom = parseInt(toPixels(h.currentStyle.borderBottomWidth), 10) || 0;
              bw.left = parseInt(toPixels(h.currentStyle.borderLeftWidth), 10) || 0;
              bw.right = parseInt(toPixels(h.currentStyle.borderRightWidth), 10) || 0;
              return bw;
            }
          }
          // Shouldn't get this far for any modern browser
          bw.top = parseInt(h.style["border-top-width"], 10) || 0;
          bw.bottom = parseInt(h.style["border-bottom-width"], 10) || 0;
          bw.left = parseInt(h.style["border-left-width"], 10) || 0;
          bw.right = parseInt(h.style["border-right-width"], 10) || 0;
          return bw;
        };

        /**
         * Get the position of the mouse relative to the document.
         * @param {Object} e  Mouse event
         * @return {Object} left & top position
         */
        var getMousePosition = function (e) {
          var posX = 0, posY = 0;
          e = e || window.event;
          if (typeof e.pageX !== "undefined") {
            posX = e.pageX;
            posY = e.pageY;
          } else if (typeof e.clientX !== "undefined") {
            posX = e.clientX +
              (typeof document.documentElement.scrollLeft !== "undefined" ? document.documentElement.scrollLeft : document.body.scrollLeft);
            posY = e.clientY +
              (typeof document.documentElement.scrollTop !== "undefined" ? document.documentElement.scrollTop : document.body.scrollTop);
          }
          return {
            left: posX,
            top: posY
          };
        };

        /**
         * Get the position of an HTML element relative to the document.
         * @param {Object} h  HTML element
         * @return {Object} left & top position
         */
        var getElementPosition = function (h) {
          var posX = h.offsetLeft;
          var posY = h.offsetTop;
          var parent = h.offsetParent;
          // Add offsets for all ancestors in the hierarchy
          while (parent !== null) {
            // Adjust for scrolling elements which may affect the map position.
            //
            // See http://www.howtocreate.co.uk/tutorials/javascript/browserspecific
            //
            // "...make sure that every element [on a Web page] with an overflow
            // of anything other than visible also has a position style set to
            // something other than the default static..."
            if (parent !== document.body && parent !== document.documentElement) {
              posX -= parent.scrollLeft;
              posY -= parent.scrollTop;
            }
            posX += parent.offsetLeft;
            posY += parent.offsetTop;
            parent = parent.offsetParent;
          }
          return {
            left: posX,
            top: posY
          };
        };
        /**
         * Set the properties of an object to those from another object.
         * @param {Object} obj target object
         * @param {Object} vals source object
         */
        var setVals = function (obj, vals) {
          if (obj && vals) {
            for (var x in vals) {
              if (vals.hasOwnProperty(x)) {
                obj[x] = vals[x];
              }
            }
          }
          return obj;
        };
        /**
         * Set the opacity. If op is not passed in, this function just performs an MSIE fix.
         * @param {Node} div
         * @param {Number} op (0-1)
         */
        var setOpacity = function (div, op) {
          if (typeof op !== 'undefined') {
            div.style.opacity = op;
          }
          if (typeof div.style.opacity !== 'undefined') {
            div.style.filter = "alpha(opacity=" + (div.style.opacity * 100) + ")";
          }
        };

        /**
         * @name KeyDragZoomOptions
         * @class This class represents the optional parameter passed into <code>google.maps.Map.enableDragBoxZoom</code>.
         * @property {String} [key] the hot key to hold down to activate a drag zoom, <code>shift | ctrl | alt</code>.
         * The default is <code>shift</code>.
         * @property {Object} [boxStyle] the css style of the zoom box.
         * The default is <code>{border: 'thin solid #FF0000'}</code>.
         * Border widths must be specified in pixel units (or as thin, medium, or thick).
         * @property {Object} [paneStyle] the css style of the pane which overlays the map when a drag zoom is activated.
         * The default is <code>{backgroundColor: 'white', opacity: 0.0, cursor: 'crosshair'}</code>.
         */
        /**
         * @name DragZoom
         * @class This class represents a drag zoom object for a map. The object is activated by holding down the hot key.
         * This object is created when <code>google.maps.Map.enableKeyDragZoom</code> is called; it cannot be created directly.
         * Use <code>google.maps.Map.getDragZoomObject</code> to gain access to this object in order to attach event listeners.
         * @param {google.maps.Map} map
         * @param {KeyDragZoomOptions} opt_zoomOpts
         */
        var prj = null;
        function DragZoom(map, opt_zoomOpts) {
          var ov = new google.maps.OverlayView();

          var me = this;
          ov.onAdd = function () {
            me.init_(map, opt_zoomOpts);
          };
          ov.draw = function () {
          };
          ov.onRemove = function () {
          };
          ov.setMap(map);
          this.prjov_ = ov;
          google.maps.event.addListener(map, 'idle', function () {
            prj = ov.getProjection();
          });
        }
        /**
         * Init the tool.
         * @param {google.maps.Map} map
         * @param {KeyDragZoomOptions} opt_zoomOpts
         */
        DragZoom.prototype.init_ = function (map, opt_zoomOpts) {
          this.map_ = map;
          opt_zoomOpts = opt_zoomOpts || {};
          this.key_ = opt_zoomOpts.key || 'Alt';
          this.key_ = this.key_.toLowerCase();
          this.borderWidths_ = getBorderWidths(this.map_.getDiv()); //Container());
          this.paneDiv_ = document.createElement("div");
          this.paneDiv_.onselectstart = function () {
            return false;
          };
          // default style
          setVals(this.paneDiv_.style, {
            backgroundColor: 'white',
            opacity: 0.0,
            cursor: 'crosshair'
          });
          // allow overwrite
          setVals(this.paneDiv_.style, opt_zoomOpts.paneStyle);
          // stuff that cannot be overwritten
          setVals(this.paneDiv_.style, {
            position: 'absolute',
            overflow: 'hidden',
            zIndex: 10001,
            display: 'none'
          });
          if (this.key_ === 'shift') { // Workaround for Firefox Shift-Click problem
            this.paneDiv_.style.MozUserSelect = "none";
          }
          setOpacity(this.paneDiv_);
          // An IE fix: if the background is transparent, it cannot capture mousedown events
          if (this.paneDiv_.style.backgroundColor === 'transparent') {
            this.paneDiv_.style.backgroundColor = 'white';
            setOpacity(this.paneDiv_, 0);
          }
          this.map_.getDiv().appendChild(this.paneDiv_); //Container()
          this.boxDiv_ = document.createElement('div');
          setVals(this.boxDiv_.style, {
            border: 'thin solid #FF0000'
          });
          setVals(this.boxDiv_.style, opt_zoomOpts.boxStyle);
          setVals(this.boxDiv_.style, {
            position: 'absolute',
            display: 'none'
          });
          setOpacity(this.boxDiv_);
          this.map_.getDiv().appendChild(this.boxDiv_);
          this.boxBorderWidths_ = getBorderWidths(this.boxDiv_);
          var me = this;
          this.keyDownListener_ = google.maps.event.addDomListener(document, 'keydown', function (e) {
            me.onKeyDown_(e);
          });
          this.keyUpListener_ = google.maps.event.addDomListener(document, 'keyup', function (e) {
            me.onKeyUp_(e);
          });
          this.mouseDownListener_ = google.maps.event.addDomListener(this.paneDiv_, 'mousedown', function (e) {
            me.onMouseDown_(e);
          });
          this.mouseDownListenerDocument_ = google.maps.event.addDomListener(document, 'mousedown', function (e) {
            me.onMouseDownDocument_(e);
          });
          this.mouseMoveListener_ = google.maps.event.addDomListener(document, 'mousemove', function (e) {
            me.onMouseMove_(e);
          });
          this.mouseUpListener_ = google.maps.event.addDomListener(document, 'mouseup', function (e) {
            me.onMouseUp_(e);
          });

          this.hotKeyDown_ = false;
          this.dragging_ = false;
          this.startPt_ = null;
          this.endPt_ = null;
          this.boxMaxX_ = null;
          this.boxMaxY_ = null;
          this.mousePosn_ = null;
          this.mapPosn_ = getElementPosition(this.map_.getDiv());
          this.mouseDown_ = false;
        };

        /**
         * Returns true if the hot key is being pressed when an event occurs.
         * @param {Event} e
         * @return {Boolean}
         */
        DragZoom.prototype.isHotKeyDown_ = function (e) {
          var isHot;
          e = e || window.event;
          isHot = (e.shiftKey && this.key_ === 'shift') || (e.altKey && this.key_ === 'alt') || (e.ctrlKey && this.key_ === 'ctrl');
          if (!isHot) {
            // Need to look at keyCode for Opera because it
            // doesn't set the shiftKey, altKey, ctrlKey properties
            // unless a non-modifier event is being reported.
            //
            // See http://cross-browser.com/x/examples/shift_mode.php
            // Also see http://unixpapa.com/js/key.html
            switch (e.keyCode) {
              case 16:
                if (this.key_ === 'shift') {
                  isHot = true;
                }
                break;
              case 17:
                if (this.key_ === 'ctrl') {
                  isHot = true;
                }
                break;
              case 18:
                if (this.key_ === 'alt') {
                  isHot = true;
                }
                break;
            }
          }
          return isHot;
        };

        /**
         * Checks if the mouse is on top of the map. The position is captured
         * in onMouseMove_.
         * @return true if mouse is on top of the map div.
         */
        DragZoom.prototype.isMouseOnMap_ = function () {
          var mousePos = this.mousePosn_;
          if (mousePos) {
            var mapPos = this.mapPosn_;
            var mapDiv = this.map_.getDiv();
            return mousePos.left > mapPos.left && mousePos.left < mapPos.left + mapDiv.offsetWidth &&
              mousePos.top > mapPos.top && mousePos.top < mapPos.top + mapDiv.offsetHeight;
          } else {
            // if user never moved mouse
            return false;
          }
        };

        /**
         * Show or hide the overlay pane, depending on whether the mouse is over the map.
         */
        DragZoom.prototype.setPaneVisibility_ = function () {
          if (this.map_ && this.hotKeyDown_ && this.isMouseOnMap_()) {
            var mapDiv = this.map_.getDiv();
            this.paneDiv_.style.left = 0 + 'px';
            this.paneDiv_.style.top = 0 + 'px';
            this.paneDiv_.style.width = mapDiv.offsetWidth - (this.borderWidths_.left + this.borderWidths_.right) + 'px';
            this.paneDiv_.style.height = mapDiv.offsetHeight - (this.borderWidths_.top + this.borderWidths_.bottom) + 'px';
            this.paneDiv_.style.display = 'block';
            this.boxMaxX_ = parseInt(this.paneDiv_.style.width, 10) - (this.boxBorderWidths_.left + this.boxBorderWidths_.right);
            this.boxMaxY_ = parseInt(this.paneDiv_.style.height, 10) - (this.boxBorderWidths_.top + this.boxBorderWidths_.bottom);
          } else {
            this.paneDiv_.style.display = 'none';
          }
        };
        /**
         * Handle key down. Activate the tool only if the mouse is on top of the map.
         * @param {Event} e
         */
        DragZoom.prototype.onKeyDown_ = function (e) {
          var me = this;
          if (this.map_ && !this.hotKeyDown_ && this.isHotKeyDown_(e)) {
            me.hotKeyDown_ = true;
            me.setPaneVisibility_();
            /**
             * This event is fired when the hot key is pressed.
             * @name DragZoom#activate
             * @event
             */
            google.maps.event.trigger(me, 'activate');
          }
        };
        /**
         * Get the <code>google.maps.Point</code> of the mouse position.
         * @param {Object} e
         * @return {google.maps.Point} point
         * @private
         */
        DragZoom.prototype.getMousePoint_ = function (e) {
          var mousePosn = getMousePosition(e);
          var p = new google.maps.Point();
          p.x = mousePosn.left - this.mapPosn_.left - this.borderWidths_.left;
          p.y = mousePosn.top - this.mapPosn_.top - this.borderWidths_.top;
          p.x = Math.min(p.x, this.boxMaxX_);
          p.y = Math.min(p.y, this.boxMaxY_);
          p.x = Math.max(p.x, 0);
          p.y = Math.max(p.y, 0);
          return p;
        };
        /**
         * Handle mouse down.
         * @param {Event} e
         */
        DragZoom.prototype.onMouseDown_ = function (e) {
          if (this.map_ && this.hotKeyDown_) {
            this.mapPosn_ = getElementPosition(this.map_.getDiv());
            this.dragging_ = true;
            this.startPt_ = this.endPt_ = this.getMousePoint_(e);
            var prj = this.prjov_.getProjection();
            var latlng = prj.fromDivPixelToLatLng(this.startPt_);
            /**
             * This event is fired when the drag operation begins.
             * @name DragZoom#dragstart
             * @param {GLatLng} startLatLng
             * @event
             */
            google.maps.event.trigger(this, 'dragstart', latlng);

          }
        };
        /**
         * Handle mouse down at the document level.
         * @param {Event} e
         */
        DragZoom.prototype.onMouseDownDocument_ = function (e) {
          this.mouseDown_ = true;
        };
        /**
         * Handle mouse move.
         * @param {Event} e
         */
        DragZoom.prototype.onMouseMove_ = function (e) {
          this.mousePosn_ = getMousePosition(e);
          if (this.dragging_) {
            this.endPt_ = this.getMousePoint_(e);
            var left = Math.min(this.startPt_.x, this.endPt_.x);
            var top = Math.min(this.startPt_.y, this.endPt_.y);
            var width = Math.abs(this.startPt_.x - this.endPt_.x);
            var height = Math.abs(this.startPt_.y - this.endPt_.y);
            this.boxDiv_.style.left = left + 'px';
            this.boxDiv_.style.top = top + 'px';
            this.boxDiv_.style.width = width + 'px';
            this.boxDiv_.style.height = height + 'px';
            this.boxDiv_.style.display = 'block';
            /**
             * This event is repeatedly fired while the user drags the box. The southwest and northeast
             * point are passed as parameters of type <code>google.maps.Point</code> (for performance reasons),
             * relative to the map container. Note: the event listener is responsible
             * for converting Pixel to LatLng, if necessary.
             * @name DragZoom#drag
             * @param {google.maps.Point} southwestPixel
             * @param {google.maps.Point} northeastPixel
             * @event
             */
            google.maps.event.trigger(this, 'drag', new google.maps.Point(left, top + height), new google.maps.Point(left + width, top));
          } else if (!this.mouseDown_) {
            this.setPaneVisibility_();
          }
        };
        /**
         * Handle mouse up.
         * @param {Event} e
         */

        DragZoom.prototype.onMouseUp_ = function (e) {
          this.mouseDown_ = false;
          if (this.dragging_) {
            // MyBnd = null;
            var left = Math.min(this.startPt_.x, this.endPt_.x);
            var top = Math.min(this.startPt_.y, this.endPt_.y);
            var width = Math.abs(this.startPt_.x - this.endPt_.x);
            var height = Math.abs(this.startPt_.y - this.endPt_.y);
            var points = {
              top: top,
              left: left,
              bottom: top + height,
              right: left + width
            };
            var prj = this.prjov_.getProjection();
            var xyu = 'oooppp';
            // 2009-05-29: since V3 does not have fromContainerPixel,
            //needs find offset here
            var containerPos = getElementPosition(this.map_.getDiv());
            var mapPanePos = getElementPosition(this.prjov_.getPanes().mapPane);
            left = left + (containerPos.left - mapPanePos.left);
            top = top + (containerPos.top - mapPanePos.top);
            var sw = prj.fromDivPixelToLatLng(new google.maps.Point(left, top + height));
            var ne = prj.fromDivPixelToLatLng(new google.maps.Point(left + width, top));
            var bnds = new google.maps.LatLngBounds(sw, ne);
            //this.map_.fitBounds(bnds);
            this.dragging_ = false;
            this.boxDiv_.style.display = 'none';
            /**
             * This event is fired when the drag operation ends.
             * Note that the event is not fired if the hot key is released before the drag operation ends.
             * @name DragZoom#dragend
             * @param {GLatLngBounds} newBounds
             * @event
             */

            vm.SelectMarkers(bnds);
            google.maps.event.trigger(this, 'dragend', points);

            //document.getElementById('xlol').innerText = cvcv;

          }
        };

        /**
         * Handle key up.
         * @param {Event} e
         */
        DragZoom.prototype.onKeyUp_ = function (e) {
          if (this.map_ && this.hotKeyDown_) {
            this.hotKeyDown_ = false;
            this.dragging_ = false;
            this.boxDiv_.style.display = 'none';
            this.paneDiv_.style.display = "none";
            /**
             * This event is fired while the user release the key
             * @name DragZoom#deactivate
             * @event
             */
            google.maps.event.trigger(this, 'deactivate');
          }
        };
        /**
         * @name google.maps.Map
         * @class These are new methods added to the Google Maps API's
         * <a href  = 'http://code.google.com/apis/maps/documentation/v3/reference.html#Map'>Map</a>
         * class.
         */
        /**
         * Enable drag zoom. The user can zoom to an area of interest by holding down the hot key
         * <code>(shift | ctrl | alt )</code> while dragging a box around the area.
         * @param {KeyDragZoomOptions} opt_zoomOpts
         */

        google.maps.Map.prototype.enableKeyDragZoom = function (opt_zoomOpts) {
          this.dragZoom_ = new DragZoom(this, opt_zoomOpts);
        };
        /**
         * Disable drag zoom.
         */
        google.maps.Map.prototype.disableKeyDragZoom = function () {
          var d = this.dragZoom_;
          if (d) {
            google.maps.event.removeListener(d.mouseDownListener_);
            google.maps.event.removeListener(d.mouseDownListenerDocument_);
            google.maps.event.removeListener(d.mouseMoveListener_);
            google.maps.event.removeListener(d.mouseUpListener_);
            google.maps.event.removeListener(d.keyUpListener_);
            google.maps.event.removeListener(d.keyDownListener_);
            this.getDiv().removeChild(d.boxDiv_);
            this.getDiv().removeChild(d.paneDiv_);
            this.dragZoom_ = null;
          }
        };
        /**
         * Returns true if the drag zoom feature has been enabled.
         * @return {Boolean}
         */
        google.maps.Map.prototype.keyDragZoomEnabled = function () {
          return this.dragZoom_ !== null;
        };
        /**
         * Returns the DragZoom object which is created when <code>google.maps.Map.enableKeyDragZoom</code> is called.
         * With this object you can use <code>google.maps.event.addListener</code> to attach event listeners
         * for the 'activate', 'deactivate', 'dragstart', 'drag', and 'dragend' events.
         * @return {DragZoom}
         */
        google.maps.Map.prototype.getDragZoomObject = function () {
          return this.dragZoom_;
        };
      },
      SelectMarkers(Bounds) {
        for (var i = 0; i < this.markers.length; i++) {
          let marker = this.markers[i];
          marker.setIcon(this.icons[1]);
          marker.meter._checked=false;
          if (Bounds.contains(marker.getPosition()) == true) {
            marker.setIcon(this.icons[0])
            marker.meter._checked=true;
          }
        }
      },
      //获取行政区
      getregion(){
        this.$http({
          url:'sys/region/findRegion.do',
          body:{
            id:0,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type':'application/json; charset=UTF-8'
          },
        }).then((response) => {
          this.region.push(response.body.Region);
          this.region=this.getTree(this.region);
        });
      },
      //获取抄表员
      gettechnicianList(){
        this.$http({
          url:'walkby/listTechnician.do',
          body:{
            isAll:true,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type':'application/json; charset=UTF-8'
          },
        }).then((response) => {
          this.technicianList=response.body.technicians;
        });
      },
      //获取正在执行的任务
      gettask(){
        this.$http({
          url:'walkby/getDoingTasks.do',
          body:{

          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type':'application/json; charset=UTF-8'
          },
        }).then((response) => {
          response.body.tasks.forEach((val,index)=> {
            val.walkByTaskJson.meterlist.forEach((val2,index2)=>{
                val2.location=new google.maps.LatLng(val2.latitude, val2.longitude)
            this.technicianList.forEach((val1,index1)=>{
              if(val.technicianID==val1.id){
                  var marker= new google.maps.Marker({
                    position: val2.location,
                    animation: google.maps.Animation.DROP,
                    map: this.map,
                    title:val2.meterNumber,
                    meter:val2,
                    iconList:this.icons,
                    icon:val2._checked?this.icons[0]:this.icons[1]
                  });
                  google.maps.event.addListener(marker, 'click', ()=> {
                    val2._checked= !val._checked;
                    marker.setIcon(val._checked?this.icons[0]:this.icons[1]);
                  });
                  this.markers.push(marker);
                  return marker;
              }
            })
            });
          })
        });
      },
    },
    mounted(){
      this.MapInitialize()
    },
    created(){
      this.getregion();
      this.gettechnicianList();
      this.gettask();
      this.keydragzoom ();  ////初始化dragzoom
    },
  }
</script>
<style>
  .taskRight{
    margin-left: 240px;
  }
  .task-top{
    width: 80%;
    top:70px;
    left: 0;
    position: fixed;
    padding: 24px 8%;
    background: #fff;
    height:80px;
    z-index: 5;
    border-bottom: 1px solid #ccc;
  }
  .task-left{
    width: 240px;
    height:850px;
    overflow-y: auto;
    float:left;
    background: #eeeeee;
    padding-top: 8px;
  }
  .addtasktitle{
    line-height: 45px;
  }
  .h-title{
    height:38px;
    width:100%;
    /*background:#5cadff;*/
    margin-top:10px;
    border-bottom:1px solid #5cadff;
    /*border-radius: 4px 4px 0 0;*/
  }
  .h-title p{
    /*color:#fff;*/
    line-height: 35px;
    padding:0 10px;
  }
</style>

