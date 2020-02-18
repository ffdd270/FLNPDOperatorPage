function randomHelper( min : number, max : number )
{
    return Math.floor(  Math.random() * (  ( max + 1 )  - min ) + min ) ;
}

export class Dice
{
    constructor( max_number : number )
    {
        this.max_number = max_number;
        this.result_number = randomHelper( 1, max_number );
    }

    readonly result_number : number;
    readonly max_number : number;
}