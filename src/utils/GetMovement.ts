
export const getMovement = (recipient: string | undefined) => {

    switch (recipient) {
        case 'PWT70':
            return 'PWT70 | Mixery Prod. Chemiczna'
        case 'PWT30':
            return  'PWT30 | Label area'
        case 'PWT10':
            return  'PWT10 | Truskarki'
        case 'MSP':
            return  'MSP | Magazyn centralny (CMD)'
        default:
            return  'Unknown items 😥'
    }
}