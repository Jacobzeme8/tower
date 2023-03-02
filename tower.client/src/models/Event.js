
export class Event{

  constructor(data){
    this.coverImg = data.coverImg
    this.creatorId = data.creatorId
    this.description = data.description
    this.id = data.id
    this.isCanceled = data.isCanceled
    this.location = data.location
    this.name = data.name
    this.startDate = new Date(data.startDate).toLocaleString()
    this.type = data.type
    this.creator = data.creator
    this.capacity = data.capacity
  }

}