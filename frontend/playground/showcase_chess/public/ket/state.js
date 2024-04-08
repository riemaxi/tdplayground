export default class State{
    constructor(){
    }

    get configuration(){
        return [
            ['br-0-0','bn-0-1','bb-0-2','bq-0-3','bk-0-4','bb-0-5','bn-0-6','br-0-7'],
            ['bp-1-0','bp-1-1','bp-1-2','bp-1-3','bp-1-4','bp-1-5','bp-1-6','bp-1-7'],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['wp-6-0','wp-6-1','wp-6-2','wp-6-3','wp-6-4','wp-6-5','wp-6-6','wp-6-7'],
            ['wr-7-0','wn-7-1','wb-7-2','wq-7-3','wk-7-4','wb-7-5','wn-7-6','wr-7-7']
        ]
    }

    normalize(configuration){
        let grid = [...Array(8)].map(() => [...Array(8)].map(() => ''))

        configuration.forEach(p => {
            let vector = p.split('-')
            let col = vector[1]
            let row = vector[2]

            grid[col][row] = p
        })

        return grid
    }
}