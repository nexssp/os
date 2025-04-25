import nexssOS from './index.js';

const osInstance = nexssOS();

export const install = (...args) => osInstance.install(...args);
export const uninstall = (...args) => osInstance.uninstall(...args);
export const update = (...args) => osInstance.update(...args);
export const search = (...args) => osInstance.search(...args);
export const where = (...args) => osInstance.where(...args);

export default nexssOS;
