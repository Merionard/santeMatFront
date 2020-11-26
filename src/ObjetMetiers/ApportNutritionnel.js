class ApportNutritionnel{

    constructor(potassium,calcium,magnesium,sodium,phosphore) {
        this.potassium = potassium;
        this.calcium = calcium;
        this.magnesium = magnesium;
        this.sodium = sodium;
        this.phosphore = phosphore;
    }

    addApport(apportNutritionnel){

        this.potassium += apportNutritionnel.potassium;
        this.calcium += apportNutritionnel.calcium;
        this.magnesium += apportNutritionnel.magnesium;
        this.sodium += apportNutritionnel.sodium;
        this.phosphore += apportNutritionnel.phosphore;
    }

    reset(){
        this.potassium = 0;
        this.calcium = 0;
        this.magnesium = 0;
        this.sodium = 0;
        this.phosphore = 0;
        return this;
    }
}

export default ApportNutritionnel