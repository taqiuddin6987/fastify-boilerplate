import camelCase from 'lodash/camelCase';

function getConflicts(errorMessage) {
  const regex = /Key \((.+)\)=\((.+)\) .* ./i;

  const regExpExecArray = regex.exec(errorMessage);

  const errorObject = {};

  if (regExpExecArray) {
    const keys = regExpExecArray[1].split(', ');
    const values = regExpExecArray[2].split(', ');

    for (let index = 0; index < keys.length; index++) {
      const key = camelCase(keys[index]);
      const value = values[index];

      errorObject[key] = value;
    }
  }

  return errorObject;
}

export default getConflicts;
