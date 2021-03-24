

const dbFake = { comendo: [], pensando: [] };

const talheres = 5;
let colherExtra;

const janta = filo => {
  const comendo = dbFake.comendo || [];
  const pensando = dbFake.pensando || [];
  if (!colherExtra) {
    colherExtra = filo;
    return;
  }

  if (!comendo.includes(filo) && comendo.length < Math.floor(talheres / 2)) {
    if (pensando.includes(filo)) {
      const index = pensando.indexOf(filo);
      pensando.splice(index, 1);
      dbFake.pensando = pensando;
    }

    dbFake.comendo = comendo.concat(filo);
  } else if (!pensando.includes(filo) && pensando.length < Math.ceil(talheres / 2)) {
    if (comendo.includes(filo)) {
      const index = comendo.indexOf(filo);
      comendo.splice(index, 1);
      dbFake.comendo = comendo;
    }
    dbFake.pensando = pensando.concat(filo);
  } else {
    if (pensando.includes(filo)) {
      const index = pensando.indexOf(filo);
      pensando.splice(index, 1);
      dbFake.pensando = pensando;
    }
    if (comendo.includes(filo)) {
      const index = comendo.indexOf(filo);
      comendo.splice(index, 1);
      dbFake.comendo = comendo;
    }
  }
};
