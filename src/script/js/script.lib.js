/* script with third parties
 * functions : slick slider
 */

const defAniProps = {
  easing: 'spring(1, 50, 10, 0)',
  duration: 300
}

$('.nav--mb .ico-stack').on('click', _ => {
  anime({
    targets: 'header',
    top: window.innerHeight + 'px',
    opacity: 0,
    ...defAniProps
  });
  anime({
    targets: '#drawer-menu',
    top: 0 + '%',
    opacity: 1,
    ...defAniProps
  })
  anime({
    targets: '#content',
    translateY: window.innerHeight,
    ...defAniProps
  })
})

$('#drawer-menu .header__close').on('click', _ => {
  anime({
    targets: 'header',
    top: 0,
    opacity: 1,
    ...defAniProps
  });
  anime({
    targets: '#drawer-menu',
    top: -100 + '%',
    opacity: 0,
    ...defAniProps
  })
  anime({
    targets: '#content',
    translateY: 0,
    ...defAniProps
  })
})

let floatIcnState = false
$('.float-icn').on('click', _ => {
  floatIcnState = !floatIcnState
  $('.float-icn').toggleClass('active')
  anime({
    targets: '.float-menu',
    scale: floatIcnState ? 1 : 0,
    right: floatIcnState ? '70px' : '30px',
    easing: 'easeOutQuad',
    duration: 300
  });
})



