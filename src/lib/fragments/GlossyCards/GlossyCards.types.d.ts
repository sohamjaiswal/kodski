export interface IGlossyCard {
	component: any;
	value: any;
}

export interface IGlossyCards {
	cards: IGlossyCard[];
	height?: number;
	width?: number;
}
