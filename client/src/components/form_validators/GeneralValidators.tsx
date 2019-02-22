//# General validators
export const GeneralValidators = {
  //* Mandatory field
  mandatoryField: (value: any) => {
    if (value) {
      return undefined;
    }

    return {
      short: "Mandatory field validation failed",
      long: "This is a mandatory field"
    };
  },

  //* Numeric field
  numericField: (value: any) => {
    if (isNaN(value)) {
      return {
        short: "Numeric field validation failed",
        long: "This is a numeric field"
      };
    }

    return undefined;
  },

  //* Field must be n characters long
  nCharsLongField: (input: number) => (value: any) => {
    if (value.toString().length < input) {
      return {
        short: "Character limit field failed",
        long: `Value should be greater than ${input} characters long`
      };
    }

    return undefined;
  },

  //* Field has a minimum number value
  minNumValueField: (input: number) => (value: any) => {
    if (isNaN(value) || value < input) {
      return {
        short: "Number error",
        long: `Entered number ${value} should be greater than ${input}.`
      };
    }

    return undefined;
  }
};
