const fs = require('fs')

class Segment{
	constructor(id, path, capacity){
		this.items = {}
		this.id = id
		this.capacity || 10
		this.path = path
	}

	init(){
		fs.writeFileSync(this.path,'{}','utf8')
	}

	load(){
		let content = fs.readFileSync(this.path, 'utf-8')
		this.items = JSON.parse(content)
	}

	save(){
		this.saveAs(this.path)
	}

	saveAs(path){
		fs.writeFileSync(path, JSON.stringify(this.items), 'utf-8')
	}

	flush(){
		for(let key of Object.keys(this.items))
			delete this.items[key]
	}

	add(key, data){
		this.items[key] = data
		return true
	}

	rem(key){
		let item = this.items[key]
		delete this.items[key]
		return item !== undefined
	}

	get(key){
		return this.items[key]
	}

	set(key, data){
		this.items[key] = {...data}
		return true
	}

	has(key){
		return this.items[key] !== undefined
	}

	full(){
		return Object.keys(this.items).length >= this.capacity
	}

	collect(consume){
		for(let [key, data] of Object.entries(this.items))
			consume(this.id, {key, data})
	}

	find(condition){
		return Object.entries(this.items).find(item => condition(item[0], item[1]))
	}

	exist(condition){
		return Object.values(this.items).find(item => condition(item)) !== undefined
	}

}

class One{
	constructor(root, size, capacity){
		this.segments = [...Array(size)].map((_,i) => this.createSegment(i, root + 'segment-' + i + '.json', capacity))
	}

	createSegment(index, path, capacity){
		return new Segment(index, path, capacity)
	}

	init(){
		this.segments.forEach(s => s.init())
	}

	load(){
		this.segments.forEach(s => s.load())
	}

	save(){
		this.segments.forEach(s => s.save())
	}

	saveAs(root){
		this.segments.forEach(s => s.saveAs(root + 'segment-' + s.id))
	}

	getSegment(key){
		let list = [...Array(this.segments.length)].map((_,i) => i)
		while(list.length){
			let index = Math.floor(Math.random()*list.length)
			let segment = this.segments[index]
			if (!segment.full() && !segment.has(key))
				return segment

			list = list.filter(v => v != index)
		}
		return null
	}

	add(key, data){
		let segment = this.getSegment(key)
		return segment && segment.add(key, data)
	}

	rem(key){
		let segment = this.segments.find(s => s.has(key))
		return segment && segment.rem(key)
	}

	collect(consume){
		for(let segment of this.segments)
			segment.collect( consume )
	}

	get(key){
		let segment = this.segments.find(s => s.has(key))
		return segment && segment.get(key)
	}

	set(key, data){
		let segment = this.segmentByKey(key)
		return segment && segment.set(key, data)
	}

	has(key){
		return this.segments.find(s => s.has(key)) !== undefined
	}

	segmentByKey(key){
		return this.segments.find(s => s.has(key))
	}

	segment(index){
		return index >= 0 &&
			index < this.segments.length &&
			this.segments[index] ||
			new Segment(index, '')
	}

	find(condition){
		for(let segment of this.segments){
			let hit = segment.find(condition)
			if (hit)
				return hit
		}

		return null
	}

	exist(condition){
		return this.segments.find(s => s.exist(item => condition(item))) !== undefined
	}

}

module.exports = {One, Segment}
