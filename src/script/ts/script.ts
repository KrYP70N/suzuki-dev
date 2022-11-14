/*
 * icon font class
 * name : icon_font
 * constructor : name, path [for svg file]
 * method : 
 * render (render/update svg font)
 * data (basic information for svg font)
 */

let a = 'helo'

interface INT_ICN_FONT {
  name: string
  path: string
}

class ICON_FONT {
  data : INT_ICN_FONT[]
  constructor (data : INT_ICN_FONT[]) {
    this.data = data
  }

  render() {
    this.data.map((item: INT_ICN_FONT) => {
      fetch(item.path)
      .then((res : Response) : Promise<string> => res.text())
      .then((data : string) : void => {
        const renderItemList : NodeListOf<HTMLElement> = document.querySelectorAll(`span.ico-${item.name}`)
        renderItemList.forEach((item : HTMLElement) : void => {
          item.innerHTML = data
        })
      })
    })
  }
}

const font = new ICON_FONT([
  {
    name: 'globe',
    path: './assets/img/suzuki-myanmar-global-icon.svg',
  },
  {
    name: 'search',
    path: './assets/img/suzuki-myanmar-search-icon.svg'
  },
  {
    name: 'stack',
    path: './assets/img/suzuki-myanmar-drawer-icon.svg'
  }
]).render()

/*
 * PC header
 */
const searchEle  = document.querySelector('.search--pc') as HTMLElement
if(searchEle) {
  const searchOpen = searchEle.querySelector('a')
  const searchClose = document.querySelector('.search__close') as HTMLElement
  searchClose?.addEventListener('click', () => searchEle.classList.remove('active'))
  setTimeout(() => {
    const initSearchWidth : number = searchEle.offsetWidth
    searchEle.setAttribute('style', `width: ${initSearchWidth}px`)
    searchOpen?.addEventListener('click', (e) : void => {
      e.preventDefault()
      searchEle.classList.add('active')
    })
  }, 500)
}

// header adjustment with screen
document.body.style.paddingTop = document.querySelector('header')?.offsetHeight + 'px'

// model
const headerModel = document.querySelector('.nav-list .car-model') as HTMLElement
if(headerModel) {
  let modelContainer : NodeListOf<Element> = headerModel.querySelectorAll('.car-model')
  modelContainer.forEach((item) => {
    let ele = item as HTMLElement
    ele.style.width = window.innerWidth - (headerModel.offsetLeft * 2) + 'px';
  })
}

// sub nav
const subNav = document.querySelectorAll('.sublink')
subNav.forEach((item) => {
  let ele = item as HTMLElement
  ele.style.transform = `translateX(${ele.parentElement?.parentElement?.parentElement?.getBoundingClientRect()?.x || 1 }px)`
})


// sc-animate
const scrollanimate = document.querySelectorAll('.scroll-animate');
for(let i=0; i<scrollanimate.length; i++) {
  let ele = scrollanimate[i] as HTMLElement
  let scrollTop = ele.offsetTop - window.innerHeight
  if(scrollTop < window.scrollY) {
    ele.querySelectorAll('.item').forEach(list => {
      list.classList.add('active')
    })
  } else {
    ele.querySelectorAll('.item').forEach(list => {
      list.classList.remove('active')
    })
  }
  window.addEventListener('scroll', (e) => {
    if(scrollTop < window.scrollY) {
      ele.querySelectorAll('.item').forEach(list => {
        list.classList.add('active')
      })
    } else {
      ele.querySelectorAll('.item').forEach(list => {
        list.classList.remove('active')
      })
    }
  })
}