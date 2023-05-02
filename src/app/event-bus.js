import EventEmmiter from 'events'

// Esta clase esta diseñada en base al administrador de eventos de node con la finalidad de
// conectar todas aquellas areas de la aplicacion que se desea tener desacopladas por completo
// y actuan de forma independiente una de la otra.
export class EventBus extends EventEmmiter {}
