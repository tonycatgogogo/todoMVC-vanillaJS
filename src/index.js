import Controller from './js/controller'
import {$on} from './js/functions'
import Store from './js/store'
import Template from './js/template'
import View from './js/views'

const store = new Store('todos-vanilla-es6')

const template = new Template()

const view = new View(template)

const controller = new Controller(store, view)

const setView = () => {
    controller.setView(document.location.hash)
}
$on(window,'load',setView)
$on(window,'hashchange',setView)
