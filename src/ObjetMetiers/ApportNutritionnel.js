class ApportNutritionnel {

    constructor(potassium = 0, calcium = 0, magnesium = 0, sodium = 0, phosphore = 0, id) {
        this.potassium = potassium;
        this.calcium = calcium;
        this.magnesium = magnesium;
        this.sodium = sodium;
        this.phosphore = phosphore;
        this.id = id;
    }

    addApport(apportNutritionnel) {

        this.potassium += apportNutritionnel.potassium;
        this.calcium += apportNutritionnel.calcium;
        this.magnesium += apportNutritionnel.magnesium;
        this.sodium += apportNutritionnel.sodium;
        this.phosphore += apportNutritionnel.phosphore;
    }

    getDelta(apportNutritionnel) {
        let deltaPotassium = this.potassium - apportNutritionnel.potassium;
        let deltaCalcium = this.calcium - apportNutritionnel.calcium;
        let deltaMagnesium = this.magnesium - apportNutritionnel.magnesium;
        let deltaSodium = this.sodium - apportNutritionnel.sodium;
        let deltaPhosphore = this.phosphore - apportNutritionnel.phosphore;
        return new ApportNutritionnel(deltaPotassium, deltaCalcium, deltaMagnesium, deltaSodium, deltaPhosphore);
    }


    reset() {
        this.potassium = 0;
        this.calcium = 0;
        this.magnesium = 0;
        this.sodium = 0;
        this.phosphore = 0;
        return this;
    }

    static of(apport) {
        return new ApportNutritionnel(apport.potassium,
            apport.calcium,
            apport.magnesium,
            apport.sodium,
            apport.phosphore,
            apport.id)
    }

    static getApportFromReleves(releves) {

        let apportNutritionnel = new ApportNutritionnel();
        releves.forEach(releve => apportNutritionnel.addApport(releve.apportNutritionnel))
        return apportNutritionnel
    }
}

export default ApportNutritionnel