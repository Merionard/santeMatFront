import ApportNutritionnel from "./ApportNutritionnel";

class ReleveInformations{

    constructor(apportNutritionnel,
                periode,
                tensionMontante,
                tensionDesc,
                listPlats,
                isNew=true,
                id) {

        this.apportNutritionnel = new ApportNutritionnel();
        this.periode = null;
        this.tensionMontante = null;
        this.tensionDesc = null;
        this.listPlats = [];
        this.new = isNew;

        if(!isNew){
            this.id = id;
            this.periode = periode;
            this.tensionMontante = tensionMontante;
            this.tensionDesc = tensionDesc;
            this.listPlats = listPlats;
        }

    }

    setPeriode(periode){
        this.periode = periode;
        return this;
    }

    setTensionMontante(tensionMontante){
        this.tensionMontante = tensionMontante;
        return this;
    }

    setTensionDesc(tensionDesc){
        this.tensionDesc = tensionDesc;
        return this;
    }

    setPlats(listPlats){
        this.listPlats  = listPlats;
        return this;
    }

    setApportNutritionnel(apportNutritionnel){
        this.apportNutritionnel = apportNutritionnel;
        return this;
    }

    resetApport(){
        this.apportNutritionnel.reset();
        this.listPlats = [];
        return this;
    }



}

export default ReleveInformations;