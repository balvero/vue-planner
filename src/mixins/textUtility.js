export default {
  //   data() {
  //     return {
  //       utilityName: "text utility",
  //       creator: "Bernard Alvero"
  //     };
  //   },
  //   computed: {
  //     fullName() {
  //       return this.utilityName + " " + this.fullName;
  //     }
  //   },
  methods: {
    textUtility_capitalize(word) {
      if (word && typeof word === "string") {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    }
  }
};
