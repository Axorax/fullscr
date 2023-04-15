const ev = {
  change: 'fullscreenchange',
  error: 'fullscreenerror'
}

export const fullscr = {
    enable: (e = 'html', code) => {
        e = e == null ? document.querySelector('html') : document.querySelector(e);
        if (fullscr.isAllowed) {
          if (e.requestFullscreen) {
            e.requestFullscreen();
          } else if (e.mozRequestFullScreen) {
            e.mozRequestFullScreen();
          } else if (e.webkitRequestFullscreen) {
            e.webkitRequestFullscreen();
          } else if(e.msRequestFullscreen) {
            e.msRequestFullscreen();
          }
        } else {
          if (code) {
            code();
            return undefined;
          }
        }
    },
    enableOnEvent: (a, i, e, c) => {
      document.querySelector(a).addEventListener(i, () => {
        fullscr.enable(e, c)
      })
    },
    disable: (code) => {
      if (fullscr.isEnabled) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      } else {
        if (code) {
          code();
        }
        return undefined;
      }
    },
    toggle: (e = 'html') => {
      return fullscr.isEnabled ? fullscr.disable() : fullscr.enable(e);
    },
    on: (e, c) => {
      return e in ev ? document.addEventListener(ev[e], c, false) : undefined
    },
    off: (e, c) => {
      return e in ev ? document.removeEventListener(ev[e], c, false) : undefined
    },
    onchange: (c) => {
      fullscr.on('change', c)
    },
    onerror: (c) => {
      fullscr.on('error', c)
    }
}

Object.defineProperties(fullscr, {
    isEnabled: {
        get: () => Boolean(document.fullscreenElement)
    },
    isAllowed: {
      get: () => Boolean(document.fullscreenEnabled||document.mozFullScreenEnabled||document.documentElement.webkitRequestFullScreen)
    },
    element: {
      get: () => document.fullscreenElement
    }
})

export default fullscr;