import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";
import tempretures from "../data/tempretures.json";
import db from "../firebase.ts";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  CollectionReference,
} from "firebase/firestore";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],
    bases: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,
    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,
    creamers: [] as CreamerType[],
    currentCreamer: null as CreamerType | null,
    beverages: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
    currentName: "",
  }),

  actions: {
    init() {
      const baseCol: CollectionReference = collection(db, "bases");
      getDocs(baseCol).then((querySnapshot) => {
          this.bases = querySnapshot.docs.map((doc) => ({id: doc.id, 
            name: doc.data().name, 
            color: doc.data().color}) as BaseBeverageType);
      });
      this.currentBase = this.bases[0];

      const syrupCol: CollectionReference = collection(db, "syrups");
      getDocs(syrupCol).then((querySnapshot) => {
        this.syrups = querySnapshot.docs.map((doc) => ({id: doc.id, 
          name: doc.data().name, 
          color: doc.data().color}) as SyrupType);
      });
      this.currentSyrup = this.syrups[0];

      const creamerCol: CollectionReference = collection(db, "creamers");
      getDocs(creamerCol).then((querySnapshot) => {
        this.creamers = querySnapshot.docs.map((doc) => ({id: doc.id, 
          name: doc.data().name, 
          color: doc.data().color}) as CreamerType);
      });
      this.currentCreamer = this.creamers[0];

      const bevCol: CollectionReference = collection(db, "beverages");
      getDocs(bevCol).then((querySnapshot) => {
        if (!querySnapshot.empty){
          this.beverages = querySnapshot.docs.map((doc) => ({
          id: doc.id, 
          name: doc.data().name, 
          base: doc.data().base,
          creamer: doc.data().creamer,
          syrup: doc.data().syrup,
          temp: doc.data().temp,}) as BeverageType);
        }
      });
    },
    makeBeverage() {
      if(this.currentName && this.currentBase && this.currentCreamer && this.currentSyrup && this.currentTemp){
        const id = `${this.currentBase.id}-${this.currentSyrup.id}-${this.currentCreamer.id}`
        const beverage = doc(db, "beverages", id);
        setDoc(beverage, {
          name: this.currentName,
          base: this.currentBase,
          syrup: this.currentSyrup,
          creamer: this.currentCreamer,
          temp: this.currentTemp
        }).then(() => {
          this.currentBeverage = {
            id: id,
            name: this.currentName!,
            base: this.currentBase!,
            syrup: this.currentSyrup!,
            creamer: this.currentCreamer!,
            temp: this.currentTemp
          };
          this.beverages.push(this.currentBeverage)
          console.log("Beverage Created")
        });
      }
    },

    showBeverage() {
      if(this.currentBeverage){
        this.currentName = this.currentBeverage.name,
        this.currentBase = this.currentBeverage.base,
        this.currentSyrup = this.currentBeverage.syrup,
        this.currentCreamer = this.currentBeverage.creamer,
        this.currentTemp = this.currentBeverage.temp
      }
    },
  },
});
