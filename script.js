document.addEventListener('DOMContentLoaded', () => {
  /* class */
  const CLA_ON = 'on';
  const CLA_INACTIVE = 'inactive';
  const CLA_ACTIVE = 'active';
  const CLA_MAIN = 'main';

  /* attribute */
  const ATTR_DATA_IDX = 'data-idx';

  /* element */
  const wrap = document.querySelector('.wrap');
  const inputs = document.querySelectorAll('input');

  const exampleBtn = document.querySelector('.exampleBtn');
  const example = document.querySelector('.example');
  const closeBtn = document.querySelector('.closeBtn');

  /////////////////////////////////////////////////////////////////////////

  /* show example image */
  exampleBtn.addEventListener('click', () => showExample());
  closeBtn.addEventListener('click', () => showExample(false));
  window.addEventListener('click', (e) => {
    if (e.target !== exampleBtn) showExample(false);
  });

  /////////////////////////////////////////////////////////////////////////
  const finalTarget = document.querySelector('.mainTarget .main');
  const mainInputs = document.querySelectorAll('.mainTarget input');
  const sections = document.querySelectorAll('.section');

  const isInputed = () => {
    let bool = false;
    if (finalTarget.value.length > 0) bool = true;
    return bool;
  };

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (isInputed()) {
        if (finalTarget.value.length > 0) {
          mainInputs.forEach((mainInput) =>
            mainInput.classList.add(CLA_ACTIVE)
          );
        }
      } else {
        mainInputs.forEach((mainInput) =>
          mainInput.classList.remove(CLA_ACTIVE)
        );
        finalTarget.classList.add(CLA_ACTIVE);
        inputs.forEach((input) => (input.value = ''));
        sections.forEach((section) => section.classList.remove(CLA_ACTIVE));
      }
    });
  });

  mainInputs.forEach((mainInput) => {
    mainInput.addEventListener('input', () => {
      if (mainInput.classList.contains(CLA_MAIN)) return;

      const mainInputIdx = Number(mainInput.getAttribute(ATTR_DATA_IDX)) - 1;

      if (mainInput.value.length > 0) {
        sections[mainInputIdx].classList.add(CLA_ACTIVE);
        sections[mainInputIdx].children[4].value = mainInput.value;
      } else {
        sections[mainInputIdx].classList.remove(CLA_ACTIVE);
        for (let i = 0; i < 9; i++)
          sections[mainInputIdx].children[i].value = '';
      }
    });
  });

  /////////////////////////////////////////////////////////////////////////
  /* save my mandalart */
  const saveBtn = document.querySelector('.saveBtn');
  const contents = document.querySelector('.contents');

  saveBtn.addEventListener('click', () => {
    // htmlToImage library
    // html2canvas(contents).then(canvas => {
    //   saveImg(canvas.toDataURL('image/jpg'), 'image.jpg');
    // });

    domtoimage.toPng(contents).then((dataUrl) => {
        saveImg(dataUrl, 'image.png');
      })
      .catch(function (error) {
        console.error('error', error);
      });
  });
  /* function */
  function showExample(bool = true) {
    if (bool) {
      example.classList.add(CLA_ON);
      wrap.classList.add(CLA_INACTIVE);
    } else {
      example.classList.remove(CLA_ON);
      wrap.classList.remove(CLA_INACTIVE);
    }
  }

  function saveImg(uri, filename) {
    let link = document.createElement('a');
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  }
});
