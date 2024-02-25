
export const getMovement = (recipient: string | undefined) => {

    switch (recipient) {
        case 'PWT70':
            return 'Mixery Prod. Chemiczna'
        case 'PWT30':
            return  'Label area'
        case 'PWT10':
            return  'Truskarki'
        case 'MSP':
            return  'Magazyn centralny (CMD)'
        default:
            return  'Unknown items 😥'
    }
}