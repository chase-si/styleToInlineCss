const addStyleToDom = (dom, style) => {
  const styleAttribute = dom.getAttribute('style');

  if (styleAttribute === undefined) {
    dom.setAttribute('style', style)
  } else {
    dom.setAttribute('style', `${styleAttribute} ${style}`)
  }

  return dom;
}

const handleCssContextToObject = cssString => {
  let cssContext = replaceEmptySpace(cssString);
  let object = {};
  let indexStart = 0;

  while (cssContext.length > 0) {
    let firstRuleEnd = cssContext.indexOf('}') + 1;
    let firstRule = cssContext.substring(indexStart, firstRuleEnd);

    const [firstRuleKey, firstRuleValue] = firstRule.split('{');
    object[firstRuleKey] = firstRuleValue.slice(0, -1);

    cssContext = cssContext.substring(firstRuleEnd);
  }
  
  return object;
}

const replaceEmptySpace = string => {
  return string.replace(/\s+/g, '');
}

module.exports = {
  addStyleToDom,
  handleCssContextToObject,
};
