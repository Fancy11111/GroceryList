export class Item {
    id: string;
    produkt: string;
    kosten: number;
    erledigt: number;

    constructor(produkt: string, kosten: number, id?: string, erledigt?: number) {
        this.produkt = produkt;
        this.kosten = kosten;
        // this.id = parameter id or '' if id is null
        // as it is a nullable parameter (hence the ? after its name)
        this.id = id || '';
        // Same as id, but with a 0 as default because it's a number
        this.erledigt = erledigt || 0;
    }
}
