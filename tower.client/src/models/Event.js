
export class Event{

  constructor(data){
    this.coverImg = data.coverImg || "https://images.unsplash.com/photo-1677758364308-f16331b5ec86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
    this.creatorId = data.creatorId
    this.description = data.description || "this is a default description"
    this.id = data.id
    this.isCanceled = data.isCanceled
    this.location = data.location || "dunno"
    this.name = data.name
    this.startDate = new Date(data.startDate).toLocaleString()
    this.type = data.type
    this.creator = data.creator
    this.capacity = data.capacity
  }

}