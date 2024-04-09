export default class State{
    constructor(){
    }

    get configuration(){
        return [
            ['br-0-0','bn-1-0','bb-2-0','bq-3-0','bk-4-0','bb-5-0','bn-6-0','br-7-0'],
            ['bp-1-0','bp-1-1','bp-2-1','bp-3-1','bp-4-1','bp-5-1','bp-6-1','bp-7-1'],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['wp-6-0','wp-1-6','wp-2-6','wp-3-6','wp-4-6','wp-5-6','wp-6-6','wp-7-6'],
            ['wr-0-7','wn-1-7','wb-2-7','wq-3-7','wk-4-7','wb-5-7','wn-6-7','wr-7-7']
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