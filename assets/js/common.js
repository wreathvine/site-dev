// JavaScript Document

(function(){

/*
##################################################
   jQuery object
##################################################
*/
const $w = $( window ),
      $b = $('body'),
      $bar = $('#menuBar');

/*
##################################################
   Events
##################################################
*/
const ev = {
    down: ( 'onpointerdown' in window ) ? 'pointerdown' : 'mousedown',
    up: ( 'onpointerup' in window ) ? 'pointerup' : 'mouseup',
    enter: ( 'onpointerenter' in window ) ? 'pointerenter' : 'mouseenter',
    leave: ( 'onpointerleave' in window ) ? 'pointerleave' : 'mouseleave',
    over: ( 'onpointerover' in window ) ? 'pointerover' : 'mouseover',
    out: ( 'onpointerout' in window ) ? 'pointerout' : 'mouseout',
    move: ( 'onpointermove' in window ) ? 'pointermove' : 'mouasemove',
    cancel: ( 'onpointercancel' in window ) ? 'pointercancel' : 'touchcancel',
    wheel: 'wheel',
    click: 'click',
    resize: 'resize',
    scroll: 'scroll'
};

/*
##################################################
   Header menu width check
##################################################
*/
const hMenuName = ev.resize + '.hMenu',
      hMenuExastroMenuWidth = $bar.find('.menuBar-ExastroMenu').outerWidth(),
      hMenuLogoWidth = $bar.find('.menuBar-Logo').outerWidth(),
      hMenuMainWidth = $bar.find('.menuBar-MainMenu').outerWidth(),
      hMenuSubWidth = $bar.find('.menuBar-SubMenu').outerWidth(),
      hMenuLangageWidth = $bar.find('.menuBar-Langage').outerWidth(),
      hMenuMain = hMenuExastroMenuWidth + hMenuLogoWidth + hMenuMainWidth,
      hMenuHamWidth = 40;

const headerWidthCheck = function(){
    const bw = $w.width();
    if ( bw < hMenuMain + hMenuSubWidth + hMenuLangageWidth ) {
        $bar.addClass('subHide');
        if ( bw < hMenuMain + hMenuLangageWidth + hMenuHamWidth ) {
            $bar.addClass('menuHide');
        } else {
            $bar.removeClass('menuHide');
        }
    } else {
        $bar.removeClass('menuHide subHide');
    }
};
headerWidthCheck();

let resizeMenuCheckTimer;
$w.on( hMenuName, function(){
    clearTimeout( resizeMenuCheckTimer );
    resizeMenuCheckTimer = setTimeout( function() {
      headerWidthCheck();
    }, 200 );
}); 

/*
##################################################
   Exastro menu
##################################################
*/
const eMenuName = '.eMenu',
      eMenuClick = ev.click + eMenuName,
      eMenuPointerDown = ev.down + eMenuName;
$bar.find('.menuBar-Btn').on( eMenuClick, function(){
    const $btn = $( this ),
          type = $btn.attr('data-menu'),
          parent = '.' + $btn.attr('data-menuParent'),
          open = type + 'Open';
    if ( $bar.is( '.' + open ) ) {
        $bar.removeClass( open );
        $w.off( eMenuPointerDown + type );
    } else {
        $bar.addClass( open );
        $w.on( eMenuPointerDown + type, function(e){ 
            if ( !$( e.target ).closest( parent ).length ) {
                $btn.removeClass('popupHide').click();
            }
        });
    }
});

/*
##################################################
   Hover
##################################################
*/
const hoverName = '.hover',
      hoverEnter = ev.enter + hoverName,
      hoverLeave = ev.leave + hoverName;
$b.on( hoverEnter, '.touch', function(){
    var $this = $( this);
    $this.addClass('hover').on( hoverLeave, function(){
        $this.off( hoverLeave ).removeClass('hover');
    });
});

/*
##################################################
   goto Top
##################################################
*/

$w.on( ev.scroll + '.gotoTop', function(){
    
    const $t = $('.gotoTop');
    
    if ( $w.height() < $w.scrollTop() ) {
        $t.addClass('show');
    } else {
        $t.removeClass('show');
    }

});

/*
##################################################
   Popup
##################################################
*/
const popupName = '.popup',
      popupEnter = ev.enter + popupName,
      popupLeave = ev.leave + popupName,
      popupClick = ev.click + popupName;
$b.on( popupEnter, '.popup', function(){
    const $t = $( this ),
          ttl = $t.attr('title');
    if ( ttl !== undefined ) {
        $t.removeAttr('title');

        const $p = $('<div/>', {
            'class': 'popupBlock',
            'text': ttl
        });
        
        $b.append( $p );
        
        const r = $t[0].getBoundingClientRect(),
              m = 8,
              wW = $w.width(),
              tW = $t.outerWidth(),
              tH = $t.outerHeight(),
              tL = r.left,
              tT = r.top,
              pW = $p.outerWidth(),
              pH = $p.outerHeight();

        let l = ( tL + tW / 2 ) - ( pW / 2 ),
            t = tT - pH - m;
        
        if ( t <= 0 ) {
            $p.addClass('popupBottom');
            t = tT + tH + m;
        } else {
            $p.addClass('popupTop');
        }
        if ( wW < l + pW ) l = wW - pW - m;
        if ( l <= 0 ) l = m;
        
        $p.css({
            'width': pW,
            'height': pH,
            'left': l,
            'top': t
        });
        
        if ( $t.is('.popupHide') ) {
            $p.addClass('popupHide');
        }
        
        $t.on( popupLeave, function(){
            const $p = $b.find('.popupBlock'),
                  title = $p.text();
            $p.remove();
            $t.off( popupLeave + ' ' + popupClick ).attr('title', title );
        });
        
        $t.on( popupClick, function(){
            if ( $t.attr('data-popupMode') === 'click') {
               if ( $t.is('.popupHide') ) {
                    $t.add( $p ).removeClass('popupHide');
                } else {
                    $t.add( $p ).addClass('popupHide');
                }
            }
        });

        const targetCheck = function(){
            if ( $t.is(':visible') ) {
                if ( $p.is(':visible') ) {
                    setTimeout( targetCheck, 200 );
                }
            } else {
                $p.remove();
            }              
        };
        targetCheck();
    }
});

}())