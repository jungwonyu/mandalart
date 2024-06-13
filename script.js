document.addEventListener('DOMContentLoaded', () => {
 const get = (target, parent = document) => parent.querySelector(target);
 const gets = (target, parent = document) => [...parent.querySelectorAll(target)];
  /* class */
  const CLA_ON = 'on';
  const CLA_INACTIVE = 'inactive';
  const CLA_ACTIVE = 'active';
  const CLA_MAIN = 'main';

  /* attribute */
  const ATTR_DATA_IDX = 'data-idx';

  /* element */
  const wrap = get('.wrap');
  const inputs = gets('textarea');
  const exampleBtn = get('.exampleBtn');
  const example = get('.example');
  const closeBtn = get('.closeBtn');
  const finalTarget = get('.mainTarget .main');
  const mainInputs = gets('.mainTarget textarea');
  const sections = gets('.section');
  const saveBtn = get('.saveBtn');
  const contents = get('.contents');
  const isInputed = () => {
    let bool = false;
    if (finalTarget.value.length > 0) bool = true;
    return bool;
  };

  exampleBtn.addEventListener('click', () => showExample());
  closeBtn.addEventListener('click', () => showExample(false));
  window.addEventListener('click', (e) => (e.target !== exampleBtn) && showExample(false));
  saveBtn.addEventListener('click', () => saveImage());
  inputs.forEach((input) => input.addEventListener('input', () => inputProcess(input)));
  mainInputs.forEach((mainInput) => mainInput.addEventListener('input', () => mainProcess(mainInput)));

  mainProcess = (mainInput) => {
    if (mainInput.classList.contains(CLA_MAIN)) return;
    const mainInputIdx = Number(mainInput.getAttribute(ATTR_DATA_IDX)) - 1;
    if (mainInput.value.length > 0) {
      sections[mainInputIdx].classList.add(CLA_ACTIVE);
      sections[mainInputIdx].children[4].value = mainInput.value;
    } else {
      sections[mainInputIdx].classList.remove(CLA_ACTIVE);
      for (let i = 0; i < 9; i++) sections[mainInputIdx].children[i].value = '';
    }
  }

  inputProcess = () => {
    if (isInputed()) {
      console.log(finalTarget.value.length)
      finalTarget.value.length > 0 && mainInputs.forEach((mainInput) => mainInput.classList.add(CLA_ACTIVE));
    } else {
      mainInputs.forEach((mainInput) => mainInput.classList.remove(CLA_ACTIVE));
      finalTarget.classList.add(CLA_ACTIVE);
      inputs.forEach((input) => (input.value = ''));
      sections.forEach((section) => section.classList.remove(CLA_ACTIVE));
    }
  }
 
  showExample = (bool = true) => {
    if (bool) {
      example.classList.add(CLA_ON);
      wrap.classList.add(CLA_INACTIVE);
    } else {
      example.classList.remove(CLA_ON);
      wrap.classList.remove(CLA_INACTIVE);
    }
  }

  download = (url, filename) => {
    let link = document.createElement('a');
    document.body.appendChild(link);
    link.href = url;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  }

  saveImage = () => {
    domtoimage.toPng(contents).then((dataUrl) => {
      download(dataUrl, 'image.png');
    })
    .catch(function (error) {
      console.error('error', error);
    });
  }
});
