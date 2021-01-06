export const assignKnowFields = <D, R>(donor: D, recipient: R, fields: string[] = getFields(donor)) => {
    fields.map(key => {
      if (typeof donor[key] !== 'undefined') {
        recipient[key] = donor[key];
      }
    });
  };
const getFields = <D>(donor: D): string[] => Object.getOwnPropertyNames(donor);