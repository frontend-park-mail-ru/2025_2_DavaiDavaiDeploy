export function objectsDiff(oldObj, newObj) {
  const oldKeys = Object.keys(oldObj);
  const newKeys = Object.keys(newObj);
  const added = [];
  const updated = [];

  for (const key of newKeys) {
    if (!(key in oldObj)) {
      added.push(key);
    } else if (key in oldObj && oldObj[key] !== newObj[key]) {
      updated.push(key);
    }
  }

  return {
    added: added,
    removed: oldKeys.filter(key => !(key in newObj)),
    updated: updated,
  };
}
