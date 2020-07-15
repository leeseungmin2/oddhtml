

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);




// modal
//!function(t){var n={show:!0,backdrop:!0,backdropClick:!0,keyboard:!0,autoPosition:!0,dialogMarginTop:20,width:null,top:null,left:null},o={BACKDROP:"modal-backdrop",OPEN:"modal-open",FADE:"fade",IN:"in"},i={MODAL:".modal",DIALOG:".modal-dialog",CONTENT:".modal-content",DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]'};t.fn.modal=function(e){function s(){var n=t(window).height(),o=r.find(i.DIALOG).height(),e=n/2-o/2;e<g.settings.dialogMarginTop&&(e=g.settings.dialogMarginTop),g.settings.top&&(e=g.settings.top),t(i.DIALOG).css({marginTop:e})}function a(){t(document).off("focusin").on("focusin",function(n){f===n.target||t(f).has(n.target).length||f.focus()})}function d(){t(document).find("."+o.BACKDROP).length||t(h).appendTo(document.body)}function c(){t("."+o.BACKDROP).remove(),h=null}function u(){t(document.body).addClass(o.OPEN),d(),r.show(),g.settings.width&&t(i.DIALOG).css({width:g.settings.width,marginLeft:"auto",marginRight:"auto"}),t(i.DIALOG).css({marginLeft:g.settings.left}),g.settings.autoPosition&&s(),a(),r.focus()}function l(){t(document.body).removeClass(o.OPEN),c(),r.hide(),t(i.DIALOG).css("margin-top",""),t(document).off("focusin")}if(0===this.length)return this;if(this.length>1)return this.each(function(){t(this).modal(e)}),this;var g={},r=this,f=r[0],h=null,m=function(){g.settings=t.extend({},n,e),r.attr("tabindex","-1"),g.settings.backdrop?(h=document.createElement("div"),h.className=o.BACKDROP):h=null,r.on("click",function(t){t.target===t.currentTarget&&g.settings.backdrop&&g.settings.backdropClick&&l()}),g.settings.keyboard&&t(document.body).on("keydown",function(t){27===t.which&&l()})};return m(),g.settings.show?u():l(),t(window).bind("resize",function(){s()}),this},t(document).on("click",i.DATA_TOGGLE,function(n){var o=t(this).attr("data-target");"A"===this.tagName&&n.preventDefault(),t(o).modal()}),t(document).on("click",i.DATA_DISMISS,function(){t(i.MODAL).modal({show:!1})})}(jQuery);
! function(t) {
    var n = {
            show: !0,
            backdrop: !0,
            backdropClick: !0,
            keyboard: !0,
            autoPosition: !0,
            dialogMarginTop: 20,
            width: null,
            top: null,
            left: null
        },
        o = {
            BACKDROP: "modal-backdrop",
            OPEN: "modal-open",
            FADE: "fade",
            IN: "in"
        },
        i = {
            MODAL: ".modal",
            DIALOG: ".modal-dialog",
            CONTENT: ".modal-content",
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]'
        };
    t.fn.modal = function(e) {
        function s() {
            var n = t(window).height(),
                o = r.find(i.DIALOG).height(),
                e = n / 2 - o / 2;
            e < g.settings.dialogMarginTop && (e = g.settings.dialogMarginTop), g.settings.top && (e = g.settings.top), t(i.DIALOG).css({
                marginTop: e
            })
        }

        function a() {
            t(document).off("focusin").on("focusin", function(n) {
                f === n.target || t(f).has(n.target).length || f.focus()
            })
        }

        function d() {
            t(document).find("." + o.BACKDROP).length || t(h).appendTo(document.body)
        }

        function c() {
            t("." + o.BACKDROP).remove(), h = null
        }

        function u() {
            //t(document.body).addClass(o.OPEN), 
			
			d(), r.show(), g.settings.width && t(i.DIALOG).css({
                width: g.settings.width,
                marginLeft: "auto",
                marginRight: "auto"
            }), t(i.DIALOG).css({
                marginLeft: g.settings.left
            }), g.settings.autoPosition && s(), a(), r.focus()
        }

        function l() {
            t(document.body).removeClass(o.OPEN), c(), r.hide(), t(i.DIALOG).css("margin-top", ""), t(document).off("focusin")
			
        }
        if (0 === this.length) return this;
        if (this.length > 1) return this.each(function() {
            t(this).modal(e)
        }), this;
        var g = {},
            r = this,
            f = r[0],
            h = null,
            m = function() {
                g.settings = t.extend({}, n, e), r.attr("tabindex", "-1"), g.settings.backdrop ? (h = document.createElement("div"), h.className = o.BACKDROP) : h = null, r.on("click", function(t) {
                    t.target === t.currentTarget && g.settings.backdrop && g.settings.backdropClick && l()
                }), g.settings.keyboard && t(document.body).on("keydown", function(t) {
                    27 === t.which && l()
                })
            };
        return m(), g.settings.show ? u() : l(), t(window).bind("resize", function() {
            s()
        }), this
    }, t(document).on("click", i.DATA_TOGGLE, function(n) {
        var o = t(this).attr("data-target");
        "A" === this.tagName && n.preventDefault(), t(o).modal();
    }), t(document).on("click", i.DATA_DISMISS, function() {
		
        t(i.MODAL).modal({
            show: !1
        })
		return false;
    })
}(jQuery);

$(function(){
	$('.btn-top').click(function(){
		$('body,html').stop().animate({
			scrollTop:0
		}, 200);
	})

	
	
	

});
