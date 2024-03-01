class RapidTestOrder {
  constructor(sFrom) {
    this.OrderState = {
      WELCOMING: () => {
        let aReturn = [];
        this.stateCur = this.OrderState.MENU;
        aReturn.push("Welcome to Pizza Planet");
        aReturn.push("Would you like to order something out of this world?");
        return aReturn;
      },
      MENU: (sInput) => {
        let aReturn = [];
        if (sInput.toLowerCase().includes('yes')) {
          this.stateCur = this.OrderState.RESERVING;
          aReturn.push("Great choice!");
          aReturn.push("What size would you like? (small, medium, large)");
        } else {
          this.isDone = true;
          aReturn.push("Thanks for trying our reservation system");
          aReturn.push("Maybe next time");
        }
        return aReturn;
      },
      RESERVING: (sInput) => {
        let aReturn = [];
        this.isDone = true;
        if (sInput.toLowerCase().startsWith('small') || sInput.toLowerCase().startsWith('medium') || sInput.toLowerCase().startsWith('large')) {
          aReturn.push(`You ordered a ${sInput.toLowerCase()} pizza.`);
          aReturn.push("What toppings would you like?");
          this.stateCur = this.OrderState.ADDTOPPINGS;
        } else {
          aReturn.push("Please select a valid size (small, medium, large)");
        }
        return aReturn;
      },
      ADDTOPPINGS: (sInput) => {
        let aReturn = [];
        this.isDone = true;
        // Assume toppings were entered
        aReturn.push(`Your pizza with ${sInput} toppings is ordered.`);
        aReturn.push("Would you like to add dips for $1? (yes/no)");
        this.stateCur = this.OrderState.ADDDIPS;
        return aReturn;
      },
      ADDDIPS: (sInput) => {
        let aReturn = [];
        this.isDone = true;
        if (sInput.toLowerCase().includes('yes')) {
          aReturn.push("Great choice!");
          aReturn.push("We have garlic or ranch dip. Which one would you like?");
          this.stateCur = this.OrderState.SELECTDIP;
        } else {
          aReturn.push("Thank you for your order, Astronaut!");
        }
        return aReturn;
      },
      SELECTDIP: (sInput) => {
        let aReturn = [];
        this.isDone = true;
        // Assume dip selection is processed
        aReturn.push(`You added ${sInput} dip to your order.`);
        aReturn.push("Thank you for your order, Astronaut!!");
        return aReturn;
      }
    };

    this.stateCur = this.OrderState.WELCOMING;
    this.isDone = false;
    this.sFrom = sFrom;
  }
  handleInput(sInput) {
    return this.stateCur(sInput);
  }
  isOrderDone() {
    return this.isDone;
  }
}

export { RapidTestOrder };
