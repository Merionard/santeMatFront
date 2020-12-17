import ApportNutritionnel from "./ApportNutritionnel";

class ReleveInformations {

    constructor(apportNutritionnel,
                periode,
                tensionMontante,
                tensionDesc,
                listPlats,
                isNew = true,
                id) {

        if (isNew) {
            this.apportNutritionnel = new ApportNutritionnel();
            this.periode = null;
            this.tensionMontante = null;
            this.tensionDesc = null;
            this.listPlats = [];
            this.new = isNew;

        } else {
            this.id = id;
            this.periode = periode;
            this.tensionMontante = tensionMontante;
            this.tensionDesc = tensionDesc;
            this.listPlats = listPlats;
            this.apportNutritionnel = apportNutritionnel;
        }


    }

    setPeriode(periode) {
        this.periode = periode;
        return this;
    }

    setTensionMontante(tensionMontante) {
        this.tensionMontante = tensionMontante;
        return this;
    }

    setTensionDesc(tensionDesc) {
        this.tensionDesc = tensionDesc;
        return this;
    }

    setPlats(listPlats) {
        this.listPlats = listPlats;
        return this;
    }

    setApportNutritionnel(apportNutritionnel) {
        this.apportNutritionnel = apportNutritionnel;
        return this;
    }

    resetApport() {
        this.apportNutritionnel.reset();
        this.listPlats = [];
        return this;
    }

    static toJson(releveInformations) {

        let releveInfos = [];
        releveInformations.forEach(r => {
            let listPlats = [];
            r.listPlats.forEach(plat => {
                listPlats.push({nom: plat.nom})
            })
            releveInfos.push({
                id:r.id!== undefined? r.id:"",
                apportNutritionnel: r.apportNutritionnel,
                periode: r.periode,
                tension: {t_montante: r.tensionMontante, t_descendante: r.tensionDesc},
                listPlats: listPlats
            })
        })
        return releveInfos;
    }


}

export default ReleveInformations;