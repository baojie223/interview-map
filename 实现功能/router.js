class HashRouter {
  constructor(container, routes) {
    this.container = container
    this.routes = routes
    this.load()
    window.addEventListener('hashchange', this.load.bind(this))
  }

  load() {
    let hash = location.hash.slice(1)

    const target = this.routes.filter(route => route.path === hash)
    console.log(target)
    if (target.length > 0) {
      this.container.innerHTML = target[0].component
    } else {
      this.container.innerHTML = '404 NOT FOUND'
    }
  }

  push(path) {
    location.hash = `#${path}`
  }
}

class HistoryRouter {
  constructor(container, routes) {
    this.container = container
    this.routes = routes
  }
}

